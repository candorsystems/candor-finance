> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Workplace-retirement workflows

## Contribution inventory

1. Establish what the workspace can see:

   ```text
   candor_get({
     "operation": "coverage.get",
     "reason": "Check retirement account coverage",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "accounts.list",
     "reason": "Find retirement and payroll accounts",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   ```

2. If a retirement account is connected, read its contribution history. The
   `investment_transactions` dataset accepts only cursor and limit, so page
   the dataset and select the plan account and window from the returned rows:

   ```text
   candor_query({
     "dataset": "investment_transactions",
     "reason": "Inventory plan contributions",
     "task_key": "TASK_KEY",
     "filters": {
       "limit": 100
     }
   })
   candor_query({
     "dataset": "investment_transactions",
     "reason": "Continue the contribution inventory",
     "task_key": "TASK_KEY",
     "filters": {
       "limit": 100,
       "cursor": "NEXT_CURSOR"
     }
   })
   ```

   Follow `pagination.next_cursor` until `has_more` is false; a busy plan
   does not fit one page. Exhausting the pages proves only what the
   connection holds: before treating a year-to-date total as complete, also
   establish that the connection's history spans the full year, or anchor the
   total to an authoritative paystub or plan-statement year-to-date figure. Filter rows by `source_account_id` and date in your analysis,
   join `security_id` against holdings for names, and separate employee
   contributions from employer deposits and from market movement; only
   labeled contribution records establish a contribution. An employer deposit
   is not necessarily match: attribute it to match only with an explicit
   match or true-up label, or after reconciling it against a paystub or plan
   statement, and keep profit-sharing and other nonelective employer deposits
   separate or unknown so match capture is never overstated.
3. A connected plan shows contribution amounts, not compensation. When the
   match is expressed as a percentage of eligible pay, the deferral rate and
   maximum match need a compensation denominator, so ask for a recent paystub
   or plan statement even when a plan account is connected; without that
   evidence, stop short of quantifying the gap. Payroll fields
   such as the deferral rate, employer amount, and year-to-date figures have
   no typed workspace record today: preserve them, with the paystub's date
   and provenance, in a linked note as working context, and re-verify them
   from a fresh paystub before relying on them in a later run; a note is
   memory, not canonical evidence. If the user also supplies an account
   statement, its balances and holdings can become canonical records through
   `candor-evidence-capture`. The curated import has no retirement term or
   investment-activity kind, so plan terms and contribution rows stay in the
   note with the same re-verification obligation.
4. Cross-check net-pay deposits against the paystub's net figure to anchor
   the pay-period cadence, and stop before annualizing while the cadence is
   unverified:

   ```text
   candor_get({
     "operation": "transactions.list",
     "reason": "Anchor the payroll cadence",
     "task_key": "TASK_KEY",
     "args": {
       "source_account_id": "SOURCE_ACCOUNT_ID",
       "since": "START",
       "limit": 100
     }
   })
   ```

Complete when the per-period contribution, employer amount, cadence, and
year-to-date totals are recorded or explicitly not establishable.

## Match-capture math

1. Verify the plan's match formula, eligibility, vesting, and true-up from
   the plan document or HR source the user provides or authorizes. Record
   publisher, effective date, retrieval date, and applicability in a linked
   note.
2. Compute, per pay period and per year, in the plan's currency:

   - the contribution at the current deferral rate;
   - the employer match those contributions earn under the verified formula;
   - the maximum match available; and
   - the gap left uncaptured per year, in the plan's currency, capped by the
     remaining verified deferral room; match beyond that room is unavailable
     this year.

3. Check the current statutory limits for the named tax year from a current
   authoritative source, and state the employee deferral limit separately
   from any combined limit. Identify each plan's type first: the elective
   deferral limit is per person across plans that share it, such as 401(k)
   and 403(b) plans, including one left at a former employer this year, while
   a plan type with its own separate limit, such as a governmental 457(b),
   follows the current authoritative coordination rules rather than blanket
   aggregation. Before stating remaining room, gather year-to-date employee
   deferrals from every plan sharing the limit; when that evidence is
   incomplete, say the room cannot be stated safely rather than risking an
   excess contribution.
4. Present options as the contribution change per pay period in the plan's
   currency. The exact take-home effect depends on contribution type and
   federal, state, local, and payroll withholding facts this method does not
   gather: label any take-home figure an estimate or point the user to their
   payroll system's modeler. The deferral choice belongs to the user; do not
   record it as decided.

Complete when the gap is split into match already lost on past pay periods
(recoverable only where the plan trues up) and match still available on the
remaining ones, with the formula basis and the exact election change that
captures the remaining part explicit and sourced.

## Deferral-change verification

1. The user changes an election with the employer or provider under their own
   authority. Create a timed re-check note with the baseline paystub or
   contribution figures and the date a changed amount should first appear:

   ```text
   candor_schema({
     "operation": "notes.create"
   })
   candor_write({
     "operation": "notes.create",
     "reason": "Track an expected deferral change",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of NOTE.json>"
   })
   ```

2. On revisit, recover the due note and its baseline, then capture the new
   paystub or read the new contribution records and compare:

   ```text
   candor_get({
     "operation": "notes.list",
     "reason": "Review due retirement follow-up",
     "task_key": "TASK_KEY",
     "args": {
       "due": true
     }
   })
   candor_get({
     "operation": "notes.get",
     "reason": "Recover the deferral-change baseline",
     "task_key": "TASK_KEY",
     "args": {
       "note_id": "NOTE_ID"
     }
   })
   ```

3. Resolve the note when the posted per-period figures reflect the change;
   otherwise update the same note's baseline and next observable date, and
   tell the user what has not yet appeared:

   ```text
   candor_write({
     "operation": "notes.resolve",
     "reason": "Deferral change verified on payroll evidence",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "args": {
       "note_id": "NOTE_ID"
     }
   })
   candor_write({
     "operation": "notes.update",
     "reason": "Advance the deferral-change baseline and revisit date",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of NOTE.json>"
   })
   ```

   The update payload names the same `note_id` with the changed baseline and
   `revisit_at`, so an unposted election keeps its scheduled re-check instead
   of quietly losing it.

Complete when the claimed improvement rests on posted payroll or plan
evidence, not on the election having been requested.
