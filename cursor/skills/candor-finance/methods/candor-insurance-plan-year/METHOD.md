> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.


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

## Safe Candor writebacks

- Linked Markdown note with verified policy terms, caveats, or a revisit date.

## Domain decisions

Recommend coverage tradeoffs from verified policy terms and the user's needs.
Do not infer their accepted risk or deductible preference from claims history
or represent a proposed policy choice as approved.

## Stopping conditions

- Stop before coverage conclusions without policy documents.
- Stop before enrollment, cancellation, or claim submission.
