# Income-integrity workflows

## Establish the observed baseline

1. Inspect workspace changes, coverage, and income-shaped activity:

   ```sh
   candor open
   candor coverage get --reason "Verify observable account history for the expected income" --task-key TASK_KEY
   candor recurring candidates --direction inflow --cashflow-role income --limit 100 --reason "Inspect recurring income-shaped deposits" --task-key TASK_KEY
   candor transactions list --since START --until END --limit 100 --reason "Inspect exact deposits around the expected income dates" --task-key TASK_KEY
   ```

2. Search payer-description variants and all plausible destination accounts.
   Drill into exact supporting transactions rather than accepting a recurring
   candidate as proof.
3. Record the prior deposit amounts, dates, currencies, account-safe identity,
   observed cadence, coverage, and freshness. Separate gross-pay claims from
   the net deposits actually visible.

Complete when the baseline is an observed series rather than an assumed payday.

## Investigate a missing, late, or reduced payment

1. Compare the expected cycle with prior cycles:

   ```sh
   candor transactions list --since START --until END --reason "Compare observed income across the relevant cycles" --task-key TASK_KEY
   candor changes list --domain income --limit 100 --reason "Inspect recent changes affecting the expected payment" --task-key TASK_KEY
   ```

2. Test alternate explanations:

   - a shifted posting date, weekend, or holiday;
   - a pending or reversed deposit;
   - split deposits across accounts;
   - payer-description drift;
   - a transfer, refund, reimbursement, interest credit, or sale proceeds;
   - an account change or an observable coverage gap.

3. Quantify a reduction only from exact comparable deposits. Do not infer the
   cause from the net amount.

Complete when the payment is found and compared, or when the observable window
supports a bounded negative finding with its limitations.

## Persist an unresolved check

If the payment is not yet observable, inspect the note contract and create a
note before answering:

```sh
candor catalog describe notes.create --json
candor notes create --file NOTE.json --reason "Track the unresolved expected income" --task-key TASK_KEY --parent-action ACTION_ID
```

The note body must include:

1. the promise or expected outcome;
2. exact payer variants, accounts, prior deposits, dates, coverage, freshness,
   and query action ids;
3. literal commands for the next search window;
4. what found, still absent, split, reversed, or reduced outcomes mean.

Set `revisit_at` to the first date the next observation should be available. On
revisit, rerun the recipe, update the baseline if uncertainty remains, and
resolve the note only after the expected payment or a conclusive alternate
outcome is observed:

```sh
candor notes resolve NOTE_ID --reason "Resolve the income check after verifying the outcome" --task-key TASK_KEY --parent-action ACTION_ID
```
