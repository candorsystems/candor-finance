> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Credit-health workflows

## Utilization snapshot

1. Establish coverage, then read the debt-facing views:

   ```text
   candor_get({
     "operation": "coverage.get",
     "reason": "Check credit account coverage",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "debts.list",
     "reason": "Review card balances, limits, and terms",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "balances.list",
     "reason": "Confirm balance freshness per account",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_query({
     "dataset": "account_terms",
     "reason": "Read statement figures and per-term status",
     "task_key": "TASK_KEY",
     "filters": {
       "limit": 100
     }
   })
   ```

2. For each revolving account, record balance, limit, currency,
   `utilization_ratio`, `as_of`, APR, minimum payment, next due date, and any
   overdue flag. Keep currencies separate; never blend them into one ratio.
   For statement-anchored questions, read the last statement balance and
   issue date from the account's terms fields; the current balance is not the
   statement figure, and a mid-cycle payment changes what the next statement
   reports.
3. Use a term value only when its own resolution status is `observed` or
   `corroborated`, and read its provenance before letting it order payments:
   status records resolution, not authority. A value backed only by an
   unverified external claim or an unreconciled curated import stays
   unverified even when marked observed, and a user-approved assertion is the
   user's word, not issuer verification; re-source those before they set
   payment order or timing. A `stale` or `conflicted` APR, minimum, or due
   date is likewise unverified evidence, and `unknown_terms` entries are
   unverified, not zero. Name accounts
   excluded for a missing limit or stale balance instead of letting them
   vanish from the totals.
4. If a needed term is unknown, stale, or conflicted, verify it from the
   issuer's current statement, agreement, or account page as authorized. Route
   the verified fact into typed terms so later reads and calculations can use
   it: preview and apply a curated import for source-backed statement facts,
   or store a value the user explicitly approves as an assertion:

   ```text
   candor_get({
     "operation": "account_terms.assertion.preview",
     "reason": "Preview an approved card-term correction",
     "task_key": "TASK_KEY",
     "input": "<contents of ASSERTION.json>"
   })
   candor_write({
     "operation": "account_terms.assertion.set",
     "reason": "Store an approved card-term correction",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of ASSERTION.json>"
   })
   ```

   Keep a linked note only for unstructured context such as publisher,
   effective date, and retrieval caveats; a note alone leaves the term
   unknown to every later read.

Complete when every visible revolving account has a stated utilization or a
named reason it could not be computed.

## Paydown sequencing

1. Ask which constraint governs: interest cost, a utilization threshold before
   a statement date, due-date safety, or preserving liquidity. That choice
   encodes the user's values; do not assume it.
2. Show the table per card, in each account's own currency: the amount to
   reach the stated threshold, the minimum payment, the next due date, and
   estimated monthly interest at the observed APR. Label the interest figure
   an estimate and state its assumptions: issuers accrue daily and rate
   categories such as balance transfers or cash advances differ, so only a
   statement states the exact charge.
3. When the user asks how utilization is generally weighed, research a current
   authoritative source and label the guidance as general. Do not convert it
   into a predicted score change for this user.
4. Present the sequence as a draft. Record the approved baseline in a linked
   note only after the user chooses.

Complete when the user can see, per card, what a chosen payment achieves in
observed amounts in that card's own currency and dates, with unknowns named.

## Post-payment verification

1. A payment happens outside Candor under the user's own authority. When one
   is expected, create a timed re-check note holding the baseline balance,
   the baseline credit limit, the expected change, the account, and the
   observable date; without the limit, a later run cannot recompute the
   utilization the payment was meant to reach:

   ```text
   candor_schema({
     "operation": "notes.create"
   })
   candor_write({
     "operation": "notes.create",
     "reason": "Track an expected card payment",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID",
     "input": "<contents of NOTE.json>"
   })
   ```
2. On revisit, compare new balance and transaction evidence with the baseline:

   ```text
   candor_get({
     "operation": "balances.list",
     "reason": "Verify posted payment against baseline",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "transactions.list",
     "reason": "Confirm the payment posted",
     "task_key": "TASK_KEY",
     "args": {
       "source_account_id": "SOURCE_ACCOUNT_ID",
       "since": "START",
       "limit": 100
     }
   })
   ```

   Check each row's `as_of` against the baseline and the observable date
   first: rows observed before the payment can only compare the baseline with
   itself. When the source data is stale, run the policy-gated refresh and
   re-read before deciding:

   ```text
   candor_connections({
     "operation": "sync.refresh",
     "reason": "Refresh stale balances before verifying the payment",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "sync.status",
     "reason": "Wait for the staged refresh to finish",
     "task_key": "TASK_KEY"
   })
   ```

   A refresh can return a staged in-progress result; when it does, poll the
   sync status until the relevant connection finishes before re-reading, so
   an in-flight refresh is not mistaken for still-stale data.

3. Read the current limit, recompute utilization against the baseline limit
   and the current one, and resolve the note only when the posted evidence
   confirms the expected change; otherwise update the baseline and next
   observable time, and say what remains unconfirmed:

   ```text
   candor_get({
     "operation": "debts.list",
     "reason": "Read the current limit for the utilization check",
     "task_key": "TASK_KEY"
   })
   ```

Complete when the claimed improvement rests on posted evidence rather than on
the payment having been requested.
