# Portfolio and fee workflows

## Establish visible portfolio coverage

1. Inspect account, holding, transaction, and valuation coverage:

   ```sh
   candor coverage get --reason "Check investment-data coverage" --task-key TASK_KEY
   candor accounts list --limit 100 --reason "Identify visible investment accounts" --task-key TASK_KEY
   candor holdings list --limit 100 --reason "Inspect visible holdings" --task-key TASK_KEY
   candor portfolio snapshot --reason "Summarize visible investment balances" --task-key TASK_KEY
   candor data schema investment_transactions --reason "Inspect investment activity fields" --task-key TASK_KEY
   candor data query investment_transactions --limit 100 --reason "Inspect bounded investment activity" --task-key TASK_KEY
   ```

2. Preserve quantity, price, value, currency, and as-of time separately. Do not
   treat a missing or stale price as current value.
3. Identify omitted accounts, unsupported holdings, unpriced assets, external
   managers, and currency gaps.

Complete when the visible population, valuation times, unsupported positions,
and coverage limitations are explicit.

## Review fund and advisory fees

1. Confirm the exact security share class and account/advisor arrangement.
2. Research current expense ratios, advisory schedules, platform fees,
   transaction fees, waivers, breakpoints, and effective dates. Prefer the
   current prospectus, official fee schedule, regulatory filing, or signed
   agreement over aggregators.
3. Record publisher, security/account identity, URL/document, effective date,
   retrieval date, fee basis, tiers, exclusions, and user applicability.
4. Estimate annualized cost using the visible value and sourced fee basis.
   Label it as an estimate because values change and tiered or transaction-based
   fees may not scale linearly.
5. Separate product expense, advisory fee, platform fee, transaction cost, tax
   effect, and any unmodeled indirect cost. Avoid summing overlapping fees.

Complete when each modeled cost is tied to a current source and correct
security/account identity, with coverage and calculation assumptions visible.

## Investigate cash drag or concentration

1. Use the visible holdings and balances to calculate factual weights by
   account, security, issuer, asset label, and currency only where the declared
   fields support the grouping.
2. Do not infer risk suitability, tax consequences, liquidity needs, or target
   allocation. Ask for the user's objectives, constraints, time horizon, and
   broader holdings when those facts affect interpretation.
3. For cash yield, load the cash-liquidity-yield skill and research current
   product terms. For tax lots or restrictions not in Candor, obtain authorized
   source documents.
4. Present the current course and alternatives as conditional scenarios. Any
   trade, rebalance, transfer, or account change remains external.

Complete when the factual exposure is reproducible and the boundary between
measurement and personalized investment judgment is explicit.
