# Recurring-bill workflows

## Review recurring outflows

1. Inspect factual changes and reconciled recurring views:

   ```sh
   candor changes list --domain recurring --limit 100 --reason "Inspect recurring factual changes" --task-key TASK_KEY
   candor recurring list --limit 100 --reason "Inspect reconciled recurring items" --task-key TASK_KEY
   candor recurring candidates --direction outflow --cashflow-role expense --limit 100 --reason "Inspect unconfirmed recurring candidates" --task-key TASK_KEY
   candor data query account_terms --limit 100 --reason "Cross-check contractual debt-payment due dates where relevant" --task-key TASK_KEY
   ```

   Narrow on the request, not on the returned page. Candidates rank across
   every cashflow role and the endpoint has no cursor, so a vault with enough
   higher-ranked transfers, debt payments, or inflows can push every
   subscription-shaped expense off the only page you get. The filters
   `direction: "outflow"` and `cashflow_role: "expense"` apply before the limit;
   drop either input when you want the wider set. Then rank by `frequency`,
   `amount_variance_ratio`, and `observed_count`. Each candidate also carries
   the exact merchant-scoped drill-down for its own evidence.

   This is the same read Candor would serve from a dedicated "subscriptions"
   command, which is why there is not one: a subscription is an interpretation
   of a recurring expense, and that judgment is yours.

2. For a material item, inspect exact supporting transactions and merchant
   history across enough cycles:

   ```sh
   candor transactions list --merchant MERCHANT --since START --until END --limit 100 --reason "Verify recurring evidence for MERCHANT" --task-key TASK_KEY
   ```

3. Test refunds, reversals, annual renewals, split billing, missed periods,
   amount variance, merchant-name drift, and service bundles.
4. Ask whether the user recognizes and values the service only when that
   interpretation is still missing. Transaction cadence cannot answer it.
5. Persist the result instead of leaving it in chat:

   - use `status: "not_recurring"` when the pattern is a false recurring
     detection;
   - use `status: "stopped"` when a real recurring series ended;
   - use `status: "active"` or `status: "changed"` for a confirmed live series.

   Inspect the current request contract, create the policy file, and apply it
   under the user's task-scoped authority:

   ```sh
   candor catalog describe recurring.policy.set --json
   candor recurring policy set --file POLICY.json --reason "Preserve the verified recurring interpretation" --task-key TASK_KEY --parent-action ACTION_ID
   ```

6. If the user's explanation also defines merchant meaning or category, load
   `candor-transaction-organization`. Inspect the effective transaction state,
   then create a bounded correction or future rule as appropriate.

Complete when each surfaced item is either understood, needs a bounded factual
follow-up, or has durable recurring state with a reason; no cancellation intent
is inferred.

## Investigate a price or cadence change

1. Identify the exact before and after transactions, comparison periods,
   currencies, and cadence.
2. Verify plan identity and current price from an authoritative merchant
   account page, invoice, contract, or published terms as authorized.
3. Distinguish a price increase from taxes, usage, add-ons, foreign exchange,
   proration, discounts ending, annual billing, or merchant corrections.
4. Quantify observed annualized difference only when the cadence is credible,
   and state the evidence and sensitivity.
5. Research current plan paths, bundles, or retention terms only from current
   sources. Do not imply availability or user eligibility without evidence.

Complete when the factual change, plausible explanations, current terms, and
decision-relevant annual effect are explicit.

## Prepare and verify external follow-through

1. If the user wants cancellation or negotiation, prepare an evidence packet:
   service identity, account-safe identifier, current terms, charge history,
   desired outcome, deadline, and caveats.
2. Ask separately for authority before contacting the merchant or changing the
   service.
3. After authorized external action, create a timed note for expected
   confirmation, final charge, refund, or continued-billing check:

   ```sh
   candor notes create --file NOTE.json --reason "Track recurring-bill follow-through" --task-key TASK_KEY --parent-action ACTION_ID
   ```

4. Verify the outcome from an authoritative confirmation and later Candor
   transactions. Resolve the note only when the expected result is observed.

Complete when the external action remains attributable to the user's authority
and the financial result is verified rather than merely requested.
