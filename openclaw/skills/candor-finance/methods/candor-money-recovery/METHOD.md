
# Money recovery

Build a precise evidence packet and follow the expected outcome without turning
a hypothesis into a claim that money is owed or recovered.

## Datasets

- `transactions`
- `recurring`
- `changes`
- `actions`
- `coverage`

## Workspace resources

- Use `notes` for a linked re-check note: the outcome still outstanding, its
  exact baseline, the revisit recipe, and what each result means. Recovery work
  often ends unfinished, because a duplicate, fee, or missing credit usually
  waits on a later transaction to prove how it ended. Write the note before you
  answer whenever that is true. When the evidence in hand settles it instead —
  split billing that explains the pair, a service period that justifies the
  fee, account terms that make the charge correct, or an authoritative status
  that rules the credit out — say so and close it. A note for a finished
  finding is a re-check nobody needs.
- A decision to stop is also an ending. When the user weighs a real finding and
  chooses not to pursue it, the evidence has not changed but the work has
  finished, so leave no due note and resolve one you already wrote. This is
  narrower than silence: not being asked to watch something is not the same as
  being told to drop it, and only the second closes the finding. Record what
  they decided, so a later run reads a settled question rather than reopening
  it.

## Non-goals

- Treating identified potential as realized value.
- Creating a persisted opportunity or work lifecycle.

## Method

- When discovery rather than a named charge is the task, scan every bounded
  transaction page or time slice and keep a compact candidate ledger. Check for
  same-merchant same-day repeats, repeated fees, charges after a known end date,
  and expenses or promised credits that lack a later matching inflow. Compare
  candidates with the preceding window and relevant positive precedents before
  choosing which ones deserve deeper work.
- Identify the exact questionable transaction or expected credit.
- Test duplicate, refund, reversal, split-billing, merchant-drift, and timing
  explanations before concluding there is a recoverable issue.
- Obtain the contract, cancellation, receipt, policy, claim, or correspondence
  needed to establish the expectation.
- Verify realization only from a posted transaction or authoritative external
  status, and keep identified, requested, approved, and received amounts
  distinct.

## Evidence checklist

This is what your own working record must pin down before you conclude
anything. It is not a description of the answer you give the user.

- Transaction ids, dates, exact amounts, currencies, merchant identity, and
  coverage are explicit.
- The expected outcome has an attributable source and due date.
- A later credit is matched conservatively rather than by amount alone.

## Candor query recipes

- For duplicates and fees, missing credits, reimbursements, or outcome
  verification, read [the executable workflows](references/workflows.md).
- Use a re-check note for follow-up rather than inventing a recovery status
  object. Identifying a recoverable charge is the start of the loop, not the
  end: leave the note whether or not the user asked you to watch it.

## Caveats

- Similar amount and timing do not prove duplication.
- A merchant promise, submitted request, or agent assertion does not prove
  money was received.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Linked re-check note with the outstanding outcome, exact baseline evidence
  handles, revisit recipe, outcome meanings, and revisit date.
- User-approved correction only when a transaction interpretation is wrong.

## Approval boundaries

- An investigation is read-only apart from your own linked timed notes. Being
  asked to look into a charge is not permission to change a record.
- An explicit request to fix, correct, or clean up a bounded set grants
  task-scoped authority for the inspected, reversible corrections needed to
  finish it. Do not ask again for each record.
- Confirm choices that reflect the user's values separately. Whether a
  charge is acceptable, worth disputing, or worth the user's time encodes their
  values, so ask rather than deciding it from the evidence alone.
- Ask when the needed preference is missing, the affected set is broad or
  unbounded, or a proposed write conflicts with prior approved state.
- Disputes, claims, reimbursement submissions, cancellations, negotiations, and
  messages are actions to take rather than records to write, and each needs
  authority you can recover from your own context or a fresh ask.

## Stopping conditions

- Stop before asserting money is owed without an authoritative basis.
- Stop before external contact or submission without explicit authority.
- Stop before marking value realized until receipt is verified.
- Stop watching a finding the user has decided against, and resolve its note.
  A workspace opening that keeps returning a settled question reads as not
  having listened.
