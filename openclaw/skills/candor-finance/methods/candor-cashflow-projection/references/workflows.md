# Cash-flow projection workflows

## Build a baseline projection

1. Establish freshness and scope before any arithmetic:

   ```sh
   candor coverage get --reason "Check balance and recurring freshness before projecting" --task-key TASK_KEY
   candor accounts list --reason "Confirm which accounts are in projection scope" --task-key TASK_KEY
   candor balances list --limit 50 --reason "Read current balances as the projection starting point" --task-key TASK_KEY
   ```

   Follow the `accounts list` and `balances list` cursors to completion before
   comparing their account coverage. If balances cover fewer accounts than
   exist, stop and say so: a missing cash or liability account changes the
   starting state and therefore every figure that follows.

2. Collect the committed obligations and inflows for the horizon:

   ```sh
   candor recurring list --limit 100 --reason "Collect recurring obligations and inflows for the projection horizon" --task-key TASK_KEY
   candor transactions list --since TODAY --until HORIZON_END --limit 100 --reason "Include pending and future-dated transactions" --task-key TASK_KEY
   candor debts list --reason "Read visible liability balances and utilization" --task-key TASK_KEY
   candor data query account_terms --limit 100 --reason "Read liability due dates and minimum payments" --task-key TASK_KEY
   candor notes list --after HORIZON_START_ISO --before HORIZON_END_ISO --limit 100 --reason "Recover saved expectations that fall inside the horizon" --task-key TASK_KEY
   ```

   `notes list` bounds on ISO timestamps such as `2026-07-26T00:00:00.000Z`,
   while `transactions list` takes plain `YYYY-MM-DD` dates. Passing a bare
   date to `notes list` fails with `invalid_note_query`.

   Saved expectations only reuse themselves if you read them. A planned
   purchase or expected bonus recorded on an earlier run lives in notes, not in
   recurring items, and omitting it makes the projection optimistic. Bound the
   read to the horizon with the `after` and `before` inputs. When the response
   is `partial_success`, follow `next_actions` or narrow the horizon before
   treating the returned expectations as exhaustive.

   `debts list` enriches visible balances with effective due dates, APRs, and
   minimums where known. Use `account_terms` for field-level provenance and
   conflicts. Do not invent missing values, and say which obligations could not
   be dated.

3. Drop everything that is not a live obligation. `recurring list`
   deliberately returns policy-backed non-active items, so the result mixes
   live series with `stopped` and corrected ones. Project only `active` and
   `changed` effective status. Summing the whole list re-animates cancelled
   subscriptions and false detections as future cash flows, which is the single
   easiest way to produce a confidently wrong low point.
4. Place each obligation on a date. The canonical recurring view carries
   `cadence` and `last_seen_at` but no predicted date, so derive occurrences
   explicitly by stepping forward from `last_seen_at` until you pass the
   horizon.

   Step weekly and biweekly cadences by 7 and 14 days. Step monthly and annual
   cadences by calendar month and calendar year, keeping the day of month and
   clamping to the last day of a shorter month. Fixed-day arithmetic is wrong
   here: adding 30 days to January 31 lands on March 2 and drops the February
   bill entirely, which makes the low point optimistic in exactly the month the
   user asked about. Adding 365 days drifts across leap years the same way.

   Treat any other cadence, including `irregular` and `unknown`, as undated and
   report those obligations separately rather than assuming a date. Say that
   dated occurrences are derived estimates, not scheduled dates.
5. Confirm completeness before summing. Follow both the `recurring list` and
   `transactions list` cursors to the end rather than treating either first
   page as the full set. An omitted obligation always makes a projection
   optimistic, which is the dangerous direction.
6. Deduplicate before summing. A recurring item whose next occurrence already
   appears as a pending or future-dated transaction is one obligation. Apply each
   leg of an internal transfer to its own account using each item's
   `account_identity_id`: a scheduled move out of checking still reduces
   checking even though it raises savings. Net transfers
   out only when presenting a household total, never in a per-account path.
7. Walk the horizon date by date from current balances: subtract committed
   obligations on their due dates, add recurring inflows on theirs, and keep
   discretionary spending as a separate stated band rather than a single
   number.
8. Report the ending balance, the lowest projected balance, the date of that
   low point, and which obligations drive it.

Complete when the projection states its horizon, its starting balances, the
low point with its date, and the obligations it could not model.

## Check whether a planned expense is coverable

1. Build the baseline projection above for a horizon that reaches past the
   planned date.
2. Ask the user for the amount, the date, and the account if any of the three
   is missing. Do not infer them from similar past purchases.
3. Re-walk the horizon with the expense applied and compare the two low points.
4. Answer with the low point after the expense, the date it occurs, and the
   buffer remaining. Say plainly if the expense creates a shortfall.
5. Record the expectation so the next projection reuses it:

   ```sh
   candor catalog describe notes.create --json
   candor notes create --file NOTE.json --reason "Record the planned expense and its projected effect" --task-key TASK_KEY --parent-action ACTION_ID
   ```

   Set `revisit_at` to the planned date. The baseline recovers expectations
   through a revisit-time window, so a note saved without one is stored
   successfully and then never returned by any later projection.

Complete when the user has the post-expense low point and its date, not just a
yes or no.

## Compare a scenario against the baseline

1. Keep the baseline projection unchanged and build the scenario separately.
2. Change one variable at a time: a cancelled subscription, a changed payment
   amount, a delayed deposit, a new recurring cost.
3. Present both, labelled, with the delta in the low point and the ending
   balance. Never present the scenario alone.
4. A scenario becomes durable state only through an approved budget or goal
   version, and only when the user approves that substance explicitly.

Complete when both projections are visible, labelled, and the difference is
attributed to the specific change that produced it.

## Stop conditions

- Recurring coverage is too thin for the horizon: report the gap and the
  obligations that are missing rather than projecting anyway.
- Balances are stale relative to the horizon: refresh or say so before
  answering.
- The projection depends on income the user has not confirmed: ask instead of
  averaging history into a forecast.
