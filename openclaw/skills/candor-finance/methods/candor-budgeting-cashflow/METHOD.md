
# Budgeting and cash flow

Use Candor facts and saved plan versions to model cash flow without choosing
the user's priorities or saving a scenario the conversation has not settled on.

## Datasets

- `transactions`
- `balances`
- `budgets`
- `goals`

## Workspace resources

- Use `budgets` for the user's saved allocation state.
- Use `notes` for material assumptions or timed follow-up that does not belong
  in the budget contract.

## Non-goals

- Choosing the user's priorities.
- Saving a scenario you are only exploring as the user's budget.

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
- Compare observed facts with the current budget and goal versions. Present
  scenarios you are only exploring as scenarios; save the plan the person
  asks for, and say what you saved.
- Revise an existing plan line by line with `budget.update` once the
  conversation settles the change; restate the whole plan with `budget.create`
  only when the plan itself is new. Budget status carries each line's
  spending, the month's pace against the plan, and unbudgeted categories.

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
- Past spending is where a budget starts, not a statement of the user's
  values; their reactions to the starting split say what to change.

## Safe Candor writebacks

- Saved budget version.
- Saved goal version.
- Linked Markdown note for a decision summary or timed follow-up.

## Domain decisions

Observed spending is the starting split. When the person wants a plan to hold
to, with or without a total, or is still working one out with you, save a
budget drafted from their records that fits what they said, without waiting
for a yes to each line: say plainly that it is a starting split from their
records, and adjust lines as they react. You maintain the budget from then on.
Ask only when their intent is genuinely unclear and the choice matters. Use
only amounts the user gave or the records support, and do not save a budget
nobody asked for. Do not treat a cleanup request as a decision to change their
spending priorities.

## Stopping conditions

- Stop and surface the gap when coverage, currency, or transfer classification
  would materially change the result.
- Stop before saving a scenario you are only exploring as the user's plan.
