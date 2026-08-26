
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

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Linked Markdown note with the source, caveat, or follow-up date.
- Approved reimbursement or contribution goal.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded benefits
  or reimbursement area grants task-scoped authority for the inspected,
  reversible Candor writebacks needed to finish it. Do not ask again for each
  record.
- Confirm choices that reflect the user's values separately. An election
  amount, priority, or accepted tradeoff encodes the user's values, so ask
  rather than inferring it from the data.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop before tax conclusions when plan documents or eligibility facts are
  missing.
- Stop before changing benefit elections or submitting reimbursement.
