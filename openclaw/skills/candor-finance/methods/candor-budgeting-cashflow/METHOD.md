
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

- Confirm the period, account coverage, transfer treatment, and currencies.
- Separate income, expenses, transfers, refunds, debt payments, and one-time
  items before calculating recurring capacity.
- Compare observed facts with approved budget and goal versions. Present
  assumptions and scenarios rather than silently changing state.

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

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Approved budget version.
- Approved goal version.
- Linked Markdown note for a decision summary or timed follow-up.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded budget or
  cash-flow area grants task-scoped authority for the inspected, reversible
  Candor writebacks needed to finish it. Do not ask again for each record.
- Confirm choices that reflect the user's values separately. A budget
  target, category priority, or accepted tradeoff encodes the user's values, so
  ask rather than inferring it from spending history.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop and surface the gap when coverage, currency, or transfer classification
  would materially change the result.
- Stop before treating a draft scenario as an approved plan.
