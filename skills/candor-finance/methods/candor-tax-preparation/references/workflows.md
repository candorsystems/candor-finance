> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Tax-preparation workflows

## Scope the evidence packet

1. Establish the requested tax year and inspect observable coverage:

   ```text
   candor_open({})
   candor_get({
     "operation": "coverage.get",
     "reason": "Verify account coverage for the requested tax year",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "transactions.summary",
     "args": {
       "since": "YEAR-01-01",
       "until": "YEAR-12-31"
     },
     "reason": "Bound tax-year transaction activity",
     "task_key": "TASK_KEY"
   })
   ```

2. Identify excluded accounts, missing periods, stale connections, unsupported
   currencies, and records outside the requested year.
3. Inspect current effective transaction fields before constructing filters:

   ```text
   candor_schema({
     "dataset": "transactions",
     "reason": "Inspect effective transaction fields for tax preparation",
     "task_key": "TASK_KEY"
   })
   candor_schema({
     "dataset": "spending_categories",
     "reason": "Inspect category semantics for tax preparation",
     "task_key": "TASK_KEY"
   })
   ```

Complete when the packet has a defensible period and account boundary.

## Gather and test candidates

Query bounded candidate groups and inspect the exact underlying transactions:

```text
candor_get({
  "operation": "transactions.list",
  "args": {
    "since": "YEAR-01-01",
    "until": "YEAR-12-31",
    "limit": 100
  },
  "reason": "Inspect tax-preparation candidates in the bounded year",
  "task_key": "TASK_KEY"
})
candor_get({
  "operation": "corrections.list",
  "args": {
    "limit": 100
  },
  "reason": "Inspect existing transaction interpretations before tax organization",
  "task_key": "TASK_KEY"
})
candor_get({
  "operation": "rules.list",
  "args": {
    "limit": 100
  },
  "reason": "Inspect existing rules affecting tax-year records",
  "task_key": "TASK_KEY"
})
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

```text
candor_get({
  "operation": "transactions.get",
  "args": {
    "transaction_id": "TRANSACTION_ID"
  },
  "reason": "Inspect a tax-preparation candidate before correction",
  "task_key": "TASK_KEY"
})
candor_write({
  "operation": "corrections.create",
  "args": {
    "transaction_id": "TRANSACTION_ID",
    "category": "CATEGORY"
  },
  "reason": "Preserve the verified tax-record organization",
  "task_key": "TASK_KEY",
  "parent_action": "ACTION_ID"
})
candor_get({
  "operation": "transactions.get",
  "args": {
    "transaction_id": "TRANSACTION_ID"
  },
  "reason": "Verify the effective tax-record correction",
  "task_key": "TASK_KEY"
})
```

Use `candor_write({"operation":"transactions.split.set","input":"<contents of SPLIT.json>"})` for a user-supplied exact
allocation. For repeated evidence, create a narrow rule, preview its entire
bounded tax-year match set, then apply only if every material match and
exclusion is understood. Preserve the application batch for reversal.

Store unresolved substantiation as a linked note instead of a guessed category:

```text
candor_write({
  "operation": "notes.create",
  "input": "<contents of NOTE.json>",
  "reason": "Track missing tax-record substantiation",
  "task_key": "TASK_KEY",
  "parent_action": "ACTION_ID"
})
```

## Hand off the requested export

Re-read material corrected records before handing off. Report covered accounts
and periods, candidate groupings, unresolved exceptions, and missing evidence,
then direct the user to the Export action in authenticated Candor Settings.
The downloaded export is a factual packet for review, not a return or tax
opinion. Never generate, inspect, send, upload, file, or share it through the
agent surface.
