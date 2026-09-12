> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Scheduled work

Use the host's durable scheduler for a requested later check or recurring task.
Recover the user's purpose, cadence, time zone, notification preference and stop
condition. Ask only for missing choices. An explicit scheduling request is
already authorization; do not ask the user to opt in again. Setup and workspace
access alone do not authorize a schedule.

## Preserve the requested task

Save a self-contained instruction that retains the financial goal, scope,
authority, evidence to inspect, prior-decision recovery, requested output and
when to stop. A weekly briefing should run and report weekly even if no alert is
present. A quiet refund check should notify on its specified outcome and end
when resolved. A scheduled cleanup must actually inspect its maintenance scope.
Do not replace these with a generic pulse or suppress an explicitly requested
report.

Prefer a durable wake in the same conversation. Use an isolated scheduled run
when necessary, including enough context to recover relevant notes and evidence.
If the host cannot run authenticated Candor tools unattended, say what is missing;
a plain reminder or session-only loop is not background financial work.

Inspect existing jobs for the same purpose before creating one. Update that job
when the user changes it; preserve unrelated tasks. Use a task-specific name.
The host scheduler is authoritative for schedule identity, status and run history.
Notes may preserve the monitoring purpose, related decisions, or a routine
reference as context. Saving a note does not create or verify a scheduled run.
Verify the saved instruction, schedule and target, and run a bounded initial
check when it is safe and relevant. Confirm the actual schedule to the user.

## General quiet monitoring

Only for a user-requested general financial check-in, use the stable job name
`candor-finance-pulse`. Its compact signal can avoid unnecessary reads:

```text
Quietly check the user's financial workspace.

1. Run `candor_open({"mode":"pulse"})`.
2. If the call fails or its contract is invalid, report the scheduled-run failure
   through the host. Never treat failure as no attention.
3. If `attention` is `none`, use the host's silent-success behavior and stop.
4. If attention is present, open the workspace, investigate the relevant evidence,
   and acknowledge that exact opening after processing it.
5. Notify only for a supported material finding, changed outcome or needed user
   input. Otherwise finish silently.
```

The pulse is an attention signal, not proof that a requested domain-specific
check ran. Do not use it to skip an obligation the saved task requires.

## Host selection and maintenance

- OpenClaw: prefer an ongoing main-session heartbeat when the cadence fits;
  otherwise use a durable scheduled wake, with an isolated run as fallback.
- Hermes: attach this finance skill to a durable scheduled job and use the
  host's silent-success convention for quiet checks.
- Claude Code: use a durable Desktop scheduled task or an authenticated cloud
  routine. Do not substitute `/loop`, which is session-scoped.
- ChatGPT or another host: verify scheduled runs can call authenticated Candor
  tools. If they cannot, report that limitation instead of implying monitoring
  is configured.

The host owns run history and failure reporting. Inspect it when verification
fails, a run reports an error, or the user asks about the schedule. Stop or change
only the matching task when its outcome is resolved or the user changes intent.
