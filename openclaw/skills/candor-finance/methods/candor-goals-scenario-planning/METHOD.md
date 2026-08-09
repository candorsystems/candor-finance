
# Goals and scenario planning

Build explicit, attributable scenarios while leaving priority choices and plan
approval to the user and their agent.

## Datasets

- `goals`
- `budgets`
- `balances`
- `transactions`
- `actions`

## Workspace resources

- Use the `notes` resource for linked Markdown context and follow-up.

## Non-goals

- Choosing which goal matters most.
- Approving a plan on the user's behalf.

## Method

- Read the current goal version and the action that created it before proposing
  a change.
- Model base, conservative, and stretch paths with explicit dates and
  exact-money contributions.
- Identify collisions with reserves, debt obligations, and other approved goals
  without choosing priorities for the user.

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

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Approved goal version.
- Goal progress event.
- Linked Markdown note for a decision summary or timed follow-up.

## Approval boundaries

- An explicit request to handle, fix, clean up, or reorganize a bounded goal or
  plan area grants task-scoped authority for the inspected, reversible Candor
  writebacks needed to finish it, such as recomputed progress or corrected
  linkage. Do not ask again for each record.
- Confirm the substance of a goal separately. Its target, date, priority
  against other goals, and accepted tradeoff encode the user's values. Never
  create or retarget a goal from inferred intent; draft it and have the user
  approve the version.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop when a missing preference would determine the recommended tradeoff.
- Stop before replacing the current approved goal version without approval.
