# Cash, liquidity, and yield workflows

## Establish the liquidity baseline

1. Confirm the currencies and accounts in scope.
2. Inspect coverage, account roles, balance timestamps, and the deterministic
   liquidity view:

   ```sh
   candor coverage get --reason "Check cash and balance coverage" --task-key TASK_KEY
   candor accounts list --limit 100 --reason "Identify visible cash accounts" --task-key TASK_KEY
   candor balances list --limit 100 --reason "Inspect current visible balances" --task-key TASK_KEY
   candor liquidity summary --reason "Summarize visible liquidity" --task-key TASK_KEY
   candor data query account_terms --limit 100 --reason "Inspect current deposit APYs and term provenance" --task-key TASK_KEY
   ```

3. Exclude restricted, custodial, business, earmarked, pending, or otherwise
   unavailable cash when the account facts support that distinction. Ask when
   role or availability is uncertain.
4. Keep currencies separate and state omitted institutions or stale sources.

Complete when the baseline identifies visible cash, excluded cash, observation
times, currencies, and coverage gaps without calling any amount idle.

## Estimate reserve needs

1. Ask which obligations and risks the reserve is intended to cover; do not
   invent a universal number of months.
2. Inspect observed outflows, recurring commitments, debt obligations, approved
   budgets, and goals:

   ```sh
   candor transactions list --since START --until END --reason "Estimate observed cash needs" --task-key TASK_KEY
   candor recurring list --limit 100 --reason "Inspect recurring cash commitments" --task-key TASK_KEY
   candor debts list --reason "Inspect visible debt obligations" --task-key TASK_KEY
   candor budget context --period PERIOD --reason "Inspect approved cash allocations" --task-key TASK_KEY
   candor goals list --limit 100 --reason "Inspect approved reserve and savings goals" --task-key TASK_KEY
   ```

3. Separate essential, flexible, seasonal, and one-time needs. Present a range
   when income stability or expense coverage is uncertain.
4. Ask the user to approve any reserve target before storing a goal.

Complete when the reserve range is traceable to stated risks, observed
obligations, assumptions, and coverage—not a generic rule of thumb.

## Compare current yield options

1. Use the effective deposit APY in `account_terms` for the current-account
   baseline when it is fresh and unconflicted. Research missing current-account
   terms and all alternative-product rates only at decision time. For a
   source-backed current APY obtained from a statement or official disclosure,
   use the curated-import preview/apply flow so it enters the same canonical
   term history as a connected source. Use an account-term assertion only for
   a value the user explicitly approves, and preview it before writing. Prefer
   the institution's official deposit page and disclosures; use regulator or
   government sources for protection rules; use an official prospectus for a
   fund or security.
2. Record product identity, APY or yield definition, effective/retrieval date,
   compounding basis, balance tiers, fees, minimums, access restrictions,
   promotional expiry, protection or investment status, and user eligibility.
3. Compare at least the current course and one realistic alternative. Calculate
   gross benefit over the user's time horizon, then show fees, tax assumptions
   when material, transfer delay, liquidity, and operational complexity
   separately.
4. Do not compare an insured deposit and an investment product as if their
   risk, liquidity, and protections were identical.
5. Preserve changing terms only as a caveated note with a near-term revisit:

   ```sh
   candor catalog describe notes.create --json
   candor notes create --file NOTE.json --reason "Remember sourced cash-yield terms for follow-up" --task-key TASK_KEY --parent-action ACTION_ID
   ```

Complete when every modeled benefit has a current source and the user can see
the liquidity, risk, protection, tax, and effort differences before deciding.
