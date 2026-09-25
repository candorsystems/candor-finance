> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Financial-review workflows

Keep one review scope and task key. A review is complete when it produces a
small evidence-backed decision set, not when every available dataset has been
loaded.

## Lightweight planning loop

1. **Scope.** Agree on the question, time horizon, included people/accounts, and
   whether the task is triage, planning, implementation support, or monitoring.
2. **Circumstances.** Gather only material qualitative context from the user or
   their agent and quantitative facts from Candor. Do not infer values, family
   facts, tax status, risk preferences, or legal circumstances from spending.
3. **Goals.** Confirm which objectives are user-approved and surface conflicts
   without resolving preference tradeoffs on the user's behalf.
4. **Analysis.** Compare the current course with credible alternatives. Show
   assumptions, sensitivities, benefits, costs, risks, timing, and dependencies.
5. **Recommendation.** Explain why the proposed path fits the stated context,
   what could change it, and which uncertainty remains.
6. **Implementation.** State the exact next action, responsible party,
   authority required, and rollback or recovery path. Candor never supplies
   authority for external action.
7. **Monitoring.** Define observable success, expected timing, evidence source,
   and a revisit trigger.

## Periodic review

1. Open and re-orient:

   ```text
   candor_open({})
   candor_get({
     "operation": "coverage.get",
     "reason": "Check financial review coverage",
     "task_key": "TASK_KEY"
   })
   candor_changes({
     "limit": 100,
     "reason": "Inspect material factual changes",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "notes.list",
     "reason": "Review due financial follow-up",
     "task_key": "TASK_KEY",
     "args": {
       "due": true,
       "limit": 100
     }
   })
   candor_get({
     "operation": "actions.list",
     "reason": "Recover recent financial decisions",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 50
     }
   })
   ```

2. Use the opening to select, rather than assume, the relevant factual sweep:

   ```text
   candor_get({
     "operation": "liquidity.summary",
     "reason": "Review visible liquidity",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "debts.list",
     "reason": "Review visible debt",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "recurring.list",
     "reason": "Review recurring outflows",
     "task_key": "TASK_KEY",
     "args": {
       "direction": "outflow",
       "limit": 100
     }
   })
   candor_get({
     "operation": "budget.status",
     "reason": "Review approved budget variance",
     "task_key": "TASK_KEY",
     "args": {
       "period": "PERIOD"
     }
   })
   candor_get({
     "operation": "goals.list",
     "reason": "Review approved goal progress",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "portfolio.snapshot",
     "reason": "Review visible investment coverage",
     "task_key": "TASK_KEY"
   })
   ```

   Run only commands relevant to the user's scope and available coverage.
3. Classify findings as: factual maintenance, missing context, decision needed,
   external research needed, approved action ready, or monitor only.
4. Rank by user-stated importance, materiality, deadline, reversibility, and
   dependency—not by a Candor-generated priority.
5. Load one domain skill for each finding that survives triage. Avoid parallel
   deep dives that cannot change a near-term decision.
6. If the user supplies reusable merchant or transaction meaning during the
   review, load `candor-transaction-organization` and finish the bounded
   correction or rule workflow under the review's task key. Do not leave that
   interpretation only in the conversation.

Complete when the user receives the few material findings, their evidence and
uncertainty, a recommended sequence, and only the permission requests not
already covered by the user's task-scoped authority.

## Life-event review

1. Ask what changed, its effective date, what decisions are already made, and
   which constraints or people are affected.
2. Inspect only the domains the event plausibly changes: cash timing, benefits,
   debt, insurance, goals, recurring commitments, investments, or taxes.
3. Research current external rules only when they can change a decision.
   Prefer government, regulator, employer-plan, insurer, issuer, or official
   product sources. Record publisher, URL/document, effective date, retrieval
   date, applicability, and caveats.
4. Separate immediate deadlines from reversible planning questions. Escalate to
   an appropriate professional when legal, tax, medical, or investment details
   exceed the available evidence or the agent's competence.
5. Preserve a timed note only when future verification or a deadline matters.

Complete when every material near-term decision has an owner, evidence need,
authority boundary, and revisit trigger.

## Recommendation handoff

Use this compact structure:

- Scope and user objective.
- Candor facts and coverage.
- External facts with source and effective date.
- Assumptions and missing context.
- Current course and alternatives considered.
- Recommendation and rationale.
- Material tradeoffs and what would change the recommendation.
- Exact next action, owner, authority needed, and timing.
- Verification evidence and revisit date.

Never describe external research or agent-authored notes as verified Candor
facts.
