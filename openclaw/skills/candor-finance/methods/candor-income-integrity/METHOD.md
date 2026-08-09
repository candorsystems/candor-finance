
# Income integrity

Establish whether expected income arrived, changed, or remains unresolved
without counting every inflow as earnings or inventing payroll terms.

## Datasets

- `transactions`
- `recurring`
- `coverage`
- `accounts`
- `changes`
- `actions`

## Workspace resources

- Use `notes` for a linked re-check when the expected outcome is not yet
  observable.

## Non-goals

- Inferring gross pay, deductions, hours, or employer obligations from deposits.
- Treating transfers, refunds, reimbursements, or sale proceeds as earnings.
- Contacting an employer, payer, bank, or benefits administrator without
  authority for that action.

## Method

- Establish the expected payer, destination account, amount semantics, date or
  cadence, and whether the user means gross pay, net deposit, or another kind
  of income.
- Inspect coverage and freshness before making a negative claim. Search every
  plausible account and merchant-description variant in the observable window.
- Read that window from coverage records. The earliest or latest matching
  deposit is activity evidence, not a coverage boundary.
- Use `direction: "inflow"` and `cashflow_role: "income"` to form the initial
  income-shaped set. Explicitly test transfers, refunds, reimbursements,
  interest, and one-off credits as alternate explanations.
- Compare exact deposits across enough prior cycles to establish a baseline.
  Describe a change from observed net deposits, not from an assumed salary or
  contractual entitlement.
- Look for split deposits, shifted posting dates, holidays, pending activity,
  reversals, and account changes before calling income missing or reduced.
- If the expected observation date has not passed or coverage cannot confirm
  the outcome, create a re-check note with the exact baseline and search recipe.

## Evidence checklist

- Payer variants, destination accounts, comparison window, and freshness were
  inspected.
- The conclusion distinguishes income from transfer and refund cashflow roles.
- A change claim names the exact prior and current deposits and dates.
- An unresolved outcome has a timed, self-contained re-check note.

## Candor query recipes

- For baseline, exception, and re-check workflows, read
  [the executable workflows](references/workflows.md).
- Inspect exact transactions behind any recurring candidate before relying on
  its predicted date or average amount.

## Caveats

- A bank deposit usually shows net cash received, not compensation terms,
  withholding, benefit deductions, hours, or payroll correctness.
- Posting date and employer pay date can differ.

## User-facing answer

State what arrived, what did not, the exact amount and date comparisons, and
what uncertainty remains. Speak about the payer and accounts; do not expose
dataset names, cashflow-role literals, record ids, or note mechanics unless the
user asks how the check was performed.

## Safe Candor writebacks

- Linked timed note for a missing, pending, or not-yet-observable payment.
- Reversible transaction correction or rule only when the user supplied the
  factual meaning and asked to organize it.

## Approval boundaries

- Investigating expected income needs no state-changing approval.
- An explicit request to fix or organize a bounded misclassification grants
  task-scoped authority for the inspected, reversible internal correction.
- Confirm choices that reflect the user's values separately. Which income
  distinctions should drive planning encode the user's values, so ask rather
  than inferring them from deposit cadence.
- Ask before encoding a reusable payer rule when the intended meaning is not
  explicit or the affected set is broad.
- External messages, payroll inquiries, disputes, and account changes need
  authority for those actions separately.

## Stopping conditions

- Stop short of "missing" when coverage or the expected observation date is
  insufficient; persist the next check instead.
- Stop before attributing a smaller deposit to taxes, hours, benefits, or an
  employer error without authoritative evidence.
