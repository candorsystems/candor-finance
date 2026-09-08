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

Candor supplies candidates with observed cadence, amounts, uncertainty, and
supporting transactions. Detection never activates, stops, or dismisses a series, regardless of its
age, category, or amount stability. Missed windows remain evidence for you to review. You decide what belongs in the schedule and
confirm or declare it. The candidate pool refreshes from up to 1,000 visible
posted transactions; an uncurated item can leave that pool as evidence changes
or moves outside the scan. Transactions remain available for investigation,
and confirmed items and declarations retain their state. Inspect older history
and declare missing obligations when the task requires them. Candidates do not
contribute to commitment totals. Use an initial setup pass to establish the
schedule and later passes to maintain it.

Preserve existing agent confirmations and declarations, including variable
payments. Do not remove curated exceptions merely to apply these defaults.
When the user's purpose supports including a variable bill, confirm it
explicitly and record why in the approval note. Its amount remains an estimate,
not a known upcoming statement balance. The current candidate pool is available
for review and excluded from active commitment totals.

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

- One read is the whole job: `candor_get({"operation":"recurring.list"})` returns every series in one
  shape, sorted overdue first and then by next expected date with candidates
  last, and carries monthly-equivalent and annual totals over the rows it
  returned. The `due_within: 30` filter answers "what is coming up";
  `status: "candidate"` is what still needs your judgement;
  `status: "stopped,dismissed"` is history.
- `status` is the lifecycle. `candidate` is detected activity you have not
  included; `active` is expected to keep posting; `stopped` is a real series
  that ended; `dismissed` is a false detection. `confirmed` and `source` say
  whether the reading is yours: a confirmed row carries your fields in place
  of the observed ones, and a declared row is one you created.
- Expected dates are windows, not due dates. `predicted_next_date` is the
  centre of `predicted_window`; a posting anywhere inside the window is on
  time, and `missed_count` only counts windows that closed with nothing
  posted. Say "around the 3rd", never "due on the 3rd"; contractual due dates
  live in `account_terms`.
- Subscriptions are your interpretation, not a Candor noun. Narrow the list
  yourself: `direction: "outflow"` with `cashflow_role: "expense"` is the
  subscription-shaped subset, and `transfer`, `debt_payment`, and `refund`
  roles are not subscriptions however regular they look. Weigh subscription
  likelihood separately from cadence: prefer `monthly` or `annual`, a low
  `amount_variance_ratio`, and an `observed_count` of three or more, and treat
  groceries, transport, or general retail as weak evidence even when the
  cadence is perfect.
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
- Repair merchant-name drift with an evidence-backed merchant normalization
  rule. Renaming a recurring item changes its display name; it does not create
  transaction aliases. Inspect affected series after normalization and explicitly
  retire redundant entries. Preserve separately curated placements unless you
  have authority and evidence to change them. A bill that moved to another
  account is two series by design: stop the old one and confirm the new one.
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

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the merchant, expected dates as "around" a day, amounts,
uncertainty, and available next choices directly. Do not expose Candor,
command names, status literals, provider-record mechanics, or other workspace
implementation details unless the user asks how the evidence was obtained.

## Safe Candor writebacks

- Confirming, renaming, re-timing, re-pricing, stopping, dismissing, or
  declaring a recurring series, and reverting your own overrides.
- Linked Markdown note with verified terms, caveats, or a revisit date.

## Approval boundaries

- An explicit request to handle, fix, clean up, organize, or keep up the
  recurring list grants task-scoped authority for inspected, reversible
  recurring writes and directly related transaction organization. Do not ask
  again for each series.
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
