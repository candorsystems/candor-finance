> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Budgeting and cash-flow workflows

Use exact calendar dates and replace every uppercase placeholder. Keep one
stable `task_key` across a continuing investigation and pass the returned
action id as `parent_action` when a later operation continues that action.

## Reconstruct a period

1. Establish the requested period, currencies, included accounts, and whether
   the user wants cash movement or an income-and-expense view.
2. Check coverage before calculating:

   ```text
   candor_get({
     "operation": "coverage.get",
     "reason": "Check coverage for the cash-flow period",
     "task_key": "TASK_KEY"
   })
   candor_schema({
     "dataset": "transactions",
     "reason": "Inspect transaction fields and filters",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "transactions.summary",
     "reason": "Summarize observed cash flow",
     "task_key": "TASK_KEY",
     "args": {
       "since": "START",
       "until": "END"
     }
   })
   candor_get({
     "operation": "spending_categories.list",
     "reason": "Inspect spending composition",
     "task_key": "TASK_KEY",
     "args": {
       "since": "START",
       "until": "END"
     }
   })
   ```

3. Drill into material or ambiguous categories with bounded pages:

   ```text
   candor_get({
     "operation": "transactions.list",
     "reason": "Verify CATEGORY cash-flow treatment",
     "task_key": "TASK_KEY",
     "args": {
       "category": "CATEGORY",
       "since": "START",
       "until": "END",
       "limit": 100
     }
   })
   ```

   Follow `pagination.next_cursor` until `pagination.has_more` is false for
   every pageable read before treating the relevant population as covered.
4. Classify inflows, operating outflows, transfers, refunds, debt payments, and
   one-time items separately. Do not count both sides of an internal transfer.
   Net a refund only against the expense it actually reverses.
5. Report exact currency-separated totals, coverage gaps, excluded items, and
   the transaction basis. Do not combine currencies using an unstated rate.

Complete when another agent can reproduce every total from the stated period,
classification policy, and evidence handles.

## Estimate sustainable capacity

1. Start from a reconstructed period, then compare multiple representative
   periods when seasonality or irregular income could matter.
2. Inspect current obligations and approved plans:

   ```text
   candor_get({
     "operation": "recurring.list",
     "reason": "Inspect recurring cash obligations",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "debts.list",
     "reason": "Inspect visible debt obligations",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "budget.context",
     "reason": "Compare the approved budget with observed cash flow",
     "task_key": "TASK_KEY",
     "args": {
       "period": "PERIOD"
     }
   })
   candor_get({
     "operation": "goals.list",
     "reason": "Inspect approved goals competing for cash",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   ```

3. Present at least a baseline and a downside case. State which income,
   expenses, one-time items, and reserve assumptions change between them.
4. Treat the result as a scenario, not a budget or recommendation. Ask the user
   which tradeoffs fit their priorities before proposing durable state.

Complete when the estimate exposes assumptions, sensitivities, collisions with
existing goals, and the amount that remains unallocated in each currency.

## Propose or revise a budget

1. Read the active budget, relevant goal versions, and the actions that changed them.
2. Draft the proposed allocation outside Candor and show before/after amounts,
   rationale, tradeoffs, and effective period.
3. Inspect the current write contract:

   ```text
   candor_schema({
     "operation": "budget.create"
   })
   ```

4. Ask for explicit approval of the exact draft. A budget reflects the user's values
   state, so the substance is the user's call. Only then write it:

   ```text
   candor_write({
     "operation": "budget.create",
     "reason": "Store the user-approved budget",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of BUDGET.json>"
   })
   ```

5. Read the resulting budget status and preserve its action id.

Complete when the stored version exactly matches the approved draft, or when
the analysis ends as an explicitly labeled unapproved scenario.
