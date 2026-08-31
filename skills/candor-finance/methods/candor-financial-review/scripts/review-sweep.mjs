#!/usr/bin/env node
// Financial-review sweep: one deterministic pass over already delivered
// Candor pages that prints only the four-lens candidate ledger.
//
// Usage: node review-sweep.mjs FILE... [until=YYYY-MM-DD]
//
// Pass until= with the requested query boundary; without it, stopped-series
// and deadline checks run against the newest observed transaction instead.
//
// Each FILE is a downloaded Candor response page or artifact payload (JSON).
// The script classifies every file by shape: rows with a date, an amount, and
// a direction are transactions; rows with balance fields are balances; rows
// with rate or term fields are account terms. It never contacts the network,
// never runs another program, and never prints raw rows: stdout is model
// context, so it carries only totals, capped candidates, and caveats.
import { readFileSync } from "node:fs";

const MAX_CANDIDATES = 5;
const DUPLICATE_WINDOW_DAYS = 3;
const REVERSAL_WINDOW_DAYS = 14;
const REFUND_PRECEDENT_WINDOW_DAYS = 60;
const LARGE_DEBIT_PERCENTILE = 0.9;
const RARE_LABEL_MAX_COUNT = 2;
// A later inflow resolves an expected-inflow candidate only when it is
// amount-compatible with the debit; a token credit is not an offset.
const OFFSET_COMPATIBLE_RATIO = 0.9;
const RECURRING_MIN_OBSERVATIONS = 3;
const AMOUNT_CHANGE_MINIMUM_CENTS = 100;
const AMOUNT_CHANGE_MINIMUM_RATIO = 0.1;
const STOPPED_GAP_RATIO = 1.8;
const CADENCE_FAST_RATIO = 0.55;
const RECURRING_MIN_INTERVAL_DAYS = 5;
const RECURRING_MAX_INTERVAL_DAYS = 400;
const PROMO_DEADLINE_HORIZON_DAYS = 45;
// An expiry far in the past is historical context, not a current deadline.
const PROMO_DEADLINE_LOOKBACK_DAYS = 60;
const DAY_MS = 86_400_000;
const FEE_PATTERN =
  /\b(fee|fees|overdraft|penalty|late charge|service charge|finance charge|interest charge)\b/i;

function fail(message) {
  process.stderr.write(`review-sweep: ${message}\n`);
  process.exit(1);
}

function parseMoney(value) {
  if (value && typeof value === "object") {
    const nested = parseMoney(value.amount ?? value.value);
    if (!nested) {
      return undefined;
    }
    return {
      cents: nested.cents,
      currency:
        typeof value.currency === "string" ? value.currency : nested.currency,
    };
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return { cents: Math.round(value * 100), currency: undefined };
  }
  if (typeof value !== "string") {
    return undefined;
  }
  const match = value.match(
    /^\s*(?:([A-Z]{3})\s+)?(-?\d+(?:\.\d+)?)(?:\s+([A-Z]{3}))?\s*$/
  );
  if (!match) {
    return undefined;
  }
  return {
    cents: Math.round(Number(match[2]) * 100),
    currency: match[1] ?? match[3],
  };
}

function parseDay(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}/.test(value)) {
    return undefined;
  }
  const time = Date.parse(`${value.slice(0, 10)}T00:00:00Z`);
  return Number.isFinite(time) ? time : undefined;
}

function dayText(time) {
  return new Date(time).toISOString().slice(0, 10);
}

function normalizedLabel(row) {
  // The canonical transactions dataset exposes the merchant as label; the
  // transactions.list view exposes effective_label. Accept both.
  const label =
    row.label ??
    row.effective_label ??
    row.merchant_name ??
    row.description ??
    "";
  return String(label)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function asTransaction(row) {
  const day = parseDay(row.date ?? row.posted_date);
  const money = parseMoney(row.amount);
  const direction = row.direction;
  if (
    day === undefined ||
    money === undefined ||
    (direction !== "outflow" &&
      direction !== "inflow" &&
      direction !== "neutral")
  ) {
    return undefined;
  }
  return {
    account: row.source_account_id,
    cents: Math.abs(money.cents),
    currency: money.currency ?? row.currency ?? "USD",
    day,
    direction,
    id: row.id ?? row.transaction_id,
    pending: row.status === "pending",
    label: normalizedLabel(row),
    role: row.effective_cashflow_role ?? row.cashflow_role,
    text: `${row.label ?? row.effective_label ?? row.merchant_name ?? row.description ?? ""} ${row.effective_category ?? row.category ?? ""}`,
  };
}

// Canonical balances rows carry role, currency, and the exact-money
// current_balance / available_balance fields.
const CASH_ROLES = new Set(["operating_cash", "cash_reserve"]);
const DEBT_ROLES = new Set(["credit_card", "debt"]);

function looksLikeBalance(row) {
  return (
    row &&
    typeof row === "object" &&
    typeof row.role === "string" &&
    (row.current_balance !== undefined || row.available_balance !== undefined)
  );
}

// Canonical account_terms rows group typed values under fields, each entry
// carrying its own resolution status. terms_kind is optional (an account can
// carry only user-approved assertions), so identity plus fields decides.
function looksLikeTerms(row) {
  return (
    row &&
    typeof row === "object" &&
    "account_identity_id" in row &&
    row.fields &&
    typeof row.fields === "object"
  );
}

const USABLE_TERM_STATUSES = new Set(["observed", "corroborated"]);

function usableTermField(row, keyPattern) {
  for (const [key, field] of Object.entries(row.fields ?? {})) {
    if (
      keyPattern.test(key) &&
      field &&
      typeof field === "object" &&
      USABLE_TERM_STATUSES.has(field.status)
    ) {
      return { key, provenance: field.provenance, value: field.value };
    }
  }
  return undefined;
}

function collectRowArrays(value, found, depth = 0) {
  if (depth > 4 || !value || typeof value !== "object") {
    return;
  }
  if (Array.isArray(value)) {
    if (
      value.length > 0 &&
      value.every((row) => row && typeof row === "object")
    ) {
      found.push(value);
    }
    return;
  }
  for (const [key, nested] of Object.entries(value)) {
    if (
      key === "calculations" ||
      key === "pagination" ||
      key === "next_actions"
    ) {
      continue;
    }
    collectRowArrays(nested, found, depth + 1);
  }
}

const args = process.argv.slice(2);
const untilArg = args.find((arg) => arg.startsWith("until="));
const inputPaths = args.filter((arg) => !arg.startsWith("until="));
if (inputPaths.length === 0) {
  fail("pass at least one downloaded Candor page file");
}
const requestedEnd = untilArg
  ? parseDay(untilArg.slice("until=".length))
  : undefined;
if (untilArg && requestedEnd === undefined) {
  fail("until= must carry a YYYY-MM-DD day");
}

const transactions = new Map();
const balanceRows = [];
const termRows = [];
const caveats = [];
for (const path of inputPaths) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(path, "utf8"));
  } catch (error) {
    fail(`${path} is not readable JSON: ${error.message}`);
  }
  const arrays = [];
  collectRowArrays(parsed, arrays);
  let classified = false;
  for (const rows of arrays) {
    const parsedTransactions = rows
      .map(asTransaction)
      .filter((row) => row !== undefined);
    if (parsedTransactions.length === rows.length) {
      for (const transaction of parsedTransactions) {
        transactions.set(
          transaction.id ?? `${path}:${transactions.size}`,
          transaction
        );
      }
      classified = true;
      continue;
    }
    // Both balance amounts are optional per the canonical validator, so the
    // page is recognized when every row carries a role and at least one row
    // carries an amount; amount-less rows are skipped during aggregation.
    if (
      rows.every((row) => row && typeof row.role === "string") &&
      rows.some(looksLikeBalance)
    ) {
      balanceRows.push(...rows);
      classified = true;
      continue;
    }
    if (rows.every(looksLikeTerms)) {
      termRows.push(...rows);
      classified = true;
    }
  }
  // The completion contract requires the whole scope; a page still carrying
  // a continuation is a named gap, never a silent one.
  if (parsed?.data?.page?.pagination?.has_more === true) {
    caveats.push(
      `${path} has pagination.has_more true; download and pass every continuation page before treating this ledger as complete`
    );
  }
  const hasEmptyPageArray =
    parsed &&
    typeof parsed === "object" &&
    parsed.data &&
    typeof parsed.data === "object" &&
    parsed.data.page &&
    typeof parsed.data.page === "object" &&
    Object.values(parsed.data.page).some(
      (value) => Array.isArray(value) && value.length === 0
    );
  if (!(classified || hasEmptyPageArray)) {
    caveats.push(`unrecognized page shape ignored: ${path}`);
  }
}

const all = [...transactions.values()].sort((a, b) => a.day - b.day);
// An empty scope is a valid result for a new or quiet workspace: the sweep
// still emits every lens section instead of aborting, and supplied balance
// or term pages are still evaluated.
if (all.length === 0) {
  caveats.push(
    "no transaction rows in the provided files; charge lenses ran over an empty scope"
  );
  if (requestedEnd === undefined) {
    caveats.push(
      "no until= boundary with an empty scope; deadline checks used today's date and are not reproducible"
    );
  }
}
const windowStart = all[0]?.day;
const windowEnd = all.at(-1)?.day;
const todayUtc = Date.parse(
  `${new Date().toISOString().slice(0, 10)}T00:00:00Z`
);
const scopeEnd =
  requestedEnd !== undefined &&
  (windowEnd === undefined || requestedEnd > windowEnd)
    ? requestedEnd
    : (windowEnd ?? todayUtc);
const outflows = all.filter((t) => t.direction === "outflow");
const inflows = all.filter((t) => t.direction === "inflow");
// Transfers and debt payments move money rather than spend it: the charge
// lenses see expense-shaped rows only, and offsets exclude money movements.
const MONEY_MOVEMENT_ROLES = new Set(["transfer", "debt_payment"]);
// Pending records are subject to change, so they never become candidates and
// never settle an expected offset.
const charges = outflows.filter(
  (t) => (t.role === undefined || t.role === "expense") && !t.pending
);
const offsetInflows = inflows.filter(
  (t) => !(MONEY_MOVEMENT_ROLES.has(t.role) || t.pending)
);

function money(cents, currency) {
  return `${(cents / 100).toFixed(2)} ${currency}`;
}

// No exchange rates exist here, so the cap first keeps each currency's
// top-ranked candidate, then fills the remaining slots by rank; a smaller
// currency's material lead cannot be displaced entirely by a larger one.
function capped(candidates) {
  const seenCurrencies = new Set();
  const leaders = [];
  const rest = [];
  for (const candidate of candidates) {
    const currency = candidate.currency ?? "";
    if (seenCurrencies.has(currency)) {
      rest.push(candidate);
    } else {
      seenCurrencies.add(currency);
      leaders.push(candidate);
    }
  }
  return {
    candidates: [...leaders, ...rest].slice(0, MAX_CANDIDATES),
    total: candidates.length,
  };
}

// Lens 1: avoidable outflows (duplicates, fee-like charges, reversals).
const avoidable = [];
const byLabelAmount = new Map();
for (const t of charges) {
  const key = `${t.label}|${t.cents}|${t.currency}`;
  const bucket = byLabelAmount.get(key) ?? [];
  bucket.push(t);
  byLabelAmount.set(key, bucket);
}
for (const bucket of byLabelAmount.values()) {
  for (let i = 1; i < bucket.length; i += 1) {
    const previous = bucket[i - 1];
    const current = bucket[i];
    if ((current.day - previous.day) / DAY_MS <= DUPLICATE_WINDOW_DAYS) {
      avoidable.push({
        amount: money(current.cents, current.currency),
        currency: current.currency,
        dates: [dayText(previous.day), dayText(current.day)],
        kind: "possible_duplicate",
        label: current.label,
        rank_cents: current.cents,
        source_ids: [previous.id, current.id],
      });
    }
  }
}
const feeTotals = new Map();
for (const t of charges) {
  if (FEE_PATTERN.test(t.text)) {
    const key = `${t.label}|${t.currency}`;
    const bucket = feeTotals.get(key) ?? {
      cents: 0,
      count: 0,
      currency: t.currency,
      label: t.label,
      source_ids: [],
    };
    bucket.cents += t.cents;
    bucket.count += 1;
    bucket.source_ids.push(t.id);
    feeTotals.set(key, bucket);
  }
}
for (const bucket of feeTotals.values()) {
  avoidable.push({
    amount: money(bucket.cents, bucket.currency),
    count: bucket.count,
    currency: bucket.currency,
    kind: "fee_like_charges",
    label: bucket.label,
    rank_cents: bucket.cents,
    source_ids: bucket.source_ids.slice(0, MAX_CANDIDATES),
  });
}
// Each inflow can explain at most one debit; without consuming matches, one
// refund would count every preceding identical charge as recovered.
const usedReversalInflows = new Set();
for (const t of charges) {
  // A reversal returns to the original instrument, so accounts must agree
  // when both sides carry one.
  const reversal = offsetInflows.find(
    (r) =>
      !usedReversalInflows.has(r) &&
      r.label === t.label &&
      r.cents === t.cents &&
      r.currency === t.currency &&
      (r.account === undefined ||
        t.account === undefined ||
        r.account === t.account) &&
      r.day >= t.day &&
      (r.day - t.day) / DAY_MS <= REVERSAL_WINDOW_DAYS
  );
  if (reversal) {
    usedReversalInflows.add(reversal);
    avoidable.push({
      amount: money(t.cents, t.currency),
      currency: t.currency,
      dates: [dayText(t.day), dayText(reversal.day)],
      kind: "reversal_pair",
      label: t.label,
      rank_cents: t.cents,
      source_ids: [t.id, reversal.id],
    });
  }
}
avoidable.sort((a, b) => b.rank_cents - a.rank_cents);

// Lens 2: expected inflows (refund precedents, large rare debits without a
// later offset).
const expected = [];
const labelCounts = new Map();
for (const t of charges) {
  const countKey = `${t.label}|${t.currency}`;
  labelCounts.set(countKey, (labelCounts.get(countKey) ?? 0) + 1);
}
// Keep one auditable precedent pair per label and currency: the comparable
// debit and its later inflow, with ids, dates, and amounts.
const refundPrecedents = new Map();
for (const t of charges) {
  const precedentKey = `${t.label}|${t.currency}`;
  if (refundPrecedents.has(precedentKey)) {
    continue;
  }
  const offset = offsetInflows.find(
    (r) =>
      r.label === t.label &&
      r.currency === t.currency &&
      r.day >= t.day &&
      (r.day - t.day) / DAY_MS <= REFUND_PRECEDENT_WINDOW_DAYS &&
      r.cents >= t.cents * OFFSET_COMPATIBLE_RATIO
  );
  if (offset) {
    refundPrecedents.set(precedentKey, {
      inflow_amount: money(offset.cents, offset.currency),
      inflow_date: dayText(offset.day),
      inflow_id: offset.id,
      precedent_debit_amount: money(t.cents, t.currency),
      precedent_debit_date: dayText(t.day),
      precedent_debit_id: t.id,
    });
  }
}
// Amounts in different currencies never share one percentile threshold.
const outflowCentsByCurrency = new Map();
for (const t of charges) {
  const bucket = outflowCentsByCurrency.get(t.currency) ?? [];
  bucket.push(t.cents);
  outflowCentsByCurrency.set(t.currency, bucket);
}
const largeThresholdByCurrency = new Map();
for (const [currency, values] of outflowCentsByCurrency) {
  const sorted = values.sort((a, b) => a - b);
  largeThresholdByCurrency.set(
    currency,
    sorted[
      Math.min(
        sorted.length - 1,
        Math.floor(sorted.length * LARGE_DEBIT_PERCENTILE)
      )
    ] ?? 0
  );
}
const usedExpectedOffsets = new Set();
for (const t of charges) {
  if (
    t.cents < (largeThresholdByCurrency.get(t.currency) ?? 0) ||
    (labelCounts.get(`${t.label}|${t.currency}`) ?? 0) > RARE_LABEL_MAX_COUNT
  ) {
    continue;
  }
  // Each compatible inflow settles at most one debit; a single refund cannot
  // clear two identical charges.
  const settlingOffset = offsetInflows.find(
    (r) =>
      !usedExpectedOffsets.has(r) &&
      r.label === t.label &&
      r.currency === t.currency &&
      r.day >= t.day &&
      r.cents >= t.cents * OFFSET_COMPATIBLE_RATIO
  );
  if (settlingOffset) {
    usedExpectedOffsets.add(settlingOffset);
    continue;
  }
  // A candidate needs its comparator: a different, completed debit-credit
  // pair. A large purchase with no precedent is ordinary context, not an
  // expected-inflow lead, and the candidate's own partial credit does not
  // qualify as its precedent.
  const precedent = refundPrecedents.get(`${t.label}|${t.currency}`);
  if (!precedent || precedent.precedent_debit_id === t.id) {
    continue;
  }
  expected.push({
    amount: money(t.cents, t.currency),
    currency: t.currency,
    date: dayText(t.day),
    kind: "large_rare_debit_without_offset",
    label: t.label,
    rank_cents: t.cents,
    refund_precedent: precedent,
    source_ids: [t.id],
  });
}
expected.sort((a, b) => b.rank_cents - a.rank_cents);

// Lens 3: recurring changes (level, cadence, or count changes against the
// same label's observed baseline).
const recurring = [];
const expenseGroups = new Map();
for (const t of charges) {
  // The same merchant billing two accounts is two series, not one.
  const key = `${t.label}|${t.currency}|${t.account ?? ""}`;
  const bucket = expenseGroups.get(key) ?? [];
  bucket.push(t);
  expenseGroups.set(key, bucket);
}
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}
for (const bucket of expenseGroups.values()) {
  if (bucket.length < RECURRING_MIN_OBSERVATIONS || bucket[0].label === "") {
    continue;
  }
  const days = bucket.map((t) => t.day);
  const intervals = days.slice(1).map((day, i) => (day - days[i]) / DAY_MS);
  const medianInterval = median(intervals);
  if (
    medianInterval < RECURRING_MIN_INTERVAL_DAYS ||
    medianInterval > RECURRING_MAX_INTERVAL_DAYS
  ) {
    continue;
  }
  const last = bucket.at(-1);
  const baselineCents = median(bucket.slice(0, -1).map((t) => t.cents));
  const base = {
    currency: last.currency,
    label: last.label,
    median_interval_days: Math.round(medianInterval),
    observed_count: bucket.length,
    // The baseline came from earlier rows, so the bounded evidence list
    // carries the most recent observations, not only the latest.
    source_ids: bucket.slice(-MAX_CANDIDATES).map((entry) => entry.id),
  };
  const amountShift = Math.abs(last.cents - baselineCents);
  if (
    amountShift > AMOUNT_CHANGE_MINIMUM_CENTS &&
    amountShift > baselineCents * AMOUNT_CHANGE_MINIMUM_RATIO
  ) {
    recurring.push({
      ...base,
      baseline_amount: money(baselineCents, last.currency),
      kind: "amount_change",
      last_amount: money(last.cents, last.currency),
      rank_cents: amountShift,
    });
  }
  const gapDays = (scopeEnd - last.day) / DAY_MS;
  if (gapDays > medianInterval * STOPPED_GAP_RATIO) {
    recurring.push({
      ...base,
      kind: "series_stopped",
      last_seen: dayText(last.day),
      rank_cents: baselineCents,
    });
  }
  const lastInterval = intervals.at(-1);
  if (
    intervals.length >= RECURRING_MIN_OBSERVATIONS &&
    (lastInterval > medianInterval * STOPPED_GAP_RATIO ||
      lastInterval < medianInterval * CADENCE_FAST_RATIO)
  ) {
    recurring.push({
      ...base,
      kind: "cadence_change",
      last_interval_days: Math.round(lastInterval),
      rank_cents: baselineCents,
    });
  }
}
recurring.sort((a, b) => b.rank_cents - a.rank_cents);

// Lens 4: actual mismatches from provided balance and term facts. Missing
// inputs are a caveat, never a candidate.
const mismatches = [];
const missingMismatchInputs = [];
if (balanceRows.length === 0) {
  missingMismatchInputs.push("balances");
}
if (termRows.length === 0) {
  missingMismatchInputs.push("account_terms");
}
if (missingMismatchInputs.length > 0) {
  caveats.push(
    `actual-mismatches lens ran without ${missingMismatchInputs.join(" and ")} pages; pass them when current balance or term facts are material`
  );
}
// Term-only mismatches never depend on balances; deadlines are checked from
// the terms pages alone.
const observedRates = termRows
  .map((row) => ({
    account: row.display_name,
    rate: usableTermField(row, /apr|interest_rate/),
  }))
  .filter((entry) => entry.rate !== undefined);
for (const row of termRows) {
  const promo = usableTermField(
    row,
    /promo_expiry_date|promotional.*end|intro.*end/
  );
  const promoValue =
    promo && typeof promo.value === "object"
      ? (promo.value?.date ?? promo.value?.value)
      : promo?.value;
  const promoEnd = promo ? parseDay(promoValue) : undefined;
  if (
    promoEnd !== undefined &&
    promoEnd - scopeEnd <= PROMO_DEADLINE_HORIZON_DAYS * DAY_MS &&
    scopeEnd - promoEnd <= PROMO_DEADLINE_LOOKBACK_DAYS * DAY_MS
  ) {
    mismatches.push({
      account: row.display_name,
      kind: "promotional_deadline_near_or_past",
      promotional_end_date: dayText(promoEnd),
      rank_cents: 0,
      source_ids: [row.account_identity_id, promo.provenance].filter(Boolean),
    });
  }
}
if (balanceRows.length > 0) {
  // Cash and debt come from canonical balance fields restricted by account
  // role, summed per currency and never blended across currencies.
  const cashByCurrency = new Map();
  const debtByCurrency = new Map();
  const cashIdsByCurrency = new Map();
  const debtIdsByCurrency = new Map();
  const addId = (map, currency, id) => {
    const bucket = map.get(currency) ?? [];
    bucket.push(id);
    map.set(currency, bucket);
  };
  for (const row of balanceRows) {
    // On a debt account, available_balance is remaining credit, never the
    // amount owed, so debt sums use the observed current balance only.
    const amount = DEBT_ROLES.has(row.role)
      ? parseMoney(row.current_balance)
      : parseMoney(row.current_balance ?? row.available_balance);
    if (!amount || amount.cents <= 0) {
      continue;
    }
    const currency = amount.currency ?? row.currency ?? "USD";
    if (CASH_ROLES.has(row.role)) {
      cashByCurrency.set(
        currency,
        (cashByCurrency.get(currency) ?? 0) + amount.cents
      );
      addId(cashIdsByCurrency, currency, row.source_account_id);
    } else if (DEBT_ROLES.has(row.role)) {
      debtByCurrency.set(
        currency,
        (debtByCurrency.get(currency) ?? 0) + amount.cents
      );
      addId(debtIdsByCurrency, currency, row.source_account_id);
    }
  }
  for (const [currency, debtCents] of debtByCurrency) {
    const cashCents = cashByCurrency.get(currency) ?? 0;
    if (cashCents > 0) {
      mismatches.push({
        cash_in_cash_accounts: money(cashCents, currency),
        currency,
        debt_balance: money(debtCents, currency),
        kind: "debt_carried_beside_cash",
        // The balances and account_terms datasets share no join key, so the
        // rates are workspace-wide context to drill into, not attributes of
        // this candidate's accounts.
        workspace_observed_rates: observedRates
          .slice(0, MAX_CANDIDATES)
          .map((entry) => ({
            account: entry.account,
            [entry.rate.key]: entry.rate.value,
          })),
        rank_cents: debtCents,
        // Both sides of the mismatch keep bounded handles.
        source_ids: [
          ...(debtIdsByCurrency.get(currency) ?? []).slice(0, 3),
          ...(cashIdsByCurrency.get(currency) ?? []).slice(0, 2),
        ],
      });
    }
  }
}
mismatches.sort((a, b) => b.rank_cents - a.rank_cents);

const strip = ({ rank_cents: _rankCents, ...candidate }) => candidate;
process.stdout.write(
  `${JSON.stringify(
    {
      caveats,
      inputs: {
        balance_rows: balanceRows.length,
        files: inputPaths.length,
        term_rows: termRows.length,
        transactions: all.length,
      },
      lenses: {
        actual_mismatches: capped(mismatches.map(strip)),
        avoidable_outflows: capped(avoidable.map(strip)),
        expected_inflows: capped(expected.map(strip)),
        recurring_changes: capped(recurring.map(strip)),
      },
      schema: "candor-review-sweep/1",
      window: {
        end: windowEnd === undefined ? null : dayText(windowEnd),
        requested_end:
          requestedEnd === undefined ? undefined : dayText(requestedEnd),
        start: windowStart === undefined ? null : dayText(windowStart),
      },
    },
    null,
    1
  )}\n`
);
