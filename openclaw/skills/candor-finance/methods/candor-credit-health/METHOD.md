
# Credit health

Establish the observed facts a credit decision depends on: balances against
limits, payment timing, and interest exposure. Candor holds no bureau data, so
never present a score, a score change, or bureau contents as observed.

## Datasets

- `accounts`
- `balances`
- `account_terms`
- `transactions`
- `coverage`

## Workspace resources

- Route verified terms into typed account-terms state (curated import or a
  user-approved assertion); use `notes` for unstructured context, paydown
  baselines, and timed re-checks.

## Non-goals

- Claiming to know the user's credit score, report contents, or exact scoring
  outcomes.
- Making a payment, transfer, dispute, application, or limit request.
- Treating a generic scoring rule as a promise about this user's number.

## Method

- Inventory revolving accounts with balance, limit, currency, and freshness.
  Compute utilization per card and overall only from accounts whose balance
  and limit are both observed; name the cards excluded for a missing limit.
  Overall utilization is total balance divided by total limit over those same
  accounts, per currency, never an average of per-card ratios. Clamp a credit
  balance to zero per card first; an overpaid card cannot erase another
  card's usage.
- Read payment terms from observed account terms: APR, minimum payment, next
  due date, and overdue flags. Terms Candor marks unknown stay unknown until
  verified from an authoritative issuer source.
- Distinguish the reported balance from the statement balance. A mid-cycle
  payment changes what a statement will report; say which figure a claim uses.
- When ranking paydown options, show exact amounts in each account's own
  currency: what bringing utilization strictly below a stated threshold
  requires, rounded up to the currency's smallest unit so the target is
  actually crossed, plus minimums and due-date order. Interest at the observed APR is an estimate, not a
  statement figure: issuers accrue on daily balances and rate categories, so
  label it as an estimate and state its assumptions. General scoring
  guidance, when the user asks for it, needs a current authoritative source
  and stays labeled as general rather than personal prediction.
- After an authorized payment happens outside Candor, verify the posted
  result from new balance evidence before calling the exposure changed.

## Evidence checklist

- Utilization claims name balance, limit, currency, and observation time.
- Interest and due-date claims cite observed terms or a verified source,
  never an assumed cycle.
- Excluded or stale accounts are named rather than silently dropped.

## Candor query recipes

- For the utilization snapshot, paydown sequencing, and post-payment
  verification, read [the executable workflows](references/workflows.md).

## Caveats

- Reported balances lag mid-cycle activity; freshness bounds every claim.
- Scoring models weigh utilization, but Candor evidence cannot say what this
  user's score is or will be.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Lead with the cards that matter now: balance against limit, the exact amount
in that account's currency to reach a stated threshold, the next due date,
and estimated interest at the observed rate, labeled as an estimate. State
uncertainty and the freshness of each figure. Do not
expose Candor, command names, status literals, provider-record mechanics, or
other workspace implementation details unless the user asks how the evidence
was obtained.

## Safe Candor writebacks

- Curated account-terms import for source-backed statement facts, or a
  user-approved account-terms assertion, so verified terms become typed
  evidence rather than note prose.
- Linked Markdown note with unstructured context, a paydown baseline, or a
  timed re-check for an expected posted payment.

## Approval boundaries

- An explicit request to review or organize a bounded credit area grants
  task-scoped authority for the inspected, reversible Candor writebacks needed
  to finish it. Do not ask again for each record.
- Which balance to pay first and how much to keep liquid encode the user's
  values and constraints; confirm rather than inferring them from balances.
- Payments, transfers, limit requests, disputes, and applications are external
  actions, and each needs authority you can recover from your own context or
  a fresh ask.

## Stopping conditions

- Stop before presenting a paydown plan as agreed when the user has not
  chosen among the stated tradeoffs.
- Stop before any external payment, application, or issuer contact.
- Stop short of score predictions; state the observed facts and their sourced
  general direction instead.
