> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# FSA, HSA, and benefits workflows

## Review plan-year spending and deadlines

1. Confirm the benefit type, employer or administrator, plan year, jurisdiction,
   and whether the user is asking about eligibility, contribution, spending, or
   reimbursement.
2. Inspect coverage and observed spending:

   ```text
   candor_get({
     "operation": "coverage.get",
     "reason": "Check benefit-review coverage",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "spending_categories.list",
     "args": {
       "since": "START",
       "until": "END"
     },
     "reason": "Find health-related spending cues",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "transactions.list",
     "args": {
       "category": "CATEGORY",
       "since": "START",
       "until": "END",
       "limit": 100
     },
     "reason": "Inspect potential benefit expenses",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "accounts.list",
     "args": {
       "limit": 100
     },
     "reason": "Inspect visible benefit account types",
     "task_key": "TASK_KEY"
   })
   ```

   Use the exact category returned by Candor and paginate material populations.
   Verify ambiguous expenses rather than treating a category as tax eligibility.
3. Research current rules. Prefer the user's current plan document and
   administrator materials for plan-specific terms; use the relevant government
   authority for current statutory limits or tax rules. Record jurisdiction,
   plan year, source URL/document, publisher, effective date, retrieval date,
   and which user facts control applicability.
4. Build a date-specific checklist for contribution, incurrence,
   substantiation, submission, grace-period, carryover, and forfeiture rules
   only when the applicable source supports them.

Complete when observed spending, current plan terms, user applicability, and
deadlines are separated and every conclusion is source-attributable.

## Investigate a reimbursement gap

1. Obtain the receipt, explanation of benefits, claim or submission record, and
   plan rule needed to establish the expected reimbursement.
2. Record the expected amount or range, currency, payer, destination account,
   submission date, and expected processing window.
3. Search for a matching credit conservatively:

   ```text
   candor_get({
     "operation": "transactions.list",
     "args": {
       "since": "START",
       "until": "END",
       "limit": 100
     },
     "reason": "Search for the expected benefit reimbursement",
     "task_key": "TASK_KEY"
   })
   ```

4. If the result is not yet due or needs authorized follow-up, create a timed
   note containing the source references, evidence handles, expected window,
   caveats, and verification rule:

   ```text
   candor_schema({
     "operation": "notes.create"
   })
   candor_write({
     "operation": "notes.create",
     "input": "<contents of NOTE.json>",
     "reason": "Track benefit reimbursement follow-up",
     "task_key": "TASK_KEY",
     "parent_action": "ACTION_ID"
   })
   ```

Complete when the reimbursement is matched to posted evidence, shown absent
from a sufficiently covered period, or scheduled for a specific recheck.

## Model a contribution scenario

1. Confirm eligibility, coverage dates, contribution sources, employer
   contributions, and the exact plan/account type from authoritative sources.
2. Research the current applicable limit and special rules at decision time.
   Do not rely on model memory or a prior-year note.
3. Compare current contributions with alternative schedules. Keep tax effects
   conditional on verified jurisdiction and user circumstances.
4. Check cash-flow and goal collisions with the budgeting skill.
5. Ask for explicit approval before storing a contribution goal; changing an
   election, payroll setting, or account remains external.

Complete when the scenario states the current sourced rules, user facts,
contribution assumptions, cash-flow effect, deadline, and external action
required.
