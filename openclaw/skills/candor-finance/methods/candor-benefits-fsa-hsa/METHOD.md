
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
- Reimbursement or contribution goal the conversation settled.

## Domain decisions

Recommend elections using verified eligibility, limits and the user's needs.
Save a contribution goal once the conversation settles the amount, using only
figures the user gave or the records support, and tell them what you saved.
External elections, enrollment and claims need their own authority.

## Stopping conditions

- Stop before tax conclusions when plan documents or eligibility facts are
  missing.
- Stop before changing benefit elections or submitting reimbursement.
