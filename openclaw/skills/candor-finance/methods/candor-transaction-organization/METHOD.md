
# Transaction organization

Prefer reversible one-record corrections until repeated, bounded evidence
justifies a broader normalization rule.

## Datasets

- `transactions`
- `rules`
- `actions`

## Workspace resources

- Use `corrections` for one-record interpretation, transaction splits for
  exact mixed purchases, and `rules` for repeated bounded meaning.
- Use `notes` only for material context or follow-up that is not typed
  transaction state.

## Non-goals

- Changing source-provider records.
- Inferring broad rules from a single ambiguous example.

## Method

- Read the transaction list before writing anything. Each row carries the
  provider's merchant name, the raw description, the source category, where
  the effective category came from, and the rules applied to it. The
  `unmatched` filter returns only the records no rule, correction, or split
  has reached, with a count per label, and returns nothing when there are
  none.
- When the user names what a merchant means, write one rule anchored on
  `merchant_name_contains`. A rule is declarative: while it is active it
  applies to every record it matches, past and future, pending and posted,
  refunds included, and disabling it undoes every application it made. Add
  `direction`, `account_role`, or an amount bound only when the meaning
  depends on it. A rule needs a subject: a merchant name, description,
  source classification, current category, or one account. Direction or an
  amount bound alone is refused.
- Creating the rule applies it in the background; rows update as it lands,
  and `rules.get` reports the walk's status and counts. Judge the rule from
  the rows it reached or from `rules.preview`, a read-only dry run that
  returns a sample of matching rows with the proposed change and a count per
  label over every match. A label that should not change means the anchor is
  too wide: disable the rule and write a narrower one, or add an exception.
- An exception is a rule with a smaller priority number than the rule it
  overrides. The default is 50 and a smaller number wins for the label,
  category, role, and review status; an exact correction beats every rule on
  those fields. Both rules stay active.
- On a later pass, read the whole unmatched list again rather than a date
  window, since a delayed sync can add older records; it stays short once the
  first pass is done. When the source category is right for a merchant that
  recurs, record it as a rule so the merchant stops reappearing.
- Use a one-record correction when the meaning belongs to that record, not
  the merchant.
- When a record reads wrong, open it. `rules_considered` on the transaction
  lists every active rule, whether it matched, which criterion failed,
  whether it applied, and why a match has not applied yet.
- Act on high-confidence, bounded interpretation inside the user's explicit
  maintenance scope. Exact or narrow evidence-backed corrections may use
  `agent_verified`; user-confirmed merchant meaning may use `user_approved`.

## Evidence checklist

- The transaction identity and proposed interpretation are explicit.
- The rule's rows or preview sample were read, and any row that should not
  change was named.

## Candor query recipes

- For one-record corrections, splits, merchant rules, and explaining a
  record, read [the executable workflows](references/workflows.md).

## Caveats

- Bank-side records such as transfers, payroll, and card payments carry no
  merchant name, and their descriptions embed amounts or store numbers, so
  anchor those on a fragment that stays the same.
- Provider categories are evidence, not user confirmation.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Approved transaction correction.
- Approved split.
- Approved normalization rule.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded
  transaction set grants task-scoped authority for inspected, reversible
  corrections and rules. Do not ask the user to approve the same interpretation
  record by record.
- Confirm choices that reflect the user's values separately. How the user
  wants their money grouped, and which distinctions matter to them, encode
  their values, so ask rather than imposing a scheme from merchant data.
- Ask when the intended category or meaning is missing, the affected set is
  broad or unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop before a rule whose matches you have not read when the anchor could
  reach unrelated activity.
- Stop before overwriting a conflicting approved interpretation.
