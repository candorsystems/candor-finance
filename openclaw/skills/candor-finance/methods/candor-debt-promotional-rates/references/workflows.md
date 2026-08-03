# Debt and promotional-rate workflows

## Establish the debt baseline

1. Inspect coverage, account identities, balance timestamps, and visible debt:

   ```sh
   candor coverage get --reason "Check debt-data coverage" --task-key TASK_KEY
   candor accounts list --limit 100 --reason "Identify visible debt accounts" --task-key TASK_KEY
   candor balances list --limit 100 --reason "Inspect current debt balances" --task-key TASK_KEY
   candor debts list --reason "Summarize visible debt obligations" --task-key TASK_KEY
   candor data query account_terms --limit 100 --reason "Inspect effective debt terms and provenance" --task-key TASK_KEY
   ```

2. Separate observed balances and payments from contractual APR, minimum,
   due-date, fee, and promotional terms.
3. For missing fields, obtain a current statement, agreement, or official
   servicer source. Preview and apply a curated import for source-backed facts;
   use `account-terms assertion set` only for a value the user explicitly
   approves. Preserve effective and expiry dates. Preview that assertion first,
   then inspect its version history after writing:

   ```sh
   candor account-terms assertion preview --file ASSERTION.json --reason "Preview an approved debt-term correction" --task-key TASK_KEY
   candor account-terms assertion set --file ASSERTION.json --reason "Store an approved debt-term correction" --task-key TASK_KEY --parent-action ACTION_ID
   candor account-terms assertion history ACCOUNT_IDENTITY_ID FIELD --limit 25 --reason "Verify debt-term assertion history" --task-key TASK_KEY --parent-action ACTION_ID
   ```

   Revert the assertion when it is withdrawn or replaced by authoritative
   source evidence:

   ```sh
   candor account-terms assertion revert ACCOUNT_IDENTITY_ID FIELD --reason "Revert the approved debt-term correction" --task-key TASK_KEY --parent-action ACTION_ID
   ```
4. Surface debts missing terms or balances rather than assigning defaults.

Complete when each modeled debt has a current balance time and attributable
terms, and omitted obligations are explicit.

## Model payoff scenarios

1. Inspect the user's approved cash constraints:

   ```sh
   candor budget context --period PERIOD --reason "Inspect approved cash constraints for debt scenarios" --task-key TASK_KEY
   candor goals list --limit 100 --reason "Inspect goals that interact with debt payoff" --task-key TASK_KEY
   candor transactions list --since START --until END --limit 100 --reason "Inspect observed debt payments" --task-key TASK_KEY
   ```

2. Model at least the current-payment path and one alternative. State starting
   balance, rate and rate-change assumptions, payment amount and timing, fees,
   promotional expiry, interest method, and whether new charges are excluded.
3. Show payoff timing, total modeled payments, modeled interest or fees, cash
   requirement, and sensitivity to changed rates or payments. Do not hide
   residual balloon or deferred-interest risk.
4. Compare debt and cash yield only with current sourced terms and explicit tax,
   liquidity, reserve, and risk assumptions.
5. Leave prioritization to the user's agent using the user's goals and broader
   context. Ask before storing a debt-paydown goal.

Complete when the user can reproduce the scenarios and see the current course,
alternatives, material uncertainty, and cash-flow conflicts.

## Track a promotional deadline

1. Verify the promotion type, covered balance, start date, expiration date,
   post-promotion treatment, required payments, and loss-of-promotion
   conditions from an authoritative document.
2. Explain the verified transition and unknown terms conditionally. For a
   terms-only request, offer payoff modeling rather than ranking a payoff,
   transfer, or refinance action without the user's cash constraints, goals,
   alternatives, and preferences.
3. Work backward from the deadline using a conservative processing buffer.
4. Store the verified expiry as a curated term or approved assertion so opening
   attention can enforce the deadline. Create a timed note only for additional
   unstructured follow-up:

   ```sh
   candor catalog describe notes.create --json
   candor notes create --file NOTE.json --reason "Track a verified promotional debt deadline" --task-key TASK_KEY --parent-action ACTION_ID
   ```

5. A payment, balance transfer, refinance, or application remains external and
   requires explicit authority.

Complete when the deadline, sourced terms, required decision date, owner,
verification evidence, and external action boundary are explicit.
