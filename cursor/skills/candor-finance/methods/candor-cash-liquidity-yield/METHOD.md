> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.


# Cash, liquidity, and yield

Separate visible balances and cash needs from changing product rates and from
the user's preferences about safety, access, and complexity.

## Datasets

- `accounts`
- `balances`
- `transactions`
- `recurring`
- `budgets`
- `goals`
- `coverage`
- `account_terms`

## Workspace resources

- Use `notes` for sourced rate context and timed rechecks.

## Non-goals

- Moving money, opening an account, or choosing a product for the user.
- Treating every visible cash balance as available or idle.

## Method

- Confirm account ownership, role, currency, balance time, and data coverage.
- Estimate near-term needs and approved reserves before labeling cash idle.
- Read deposit APY and account constraints from effective account terms where
  present. Research missing or stale terms from authoritative sources at
  decision time.
- Compare scenarios after fees, access constraints, insurance or protection
  limits, taxes when material, and operational friction.

## Evidence checklist

- Visible cash and unavailable or excluded cash are separated.
- Near-term obligations, approved goals, and reserve assumptions are explicit.
- Every rate has field-level provenance, an effective or retrieval date,
  applicability, and a caveat.

## Candor query recipes

- For a liquidity baseline, yield comparison, or reserve check, read
  [the executable workflows](references/workflows.md).
- Use the debt skill separately when debt terms materially affect the tradeoff.

## Caveats

- Candor balances may omit institutions or restrictions and can become stale.
- Rates, insurance limits, eligibility, tax treatment, and withdrawal terms can
  change; search current authoritative sources instead of relying on memory.

## Safe Candor writebacks

- Approved reserve or savings goal.
- Curated terms import or approved term assertion for the user's own account.
- Linked Markdown note for external market options and a revisit date.

## Domain decisions

A balance is not a reserve target or authority to move cash. Recommend with
known liquidity needs and preferences; make missing constraints explicit before
presenting an allocation as the user's decision.

## Stopping conditions

- Stop when incomplete coverage or uncertain near-term needs could make the
  proposed amount unavailable.
- Stop before selecting a product or moving money without explicit authority.
