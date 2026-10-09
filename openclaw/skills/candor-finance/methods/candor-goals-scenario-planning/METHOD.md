
# Goals and scenario planning

Build explicit, attributable scenarios and recommend using the user's context.
Keep scenarios you are exploring separate from the goals you save.

## Datasets

- `goals`
- `budgets`
- `balances`
- `transactions`
- `actions`

## Workspace resources

- Use the `notes` resource for linked Markdown context and follow-up.

## Non-goals

- Inventing the user's priorities, figures or dates.
- Saving a scenario you are only exploring as the user's plan.

## Method

- Read the current goal version and the action that created it before proposing
  a change.
- Model base, conservative, and stretch paths with explicit dates and
  exact-money contributions.
- Identify collisions with reserves, debt obligations, and other saved goals
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

- Saved goal version.
- Goal progress event.
- Linked Markdown note for a decision summary or timed follow-up.

## Domain decisions

You can recommend a target, date or priority. Save the goal as the conversation
settles it, without asking for a yes to an exact draft: use the user's words and
only figures and dates they gave or the records show, tell them briefly what
you saved, and edit it when it changes. Factual progress and linkage repairs do
not retarget a goal on their own.

## Stopping conditions

- Stop when a missing preference would determine the recommended tradeoff.
- Stop before saving a goal the user said they don't want, or a target or date
  neither the user nor the records supplied.
