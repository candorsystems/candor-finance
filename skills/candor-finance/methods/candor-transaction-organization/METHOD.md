> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.


# Transaction organization

Implement established transaction meaning with the smallest reversible change.
Use `candor-vault-gardening` when the task is to discover what needs maintenance;
this method owns correction, split and rule mechanics. Repeated, bounded evidence
can justify a reusable rule, subject to the user's requested review boundary.

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
- On a later pass, inspect `new_since_checkpoint.transactions.page` on open.
  Follow its exact continuation before acknowledging. `unmatched` means no
  rule, correction, or split, not an unresolved category. Accept an adequate
  source category quietly; do not create a rule just to clear the list.
  To narrow the same delta, preserve `changed_after` and `changed_through`
  and use `category_provenance=unclassified` or `source_only_or_missing`.
  Source-only is provenance, not a request for the user's attention.
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

## Safe Candor writebacks

- Approved transaction correction.
- Approved split.
- Approved normalization rule.

## Domain decisions

A cleanup request covers evidence-backed corrections and rules unless the user
reserves review of them. Establish merchant meaning and inspect the entire rule
scope before applying it; do not encode a new grouping preference from bank text.

## Stopping conditions

- Stop before a rule whose matches you have not read when the anchor could
  reach unrelated activity.
- Stop before overwriting a conflicting approved interpretation.


Category and financial role are independent. Set `set_cashflow_role` explicitly
when a rule should change income, expense, transfer, debt-payment, or refund
treatment. `set_category` only changes grouping. With no role override, Candor
uses Plaid classification. A low-confidence compatibility fallback can preserve
recognized source-only import categories, but it is not a substitute for agent
curation. Establish the role through a correction or rule when source evidence
is missing or the financial meaning needs correction.
