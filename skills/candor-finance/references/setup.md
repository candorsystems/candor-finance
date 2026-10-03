> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Setup, access and openings without a named task

The user's financial request takes precedence over a default first review.
After connecting, complete that task and include a short setup confirmation in
the same answer. Do not send a ready message followed by a separate setup report.

## Access and recovery

Use the exact `safe_url` or `recovery_url` returned by Candor and explain the
required user step. Financial-source connection, credential repair and
disconnection happen only in the signed-in web portal. Without a more specific
returned URL, direct the user to [Candor Settings](https://app.candor.money/settings).
Subscription and payment changes also happen only on secure `https://app.candor.money`
pages. Never ask for pasted credentials or verification codes. Preserve an
incomplete setup's recovery action.

## A useful first result

When setup names no financial task, open the workspace and use its coverage to
choose a bounded first pass with `candor-financial-review`. The first opening
carries `first_pass` when history is visible: monthly totals, accounts with
their debt terms, and recurring series. Open records only for what those rows
leave open. Every opening also exposes
`financial_position.coverage.transaction_history`. If a sync was still filling,
reopen once current. Follow pagination for the chosen scope and report only
what it supports. Do not promise a fixed number of findings.

If no history read is possible, distinguish the recovery:

- A refresh in progress: the first sync is running; reopen after it finishes.
- No connected institution: list connections before suggesting a new one.
  An errored or relink-required source needs repair, not duplicate connection.
- All source accounts excluded: explain that an account needs inclusion.
- Balances only: say which question transaction history would answer.
- No connection: use the connection flow.

On a later opening without a named task, use saved context to investigate one
plausibly material factual lead within existing authority. Do not force a broad
review or create a lead from missing data alone.

Before asking for missing context on first use, process `untagged_notes` and its
continuation. Tag only explicit user context, or a household `fact` from
`context_needed` that you inferred from the records, with relevant
`context_needed` topics. Missing topics are not a gate on useful work. Ask one natural question
only when the answer materially improves the next decision. When the opening
offers `open.acknowledge`, run it after the useful first result is established.
