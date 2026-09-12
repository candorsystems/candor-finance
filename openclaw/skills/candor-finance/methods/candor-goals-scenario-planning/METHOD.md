
# Goals and scenario planning

Build explicit, attributable scenarios and recommend using the user's context.
Keep recommendations separate from the versions the user approves.

## Datasets

- `goals`
- `budgets`
- `balances`
- `transactions`
- `actions`

## Workspace resources

- Use the `notes` resource for linked Markdown context and follow-up.

## Non-goals

- Inventing the user's priorities or treating a recommendation as approval.
- Approving a plan on the user's behalf.

## Method

- Read the current goal version and the action that created it before proposing
  a change.
- Model base, conservative, and stretch paths with explicit dates and
  exact-money contributions.
- Identify collisions with reserves, debt obligations, and other approved goals
  and explain the tradeoffs before recommending a priority.

## Evidence checklist

- Target amount, target date, contribution cadence, and observed progress are
  explicit.
- Scenario assumptions and external sources are attributable and current.

## Candor query recipes

- For goal creation, revision, reconciliation, and progress recording, read
  [the executable workflows](references/workflows.md).
- Always read goal history and the actions that changed it before proposing a replacement
  version.

## Caveats

- Scenario feasibility is conditional on stated assumptions.
- Candor does not choose which goal matters more.

## Safe Candor writebacks

- Approved goal version.
- Goal progress event.
- Linked Markdown note for a decision summary or timed follow-up.

## Domain decisions

You can recommend a target, date or priority. Record it as approved only when
the user has chosen that substance. Factual progress and linkage repairs do not
authorize retargeting a goal. Reuse explicit approval rather than asking twice.

## Stopping conditions

- Stop when a missing preference would determine the recommended tradeoff.
- Stop before replacing the current approved goal version without approval.
