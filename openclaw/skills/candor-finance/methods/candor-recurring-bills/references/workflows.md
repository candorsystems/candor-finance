# Recurring-bill workflows

## Keep the list right (scheduled pass or an explicit clean-up)

1. Read what changed and what needs judgement:

   ```sh
   candor changes list --domain recurring --limit 100 --reason "Inspect recurring changes since the last pass" --task-key TASK_KEY
   candor recurring list --status candidate --limit 100 --reason "Judge detected series awaiting confirmation" --task-key TASK_KEY
   candor recurring list --limit 100 --reason "Review the expected schedule" --task-key TASK_KEY
   ```

   A change names its series and the `candor recurring get` handle to inspect. A
   missed window is often a late payment or a card change; a series that
   posted after being stopped or dismissed may be real after all; a series
   posting past its end date may have been extended.

2. For a candidate or a change worth a decision, inspect the exact postings:

   ```sh
   candor recurring get RECURRING_ITEM_ID --reason "Inspect the evidence behind a series" --task-key TASK_KEY
   ```

   Follow the returned `transactions.get` actions in `next_actions` to the
   exact postings using their supplied arguments, preserving the task and
   parent-action context. Do not substitute a merchant search:
   normalized labels can differ from source labels, and one merchant can
   have multiple series. The shortcuts cover recent evidence; for older
   evidence, read the transaction IDs in the detail's `basis.transactionIds`.

3. Persist the judgement with the verbs, under the user's task-scoped
   authority:

   ```sh
   candor recurring update RECURRING_ITEM_ID --status active --reason "Confirm a series the evidence supports" --task-key TASK_KEY --parent-action ACTION_ID
   candor recurring update --ids ID_A,ID_B,ID_C --status active --reason "Confirm several clear subscriptions at once" --task-key TASK_KEY --parent-action ACTION_ID
   candor recurring update RECURRING_ITEM_ID --merchant-name "Gym" --next-expected-date 2026-10-03 --date-tolerance-days 3 --reason "Name the series and pin its usual day" --task-key TASK_KEY --parent-action ACTION_ID
   candor recurring update RECURRING_ITEM_ID --status stopped --reason "The series ended; no posting since the cancellation" --task-key TASK_KEY --parent-action ACTION_ID
   candor recurring update RECURRING_ITEM_ID --status dismissed --reason "Repeated visits, not a bill" --task-key TASK_KEY --parent-action ACTION_ID
   candor recurring revert RECURRING_ITEM_ID --reason "Drop an override that no longer matches the evidence" --task-key TASK_KEY --parent-action ACTION_ID
   ```

   A rename suggests the merchant rule that makes the name stick on the
   transactions; create it when the label should apply to future postings.
   Merchant-name drift that split one bill into two series is merged by that
   rule, not by dismissing one half. A bill that moved accounts is a stop on
   the old series and a confirmation on the new one.

Complete when every candidate and change is either confirmed, declared,
stopped, dismissed, or left with a bounded factual follow-up, and the default
list reads as the user's schedule.

## Answer "what is coming up"

1. Read the horizon and the totals:

   ```sh
   candor recurring list --due-within 30 --reason "List expected postings for the coming month" --task-key TASK_KEY
   ```

   Past-expected series come first, then the rest by expected date. Describe dates
   as "around" the expected day; the window is the fact. The totals cover the
   rows returned, with excluded counts by reason, so say when candidates or
   irregular series were left out.

2. For a longer view, read without the horizon and lay quarterly, semiannual,
   and annual series against the months they land in.

## Declare a bill Candor has not seen

1. Find the account, then declare the series with its next expected date:

   ```sh
   candor accounts list --reason "Find the account the bill posts to" --task-key TASK_KEY
   candor recurring create --label "Rent" --account-identity-id ACCOUNT_IDENTITY_ID --direction outflow --cadence monthly --amount 1500.00 --currency USD --next-expected-date 2026-10-01 --category Housing --reason "The user named their rent so it shows on the schedule" --task-key TASK_KEY --parent-action ACTION_ID
   candor recurring create --label "Sofa plan" --account-identity-id ACCOUNT_IDENTITY_ID --direction outflow --cadence monthly --amount 90.00 --currency USD --next-expected-date 2026-10-15 --ends-at 2027-03-15 --reason "Track a payment plan through its last instalment" --task-key TASK_KEY --parent-action ACTION_ID
   ```

2. If the response warns of a likely duplicate, confirm the existing series
   instead and dismiss the one that should not stand. Postings under the
   declared label attach to the declared series at the next sync.

## Investigate a price or cadence change

1. Identify the exact before and after transactions, comparison periods,
   currencies, and cadence; `last_amount` against `average_amount` is the
   cue, the postings are the evidence.
2. Verify plan identity and current price from an authoritative merchant
   account page, invoice, contract, or published terms as authorized.
3. Distinguish a price increase from taxes, usage, add-ons, foreign exchange,
   proration, discounts ending, annual billing, or merchant corrections.
4. Quantify observed annualized difference only when the cadence is credible,
   and state the evidence and sensitivity.
5. Research current plan paths, bundles, or retention terms only from current
   sources. Do not imply availability or user eligibility without evidence.
6. Record the new expected amount with `candor recurring update ID --amount 25.00 --currency USD` (using the actual amount and currency) when the
   change is established, so the schedule reads right.

Complete when the factual change, plausible explanations, current terms, and
decision-relevant annual effect are explicit.

## Prepare and verify external follow-through

1. If the user wants cancellation or negotiation, prepare an evidence packet:
   service identity, account-safe identifier, current terms, charge history,
   desired outcome, deadline, and caveats.
2. Ask separately for authority before contacting the merchant or changing the
   service.
3. After authorized external action, create a timed note for expected
   confirmation, final charge, refund, or continued-billing check:

   ```sh
   candor notes create --file NOTE.json --reason "Track recurring-bill follow-through" --task-key TASK_KEY --parent-action ACTION_ID
   ```

4. Verify the outcome from an authoritative confirmation and later Candor
   transactions; a series that keeps posting after cancellation comes back as
   a change. Stop the series only when the last expected posting has passed,
   and resolve the note only when the expected result is observed.

Complete when the external action remains attributable to the user's authority
and the financial result is verified rather than merely requested.
