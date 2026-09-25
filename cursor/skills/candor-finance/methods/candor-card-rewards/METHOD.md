> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.


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

## Safe Candor writebacks

- Linked Markdown note with verified terms, caveats, or a revisit date.

## Domain decisions

Compare options using observed spending and verified terms. Do not infer card
preferences, redemption choices or accepted tradeoffs from spending patterns,
or save a recommendation as the user's decision.

## Stopping conditions

- Stop before recommending an application when material fees, credit effects,
  or user preferences are unknown.
- Stop before any application, closure, or product change.
