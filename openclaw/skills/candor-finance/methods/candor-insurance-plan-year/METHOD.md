
# Insurance and plan-year analysis

Keep observed premiums and spending separate from policy terms and conditional
coverage scenarios.

## Datasets

- `transactions`
- `goals`

## Workspace resources

- Use the `notes` resource for linked Markdown context and follow-up.

## Non-goals

- Coverage or medical advice.
- Enrollment, cancellation, or claim submission.

## Method

- Identify the policy and plan year before aggregating costs.
- Separate premiums and observed spending from deductibles, limits, coverage,
  and renewal terms sourced from documents.
- Frame comparisons as conditional scenarios when utilization or coverage needs
  are uncertain.

## Evidence checklist

- Plan terms are current and attributable.
- Observed spending uses the correct plan-year window.

## Candor query recipes

- For observed plan-year cost, conditional comparisons, and renewal
  preparation, read [the executable workflows](references/workflows.md).
- Treat policy documents and authorized insurer records as the source for
  coverage terms and claim status; use Candor transactions only for observed
  cash movement.

## Caveats

- Transactions alone cannot establish coverage or claims adjudication.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Linked Markdown note with verified policy terms, caveats, or a revisit date.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded insurance
  or plan-year area grants task-scoped authority for the inspected, reversible
  Candor writebacks needed to finish it. Do not ask again for each record.
- Confirm choices that reflect the user's values separately. Coverage
  choices, accepted risk, and deductible tradeoffs encode the user's values, so
  ask rather than inferring them from claims history.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop before coverage conclusions without policy documents.
- Stop before enrollment, cancellation, or claim submission.
