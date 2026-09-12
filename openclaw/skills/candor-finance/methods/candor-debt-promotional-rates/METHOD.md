
# Debt and promotional rates

Separate observed balances and payments from contractual claims, and make every
scenario conditional on verified terms.

## Datasets

- `accounts`
- `balances`
- `account_terms`
- `transactions`
- `goals`
- `budgets`

## Workspace resources

- Use the `notes` resource for linked Markdown context and follow-up.

## Non-goals

- Treating a rate comparison as a complete affordability assessment.
- Initiating payments or applications.

## Method

- Read effective account terms first. Separate source-backed observations,
  approved assertions, conflicts, and stale values from balances and payments.
- Verify material terms from a primary statement or issuer source and record
  effective and expiration dates.
- Model payoff scenarios with explicit assumptions, then use your judgment
  and the user's context to compare them.
- A terms-only investigation does not establish a payoff recommendation.
  Explain rate changes and consequences conditionally. Do not call paying down,
  transferring, or refinancing the best or highest-leverage move until the
  agent has considered the user's cash constraints, goals, alternatives, and
  relevant preferences. Offer to model those choices as a next step.

## Evidence checklist

- Balance timestamp and account identity are known.
- APR and promotional deadline have attributed sources and verification status.

## Candor query recipes

- For debt baselines, payoff scenarios, and promotional deadlines, read
  [the executable workflows](references/workflows.md).
- Missing terms are collection work: curate a structured terms import from an
  authoritative statement or set a user-approved assertion. Never estimate
  them from transactions.

## Caveats

- Transaction data may not contain contractual rates, fees, or minimum-payment
  formulas.

## Safe Candor writebacks

- Curated terms import or approved term assertion with validity dates.
- Linked Markdown note for unstructured context or a revisit date.
- Approved debt-paydown goal.

## Domain decisions

You may recommend a payoff order using verified terms, cash needs and user
priorities. A recommendation is not approval to save that order as a goal or
initiate payments. Label alternatives when a material preference is unknown.

## Stopping conditions

- Stop when contractual terms are unverified or stale.
- Stop before initiating a payment or balance transfer.
