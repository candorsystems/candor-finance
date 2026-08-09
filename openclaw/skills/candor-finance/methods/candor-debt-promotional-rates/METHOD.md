
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

- Personalized credit advice.
- Initiating payments or applications.

## Method

- Read effective account terms first. Separate source-backed observations,
  approved assertions, conflicts, and stale values from balances and payments.
- Verify material terms from a primary statement or issuer source and record
  effective and expiration dates.
- Model payoff scenarios with explicit assumptions. Do not present them as
  personalized advice without the user's agent's judgment.
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

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Curated terms import or approved term assertion with validity dates.
- Linked Markdown note for unstructured context or a revisit date.
- Approved debt-paydown goal.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded debt or
  promotional-rate area grants task-scoped authority for the inspected,
  reversible Candor writebacks needed to finish it. Do not ask again for each
  record.
- Confirm choices that reflect the user's values separately. A payoff
  priority, accepted interest cost, or ordering tradeoff encodes the user's
  values, so ask rather than inferring it from balances and rates.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop when contractual terms are unverified or stale.
- Stop before initiating a payment or balance transfer.
