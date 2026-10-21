
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
usage-based charges or repeated shopping just because they recur. Each series
carries a `kind`: `bill`, `subscription`, `loan_payment`, and `income` are
commitments and count toward commitment totals; `card_payment` and `transfer`
are cash movements, totaled apart in `cash_movements` and never added to
commitments, because the purchases a card payment settles were already
counted. A mortgage installment is a `loan_payment` even when its cashflow
role is `debt_payment`; that role alone cannot identify a card repayment.

Clear recurring payments appear in Candor automatically. An
`active` detected row can be unconfirmed; `confirmed` says whether a policy
the agent set overrides the prediction. Uncertain series remain candidates and
are excluded from commitment totals. Preserve saved confirmations,
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
transfer. Do not override a conflicting saved policy without resolving it.

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

- `candor recurring list` returns a bounded, sorted view. Follow `next_actions`
  through the recurring dataset when incomplete before claiming the review is
  exhaustive. Each response's totals cover only its returned rows.
- `status` is the lifecycle. `candidate` is uncertain detected activity awaiting review; `active` is expected to keep posting; `stopped` is a real series
  that ended; `dismissed` is a false detection. `confirmed` and `source` say
  whether the reading is yours: a confirmed row carries your fields in place
  of the observed ones, and a declared row is one you created.
- Expected dates are windows, not due dates. `predicted_next_date` is the
  centre of `predicted_window`; a posting anywhere inside the window is on
  time. `overdue` is true only when a window closed with no posting matched
  to the series, judged up to the day its accounts last synced, and
  `overdue_since` names that window's date. `paid_this_cycle` says the
  current occurrence is already paid. An overdue series whose
  `possible_matches` names a related series on another account can indicate
  a move. Inspect both before changing either
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
  `average_amount` to catch a rise, and read `overdue` and the changes
  domain to catch a series that stopped. Confirm a change from the exact
  transactions before describing it.
- `kind` is detection's reading of what the series is. When it is wrong (a
  card payment read as a bill, a transfer read as income), set it with
  `candor recurring update ID --kind card_payment`; detection keeps your kind
  on later runs, and a declaration takes `kind` too.
- A series keeps only its latest matched postings: `last_paid_at` and
  `last_amount` are the newest. Read its history with `transactions.list`
  for the payee in `match_rule` (on its account when the rule names one);
  `recurring.get` offers that read and the latest postings as next steps.
- Curate with the verbs, not by hand. Confirm a correct detection with
  `candor recurring update ID --status active`, or any field update, which confirms
  it too; confirm several candidates at once with `candor recurring update --ids A,B,C
  --status active`. Rename with `merchant_name`. For a detected series, this
  changes only its display name. Create the suggested merchant normalization
  rule when postings should group under the saved name; a display rename
  alone does not join old and new transaction labels. Pin
  a date with `next_expected_date` when the biller's day is known, widen the
  window with `date_tolerance_days` when postings drift, and set `ends_at` on
  a payment plan so remaining occurrences are counted.
- Declare what Candor cannot see. A bill the user names, an annual renewal
  with one posting, or a plan that has not started yet is `candor recurring create`
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
inspecting. Inspect those before confirming a second series. A
`same_amount_and_cadence` reason means the same exact amount on the same
account and a compatible schedule under a different label; read both
series' postings before treating them as one charge. To confirm
that a new wording belongs to the existing series, update the target id with
`associate_from` set to the candidate id. This records the observed label as
an account-scoped association between intact evidence groups, preserving the target's
cadence and active/stopped/dismissed state. Use an explicit association when the evidence establishes an alias. Each match lists `differences` the write refuses until they agree: a
`cashflow_role` difference means correct the role first; an `account_identity`
difference means the series live on different accounts, so a moved bill is
stopped on one and confirmed on the other, never associated. Competing owners,
currencies, and directions must be resolved first. A dismissal carries across
associated aliases; it does not suppress unrelated charges from that merchant.

Automatic predictions and candidates do not establish missed obligations.
Use inspected evidence or authoritative user context before asserting a contract
or pinning a payment calendar.

When opening or a recurring list is incomplete, follow its `data.query`
continuation for the recurring dataset. Dataset pages use stored-record order;
filters can leave an empty page that still has a continuation. Keep following
`next_actions` before claiming the scan is complete. Records, calculations,
and pagination belong to `data.page`. An exact recurring ID remains readable
independently of the bounded list, and incomplete association proposals are
explicitly marked.

Postings join a series as they are written, by its `match_rule`: an exact
payee key, the series' direction and currency, and its account when the rule
names one. Without a saved range, a posting joins when its amount is one of
the rule's `price_levels` or falls near the series' own recent amounts. Set
`amount_min` and `amount_max` together to replace that range, wider or
narrower; a posting outside your range does not join the series. Both use Money text in the series currency and must contain the
expected `amount`. Use historical transactions to choose the range. Setting
`amount` alone drops a saved range back to the history default. Category
or identity updates preserve it.

Pinned schedules keep their cadence and date window as postings arrive. The
next date projects from the last matched posting, or from a pinned
`next_expected_date` while it is later. Each posting joins at most one
series. When a payment you expected did not join (a renamed payee, an amount
outside your range), inspect the transaction and correct the schedule terms
or the range when warranted.

Associating a candidate is a targeted write, independent of the bounded list.
It preserves the underlying records. Reverting the target drops its overrides
and associations; the independent observations remain available for curation.
