> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.


# FSA, HSA, and employer benefits

Use medical spending only as a cue to investigate benefits. Verify current plan
and jurisdictional rules before applying them to the user.

## Datasets

- `transactions`
- `accounts`
- `goals`

## Workspace resources

- Use the `notes` resource for linked Markdown context and follow-up.

## Non-goals

- Tax or medical advice.
- Submitting claims or changing benefit elections.

## Method

- Use medical spending only as a cue to inspect available benefits.
- Identify the plan year, account type, eligibility, contribution limits,
  carryover or grace rules, and reimbursement deadline from authoritative
  sources.
- Separate general rules from facts confirmed to apply to the user.

## Evidence checklist

- Medical category evidence was checked for misclassification.
- External benefit rules include jurisdiction, effective date, source, and applicability.

## Candor query recipes

- For plan-year reviews, reimbursement gaps, and contribution scenarios, read
  [the executable workflows](references/workflows.md).
- Discover health-related categories from the user's data before filtering, and
  verify eligibility from current plan and government sources rather than from
  transaction labels.

## Caveats

- Expense categorization does not establish tax eligibility.
- Tax and benefits rules change and may depend on employer plan documents.

## Safe Candor writebacks

- Linked Markdown note with the source, caveat, or follow-up date.
- Approved reimbursement or contribution goal.

## Domain decisions

Recommend elections using verified eligibility, limits and the user's needs.
An election amount or accepted tradeoff becomes approved state only after the
user chooses it; external enrollment and claims need their own authority.

## Stopping conditions

- Stop before tax conclusions when plan documents or eligibility facts are
  missing.
- Stop before changing benefit elections or submitting reimbursement.
