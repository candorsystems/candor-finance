
# Cash, liquidity, and yield

Separate visible balances and cash needs from changing product rates and from
the user's preferences about safety, access, and complexity.

## Datasets

- `accounts`
- `balances`
- `transactions`
- `recurring`
- `budgets`
- `goals`
- `coverage`
- `account_terms`

## Workspace resources

- Use `notes` for sourced rate context and timed rechecks.

## Non-goals

- Moving money, opening an account, or choosing a product for the user.
- Treating every visible cash balance as available or idle.

## Method

- Confirm account ownership, role, currency, balance time, and data coverage.
- Estimate near-term needs and approved reserves before labeling cash idle.
- Read deposit APY and account constraints from effective account terms where
  present. Research missing or stale terms from authoritative sources at
  decision time.
- Compare scenarios after fees, access constraints, insurance or protection
  limits, taxes when material, and operational friction.

## Evidence checklist

- Visible cash and unavailable or excluded cash are separated.
- Near-term obligations, approved goals, and reserve assumptions are explicit.
- Every rate has field-level provenance, an effective or retrieval date,
  applicability, and a caveat.

## Candor query recipes

- For a liquidity baseline, yield comparison, or reserve check, read
  [the executable workflows](references/workflows.md).
- Use the debt skill separately when debt terms materially affect the tradeoff.

## Caveats

- Candor balances may omit institutions or restrictions and can become stale.
- Rates, insurance limits, eligibility, tax treatment, and withdrawal terms can
  change; search current authoritative sources instead of relying on memory.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Approved reserve or savings goal.
- Curated terms import or approved term assertion for the user's own account.
- Linked Markdown note for external market options and a revisit date.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded cash or
  yield area grants task-scoped authority for the inspected, reversible Candor
  writebacks needed to finish it. Do not ask again for each record.
- Confirm choices that reflect the user's values separately. A target
  buffer, accepted liquidity risk, or institution preference encodes the user's
  values, so ask rather than inferring it from balances.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- Transfers, account openings or closures, purchases, and applications are
  actions to take rather than records to write, and each needs authority you
  can recover from your own context or a fresh ask.

## Stopping conditions

- Stop when incomplete coverage or uncertain near-term needs could make the
  proposed amount unavailable.
- Stop before selecting a product or moving money without explicit authority.
