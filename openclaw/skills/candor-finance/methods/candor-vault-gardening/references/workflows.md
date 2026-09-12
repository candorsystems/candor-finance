# Maintenance inspection and verification

Use only the reads needed for the chosen scope. The opening can already answer
orientation questions; it does not replace exact records or full source coverage.

```sh
candor coverage get --reason "Establish the observable maintenance scope" --task-key TASK_KEY
candor transactions list --since START --until END --limit 100 --reason "Inspect bounded transaction quality" --task-key TASK_KEY
candor recurring list --status candidate,active --limit 100 --reason "Inspect schedule interpretations" --task-key TASK_KEY
candor rules list --limit 100 --reason "Inspect active transaction rules" --task-key TASK_KEY
candor corrections list --limit 100 --reason "Inspect existing transaction corrections" --task-key TASK_KEY
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
