# Quiet monitoring recipes

Use this recipe only after the first full `candor open` briefing has been
processed and its checkpoint acknowledged.

## Ask once

Ask one plain question:

> Would you like me to check your finances quietly in the background? Daily is
> a good default, or I can check weekly, twice daily, on another schedule, or
> not at all. I will only contact you when a follow-up actually merits your
> attention.

Do not configure anything until the user chooses. `Off` means stop with no
schedule. Treat a custom cadence as a scheduling preference, not permission for
new financial actions.

## Stable recurrence

Use the stable job name `candor-finance-pulse`. Prefer, in order:

1. A durable heartbeat or scheduled wake that resumes the same conversation,
   thread, or persistent monitoring context.
2. A durable isolated scheduled run when resumption is unavailable.
3. No background monitoring when the agent cannot run authenticated Candor
   commands unattended.

Do not substitute a session-start reminder or a continuously running loop for
a durable recurrence. Create one job, inspect the returned schedule and target,
and invoke it once immediately as verification. If a job with the stable name
already exists, inspect and update that job instead of creating a duplicate.
Keep the job id and cadence in the agent's scheduler. Never write them to a
Candor note.

Use this job instruction, adapting only the silent-success token named by the
agent:

```text
Quietly check the user's financial workspace.

1. Run the package's workspace pulse operation: `candor pulse`.
2. If the call fails or its contract is invalid, report the scheduled-run
   failure through the agent's scheduler. Never treat failure as no attention.
3. If `attention` is `none`, emit the agent's silent-success token and
   stop. Do not notify the user.
4. If `attention` is `present`, run `candor open`, process and triage the
   briefing, and acknowledge its checkpoint only after processing it.
5. Contact the user only if the investigation finds something material or
   needs their input or authority. Otherwise finish silently.

The pulse is a check-in, not a notification. Do not create another scheduler,
watch, loop, or Candor note for this recurrence.
```

## OpenClaw

Prefer the ongoing main-session heartbeat when its cadence matches the user's
choice. Otherwise create or update one main-session scheduled wake with the
stable name. Target the main session so prior monitoring context continues.
Use OpenClaw's heartbeat-success behavior on `attention: "none"`. If only an
isolated cron target is available, use it as the fallback and keep the same
job instruction.

## Hermes

Create or update one stable named cron job and attach the `candor-finance`
skill. Use `[SILENT]` for `attention: "none"`. Hermes may execute cron jobs in
a fresh session; that is an acceptable isolated fallback, not a reason to add
Candor-side schedule state.

## Claude Code

Prefer a durable Desktop scheduled task that resumes the relevant task context.
Use a cloud routine only when that environment already has authenticated
access to Candor. Do not use `/loop`: it is session-scoped continuous work, not
a durable background check-in.

## Other agents

Use the agent's closest built-in scheduler. Prefer a same-thread,
same-conversation, or session-resuming target when available. Otherwise use an
isolated run with the exact job instruction above. If unattended authenticated
execution is unavailable, tell the user background monitoring was not
configured. Do not imply that an in-session reminder is durable monitoring.

## Maintenance

Change or remove the stable job when the user changes their cadence or
opts out. The scheduler's run history and failure reporting are authoritative
for scheduler health. Normal Candor visits should not check whether the job
still exists; inspect it only when setup verification fails, the agent reports
a scheduler problem, or the user asks to change monitoring.
