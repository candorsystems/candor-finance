# Money-recovery workflows

## Investigate a duplicate charge or repeat fee

1. Inspect coverage and the exact transaction:

   ```sh
   candor coverage get --reason "Check transaction coverage for the recovery review" --task-key TASK_KEY
   candor transactions get TRANSACTION_ID --reason "Inspect the questioned transaction" --task-key TASK_KEY
   candor transactions list --merchant MERCHANT --since START --until END --limit 100 --reason "Compare nearby merchant charges" --task-key TASK_KEY
   ```

2. Compare posted versus pending state, date, amount, currency, merchant
   identity, description, account, refund or reversal evidence, split billing,
   and repeated service periods.
3. For a fee, inspect prior occurrences and current authoritative account terms
   before calling it avoidable or reversible.
4. Assemble the evidence for yourself: questioned ids, comparison ids, exact
   amounts, alternative explanations, contract or policy source, and the
   requested outcome. This is the material your note baseline is built from and
   what you would need if the user later asks you to substantiate the claim. It
   is not the shape of the answer; the ids in particular mean nothing to
   someone who cannot resolve them.
5. A packet that lands on “likely issue” describes an outcome nobody has
   settled yet, so it ends in a linked re-check note written before you answer,
   using the four parts from the base skill:

   ```sh
   candor notes create --file NOTE.json --reason "Track whether the questioned charge resolves" --task-key TASK_KEY --parent-action ACTION_ID
   ```

   Baseline the questioned and comparison ids with their exact money strings
   and dates plus the action id that produced them. Derive `revisit_at` from
   whichever follow-up could change the answer soonest: a reversal or credit
   posting for this charge, the processing window of an authorized dispute, or
   the statement that would carry it. The billing cadence is the right anchor
   only when the next charge is itself the evidence, as when you are waiting to
   see whether a price holds; keying a duplicate to it can park the check a year
   out on an annual bill.

Complete when the packet can support either “likely issue,” “explained,” or
“insufficient evidence” without relying on merchant text alone, and any open
outcome carries its re-check note.

## Track a missing credit, refund, or reimbursement

1. Establish the expectation from a receipt, cancellation confirmation, claim
   record, benefit policy, correspondence, or user-confirmed event. Record the
   expected amount or range, currency, payer, destination account, and expected
   date.
2. Search a bounded window that accounts for processing time and merchant-name
   drift:

   ```sh
   candor transactions list --since START --until END --limit 100 --reason "Search for the expected credit" --task-key TASK_KEY
   candor recurring list --limit 100 --reason "Check whether related billing continued" --task-key TASK_KEY
   ```

3. Match conservatively using direction, account, currency, merchant or payer,
   timing, description, and amount. A same-amount inflow alone is insufficient.
4. The outcome is still open unless the credit is matched and posted, or an
   authoritative source establishes it is not coming. Create the linked re-check
   note before you answer, whether the credit is not yet due, overdue, or
   waiting on authorized external follow-up:

   ```sh
   candor catalog describe notes.create --json
   candor notes create --file NOTE.json --reason "Track the expected recovery outcome" --task-key TASK_KEY --parent-action ACTION_ID
   ```

   Write the body as the four re-check parts from the base skill, and set
   `revisit_at` to when the credit should have posted, including processing
   time. When that moment has already passed, the credit is overdue rather than
   pending, and repeating the date you just checked makes the note due the
   instant you write it, so it resurfaces in every opening with nothing new to
   see. Schedule from the next thing that could actually change the answer
   instead: the processing window of a follow-up, the next statement, or a date
   the user or payer gives you. For example:

   ```markdown
   **Promise:** Told the user I will verify the $860 Denver reimbursement
   arrived when I next run on or after Sep 05.

   **Baseline:** Report approved Aug 01 (workday conf #EXP-4471). Expected
   inflow `USD 860.00` to checking `acc_3d1f8b2c`. No matching deposit in
   transactions through Aug 10 (query action `act_9c2e417a`; coverage at
   that query: checking transactions complete since 2026-06-01, fresh
   through Aug 10, no caveats). Payroll deposits post as ACME PAYROLL;
   reimbursements have posted separately as ACME EXP.

   **Recipe:** `candor transactions list --since 2026-08-10 --until
   RUN_DATE --limit 100 --reason "Re-check the expected Denver
   reimbursement" --task-key TASK_KEY`, where RUN_DATE is the date you are
   executing this recipe, so a credit that posted after the expected window
   still counts. Pass each returned `pagination.next_cursor` as the next
   operation's `cursor` input until `pagination.has_more` is false before
   treating the deposit as absent. Match on direction and payer identity,
   then confirm the destination account and posted status with
   `candor transactions get TRANSACTION_ID --reason "Confirm the matched
   deposit account" --task-key TASK_KEY`. Do not match on amount alone. If
   absent, check the expense portal status before concluding it is missing.

   **Meaning:** Deposit matched and posted (`pending` is false) for the
   full `USD 860.00`: tell the user and resolve this note. Posted but
   partial: report the received and outstanding amounts separately, update
   this note's baseline, and reschedule the revisit for the remainder.
   Deposit matched but still pending: it can change or disappear, so tell
   the user it appears in flight and reschedule the revisit until it posts.
   Absent and portal still shows approved: this note is memory, not
   authority; recover a separately granted authorization from your own
   context or ask the user before contacting accounting. Portal shows
   rejected: the expectation changed, tell the user before anything else.
   ```

   Paste complete evidence handles into your own notes exactly as Candor
   returned them; the ids above are fictional but full-length for a reason.
   A truncated handle cannot be resolved on revisit.

Complete when the expected outcome is matched to evidence, or an authoritative
source establishes it is not coming, or a re-check note carries it. Finding
nothing across the interval you searched is not a conclusion, only the limit of
what you looked at, so it completes by being scheduled rather than by being
described with coverage caveats.

## Verify realized value

1. Open the due note and recover its parent action.
2. Inspect coverage and freshness for the expected window before searching,
   and refresh stale sources first, under the user's existing source
   permissions. A recipe run against stale data can miss a newly posted
   credit and wrongly trigger the absent outcome.
3. Run the note's recipe against its baseline; do not rebuild the search
   from memory. If a refresh ran after any recipe query, rerun the complete
   recipe.
4. Match the posted credit or authoritative external completion status to the
   expected outcome. Distinguish requested, approved, and received amounts.
5. Resolve the note only after verification:

   ```sh
   candor notes resolve NOTE_ID --reason "Resolve verified recovery follow-up" --task-key TASK_KEY --parent-action ACTION_ID
   ```

6. Report partial recovery separately and reschedule the unresolved remainder.

Complete when the evidence shows what was actually received and when, with no
claim that identified potential or an external promise equals realized value.
