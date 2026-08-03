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

   ```sh
   candor open
   candor coverage get --reason "Check financial review coverage" --task-key TASK_KEY
   candor changes list --limit 100 --reason "Inspect material factual changes" --task-key TASK_KEY
   candor notes list --due --limit 100 --reason "Review due financial follow-up" --task-key TASK_KEY
   candor actions list --limit 50 --reason "Recover recent financial decisions" --task-key TASK_KEY
   ```

2. Use the opening to select, rather than assume, the relevant factual sweep:

   ```sh
   candor liquidity summary --reason "Review visible liquidity" --task-key TASK_KEY
   candor debts list --reason "Review visible debt" --task-key TASK_KEY
   candor recurring candidates --direction outflow --limit 100 --reason "Review recurring outflows" --task-key TASK_KEY
   candor budget status --period PERIOD --reason "Review approved budget variance" --task-key TASK_KEY
   candor goals list --limit 100 --reason "Review approved goal progress" --task-key TASK_KEY
   candor portfolio snapshot --reason "Review visible investment coverage" --task-key TASK_KEY
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
