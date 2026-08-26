# Budgeting and cash-flow workflows

Use exact calendar dates and replace every uppercase placeholder. Keep one
stable `task_key` across a continuing investigation and pass the returned
action id as `parent_action` when a later operation continues that action.

## Reconstruct a period

1. Establish the requested period, currencies, included accounts, and whether
   the user wants cash movement or an income-and-expense view.
2. Check coverage before calculating:

   ```sh
   candor coverage get --reason "Check coverage for the cash-flow period" --task-key TASK_KEY
   candor data schema transactions --reason "Inspect transaction fields and filters" --task-key TASK_KEY
   candor transactions list --since START --until END --reason "Read observed cash flow" --task-key TASK_KEY
   ```

3. Drill into material or ambiguous categories with bounded pages:

   ```sh
   candor transactions list --category CATEGORY --since START --until END --limit 100 --reason "Verify CATEGORY cash-flow treatment" --task-key TASK_KEY
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

   ```sh
   candor recurring list --limit 100 --reason "Inspect recurring cash obligations" --task-key TASK_KEY
   candor debts list --reason "Inspect visible debt obligations" --task-key TASK_KEY
   candor budget context --period PERIOD --reason "Compare the approved budget with observed cash flow" --task-key TASK_KEY
   candor goals list --limit 100 --reason "Inspect approved goals competing for cash" --task-key TASK_KEY
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

   ```sh
   candor catalog describe budget.create --json
   ```

4. Ask for explicit approval of the exact draft. A budget reflects the user's values
   state, so the substance is the user's call. Only then write it:

   ```sh
   candor budget create --file BUDGET.json --reason "Store the user-approved budget" --task-key TASK_KEY --parent-action ACTION_ID
   ```

5. Read the resulting budget status and preserve its action id.

Complete when the stored version exactly matches the approved draft, or when
the analysis ends as an explicitly labeled unapproved scenario.
