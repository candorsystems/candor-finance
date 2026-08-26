
# Recurring bills and subscriptions

Treat recurring patterns as evidence-backed hypotheses, not proof of a contract
or of the user's desire to cancel a service.

## Datasets

- `recurring`
- `transactions`
- `changes`
- `actions`
- `account_terms`

## Workspace resources

- Use recurring policies for confirmed series meaning.
- Use `notes` for verified terms, external context, or a timed outcome check.

## Non-goals

Whether a service is wanted is the user's call, and deciding they no longer
want it is not the same as asking you to end it. Cancelling is not something
Candor does, so carrying it out needs authority for that action specifically,
separate from the preference.

- Deciding that a service is unwanted.
- Cancelling or renegotiating a service.

## Method

- Candor reports recurring candidates. Deciding which of them are
  subscriptions is your judgement, not a separate Candor noun, because the
  distinction depends on what the user actually signed up for. Narrow a
  candidate list yourself: `direction: "outflow"` with
  `cashflow_role: "expense"` is the subscription-shaped subset, and
  `transfer`, `debt_payment`, and `refund` roles are not subscriptions however
  regular they look.
- Weigh subscription likelihood separately from cadence confidence. A high
  `confidence` only says the cadence is regular. Prefer `monthly` or `annual`
  `frequency`, a low `amount_variance_ratio`, and an `observed_count` of three
  or more. Treat a merchant category such as groceries, transport, or general
  retail as weak evidence even when the cadence is perfect, because regular
  spending at one merchant is not a contract.
- This distinction is worth drawing because subscription-shaped outflows are
  where quiet money sits: a price rise nobody agreed to, a duplicate service,
  a trial that converted, a charge that continued after cancellation. Compare
  `last_amount` against `average_amount` to catch a rise, and
  `predicted_next_date` against today to catch a series that stopped.
- Treat the recurring summary as routing evidence, not the conclusion. Group
  each plausible series' exact transactions chronologically and compare the
  latest two observations with the preceding two when coverage permits. That
  distinguishes a sustained change from an average, a one-off variation, or a
  noisy cadence model.
- Use recurring evidence as a hypothesis about cadence, not proof of a contract.
- Inspect supporting transactions, merchant identity, amount variance, and the
  comparison period.
- Cross-check a contractual payment due date against account terms when the
  recurring series is a debt payment. Treat a mismatch as a factual review cue,
  not proof that either source is wrong.
- Ask the user or obtain authoritative terms before concluding that a charge is
  unwanted or cancellable.
- Store `stopped` only when a real recurring series ended. Store
  `not_recurring` when repeated activity was misidentified as a recurring
  series. The latter suppresses the false candidate durably until reverted.
- When the user explains reusable merchant meaning, also load
  `candor-transaction-organization`, inspect the effective categories, and
  preserve a bounded correction or future rule when the evidence supports it.

## Evidence checklist

- At least two supporting observations or an authoritative source are present.
- Refunds, annual renewals, split billing, and merchant-name drift were
  considered.

## Candor query recipes

- For recurring reviews, price or cadence changes, and cancellation
  follow-through, read [the executable workflows](references/workflows.md).
- Inspect enough exact supporting transactions to test alternate explanations
  before describing a recurring contract or price change.

## Caveats

- Transaction cadence does not establish contractual terms or user intent.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the merchant, charges, dates, uncertainty, and available next
choices directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Approved recurring policy.
- Linked Markdown note with verified terms, caveats, or a revisit date.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize recurring items
  grants task-scoped authority for inspected, reversible recurring policies and
  directly related transaction organization. Do not ask again for each item.
- Confirm choices that reflect the user's values separately. Whether a
  subscription is worth keeping, and what a price increase is worth tolerating,
  encode the user's values, so ask rather than deciding from cost alone.
- Ask when the intended interpretation is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop before cancellation or merchant contact unless the user separately
  authorizes that external action.
