
# Portfolio and fee analysis

Calculate factual exposures and fee scenarios while leaving suitability,
allocation, and trading decisions to the user's agent under explicit authority.

## Datasets

- `holdings`
- `investment_transactions`
- `balances`
- `actions`

## Workspace resources

- Use the `notes` resource for linked Markdown context and follow-up.

## Non-goals

- Investment suitability or allocation advice.
- Trading or transferring assets.

## Method

- Confirm holding coverage, valuation time, account type, and currency.
- Source fund expense ratios, advisory fees, and restrictions from current
  authoritative documents.
- Calculate exposure and fee scenarios as facts. Leave suitability, allocation,
  and trade decisions to the user's agent under explicit authority.

## Evidence checklist

- Position quantities and prices have as-of timestamps.
- External fee terms are current, attributed, and tied to the correct security or
  account.

## Candor query recipes

- For portfolio coverage, fee review, cash drag, and concentration analysis,
  read [the executable workflows](references/workflows.md).
- Verify the exact security share class or account arrangement before applying
  externally researched fee terms.

## Caveats

- Visible holdings may be partial and market values change.
- Fee comparison is not investment advice or a trade recommendation.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Linked Markdown note with verified fee terms, caveats, or a revisit date.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded portfolio
  or fee area grants task-scoped authority for the inspected, reversible Candor
  writebacks needed to finish it. Do not ask again for each record.
- Confirm choices that reflect the user's values separately. Risk tolerance,
  allocation targets, and accepted cost tradeoffs encode the user's values, so
  ask rather than inferring them from current holdings.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop before personalized allocation advice when objectives, tax context, or
  risk preferences are missing.
- Stop before any trade or account transfer.
