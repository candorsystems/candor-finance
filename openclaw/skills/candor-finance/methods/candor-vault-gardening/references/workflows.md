# Vault-gardening workflows

## Select a bounded maintenance pass

1. Open the workspace and inspect quality signals:

   ```sh
   candor open
   candor coverage get --reason "Inspect record coverage before maintenance" --task-key TASK_KEY
   candor changes list --limit 100 --reason "Inspect recent factual changes affecting record quality" --task-key TASK_KEY
   candor notes list --due --limit 100 --reason "Recover due record-maintenance follow-up" --task-key TASK_KEY
   candor actions list --limit 100 --reason "Recover recent record-maintenance decisions" --task-key TASK_KEY
   ```

2. Inspect candidate surfaces only as relevant:

   ```sh
   candor recurring list --status candidate,active --limit 100 --reason "Inspect unresolved recurring candidates" --task-key TASK_KEY
   candor rules list --limit 100 --reason "Inspect active transaction interpretation rules" --task-key TASK_KEY
   candor corrections list --limit 100 --reason "Inspect existing transaction corrections" --task-key TASK_KEY
   candor transactions list --since START --until END --limit 100 --reason "Inspect bounded transaction-quality issues" --task-key TASK_KEY
   ```

   Each rule reports `applied_last_30_days` and `last_applied_at`. A rule
   that used to match and now reaches nothing usually means the merchant
   renamed itself or the connection was replaced; read the merchant's recent
   rows before deciding whether to replace or disable it.

3. Rank issues by how much they distort later analysis, their evidence quality,
   affected scope, reversibility, and dependency. Do not manufacture a priority
   from one confidence field. Resolve financial role before cadence: repeated
   transfers, refunds, and debt payments are not recurring expenses merely
   because their dates form a pattern.
4. Choose one explicit boundary: account, merchant, period, recurring series,
   or interpretation class.

Complete when the pass can be reviewed end to end.

## Apply the narrowest repair

For one transaction, inspect effective state and use a correction or exact
split. For a recurring series, inspect supporting transactions before setting
`active`, `stopped`, or `dismissed` with `candor recurring update`. For
repeated transaction meaning, inspect matches and counterexamples before
creating a rule.

Use `dismissed` when the candidate is not a recurring expense or bill,
including a role-backed transfer, refund, or debt payment. This does not deny
that the underlying activity repeats; it keeps the series out of the schedule
and the commitment totals.

Representative correction flow:

```sh
candor transactions get TRANSACTION_ID --reason "Inspect the effective record before maintenance" --task-key TASK_KEY
candor corrections list --transaction TRANSACTION_ID --limit 100 --reason "Inspect existing interpretations before maintenance" --task-key TASK_KEY
candor corrections create TRANSACTION_ID --category CATEGORY --reason "Apply the bounded verified record repair" --task-key TASK_KEY --parent-action ACTION_ID
candor transactions get TRANSACTION_ID --reason "Verify the effective repaired record" --task-key TASK_KEY
```

Representative rule flow:

```sh
candor transactions list --unmatched --limit 100 --reason "Read the records no rule has reached" --task-key TASK_KEY
candor rules create --name "MERCHANT is CATEGORY" --match-merchant-contains MERCHANT --set-category CATEGORY --basis-reason "Every MERCHANT record inspected in this pass is CATEGORY." --reason "Record the merchant's meaning" --task-key TASK_KEY
candor rules get RULE_ID --reason "Read how far the rule has applied" --task-key TASK_KEY --parent-action ACTION_ID
```

A rule applies to every record it matches, past and future, in the
background; there is no date window and no apply step. Read the merchant's
rows or a preview sample, and disable the rule to undo all of it.

Record the correction id, rule id, split, or recurring-policy history needed
for recovery. Never infer a broad preference from cleanup scope.

## Verify the pass and recover mistakes

1. Re-query every affected effective record and compare the actual count and
   meaning with the rows you read before writing.
2. Inspect actions under the task key so every root and continuation is
   attributable.
3. If the after-state exceeds scope or changes the wrong meaning, use the
   corresponding correction, split, rule, or recurring-policy revert command,
   then independently verify restored state.
4. Persist a note only for a material issue whose answer arrives later. The note
   must carry the exact baseline, bounded recipe, outcome meanings, and revisit
   time.

Complete when the pass has a verified result, a recovery path, and an explicit
list of records intentionally left unresolved.
