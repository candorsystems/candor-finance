> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.


# Recurring bills and subscriptions

The recurring list is yours to curate. Candor detects series from posted
history and projects when each is expected; you decide which are real, what
they are called, and what they mean. Treat a detected series as an
evidence-backed hypothesis, not proof of a contract or of the user's wish to
keep or cancel a service.

## Default purpose

Recurring is a curated schedule of predictable obligations: rent, mortgage
installments, subscriptions, memberships, insurance, and similar bills.
Repetition alone does not make a transaction belong here. For an initial pass,
prefer credible cadence and reasonably stable amounts. Do not bulk-confirm
card repayments, internal transfers, usage-based charges, or repeated
shopping just because they recur. A mortgage installment can belong even when
its cashflow role is `debt_payment`; that role alone cannot identify a card
repayment.

Clear recurring payments appear in Candor automatically. An
`active` detected row can be unconfirmed; `confirmed` says whether an approved
agent policy overrides the prediction. Uncertain series remain candidates and
are excluded from commitment totals. Preserve approved confirmations,
dismissals, declarations, and associations. Review exceptions and missing
obligations instead of requiring an initial bulk-confirmation pass.

Follow coverage and freshness caveats on the returned records. Missing history
does not establish that an agreement ended. Variable bills can be active predictions; their
amounts are estimates, not upcoming statement balances. Verify contractual
terms and user intent separately.

Count each obligation once. A card charge, its payment credit, and the bank
withdrawal funding it can describe one obligation across accounts. Inspect
source transactions and financial roles before correcting or dismissing a
redundant series; matching names, dates, and amounts alone do not prove a
transfer. Do not override conflicting approved curation without resolving it.

## Datasets

- `recurring`
- `transactions`
- `changes`
- `actions`
- `account_terms`

## Workspace resources

- `recurring.update` for confirming, renaming, re-timing, re-pricing,
  stopping, or dismissing a series; `recurring.create` for a series Candor
  has not seen; `recurring.revert` to drop your overrides.
- `notes` for verified terms, external context, or a timed outcome check.

## Non-goals

Whether a service is wanted is the user's call, and deciding they no longer
want it is not the same as asking you to end it. Cancelling is not something
Candor does, so carrying it out needs authority for that action specifically,
separate from the preference.

- Deciding that a service is unwanted.
- Cancelling or renegotiating a service.

## Method

- `candor_get({"operation":"recurring.list"})` returns a bounded, sorted view. Follow `next_actions`
  through the recurring dataset when incomplete before claiming the review is
  exhaustive. Each response's totals cover only its returned rows.
- `status` is the lifecycle. `candidate` is uncertain detected activity awaiting review; `active` is expected to keep posting; `stopped` is a real series
  that ended; `dismissed` is a false detection. `confirmed` and `source` say
  whether the reading is yours: a confirmed row carries your fields in place
  of the observed ones, and a declared row is one you created.
- Expected dates are windows, not due dates. `predicted_next_date` is the
  centre of `predicted_window`; a posting anywhere inside the window is on
  time, and `missed_count` only counts windows that closed with nothing
  posted. A missed series whose `possible_matches` names a related series on
  another account can indicate a move. Inspect both before changing either
  schedule. Say "around the 3rd", never "due on the
  3rd"; contractual due dates live in `account_terms`.
- Subscriptions are your interpretation, not a Candor noun. Narrow the list
  yourself: `direction: "outflow"` with `cashflow_role: "expense"` is the
  subscription-shaped subset, and `transfer`, `debt_payment`, and `refund`
  roles are not subscriptions however regular they look. Verify the agreement
  from its evidence before describing contractual terms or recommending changes.
- Subscription-shaped outflows are where quiet money sits: a price rise nobody
  agreed to, a duplicate service, a trial that converted, a charge that
  continued after cancellation. Compare `last_amount` against
  `average_amount` to catch a rise, and read `missed_count` and the changes
  domain to catch a series that stopped. Confirm a change from the exact
  transactions before describing it.
- Curate with the verbs, not by hand. Confirm a correct detection with
  `candor_write({"operation":"recurring.update","args":{"recurring_item_id":"ID","status":"active"}})`, or any field update, which confirms
  it too; confirm several candidates at once with `candor_write({"operation":"recurring.update","args":{"ids":"A,B,C","status":"active"}})`. Rename with `merchant_name`. For a detected series, this
  changes only its display name. Create the suggested merchant normalization
  rule when postings should group under the approved name; a display rename
  alone does not join old and new transaction labels. Pin
  a date with `next_expected_date` when the biller's day is known, widen the
  window with `date_tolerance_days` when postings drift, and set `ends_at` on
  a payment plan so remaining occurrences are counted.
- Declare what Candor cannot see. A bill the user names, an annual renewal
  with one posting, or a plan that has not started yet is `candor_write({"operation":"recurring.create"})`
  with the account, direction, cadence, amount, and next expected date. The
  response warns when a similar series already exists on that account;
  confirm that one instead of keeping two.
- Repair recurring merchant-name drift with `associate_from` after inspecting
  the proposed match. Renaming a recurring item changes its display name;
  association remembers the observed identity without changing transaction
  labels. Use normalization rules separately when transaction labels need a
  correction. A bill that moved to another account is two series by design:
  stop the old one and confirm the new one.
- Store `stopped` only when a real series ended and `dismissed` only when
  repeated activity was never a series. Both leave the default read; a
  stopped or dismissed series that posts again comes back as a change for you
  to revisit.
- Cross-check a contractual payment due date against account terms when the
  series is a debt payment. Treat a mismatch as a factual review cue, not proof
  that either source is wrong.
- When the user explains reusable merchant meaning, also load
  `candor-transaction-organization`, inspect the effective categories, and
  preserve a bounded correction or future rule when the evidence supports it.

## Evidence checklist

- At least two supporting observations or an authoritative source are present
  before a series is called real; a declared series states its source.
- Refunds, annual renewals, split billing, and merchant-name drift were
  considered.

## Candor query recipes

- For the scheduled curation pass, a coming-up read, declaring a bill, price
  or cadence changes, and cancellation follow-through, read
  [the executable workflows](references/workflows.md).
- Inspect enough exact supporting transactions to test alternate explanations
  before describing a recurring contract or price change.

## Caveats

- Transaction cadence does not establish contractual terms or user intent.
- A projection is a window around the usual posting day, not a due date.

## Safe Candor writebacks

- Confirming, renaming, re-timing, re-pricing, stopping, dismissing, or
  declaring a recurring series, and reverting your own overrides.
- Linked Markdown note with verified terms, caveats, or a revisit date.

## Domain decisions

Curating a requested schedule covers inspected confirmations, dismissals and
related factual repairs. Whether to keep a service or tolerate a higher price
depends on the user's priorities. Recommend conditionally when those are missing;
changing the external service requires its own authority.

## Stopping conditions

- Stop before cancellation or merchant contact unless the user separately
  authorizes that external action.

A candidate's `possible_matches` can identify existing curated series worth
inspecting. Inspect those before confirming a second series. To confirm
that a new wording belongs to the existing series, update the target id with
`associate_from` set to the candidate id. This records the observed label as
an account-scoped association between intact evidence groups, preserving the target's
cadence and active/stopped/dismissed state. Use an explicit association when the evidence establishes an alias. Each match lists `differences` the write refuses until they agree: a
`cashflow_role` difference means correct the role first; an `account_identity`
difference means the series live on different accounts, so a moved bill is
stopped on one and confirmed on the other, never associated. Competing owners,
currencies, and directions must be resolved first. A dismissal carries across
approved aliases; it does not suppress unrelated charges from that merchant.

Automatic predictions and candidates do not establish missed obligations.
Use inspected evidence or authoritative user context before asserting a contract
or pinning an approved payment calendar.

When opening or a recurring list is incomplete, follow its `data.query`
continuation for the recurring dataset. Dataset pages use stored-record order;
filters can leave an empty page that still has a continuation. Keep following
`next_actions` before claiming the scan is complete. Records, calculations,
and pagination belong to `data.page`. An exact recurring ID remains readable
independently of the bounded list, and incomplete association proposals are
explicitly marked.

Approve `amount_min` and `amount_max` together for variable bills. Both use
Money text in the series currency and must contain the expected `amount`.
Use historical transactions to choose the range. Candor supplies no percentage
tolerance. Without a range, matching is exact; setting `amount` alone resets
an existing range to exact matching. Category or identity updates preserve it.

Approved schedules keep their cadence and date window as postings arrive.
`payments` identifies the transactions satisfying individual scheduled dates;
`unmatched_payment_transaction_ids` identifies extra or out-of-bounds evidence
that did not satisfy a payment. One posting satisfies one occurrence. Later
payments never erase an earlier miss or silently move the calendar. Resolve
exceptions by inspecting the transaction and correcting the schedule terms
when warranted. An older confirmation without a fixed anchor needs an explicit
`next_expected_date` and `amount` before payment matching can be enabled.

Associating a candidate is a targeted write, independent of the bounded list.
It preserves the underlying records. Reverting the target drops its overrides
and associations; the independent observations remain available for curation.
