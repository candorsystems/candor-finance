> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.


# Budgeting and cash flow

Use Candor facts and approved plan versions to model cash flow without choosing
the user's priorities or silently turning a scenario into a budget.

## Datasets

- `transactions`
- `balances`
- `budgets`
- `goals`

## Workspace resources

- Use `budgets` for user-approved allocation state.
- Use `notes` for material assumptions or timed follow-up that does not belong
  in the budget contract.

## Non-goals

- Choosing the user's priorities.
- Treating an unapproved scenario as a budget.

## Method

Choose comparison dates from the user's question. Spending and income changes
default to the last two complete UTC calendar months; supply both date ranges
to override them. Totals are not normalized rates. Budget averages divide the
observed baseline total by months with complete source coverage or observed
transactions; check the reported denominator and history coverage. Unspent
flexible and cushion allocations do not establish that cash is safe to spend.

- Confirm the period, account coverage, transfer treatment, and currencies.
- Separate income, expenses, transfers, refunds, debt payments, and one-time
  items before calculating recurring capacity.
- Compare observed facts with approved budget and goal versions. Present
  assumptions and scenarios rather than silently changing state.
- Revise an existing plan line by line with `budget.update` once the user
  approves the change; restate the whole plan with `budget.create` only when
  the plan itself is new. Budget status carries each line's spending, the
  month's pace against the plan, and unbudgeted categories.

## Evidence checklist

- Coverage and freshness are sufficient for the requested period.
- Transfers and refunds are not double-counted.
- All amounts retain exact currency units and a transaction basis.

## Candor query recipes

- For cash-flow reconstruction, sustainable-capacity scenarios, and budget
  proposals, read [the executable workflows](references/workflows.md).
- Inspect each dataset schema before relying on fields or filters, and paginate
  material transaction populations rather than treating the first page as the
  full period.

## Caveats

- A transaction sample is not a complete income statement when sources or dates
  are missing.
- Past spending does not reveal the user's values or preferred tradeoffs.

## Safe Candor writebacks

- Approved budget version.
- Approved goal version.
- Linked Markdown note for a decision summary or timed follow-up.

## Domain decisions

Observed spending is a baseline, not a desired budget. Propose exact amounts
and explain tradeoffs; save only the version the user has approved. Do not treat
a cleanup request as approval to change their spending priorities.

## Stopping conditions

- Stop and surface the gap when coverage, currency, or transfer classification
  would materially change the result.
- Stop before treating a draft scenario as an approved plan.
