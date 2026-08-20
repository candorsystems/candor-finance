> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Transaction-organization workflows

## Correct one transaction

1. Inspect the canonical transaction, existing correction, merchant neighbors,
   and related actions:

   ```text
   candor_get({
     "operation": "transactions.get",
     "reason": "Inspect the transaction before correction",
     "task_key": "TASK_KEY",
     "args": {
       "transaction_id": "TRANSACTION_ID"
     }
   })
   candor_get({
     "operation": "corrections.list",
     "reason": "Inspect existing transaction corrections",
     "task_key": "TASK_KEY",
     "args": {
       "transaction": "TRANSACTION_ID",
       "limit": 100
     }
   })
   candor_get({
     "operation": "transactions.split.get",
     "reason": "Inspect any existing split",
     "task_key": "TASK_KEY",
     "args": {
       "transaction_id": "TRANSACTION_ID"
     }
   })
   candor_get({
     "operation": "actions.list",
     "reason": "Recover transaction interpretation history",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   ```

2. Ask for the factual interpretation only when it is missing. Merchant text
   and provider category are evidence, not user confirmation.
3. Determine whether the user's current task already grants authority. An
   explicit request to handle, fix, clean up, or organize this bounded area
   covers the inspected reversible correction; do not ask again.
4. Verify the exact before/after effective category, cash-flow role, label,
   tags, and review state. Surface it to the user when it materially clarifies
   the work, not as a mandatory approval ceremony.
5. Inspect the current command contract and create only the authorized fields:

   ```text
   candor_schema({
     "operation": "corrections.create"
   })
   candor_write({
     "operation": "corrections.create",
     "reason": "Apply the user-approved transaction correction",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "args": {
       "transaction_id": "TRANSACTION_ID",
       "category": "CATEGORY"
     }
   })
   ```

6. Re-read the transaction and preserve the action that changed it and the prior value for
   reversal.

Complete when the effective record matches the user's confirmed interpretation
and no unrelated field changed.

## Split a transaction

1. Inspect the transaction and any existing split.
2. Ask the user to define each part's exact amount, currency, category or role,
   and rationale. Validate that parts reconcile exactly to the source amount
   under the current money contract.
3. Inspect `transactions.split.set`, draft the input file, and show the exact
   split for approval.
4. Apply the split:

   ```text
   candor_write({
     "operation": "transactions.split.set",
     "reason": "Store the user-approved transaction split",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of SPLIT.json>"
   })
   ```

5. Re-read the split and downstream effective transaction view. Use
   `transactions.split.revert` if the user later approves reversal.

Complete when the parts reconcile exactly and the stored split matches the
approved draft.

## Promote repeated evidence to a rule

1. Query a bounded representative population and explicit counterexamples:

   ```text
   candor_get({
     "operation": "transactions.list",
     "reason": "Bound candidate rule matches",
     "task_key": "TASK_KEY",
     "args": {
       "merchant": "MERCHANT",
       "since": "START",
       "until": "END",
       "limit": 100
     }
   })
   candor_get({
     "operation": "rules.list",
     "reason": "Inspect existing interpretation rules",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   ```

2. Prefer more one-record corrections if the selector or exceptions remain
   ambiguous.
3. Inspect `rules.create` and draft the narrowest selector and effect. Use
   `agent_verified` for exact or narrow evidence-backed interpretation. Use
   `user_approved` when the user supplied the merchant meaning or granted
   bounded transaction-maintenance authority.
4. Preview before application:

   ```text
   candor_write({
     "operation": "rules.preview",
     "reason": "Preview the proposed rule scope",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "args": {
       "rule_id": "RULE_ID",
       "since": "START",
       "until": "END"
     }
   })
   ```

5. Review every material match and exclusion. When the current task already
   grants authority, apply the exact preview without asking the user to approve
   the same interpretation again. Preserve the application batch for reversal:

   ```text
   candor_write({
     "operation": "rules.apply",
     "reason": "Apply the bounded user-authorized merchant rule",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "args": {
       "rule_id": "RULE_ID",
       "preview": "PREVIEW_ID"
     }
   })
   ```

Complete when the rule scope is bounded, representative exceptions were tested,
the applied set matches the approved preview, and a reversal handle exists.
