
# Workplace retirement

Establish what the user actually contributes, what the employer actually
matches, and what room remains, from evidence rather than assumption. Match
formulas and limits are never inferred from deposits alone.

## Datasets

- `coverage`
- `accounts`
- `transactions`
- `holdings`
- `investment_transactions`

## Workspace resources

- Use `notes` for verified plan terms, contribution baselines, and timed
  re-checks of an expected payroll change.

## Non-goals

- Choosing investments inside the plan; fund cost review belongs to
  `candor-portfolio-fees`, and a retirement savings target belongs to
  `candor-goals-scenario-planning`.
- Changing a deferral election, moving money, or filing anything.
- Deciding legal tax treatment; that stays with the user's professional.

## Method

- Establish what is observable: connected retirement accounts show
  contributions in investment transactions; otherwise contributions live on
  paystubs. Statement facts the user supplies can become canonical records
  through `candor-evidence-capture`; payroll fields have no typed record
  today, so preserve them in a linked note as working context and re-verify
  them from a fresh paystub before relying on them later.
- Verify the plan's terms before judging capture: match formula, eligibility,
  vesting, true-up, and pay-period mechanics come from the plan document,
  summary description, or HR source the user provides or authorizes. A
  deposit pattern cannot establish a match formula.
- Compute capture deterministically once terms are verified: contribution per
  pay period against the matched percentage, and the dollars of match not
  captured at the current rate. Show the arithmetic and its inputs.
- Treat statutory contribution limits as external facts: use a current
  authoritative source, name the tax year, and separate employee deferral,
  employer, and combined limits. Never reuse a remembered figure without
  checking its year.
- When the user changes a deferral, the change shows up on a later paystub or
  contribution record. Write a timed re-check note with the baseline and
  verify the posted result before calling the gap closed.

## Evidence checklist

- Contribution claims cite observed records or a captured paystub, with dates
  and gross-pay basis where used.
- Match-capture claims cite the verified formula and its source, effective
  date, and applicability.
- Limit claims name the tax year and the authority they come from.

## Candor query recipes

- For the contribution inventory, match-capture math, and deferral-change
  verification, read [the executable workflows](references/workflows.md).

## Caveats

- Bank deposits show net pay, not contributions; without a paystub or a
  connected plan account, contribution facts are bounded and must say so.
- Match capture is plan-specific; per-period formulas and true-up provisions
  change the answer for the same annual percentage.

## User-facing answer

Use the workspace as internal evidence, then answer in the user's financial
terms. Lead with what is being captured and what is not, in dollars per year,
with the verified formula and the exact next step that changes it. State what
could not be established and what evidence would establish it. Do not expose
Candor, command names, status literals, provider-record mechanics, or other
workspace implementation details unless the user asks how the evidence was
obtained.

## Safe Candor writebacks

- Linked Markdown note with verified plan terms, a contribution baseline, or
  a timed re-check for an expected payroll change.
- Captured statement balances and holdings through the evidence-capture
  method under the user's explicit request; plan activity has no typed
  investment-transaction import today and stays note context. Plan terms such as a match
  formula have no typed retirement contract today, so they stay beside the
  paystub payroll fields in a linked note as working context with an explicit
  re-verification obligation, not canonical evidence.

## Approval boundaries

- An explicit request to review a bounded retirement area grants task-scoped
  authority for the inspected, reversible Candor writebacks needed to finish
  it. Do not ask again for each record.
- How much to defer, and the taxable-versus-Roth split, encode the user's
  values and tax situation; present the tradeoffs and confirm rather than
  choosing.
- Election changes, transfers, rollovers, and anything filed with an employer
  or provider are external actions, and each needs authority you can recover
  from your own context or a fresh ask.

## Stopping conditions

- Stop before quantifying match capture while the formula is unverified; say
  what document would verify it.
- Stop before any election change, rollover, or provider contact.
- Stop and name the professional boundary when tax specifics, plan-legal
  detail, or cross-year corrections exceed the available evidence.
