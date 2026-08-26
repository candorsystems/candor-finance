
# Tax preparation

Build a bounded, auditable evidence packet. Distinguish observed financial
activity, user-supplied purpose, and professional tax conclusions.

## Datasets

- `transactions`
- `rules`
- `coverage`
- `actions`

## Workspace resources

- Use `corrections` and `rules` for reversible factual organization.
- Use `notes` for missing substantiation, user context, and preparer questions.
- Export is a user-only custody action in the authenticated Candor web app.

## Non-goals

- Determining deductibility, eligibility, basis, filing status, or tax owed.
- Inventing business purpose, charitable status, receipt contents, or allocation.
- Filing a return or sending records to a preparer without separate authority.

## Method

- Bound the tax year, jurisdictions if material, accounts, and requested output
  before collecting records.
- Inspect coverage and freshness. Call out accounts or periods the workspace
  cannot substantiate.
- Read observable periods from coverage records. The earliest or latest
  transaction in a candidate set is activity evidence, not a coverage boundary.
- Gather candidate activity by exact date, amount, merchant, existing category,
  and source. Candidate means review-worthy, not deductible.
- Separate transaction facts from the user's statement of purpose and from any
  tax professional's classification. Preserve each with attribution.
- Correct factual organization only when the intended interpretation is known.
  Prefer single-record corrections or splits; promote a repeated pattern to a
  rule only after reviewing matches and counterexamples.
- Track missing receipts, ambiguous mixed-use purchases, reimbursements,
  refunds, transfers, and duplicates as exceptions rather than forcing them
  into a tax category.
- Prepare and independently verify only the requested, current canonical
  record, then direct the user to the Export action in authenticated Candor
  Settings.

## Evidence checklist

- Tax year, account scope, coverage, and missing periods are explicit.
- Candidate rows retain exact amount, date, merchant, currency, and attribution.
- Refunds, reimbursements, transfers, duplicates, and mixed-use activity were
  tested.
- Every correction or rule has a bounded before-and-after audit trail.

## Candor query recipes

- For scoping, candidate review, organization, and the final export handoff, read
  [the executable workflows](references/workflows.md).
- Load `candor-transaction-organization` when applying corrections, splits, or
  reusable rules.

## Caveats

- Merchant name and spending category do not establish tax treatment.
- Candor records may not include receipts, business purpose, entity status,
  mileage, lot basis, or other substantiation a preparer needs.

## User-facing answer

Summarize the covered year, totals only where the grouping is defensible,
material candidates, exceptions, and missing evidence. Call items "candidates"
or "records to review," not deductions. Do not expose record ids, command
names, or workspace mechanics unless the user asks how the packet was built.

## Safe Candor writebacks

- Bounded transaction correction or exact split.
- Previewed and reversible normalization rule.
- Linked note for missing substantiation or preparer questions.
- Records ready for the user to export from Candor Settings.

## Approval boundaries

- An explicit request to clean up or organize a bounded tax-year record set
  grants task-scoped authority for inspected, reversible internal organization.
- Confirm choices that reflect the user's values separately. Which factual
  groupings and distinctions matter to the user encode the user's values, so
  ask rather than imposing a tax-preparation scheme.
- Ask when business purpose, allocation, category meaning, or the intended
  affected set is missing.
- Direct the user to Candor Settings when they request the export. Never
  generate, inspect, send, upload, file, or share the exported file through the
  agent surface.

## Stopping conditions

- Stop before assigning legal tax treatment or inventing substantiation.
- Stop before a broad rule whose matches and exclusions are not reviewable.
- Stop before the web handoff when material corrections remain unverified.
