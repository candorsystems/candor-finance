> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Maintenance inspection and verification

Use only the reads needed for the chosen scope. The opening can already answer
orientation questions; it does not replace exact records or full source coverage.

```text
candor_get({
  "operation": "coverage.get",
  "reason": "Establish the observable maintenance scope",
  "task_key": "TASK_KEY"
})
candor_get({
  "operation": "transactions.list",
  "reason": "Inspect bounded transaction quality",
  "task_key": "TASK_KEY",
  "args": {
    "since": "START",
    "until": "END",
    "limit": 100
  }
})
candor_get({
  "operation": "recurring.list",
  "reason": "Inspect schedule interpretations",
  "task_key": "TASK_KEY",
  "args": {
    "status": "candidate,active",
    "limit": 100
  }
})
candor_get({
  "operation": "rules.list",
  "reason": "Inspect active transaction rules",
  "task_key": "TASK_KEY",
  "args": {
    "limit": 100
  }
})
candor_get({
  "operation": "corrections.list",
  "reason": "Inspect existing transaction corrections",
  "task_key": "TASK_KEY",
  "args": {
    "limit": 100
  }
})
```

Follow relevant continuations. When a rule's matches changed, inspect the affected
rows before replacing it; an empty match set does not establish the cause.

For changes, read `candor-transaction-organization` for corrections, splits and
rules or `candor-recurring-bills` for recurring curation. Use current schemas and
previews before unfamiliar writes. The request's authority applies across these
methods, but a broader method cannot expand it.

After a write, re-read the affected effective state. Compare meaning and scope
with the before-state and retain its recovery handle. If the result is wrong,
revert the relevant correction, rule, split or policy and verify restoration.
For a no-change result, distinguish correct state from unresolved meaning.
Persist a note only when material follow-through has an observable future check.
