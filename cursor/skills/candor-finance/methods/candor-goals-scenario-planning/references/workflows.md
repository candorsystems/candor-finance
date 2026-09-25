> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Goal and scenario workflows

## Create a goal proposal

1. Ask the user to define the objective, target amount and currency, target
   date, contribution cadence, priority relationships, and what flexibility is
   acceptable. Do not infer the goal from spending.
2. Inspect existing goals, visible balances, cash-flow context, and conflicts:

   ```text
   candor_get({
     "operation": "goals.list",
     "reason": "Inspect existing goals before drafting a new one",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "balances.list",
     "reason": "Inspect visible starting resources",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "budget.context",
     "reason": "Inspect approved allocation constraints",
     "task_key": "TASK_KEY",
     "args": {
       "period": "PERIOD"
     }
   })
   candor_get({
     "operation": "recurring.list",
     "reason": "Inspect recurring commitments",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   ```

3. Present baseline, conservative, and stretch paths when uncertainty is
   material. State contribution timing, assumed return or no-return policy,
   inflation or price assumptions, one-time funding, and collisions.
4. Draft the goal outside Candor. Inspect the current schema:

   ```text
   candor_schema({
     "operation": "goals.create"
   })
   ```

5. Ask the user to approve the exact target, dates, contribution plan, and
   assumptions. Only then write:

   ```text
   candor_write({
     "operation": "goals.create",
     "reason": "Store the user-approved goal",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of GOAL.json>"
   })
   ```

Complete when the stored goal exactly matches the approved proposal, or the
work ends as an explicitly unapproved scenario.

## Revise or reconcile a goal

1. Read the goal, its version history, and the actions that caused prior changes:

   ```text
   candor_get({
     "operation": "goals.get",
     "reason": "Inspect the current goal",
     "task_key": "TASK_KEY",
     "args": {
       "goal_id": "GOAL_ID"
     }
   })
   candor_get({
     "operation": "goals.history",
     "reason": "Recover prior goal versions",
     "task_key": "TASK_KEY",
     "args": {
       "goal_id": "GOAL_ID"
     }
   })
   candor_get({
     "operation": "actions.list",
     "reason": "Recover goal decision context",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   ```

   The goal's `progress` states the facts a scenario starts from: `started_on`,
   `days_elapsed` and `days_remaining`, `required_contribution` (what each
   remaining period must add to meet the date at the approved cadence),
   `projected_completion_date` at the approved contribution,
   `observed_this_period`, and the running `series`. Compare the required and
   approved contributions before proposing a change; the dashboard's Goals
   page shows the same trajectory as a shared visual.

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

   ```text
   candor_schema({
     "operation": "goals.progress.record"
   })
   ```

3. Ask for approval when the progress event is agent-curated rather than a
   deterministic Candor observation, then record the exact amount, kind, and
   occurrence time.
4. Re-read the goal and report progress against the current approved version.

Complete when the progress event cites its evidence and the action that produced it and is not
double-counted.
