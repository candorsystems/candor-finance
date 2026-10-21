# Goal and scenario workflows

## Create a goal proposal

1. Establish from the conversation the objective, target amount and currency,
   target date, contribution cadence, priority relationships, and what
   flexibility is acceptable. Ask only for what is missing and material. Do not
   infer the goal from spending.
2. Inspect existing goals, visible balances, cash-flow context, and conflicts:

   ```sh
   candor goals list --limit 100 --reason "Inspect existing goals before drafting a new one" --task-key TASK_KEY
   candor balances list --limit 100 --reason "Inspect visible starting resources" --task-key TASK_KEY
   candor budget context --period PERIOD --reason "Inspect saved allocation constraints" --task-key TASK_KEY
   candor recurring list --limit 100 --reason "Inspect recurring commitments" --task-key TASK_KEY
   ```

3. Present baseline, conservative, and stretch paths when uncertainty is
   material. State contribution timing, assumed return or no-return policy,
   inflation or price assumptions, one-time funding, and collisions.
4. Draft the goal. Inspect the current schema; `goals.preview` can compute what
   the plan implies and is optional:

   ```sh
   candor catalog describe goals.create --json
   ```

5. Save the goal once the conversation settles it; do not ask for a yes to an
   exact draft. Use the user's words and only figures and dates they gave or the
   records show. Pass the user's own words as `note` when they said
   something relevant; otherwise omit it. Tell the user briefly what you saved:

   ```sh
   candor goals create --file GOAL.json --reason "Save the goal from this conversation" --task-key TASK_KEY --parent-action ACTION_ID
   ```

Complete when the saved goal matches what the conversation settled and the user
knows what was saved, or the work ends as an explicitly labeled scenario that
was not saved.

## Revise or reconcile a goal

1. Read the goal, its version history, and the actions that caused prior changes:

   ```sh
   candor goals get GOAL_ID --reason "Inspect the current goal" --task-key TASK_KEY
   candor goals history GOAL_ID --reason "Recover prior goal versions" --task-key TASK_KEY
   candor actions list --limit 100 --reason "Recover goal decision context" --task-key TASK_KEY
   ```

   The goal's `progress` states the facts a scenario starts from: `started_on`,
   `days_elapsed` and `days_remaining`, `required_contribution` (what each
   remaining period must add to meet the date at the planned cadence),
   `projected_completion_date` at the planned contribution,
   `observed_this_period`, and the running `series`. Compare the required and
   planned contributions before proposing a change; the dashboard's Goals
   page shows the same trajectory as a shared visual.

2. Compare observed progress with the current version without silently changing
   target, timing, or contribution assumptions.
3. Show the current course and revised alternatives, including which saved
   goal or budget constraints collide.
4. Inspect `goals.update` and save the new version once the conversation
   settles it. Record what changed so the user can see and correct it.

Complete when the user can see what changed, why the prior plan no longer fits,
the alternatives, and the exact version if one was saved.

## Record observed progress

1. Verify the contribution or progress event from an appropriate source and
   confirm it is not already reflected.
2. Inspect the command contract:

   ```sh
   candor catalog describe goals.progress.record --json
   ```

3. Record the exact amount, kind, and occurrence time. When the event is
   agent-curated rather than a deterministic Candor observation, cite its
   evidence and tell the user what you recorded.
4. Re-read the goal and report progress against the current goal version.

Complete when the progress event cites its evidence and the action that produced it and is not
double-counted.
