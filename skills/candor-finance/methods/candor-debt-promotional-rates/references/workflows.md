> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Debt and promotional-rate workflows

## Establish the debt baseline

1. Inspect coverage, account identities, balance timestamps, and visible debt:

   ```text
   candor_get({
     "operation": "coverage.get",
     "reason": "Check debt-data coverage",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "accounts.list",
     "reason": "Identify visible debt accounts",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "balances.list",
     "reason": "Inspect current debt balances",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "debts.list",
     "reason": "Summarize visible debt obligations",
     "task_key": "TASK_KEY"
   })
   candor_query({
     "dataset": "account_terms",
     "reason": "Inspect effective debt terms and provenance",
     "task_key": "TASK_KEY",
     "filters": {
       "limit": 100
     }
   })
   ```

2. Separate observed balances and payments from contractual APR, minimum,
   due-date, fee, and promotional terms.
3. For missing fields, obtain a current statement, agreement, or official
   servicer source. Preview and apply a curated import for source-backed facts;
   use `account-terms assertion set` only for a value the user explicitly
   approves. Preserve effective and expiry dates. Preview that assertion first,
   then inspect its version history after writing:

   ```text
   candor_get({
     "operation": "account_terms.assertion.preview",
     "reason": "Preview an approved debt-term correction",
     "task_key": "TASK_KEY",
     "input": "<contents of ASSERTION.json>"
   })
   candor_write({
     "operation": "account_terms.assertion.set",
     "reason": "Store an approved debt-term correction",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of ASSERTION.json>"
   })
   candor_get({
     "operation": "account_terms.assertion.history",
     "reason": "Verify debt-term assertion history",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "args": {
       "account_identity_id": "ACCOUNT_IDENTITY_ID",
       "field": "FIELD",
       "limit": 25
     }
   })
   ```

   Revert the assertion when it is withdrawn or replaced by authoritative
   source evidence:

   ```text
   candor_write({
     "operation": "account_terms.assertion.revert",
     "reason": "Revert the approved debt-term correction",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "args": {
       "account_identity_id": "ACCOUNT_IDENTITY_ID",
       "field": "FIELD"
     }
   })
   ```
4. Surface debts missing terms or balances rather than assigning defaults.

Complete when each modeled debt has a current balance time and attributable
terms, and omitted obligations are explicit.

## Model payoff scenarios

1. Inspect the user's approved cash constraints:

   ```text
   candor_get({
     "operation": "budget.context",
     "reason": "Inspect approved cash constraints for debt scenarios",
     "task_key": "TASK_KEY",
     "args": {
       "period": "PERIOD"
     }
   })
   candor_get({
     "operation": "goals.list",
     "reason": "Inspect goals that interact with debt payoff",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "transactions.list",
     "reason": "Inspect observed debt payments",
     "task_key": "TASK_KEY",
     "args": {
       "since": "START",
       "until": "END",
       "limit": 100
     }
   })
   ```

2. Model at least the current-payment path and one alternative. State starting
   balance, rate and rate-change assumptions, payment amount and timing, fees,
   promotional expiry, interest method, and whether new charges are excluded.
3. Show payoff timing, total modeled payments, modeled interest or fees, cash
   requirement, and sensitivity to changed rates or payments. Do not hide
   residual balloon or deferred-interest risk.
4. Compare debt and cash yield only with current sourced terms and explicit tax,
   liquidity, reserve, and risk assumptions.
5. Leave prioritization to the user's agent using the user's goals and broader
   context. Ask before storing a debt-paydown goal.

Complete when the user can reproduce the scenarios and see the current course,
alternatives, material uncertainty, and cash-flow conflicts.

## Track a promotional deadline

1. Verify the promotion type, covered balance, start date, expiration date,
   post-promotion treatment, required payments, and loss-of-promotion
   conditions from an authoritative document.
2. Explain the verified transition and unknown terms conditionally. For a
   terms-only request, offer payoff modeling rather than ranking a payoff,
   transfer, or refinance action without the user's cash constraints, goals,
   alternatives, and preferences.
3. Work backward from the deadline using a conservative processing buffer.
4. Store the verified expiry as a curated term or approved assertion so opening
   attention can enforce the deadline. Create a timed note only for additional
   unstructured follow-up:

   ```text
   candor_schema({
     "operation": "notes.create"
   })
   candor_write({
     "operation": "notes.create",
     "reason": "Track a verified promotional debt deadline",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of NOTE.json>"
   })
   ```

5. A payment, balance transfer, refinance, or application remains external and
   requires explicit authority.

Complete when the deadline, sourced terms, required decision date, owner,
verification evidence, and external action boundary are explicit.
