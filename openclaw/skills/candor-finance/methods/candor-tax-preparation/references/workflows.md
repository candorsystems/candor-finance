# Tax-preparation workflows

## Scope the evidence packet

1. Establish the requested tax year and inspect observable coverage:

   ```sh
   candor open
   candor coverage get --reason "Verify account coverage for the requested tax year" --task-key TASK_KEY
   candor transactions list --since YEAR-01-01 --until YEAR-12-31 --reason "Read tax-year transaction activity" --task-key TASK_KEY
   ```

2. Identify excluded accounts, missing periods, stale connections, unsupported
   currencies, and records outside the requested year.
3. Inspect current effective transaction fields before constructing filters:

   ```sh
   candor data schema transactions --reason "Inspect effective transaction fields for tax preparation" --task-key TASK_KEY
   ```

Complete when the packet has a defensible period and account boundary.

## Gather and test candidates

Query bounded candidate groups and inspect the exact underlying transactions:

```sh
candor transactions list --since YEAR-01-01 --until YEAR-12-31 --limit 100 --reason "Inspect tax-preparation candidates in the bounded year" --task-key TASK_KEY
candor corrections list --limit 100 --reason "Inspect existing transaction interpretations before tax organization" --task-key TASK_KEY
candor rules list --limit 100 --reason "Inspect existing rules affecting tax-year records" --task-key TASK_KEY
```

For every candidate, preserve exact date, amount, currency, merchant, account,
effective category, and any user-supplied purpose. Test:

- refunds and reimbursements;
- transfers and debt payments;
- duplicate or reversed transactions;
- mixed personal and business use;
- missing receipt or business-purpose evidence;
- transactions spanning two tax years.

Do not turn merchant or category similarity into a deductibility conclusion.

## Organize verified facts

Load `candor-transaction-organization` and prefer the smallest reversible
write:

```sh
candor transactions get TRANSACTION_ID --reason "Inspect a tax-preparation candidate before correction" --task-key TASK_KEY
candor corrections create TRANSACTION_ID --category CATEGORY --reason "Preserve the verified tax-record organization" --task-key TASK_KEY --parent-action ACTION_ID
candor transactions get TRANSACTION_ID --reason "Verify the effective tax-record correction" --task-key TASK_KEY
```

Use `candor transactions split set --file SPLIT.json` for a user-supplied exact
allocation. For repeated evidence, create a narrow rule, preview its entire
bounded tax-year match set, then apply only if every material match and
exclusion is understood. Preserve the application batch for reversal.

Store unresolved substantiation as a linked note instead of a guessed category:

```sh
candor notes create --file NOTE.json --reason "Track missing tax-record substantiation" --task-key TASK_KEY --parent-action ACTION_ID
```

## Hand off the requested export

Re-read material corrected records before handing off. Report covered accounts
and periods, candidate groupings, unresolved exceptions, and missing evidence,
then direct the user to the Export action in authenticated Candor Settings.
The downloaded export is a factual packet for review, not a return or tax
opinion. Never generate, inspect, send, upload, file, or share it through the
agent surface.
