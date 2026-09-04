# Transaction-organization workflows

## Correct one transaction

1. Inspect the canonical transaction, existing correction, merchant neighbors,
   and related actions:

   ```sh
   candor transactions get TRANSACTION_ID --reason "Inspect the transaction before correction" --task-key TASK_KEY
   candor corrections list --transaction TRANSACTION_ID --limit 100 --reason "Inspect existing transaction corrections" --task-key TASK_KEY
   candor transactions split get TRANSACTION_ID --reason "Inspect any existing split" --task-key TASK_KEY
   candor actions list --limit 100 --reason "Recover transaction interpretation history" --task-key TASK_KEY
   ```

2. Ask for the factual interpretation only when it is missing. Merchant text
   and provider category are evidence, not user confirmation.
3. Determine whether the user's current task already grants authority. An
   explicit request to handle, fix, clean up, or organize this bounded area
   covers the inspected reversible correction; do not ask again.
4. Verify the exact before/after effective category, cash-flow role, label,
   tags, and review state. Surface it to the user when it materially clarifies
   the work, not as a mandatory approval ceremony.
5. Inspect the current command contract and create only the authorized fields:

   ```sh
   candor catalog describe corrections.create --json
   candor corrections create TRANSACTION_ID --category CATEGORY --reason "Apply the user-approved transaction correction" --task-key TASK_KEY --parent-action ACTION_ID
   ```

6. Re-read the transaction and preserve the action that changed it and the prior value for
   reversal.

Complete when the effective record matches the user's confirmed interpretation
and no unrelated field changed.

## Split a transaction

1. Inspect the transaction and any existing split.
2. Ask the user to define each part's exact amount, currency, category or role,
   and rationale. Validate that parts reconcile exactly to the source amount
   under the current money contract.
3. Inspect `transactions.split.set`, draft the input file, and show the exact
   split for approval.
4. Apply the split:

   ```sh
   candor transactions split set --file SPLIT.json --reason "Store the user-approved transaction split" --task-key TASK_KEY --parent-action ACTION_ID
   ```

5. Re-read the split and downstream effective transaction view. Use
   `transactions.split.revert` if the user later approves reversal.

Complete when the parts reconcile exactly and the stored split matches the
approved draft.

## Make a merchant mean something

1. Read what is unmatched and what the vault already calls things:

   ```sh
   candor transactions list --unmatched --limit 1000 --reason "Read the records no rule has reached" --task-key TASK_KEY
   candor transactions list --merchant MERCHANT --limit 100 --reason "Read every record for this merchant" --task-key TASK_KEY
   candor data query categories --since START --until END --reason "Read the categories the vault already uses" --task-key TASK_KEY
   candor rules list --limit 100 --reason "Inspect existing interpretation rules" --task-key TASK_KEY
   ```

   Each row shows `merchant_name`, `description`, `source_category`,
   `category_provenance`, and `applied_rules`. The unmatched read adds
   `label_counts` over the returned rows, so read the full first pass at the
   1000 ceiling and work from the top: one rule per label covers the most
   rows. On a later pass read the whole unmatched list again; it is short
   once the first pass is done, and `since` filters on the transaction date,
   so a delayed sync or a backfill can add older records that a date bound
   would hide. When the source category is right for a merchant that recurs,
   say so with a rule that sets that same category: the merchant stops
   reappearing and the meaning survives a provider recategorization. The
   categories read says which names exist only because a rule or correction
   created them; reuse an existing name before inventing one, since budget
   lines and later reads join on it.

2. Write one rule anchored on the merchant name. It applies to every record
   it matches, past and future, pending and posted, refunds included; do not
   add `direction` or an account bound unless the meaning depends on it.

   ```sh
   candor rules create --name "MERCHANT is CATEGORY" --match-merchant-contains MERCHANT --set-category CATEGORY --authority user_approved --basis-reason "The user said MERCHANT is CATEGORY." --reason "Record the user's meaning for this merchant" --task-key TASK_KEY
   ```

   Use `user_approved` when the user supplied the meaning and
   `agent_verified` when inspected evidence did. When the meaning depends on
   which kind of account the record posted to, such as rent paid through a
   card, add the `account_role` criterion; the role survives a reconnect and
   an account id does not. A rule with no subject, such as every outflow over
   an amount, is refused: anchor it on a merchant, description, source
   classification, current category, or one account.

3. Read what the rule reached. The create response hands back this command:

   ```sh
   candor rules get RULE_ID --reason "Read how far the rule has applied" --task-key TASK_KEY --parent-action ACTION_ID
   ```

   `materialization.status` walks pending, applying, applied, and
   `applied_count` says how many records it reached; a large vault takes a
   few seconds. A nonzero `skipped_count` names records the rule matched
   but could not reach because they already carry the most applications a
   record can hold; those rows keep their current fields. To judge the anchor, read the merchant's rows again or run
   the dry run:

   ```sh
   candor rules preview RULE_ID --reason "Read a sample of what the rule reaches" --task-key TASK_KEY --parent-action ACTION_ID
   ```

   `matched_count` is every record the rule matches. `matches` is a sample
   of up to 25 rows that covers each distinct label first, with the label,
   description, current category, and `proposed` change;
   `match_label_counts` counts every match by label, so a second merchant
   hiding behind the anchor shows up as its own label. Judge the rule from
   the sample and the label counts; there is no need to read every record.
   `scan_truncated` means the dry run stopped before the oldest record and
   the counts are lower bounds; the rule itself still applies to all of them.

   A row or label that should not change means the anchor is too wide.
   Either disable this rule, which reverts every application it made, and
   create a narrower one, or write an exception and leave both active. An
   exception is a rule with a smaller `priority` number than the rule it
   overrides: the default is 50 and a smaller number wins for the label,
   category, role, and review status, so give the exception 10. Tags are
   added and removed in application order instead. An exact correction beats
   every rule on those same fields. A rule cannot be edited in place.

4. To undo a rule, disable it:

   ```sh
   candor rules disable RULE_ID --reason "The anchor reached a second merchant" --task-key TASK_KEY --parent-action ACTION_ID
   ```

   Disabling reverts every application in the background and `rules get`
   reports `reverted`. To undo the rule on one record only, revert that
   application with `rules revert APPLICATION_ID`; the drilldown's
   `applied_rules` carries the id. That record stays out of the rule for
   good, through later syncs, so use it for a deliberate exception and a
   correction when the record needs a different meaning.

Complete when `rules get` reports applied, the unmatched read no longer lists
the merchant, and the rows you read carry the meaning the user named.

## Explain a record that reads wrong

```sh
candor transactions get TRANSACTION_ID --reason "Explain the record's category" --task-key TASK_KEY
```

`effective_category.provenance` says whether a rule, the record itself, or
the source category supplied the value. `rules_considered` lists every active
rule with `matched`, `failed_criteria`, `applied`, and `not_applied_reason`:
`pending` means the rule matches and its background walk has not reached this
record yet, so read `rules get` for its progress; `reverted` means an earlier
application was undone on this record and the rule will not apply to it
again: `reverted_at` gives the moment, so read the actions around it for the
reason and leave a deliberate exception alone. A rule whose `status` is `disabled` was switched
off on purpose; do not recreate it for one record. When two applied rules
disagree, the one with the smaller `priority` number is the value the record
shows; when their priorities tie, the newer rule wins, so disable the one
that should not apply rather than guessing. Otherwise fix the rule; do not
write a second rule for the same merchant. When `truncated` is true the
workspace has more active rules than one explanation lists; read the rules
list for the merchant before concluding that no rule covers the record.
