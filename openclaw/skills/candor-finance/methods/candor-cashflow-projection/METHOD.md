
# Cash-flow projection

Project forward only as far as the evidence supports, and keep a baseline
projection separate from any hypothetical the user is considering.

`candor-budgeting-cashflow` reconstructs what already happened. This skill
looks ahead.

## Datasets

- `balances`
- `recurring`
- `transactions`
- `accounts`
- `budgets`
- `goals`
- `coverage`
- `account_terms`

## Workspace resources

- Use `notes` for one-off expectations the user confirms, such as a bonus or a
  planned large purchase, so the next projection can reuse them.

## Non-goals

- Presenting a projection as a guarantee or a commitment.
- Letting a hypothetical scenario become the baseline or approved state.
- Projecting past the horizon the recurring and liability evidence supports.

## Method

- Establish the horizon and the accounts in scope before calculating anything.
  Confirm currencies and coverage first.
- Start from current balances, then layer committed obligations: recurring
  items with a confirmed cadence, pending or future-dated transactions, and
  liability due dates.
- Project only recurring items whose effective status is `active` or `changed`.
  The recurring view deliberately includes policy-backed `stopped` items, so
  summing the whole list revives cancelled subscriptions as future cash flows.
- Take expected income from recurring inflows. Do not average historical
  deposits into forecast income unless the user confirms that basis.
- Keep committed obligations separate from discretionary spending, and say
  which is which. Only the committed side is evidence-backed.
- Prevent double counting. A recurring item already showing as a pending or
  future-dated transaction is one obligation, not two.
- Apply each leg of an internal transfer to its own account. A transfer nets to
  zero across the household but still moves one account's balance, so netting
  it out of a per-account path can hide an overdraft.
- Read each recurring item's `direction` and `account_identity_id` rather than
  inferring the sign or the affected account from merchant text.
- Derive occurrence dates from `last_seen_at` and the cadence rather than
  guessing them, stepping monthly and annual cadences by calendar month and
  year rather than by fixed days. Adding 30 days to January 31 skips February
  and drops that month's bill. An irregular or unknown cadence has no reliable
  interval, so report those obligations as undated and say that dated ones are
  derived estimates.
- Read saved notes for expectations inside the horizon. A planned purchase or
  expected bonus from an earlier run is not in recurring items.
- Report the lowest projected balance in the horizon and the date it occurs.
  That is usually the answer behind the question actually asked.

## Evidence checklist

- Recurring and liability coverage is deep enough that the projection is not
  dominated by obligations Candor cannot see.
- Every projected obligation traces to a recurring item, a pending transaction,
  or a user-confirmed expectation.
- Bounded reads were followed to completion, because an omitted obligation
  always makes a projection optimistic. Balances are bounded too, so the row
  count was reconciled against the known account count before projecting.
- Saved expectations carry a `revisit_at`, since the recovery read is a
  revisit-time window and an undated note never returns.
- Liability due dates and minimums came from effective account terms. Conflicts,
  stale values, and uncovered accounts remain explicit.
- Transfers, refunds, and reversals are not counted as income or spend.
- Exact currency units are preserved. Mixed currencies are converted only with
  a stated rate and date, or reported separately.

## Candor query recipes

- For a baseline projection, a shortfall check, and a scenario comparison, read
  [the executable workflows](references/workflows.md).
- Check freshness before projecting. A projection built on stale balances
  misleads even when the arithmetic is correct.
- When the user names a one-off amount or date, record it as a linked timed
  note rather than leaving it as chat-only context.

## Caveats

- A projection is a bounded estimate from known obligations, not a forecast of
  the user's behavior.
- Irregular income, variable bills, and discretionary spending degrade accuracy
  quickly as the horizon lengthens.
- Missing accounts make a projection optimistic, because unmodelled obligations
  never appear in it.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Linked Markdown note recording the horizon, assumptions, projected low point,
  and revisit date.
- User-approved budget or goal version when a projection changes an approved
  plan.
- Bounded recurring corrections within the user's explicit maintenance scope.

## Approval boundaries

- An explicit request to fix, correct, or clean up recurring items grants
  task-scoped authority for the inspected, reversible writebacks needed to make
  the projection accurate. Do not ask again for each record.
- Confirm choices that reflect the user's values separately. What counts as
  an acceptable buffer, which spending is discretionary, and how much shortfall
  risk is tolerable encode the user's values, so ask rather than assuming them.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- Transfers, payments, purchases, cancellations, and applications are actions
  to take rather than records to write, and each needs authority you can
  recover from your own context or a fresh ask.

## Stopping conditions

- Stop and report the gap when recurring or liability coverage is too thin to
  support the requested horizon.
- Stop before presenting a projection as a guarantee of what will happen.
- Stop before acting on a projected shortfall. Surface it and let the user
  decide.
