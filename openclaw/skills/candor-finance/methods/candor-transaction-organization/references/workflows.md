# Transaction-organization workflows

## Correct one transaction

1. Inspect the canonical transaction, existing correction, merchant neighbors,
   and related actions:

   ```sh
   candor transactions get TRANSACTION_ID --reason "Inspect the transaction before correction" --task-key TASK_KEY
   candor corrections list --transaction TRANSACTION_ID --limit 100 --reason "Inspect existing transaction corrections" --task-key TASK_KEY
   candor transactions split get TRANSACTION_ID --reason "Inspect any existing split" --task-key TASK_KEY
   candor actions list --limit 100 --reason "Recover transaction interpretation history" --task-key TASK_KEY
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

   ```sh
   candor catalog describe corrections.create --json
   candor corrections create TRANSACTION_ID --category CATEGORY --reason "Apply the user-approved transaction correction" --task-key TASK_KEY --parent-action ACTION_ID
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

   ```sh
   candor transactions split set --file SPLIT.json --reason "Store the user-approved transaction split" --task-key TASK_KEY --parent-action ACTION_ID
   ```

5. Re-read the split and downstream effective transaction view. Use
   `transactions.split.revert` if the user later approves reversal.

Complete when the parts reconcile exactly and the stored split matches the
approved draft.

## Promote repeated evidence to a rule

1. Query a bounded representative population and explicit counterexamples:

   ```sh
   candor transactions list --merchant MERCHANT --since START --until END --limit 100 --reason "Bound candidate rule matches" --task-key TASK_KEY
   candor rules list --limit 100 --reason "Inspect existing interpretation rules" --task-key TASK_KEY
   ```

2. Prefer more one-record corrections if the selector or exceptions remain
   ambiguous.
3. Inspect `rules.create` and draft the narrowest selector and effect. Use
   `agent_verified` for exact or narrow evidence-backed interpretation. Use
   `user_approved` when the user supplied the merchant meaning or granted
   bounded transaction-maintenance authority.
4. Preview before application:

   ```sh
   candor rules preview RULE_ID --since START --until END --reason "Preview the proposed rule scope" --task-key TASK_KEY --parent-action ACTION_ID
   ```

5. Review every material match and exclusion. When the current task already
   grants authority, apply the exact preview without asking the user to approve
   the same interpretation again. Preserve the application batch for reversal:

   ```sh
   candor rules apply RULE_ID --preview PREVIEW_ID --reason "Apply the bounded user-authorized merchant rule" --task-key TASK_KEY --parent-action ACTION_ID
   ```

Complete when the rule scope is bounded, representative exceptions were tested,
the applied set matches the approved preview, and a reversal handle exists.
