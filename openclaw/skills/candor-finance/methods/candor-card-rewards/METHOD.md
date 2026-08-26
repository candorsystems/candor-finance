
# Credit-card rewards

Model rewards from bounded spend and current issuer terms without reducing a
credit decision to reward value alone.

## Datasets

- `accounts`
- `transactions`

## Workspace resources

- Use the `notes` resource for linked Markdown context and follow-up.

## Non-goals

- Recommending credit based only on rewards.
- Applying for, closing, or changing a card.

## Method

- Inventory confirmed cards and annual fees without requesting full account
  numbers.
- Use current issuer terms for earning rates, caps, credits, exclusions, and
  effective dates.
- Estimate scenarios from bounded historical spend and label unmodeled
  acceptance, redemption, tax, and behavioral constraints.

## Evidence checklist

- Card ownership and product identity are confirmed.
- Reward rules are current, sourced, and linked separately from user
  applicability.

## Candor query recipes

- For card inventory, current-card routing, and annual-fee or product-change
  reviews, read [the executable workflows](references/workflows.md).
- Use the transaction account filter for card-specific spend. Reserve a bounded
  snapshot for analysis that genuinely needs multiple declared datasets in one
  artifact, not merely to assign transactions to a card.

## Caveats

- Historical spend is not a promise of future value.
- A higher modeled reward does not establish that opening, closing, or using a
  card is appropriate.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Linked Markdown note with verified terms, caveats, or a revisit date.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded card or
  rewards area grants task-scoped authority for the inspected, reversible
  Candor writebacks needed to finish it. Do not ask again for each record.
- Confirm choices that reflect the user's values separately. A card
  preference, redemption choice, or accepted tradeoff encodes the user's
  values, so ask rather than inferring it from spending patterns.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop before recommending an application when material fees, credit effects,
  or user preferences are unknown.
- Stop before any application, closure, or product change.
