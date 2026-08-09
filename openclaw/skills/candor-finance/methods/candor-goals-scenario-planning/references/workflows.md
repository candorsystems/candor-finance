# Goal and scenario workflows

## Create a goal proposal

1. Ask the user to define the objective, target amount and currency, target
   date, contribution cadence, priority relationships, and what flexibility is
   acceptable. Do not infer the goal from spending.
2. Inspect existing goals, visible balances, cash-flow context, and conflicts:

   ```sh
   candor goals list --limit 100 --reason "Inspect existing goals before drafting a new one" --task-key TASK_KEY
   candor balances list --limit 100 --reason "Inspect visible starting resources" --task-key TASK_KEY
   candor budget context --period PERIOD --reason "Inspect approved allocation constraints" --task-key TASK_KEY
   candor recurring list --limit 100 --reason "Inspect recurring commitments" --task-key TASK_KEY
   ```

3. Present baseline, conservative, and stretch paths when uncertainty is
   material. State contribution timing, assumed return or no-return policy,
   inflation or price assumptions, one-time funding, and collisions.
4. Draft the goal outside Candor. Inspect the current schema:

   ```sh
   candor catalog describe goals.create --json
   ```

5. Ask the user to approve the exact target, dates, contribution plan, and
   assumptions. Only then write:

   ```sh
   candor goals create --file GOAL.json --reason "Store the user-approved goal" --task-key TASK_KEY --parent-action ACTION_ID
   ```

Complete when the stored goal exactly matches the approved proposal, or the
work ends as an explicitly unapproved scenario.

## Revise or reconcile a goal

1. Read the goal, its version history, and the actions that caused prior changes:

   ```sh
   candor goals get GOAL_ID --reason "Inspect the current goal" --task-key TASK_KEY
   candor goals history GOAL_ID --reason "Recover prior goal versions" --task-key TASK_KEY
   candor actions list --limit 100 --reason "Recover goal decision context" --task-key TASK_KEY
   ```

2. Compare observed progress with the current version without silently changing
   target, timing, or contribution assumptions.
3. Show the current course and revised alternatives, including which approved
   goal or budget constraints collide.
4. Inspect `goals.update`, draft the exact new version, and obtain approval
   before writing it.

Complete when the user can see what changed, why the prior plan no longer fits,
the alternatives, and the exact approved version if one was stored.

## Record observed progress

1. Verify the contribution or progress event from an appropriate source and
   confirm it is not already reflected.
2. Inspect the command contract:

   ```sh
   candor catalog describe goals.progress.record --json
   ```

3. Ask for approval when the progress event is agent-curated rather than a
   deterministic Candor observation, then record the exact amount, kind, and
   occurrence time.
4. Re-read the goal and report progress against the current approved version.

Complete when the progress event cites its evidence and the action that produced it and is not
double-counted.
