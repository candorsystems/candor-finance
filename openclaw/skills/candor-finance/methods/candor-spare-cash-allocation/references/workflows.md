# Spare-cash-allocation workflows

## Establish genuinely available cash

1. Inspect coverage, accounts, balances, and deterministic liquidity:

   ```sh
   candor open
   candor coverage get --reason "Verify coverage before estimating available extra cash" --task-key TASK_KEY
   candor accounts list --limit 100 --reason "Identify accounts relevant to the candidate cash" --task-key TASK_KEY
   candor balances list --limit 100 --reason "Inspect current balances for the candidate cash" --task-key TASK_KEY
   candor liquidity summary --reason "Summarize visible liquidity before allocation" --task-key TASK_KEY
   ```

2. Confirm the candidate amount, currency, source, recurrence, restrictions, and
   observation time. Inspect nearby activity for transfers or pending items.
3. Inspect obligations and approved state:

   ```sh
   candor transactions list --since START --until END --reason "Estimate observed cash needs before allocation" --task-key TASK_KEY
   candor recurring list --limit 100 --reason "Inspect recurring commitments before allocation" --task-key TASK_KEY
   candor budget status --period PERIOD --reason "Inspect approved budget commitments before allocation" --task-key TASK_KEY
   candor goals list --limit 100 --reason "Inspect approved goals before allocation" --task-key TASK_KEY
   ```

Complete when the candidate cash is net of known near-term needs and excluded
or uncertain amounts are explicit.

## Build the option set

Inspect debt and current-account terms before comparing uses:

```sh
candor debts list --reason "Inspect visible debt options for the extra cash" --task-key TASK_KEY
candor data query account_terms --limit 100 --reason "Inspect verified rates and constraints for allocation options" --task-key TASK_KEY
candor budget context --period PERIOD --reason "Inspect budget context for a possible allocation" --task-key TASK_KEY
```

Include only material options:

- retain liquidity under a stated reserve assumption;
- fund an already approved goal;
- reduce debt with verified balance, APR, minimums, and promotional deadline;
- preserve cash for a known near-term obligation;
- evaluate another path that fits the user's stated goals.

Always include the current course. Do not add investing or a new product merely
to make the list look comprehensive.

## Compare and decide conditionally

For each option, show:

- amount and timing;
- liquidity and reversibility;
- verified yield or avoided interest, with effective dates and provenance;
- fees, taxes, risk, eligibility, and operational effort where material;
- which user preference or missing fact controls the ranking.

Use current authoritative sources for terms Candor does not hold. Do not compare
deposit yield, avoided debt interest, and uncertain investment return as though
they carry the same risk.

If one option fits the user's known priorities, recommend it with the facts,
assumptions, and what would change the answer. Otherwise ask the smallest
preference question and preserve the conditional frame.

## Preserve approved state and verify action

After the user approves a target or allocation, inspect the current goal or
budget contract and write only that approved state. Re-read it and preserve the
action that produced it for history. This does not move money.

Any transfer, payment, purchase, application, or trade is a separate external
action. Recover or ask for authority, carry it out only through the available
authorized surface, and define the evidence that will verify completion. Use a
timed note when that result will only be observable later.
