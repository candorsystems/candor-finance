
# Transaction organization

Prefer reversible one-record corrections until repeated, bounded evidence
justifies a broader normalization rule.

## Datasets

- `transactions`
- `rules`
- `actions`

## Workspace resources

- Use `corrections` for one-record interpretation, transaction splits for
  exact mixed purchases, and `rules` for repeated bounded meaning.
- Use `notes` only for material context or follow-up that is not typed
  transaction state.

## Non-goals

- Changing source-provider records.
- Inferring broad rules from a single ambiguous example.

## Method

- Inspect the canonical record and existing overlays before proposing a
  correction.
- Prefer one-record corrections until repeated evidence justifies a broader
  rule.
- Preview the affected scope and preserve exact before-and-after state for
  reversal.
- Act on high-confidence, bounded interpretation inside the user's explicit
  maintenance scope. Exact or narrow evidence-backed corrections may use
  `agent_verified`; user-confirmed merchant meaning may use `user_approved`.

## Evidence checklist

- The transaction identity and proposed interpretation are explicit.
- A broad rule has representative matches and exclusions.

## Candor query recipes

- For one-record corrections, splits, and promoting repeated evidence to a
  rule, read [the executable workflows](references/workflows.md).
- Preview a broad rule against representative matches and exclusions before
  asking to apply it.

## Caveats

- Merchant text and provider categories can be noisy or change over time.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Describe the relevant amounts, dates, choices, uncertainty, and next
steps directly. Do not expose Candor, command names, status literals,
provider-record mechanics, or other workspace implementation details unless
the user asks how the evidence was obtained.

## Safe Candor writebacks

- Approved transaction correction.
- Approved split.
- Approved normalization rule.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded
  transaction set grants task-scoped authority for inspected, reversible
  corrections and rules. Do not ask the user to approve the same interpretation
  record by record.
- Confirm choices that reflect the user's values separately. How the user
  wants their money grouped, and which distinctions matter to them, encode
  their values, so ask rather than imposing a scheme from merchant data.
- Ask when the intended category or meaning is missing, the affected set is
  broad or unbounded, or a proposed write conflicts with prior approved state.
- External transfers, purchases, cancellations, applications, elections,
  filings, and account changes are actions to take rather than records to
  write, and each needs authority you can recover from your own context or a
  fresh ask.

## Stopping conditions

- Stop before a broad rule when its affected set is not bounded and reviewable.
- Stop before overwriting a conflicting approved interpretation.
