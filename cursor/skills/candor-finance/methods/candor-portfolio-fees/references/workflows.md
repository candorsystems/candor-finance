> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Portfolio and fee workflows

## Establish visible portfolio coverage

1. Inspect account, holding, transaction, and valuation coverage:

   ```text
   candor_get({
     "operation": "coverage.get",
     "reason": "Check investment-data coverage",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "accounts.list",
     "reason": "Identify visible investment accounts",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "holdings.list",
     "reason": "Inspect visible holdings",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "portfolio.snapshot",
     "reason": "Summarize visible investment balances",
     "task_key": "TASK_KEY"
   })
   candor_schema({
     "dataset": "investment_transactions",
     "reason": "Inspect investment activity fields",
     "task_key": "TASK_KEY"
   })
   candor_query({
     "dataset": "investment_transactions",
     "reason": "Inspect bounded investment activity",
     "task_key": "TASK_KEY",
     "filters": {
       "limit": 100
     }
   })
   ```

2. Preserve quantity, price, value, currency, and as-of time separately. Do not
   treat a missing or stale price as current value.
3. Identify omitted accounts, unsupported holdings, unpriced assets, external
   managers, and currency gaps.

Complete when the visible population, valuation times, unsupported positions,
and coverage limitations are explicit.

## Review value over time

1. Read the investment value series and the per-holding daily records:

   ```text
   candor_get({
     "operation": "metrics.history",
     "reason": "Review investment value history",
     "task_key": "TASK_KEY",
     "args": {
       "metric": "investment_value",
       "range": "3m"
     }
   })
   candor_query({
     "dataset": "holding_valuations",
     "reason": "Inspect daily holding valuations",
     "task_key": "TASK_KEY",
     "filters": {
       "since": "2026-06-01",
       "limit": 100
     }
   })
   candor_query({
     "dataset": "holding_valuations",
     "reason": "Inspect one holding's value history",
     "task_key": "TASK_KEY",
     "filters": {
       "holding_id": "HOLDING_ID",
       "limit": 100
     }
   })
   candor_changes({
     "domain": "investments",
     "reason": "Review position changes",
     "task_key": "TASK_KEY"
   })
   ```

2. Treat `price_source: observed` days as flat source values, not market
   movement. Compare like with like: a series that mixes market and observed
   days understates movement on the observed days.
3. Describe a period figure as value change. Contributions, withdrawals,
   dividends, and sales sit inside it until investment activity is reconciled,
   so do not call it a return.
4. For the latest session's move on a quoted holding, use `market_price`
   against `market_previous_close` from the holdings read, and check
   `market_price_as_of` before calling it today's move: off-hours the quote
   is the prior session's close.

Complete when each stated movement names its window, its price basis, and
whether flows could be inside it.

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
