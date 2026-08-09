
# Spare-cash allocation

First establish whether the cash is truly available. Then build a decision
frame from observed facts and the user's priorities; do not turn a balance into
an automatic recommendation.

## Datasets

- `accounts`
- `balances`
- `transactions`
- `recurring`
- `budgets`
- `goals`
- `account_terms`
- `coverage`

## Workspace resources

- Use `notes` for sourced external terms or a timed verification.
- Use goals or budgets only for user-approved targets and allocations.

## Non-goals

- Treating every visible balance or one good month as spare cash.
- Choosing the user's liquidity, debt, consumption, giving, or investing
  priorities.
- Moving money, paying debt, opening an account, buying an asset, or placing a
  trade without authority for that action.

## Method

- Clarify the candidate amount, currency, source, time horizon, and whether it
  is recurring surplus or a one-off receipt.
- Verify account ownership, balance time, coverage, pending activity, transfers,
  and any restrictions. Keep currencies separate.
- Read observable history from coverage records. Transaction sparsity and the
  first or last matching record do not establish a coverage boundary.
- Subtract near-term obligations, expected irregular outflows, approved budget
  allocations, and goal commitments before calling anything available.
- Inspect debt balances and effective terms, current cash yield and constraints,
  and user-approved goals. Treat missing or stale terms as an evidence gap.
- Present a compact option set: keep liquid, fund an approved goal, reduce
  verified-cost debt, preserve for a known near-term use, or consider another
  user-relevant path. Include current course.
- Compare options on amount, timing, reversibility, liquidity, verified return
  or avoided cost, risk, taxes when material, and operational effort.
- Ask only for preferences that change the ranking. If those preferences are
  absent, provide a conditional decision frame rather than pretending the facts
  select one answer.

## Evidence checklist

- Candidate cash is separated from restricted, pending, transferred, earmarked,
  or needed cash.
- Near-term obligations, coverage, balances, and observation times are explicit.
- Debt rates, deposit yields, deadlines, and constraints have current
  provenance or are marked unknown.
- The recommendation or conditional ranking traces to stated user priorities.

## Candor query recipes

- For availability, option construction, comparison, and writeback, read
  [the executable workflows](references/workflows.md).
- Load `candor-cash-liquidity-yield`, `candor-debt-promotional-rates`,
  `candor-budgeting-cashflow`, or `candor-goals-scenario-planning` for the
  relevant deeper method.

## Caveats

- Visible accounts may omit institutions, restrictions, taxes, or upcoming
  needs.
- Rates, fees, eligibility, and market returns change and are not comparable
  without their risk and liquidity differences.

## User-facing answer

State how much appears genuinely available, what could make that estimate
wrong, the few relevant options, and the tradeoff that controls their ranking.
Speak in the user's financial terms; do not expose datasets, command names,
record ids, or workspace boundaries unless asked.

## Safe Candor writebacks

- User-approved goal or budget state.
- Linked note for a sourced changing term or future verification.
- Curated or user-approved account term with provenance.

## Approval boundaries

- Investigating and comparing options needs no state-changing approval.
- An explicit request to handle, fix, clean up, or organize a bounded
  allocation area grants task-scoped authority for inspected, reversible
  factual Candor writebacks; it does not approve choices that reflect the user's values.
- Confirm the substance of a reserve target, allocation, payoff priority, or
  goal before storing it because those choices encode the user's values.
- Transfers, payments, purchases, applications, account changes, and trades
  each need authority for that external action.

## Stopping conditions

- Stop short of a concrete amount when coverage or near-term needs could make
  the candidate cash unavailable.
- Stop short of ranking when a missing preference materially changes the order;
  present conditions and ask the smallest decisive question.
- Stop before any external movement of money without authority.
