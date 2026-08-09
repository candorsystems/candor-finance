# Trial-watchdog workflows

## Capture the initial baseline

1. Inspect the workspace, coverage, and exact merchant evidence:

   ```sh
   candor open
   candor coverage get --reason "Verify coverage for the trial payment account" --task-key TASK_KEY
   candor transactions list --merchant MERCHANT --since START --until END --limit 100 --reason "Inspect the trial signup and authorization evidence" --task-key TASK_KEY
   candor recurring candidates --direction outflow --cashflow-role expense --limit 100 --reason "Check for an existing merchant billing series" --task-key TASK_KEY
   ```

2. Recover the trial end, expected first billing window, expected price and
   cadence, payment account, and terms source from a confirmation or current
   authoritative merchant material where available. Record unavailable terms
   as unknown and continue with the observable-event baseline.
3. Distinguish posted charges, pending charges, small authorizations, refunds,
   and reversals. Record unknown terms instead of filling them in.

Complete when the next observable financial outcome and its evidence window are
clear.

## Persist the future check

Inspect the request shape and create the note before telling the user the trial
will be watched:

```sh
candor catalog describe notes.create --json
candor notes create --file NOTE.json --reason "Track the trial through its first observable billing outcome" --task-key TASK_KEY --parent-action ACTION_ID
```

The note must include:

1. **Promise:** the trial and outcome being watched.
2. **Baseline:** merchant variants, exact existing transactions, expected price
   and window, terms source, coverage, freshness, and query action ids.
3. **Recipe:** literal commands for the revisit, including the bounded date
   window and merchant variants.
4. **Meaning:** what a matching charge, different charge, authorization,
   reversal, no charge, unknown expected terms, or coverage gap implies and
   what to do next.

Set `revisit_at` to when the posted outcome should first be visible. If the
agent has a scheduler, schedule a run for that point before promising a date.
Otherwise promise the check for the next session on or after that date.

## Revisit and resolve

1. Open due work and recover the full baseline:

   ```sh
   candor open
   candor notes list --due --reason "Review due trial checks" --task-key TASK_KEY
   candor notes get NOTE_ID --reason "Recover the trial baseline and recipe" --task-key TASK_KEY
   ```

2. Run the stored transaction and recurring searches. Compare exact new
   amounts, dates, merchant variants, pending state, and reversals to the
   baseline.
3. If the watched event is conclusive, resolve the note even when comparison
   with the original terms remains unknown:

   ```sh
   candor notes resolve NOTE_ID --reason "Resolve the trial check after verifying the billing outcome" --task-key TASK_KEY --parent-action ACTION_ID
   ```

4. State separately whether the observed outcome matches authoritative terms.
   If the event itself is not conclusive, update the note's exact baseline and
   next observation time. Never resolve solely because `revisit_at` passed.

Complete when the user receives the verified outcome and any cancellation or
merchant follow-through remains a separately authorized next action.
