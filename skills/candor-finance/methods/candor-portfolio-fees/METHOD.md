> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.


# Portfolio and fee analysis

Calculate factual exposures and fee scenarios to inform your recommendations. Distinguish
measured exposure from suitability judgments and approved trading decisions.

## Datasets

- `holdings`
- `holding_valuations`
- `investment_transactions`
- `balances`
- `actions`

## Workspace resources

- Use the `notes` resource for linked Markdown context and follow-up.

## Non-goals

- Inferring suitability or an approved allocation from holdings alone.
- Trading or transferring assets.

## Method

- Confirm holding coverage, valuation time, account type, and currency.
- Read current value from `market_value` when a holding is quoted and from
  `value` otherwise; `market_price_as_of` says how current the quote is, and
  an account's `balance_basis` says whether its balance is market-valued.
- Read value over time from `holding_valuations` (one record per holding per
  day) and `candor_get({"operation":"metrics.history","args":{"metric":"investment_value"}})`. Holding
  valuations start with the first nightly valuation after the account joined
  (accounts that predate daily recording start when it began) and are never
  backfilled; investment_value also anchors on earlier reported balances, so
  its older points are the institution's figures rather than position
  valuations.
- Read investment activity from `investment_transactions`. Use only `status: active`
  rows in calculations; removed rows retain withdrawn source evidence. Security
  names, symbols, and ISINs may be available even for positions no longer held.
  Check investment-transaction coverage separately from holdings freshness.
- Source fund expense ratios, advisory fees, and restrictions from current
  authoritative documents.
- Calculate exposure and fee scenarios as facts. Use them with the user's
  context to assess fit; do not present an estimate as an approved allocation.

## Evidence checklist

- Position quantities and prices have as-of timestamps.
- A period figure from valuations is value change, not return: contributions,
  withdrawals, dividends, and sales are inside it until investment activity is
  reconciled.
- External fee terms are current, attributed, and tied to the correct security or
  account.

## Candor query recipes

- For portfolio coverage, value history, fee review, cash drag, and
  concentration analysis, read
  [the executable workflows](references/workflows.md).
- Verify the exact security share class or account arrangement before applying
  externally researched fee terms.

## Caveats

- Visible holdings may be partial and market values change.
- A holding without a listing symbol, or one imported without `market: US`,
  keeps its source value: it does not move with market quotes, but it
  changes whenever the source reports a new value.
- Fee comparison is not investment advice or a trade recommendation.

## Safe Candor writebacks

- Linked Markdown note with verified fee terms, caveats, or a revisit date.

## Domain decisions

You assess fit and recommend using the user's objectives, tax context and risk
preferences. Make missing inputs explicit. Current holdings do not establish
an approved allocation, and analysis does not authorize a trade.

## Stopping conditions

- Stop before personalized allocation advice when objectives, tax context, or
  risk preferences are missing.
- Stop before any trade or account transfer.

## Investment activity evidence

Use `activity_kind` for Candor's shared activity semantics. The original `type`
and `subtype` remain source evidence. `other` means the source semantics were
not normalized. A reinvestment or deposit does not establish an external
contribution for a return calculation. Exclude removed records.

History coverage retains the last successful window when a refresh fails.
Read `latest_attempt_status` separately from `last_successful_sync_at`. Plaid
usually refreshes a 90-day overlap and reconciles its available 24-month window
at least every 30 days when syncing; older retained activity is preserved.
Corrections outside the recent window can wait until that reconciliation.
Coverage excludes retired accounts. An incomplete history collection leaves
prior activity unchanged and reports unavailable coverage for that attempt;
partially fetched rows do not become new or updated canonical activity.

If coverage reports `refresh_failed`, inspect the sync run's `apply_failure`
for its safe code, stage, and record counts. Automatic retries are bounded. Use
`sync.refresh` with `force: true` to resume the staged attempt; repeating refreshes cannot fix
an invalid record or a resource-limit defect.
