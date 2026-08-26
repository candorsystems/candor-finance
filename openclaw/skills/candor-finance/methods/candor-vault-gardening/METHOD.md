
# Vault gardening

Maintain the workspace in small, reviewable passes. Prioritize defects that
distort later reasoning, apply the narrowest reversible repair, and verify the
effective result.

## Datasets

- `coverage`
- `transactions`
- `recurring`
- `rules`
- `changes`
- `actions`

## Workspace resources

- Use `corrections` for one-record factual interpretation.
- Use `rules` for repeated, bounded normalization.
- Use recurring policies for confirmed series meaning.
- Use `notes` for a material unresolved maintenance check.

## Non-goals

- Maximizing the number of changed records.
- Imposing categories, preferences, or recurring interpretations from noisy
  merchant text.
- Hiding missing coverage or stale sources with cosmetic cleanup.

## Method

- Start from `candor open`, coverage, factual changes, and due notes. Select a
  bounded pass that can materially improve later analysis.
- Read observable history from coverage records. Transaction sparsity and the
  first or last matching record do not establish a coverage boundary.
- Triage into source-health gaps, uncertain transaction meaning, false or stale
  recurring candidates, conflicting overlays, and harmless noise.
- Treat effective financial role as stronger evidence than repetition. A
  transfer, refund, or debt payment can happen on a cadence without becoming a
  recurring expense or bill. When such a candidate would distort obligation
  analysis, preserve `not_recurring`; that classifies the candidate, not whether
  the underlying transactions occurred.
- Repair root meaning before downstream presentation. A wrong merchant rule can
  contaminate many categories; a coverage gap cannot be corrected record by
  record.
- Inspect exact effective records and history before writing. Prefer a
  correction for one fact, a split for one mixed transaction, a recurring
  policy for one series, and a rule only for repeated evidence with reviewed
  counterexamples.
- Preview every multi-record effect. Apply in small batches, re-read the
  effective view, and keep reversal handles.
- Leave ambiguous records unchanged. Ask for the smallest missing factual
  interpretation or persist a follow-up only when the issue is material.
- End with what became more reliable, what remains intentionally unresolved,
  and the next highest-value maintenance area.

## Evidence checklist

- The pass has an explicit account, period, merchant, or issue boundary.
- Effective records, existing overlays, representative matches, and exclusions
  were inspected.
- Each write has a verified after-state and recovery handle.
- Remaining ambiguity and coverage gaps are visible rather than normalized away.

## Candor query recipes

- For triage, bounded repairs, verification, and rollback, read
  [the executable workflows](references/workflows.md).
- Load `candor-transaction-organization` for corrections, splits, and rules;
  load `candor-recurring-bills` for recurring-series interpretation.

## Caveats

- Merchant descriptions and provider categories are noisy evidence.
- A clean-looking workspace can still be incomplete; coverage and freshness
  take precedence over cosmetic consistency.

## User-facing answer

Explain which real-world records became clearer, how many items were affected,
what was left alone, and any question that still blocks a safe repair. Do not
expose internal statuses, record ids, command names, or maintenance mechanics
unless the user asks how the cleanup worked.

## Safe Candor writebacks

- Bounded correction or exact split.
- Previewed, reversible normalization rule.
- Confirmed recurring policy.
- Linked note for a material unresolved maintenance issue.

## Approval boundaries

- An explicit request to clean up, organize, or maintain a bounded part of the
  workspace grants task-scoped authority for inspected, reversible internal
  repairs in that area.
- A role-backed exclusion from recurring expenses is factual cleanup within
  that task scope. Confirming a user's intended budget treatment or priority is
  a choice that reflects the user's values and remains a separate question.
- Confirm choices that reflect the user's values separately. How the user
  wants money grouped and which distinctions matter encode the user's values,
  so ask rather than imposing a maintenance taxonomy.
- Ask when the user's intended category or recurring meaning is missing, the
  affected set is broad or unbounded, or a write conflicts with approved state.
- Source reconnection, external messages, transfers, cancellations, and account
  changes need authority for those actions separately.

## Stopping conditions

- Stop before a rule or batch whose full effect cannot be reviewed.
- Stop before overwriting conflicting approved meaning.
- Stop the pass when remaining items need user interpretation rather than
  allowing cleanup momentum to become guessed state.
