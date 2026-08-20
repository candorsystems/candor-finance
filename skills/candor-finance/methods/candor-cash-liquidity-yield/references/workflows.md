> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Cash, liquidity, and yield workflows

## Establish the liquidity baseline

1. Confirm the currencies and accounts in scope.
2. Inspect coverage, account roles, balance timestamps, and the deterministic
   liquidity view:

   ```text
   candor_get({
     "operation": "coverage.get",
     "reason": "Check cash and balance coverage",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "accounts.list",
     "reason": "Identify visible cash accounts",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "balances.list",
     "reason": "Inspect current visible balances",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "liquidity.summary",
     "reason": "Summarize visible liquidity",
     "task_key": "TASK_KEY"
   })
   candor_query({
     "dataset": "account_terms",
     "reason": "Inspect current deposit APYs and term provenance",
     "task_key": "TASK_KEY",
     "filters": {
       "limit": 100
     }
   })
   ```

3. Exclude restricted, custodial, business, earmarked, pending, or otherwise
   unavailable cash when the account facts support that distinction. Ask when
   role or availability is uncertain.
4. Keep currencies separate and state omitted institutions or stale sources.

Complete when the baseline identifies visible cash, excluded cash, observation
times, currencies, and coverage gaps without calling any amount idle.

## Estimate reserve needs

1. Ask which obligations and risks the reserve is intended to cover; do not
   invent a universal number of months.
2. Inspect observed outflows, recurring commitments, debt obligations, approved
   budgets, and goals:

   ```text
   candor_get({
     "operation": "transactions.summary",
     "reason": "Estimate observed cash needs",
     "task_key": "TASK_KEY",
     "args": {
       "since": "START",
       "until": "END"
     }
   })
   candor_get({
     "operation": "recurring.list",
     "reason": "Inspect recurring cash commitments",
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
     "reason": "Inspect approved cash allocations",
     "task_key": "TASK_KEY",
     "args": {
       "period": "PERIOD"
     }
   })
   candor_get({
     "operation": "goals.list",
     "reason": "Inspect approved reserve and savings goals",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   ```

3. Separate essential, flexible, seasonal, and one-time needs. Present a range
   when income stability or expense coverage is uncertain.
4. Ask the user to approve any reserve target before storing a goal.

Complete when the reserve range is traceable to stated risks, observed
obligations, assumptions, and coverage—not a generic rule of thumb.

## Compare current yield options

1. Use the effective deposit APY in `account_terms` for the current-account
   baseline when it is fresh and unconflicted. Research missing current-account
   terms and all alternative-product rates only at decision time. For a
   source-backed current APY obtained from a statement or official disclosure,
   use the curated-import preview/apply flow so it enters the same canonical
   term history as a connected source. Use an account-term assertion only for
   a value the user explicitly approves, and preview it before writing. Prefer
   the institution's official deposit page and disclosures; use regulator or
   government sources for protection rules; use an official prospectus for a
   fund or security.
2. Record product identity, APY or yield definition, effective/retrieval date,
   compounding basis, balance tiers, fees, minimums, access restrictions,
   promotional expiry, protection or investment status, and user eligibility.
3. Compare at least the current course and one realistic alternative. Calculate
   gross benefit over the user's time horizon, then show fees, tax assumptions
   when material, transfer delay, liquidity, and operational complexity
   separately.
4. Do not compare an insured deposit and an investment product as if their
   risk, liquidity, and protections were identical.
5. Preserve changing terms only as a caveated note with a near-term revisit:

   ```text
   candor_schema({
     "operation": "notes.create"
   })
   candor_write({
     "operation": "notes.create",
     "reason": "Remember sourced cash-yield terms for follow-up",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of NOTE.json>"
   })
   ```

Complete when every modeled benefit has a current source and the user can see
the liquidity, risk, protection, tax, and effort differences before deciding.
