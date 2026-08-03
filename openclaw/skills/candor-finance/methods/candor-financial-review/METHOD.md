
# Financial review

Find supported ways to improve the user's finances. Sweep before ranking,
writing, or deepening anything.

## Completion contract

A first pass is complete only when you have:

1. bounded coverage and freshness;
2. combined the complete transaction scope; and
3. run one program that emits one capped candidate list for each lens below.

Together the four lists are the compact candidate ledger. Each reports its
total count and at most five candidates with source ids. Stdout is model
context: print only the ledger. Printing even one sample row is shape probing
and fails the review.

If stdout lacks any lens section, the sweep is incomplete; finish it before any
drilldown. Test baseline, comparator, and counterevidence before ranking or
writing.

The four lenses are:

- **Avoidable outflows:** duplicates, fees, reversals, and charges whose nearby
  baseline makes avoidability plausible.
- **Expected inflows:** large or irregular debits with no later offset, plus
  relevant matched debit-credit precedents for refunds, reimbursements, or
  income. Each candidate shows the debit, the comparable debit, and its later
  inflow. Text and category are signals, not proof that an inflow was owed.
- **Recurring changes:** level, cadence, or count changes against the same
  merchant or service's observed baseline.
- **Actual mismatches:** observed current cash, debt, cost, payment, deadline,
  term, or liquidity facts that conflict. Missing fields do not create one.

A missing field by itself is a coverage caveat, not a surviving lead. A
candidate survives only when current evidence establishes at least one of:
observed avoidable or recoverable cost; a missed expected outcome with a
comparator; a baseline discontinuity; or present exposure paired with an
observed term, deadline, or requirement. A generic risk, plausible bad outcome,
or missing fact cannot supply the missing half. Prefer observed value over
unquantified possibility. Notes preserve a supported finding awaiting an
observable outcome; they do not promote speculation into work. A historical
one-off with no observed ongoing or recoverable effect is ordinary context.
If a required observed fact is absent, remove the candidate rather than
flagging it as a watch item.

## Datasets

Start with `coverage`, `transactions`, and `recurring`. Query others only when
evidence calls for them.

- `coverage`
- `accounts`
- `balances`
- `transactions`
- `recurring`
- `budgets`
- `goals`
- `holdings`
- `changes`
- `actions`

## Workspace resources

- Use `notes` for supported unfinished outcomes with observable revisit dates.

## Non-goals

- Loading every record, method, or external source.
- Inferring the user's goals, risk preferences, or tradeoffs.
- Treating broad triage as professional or implementation authority.

## Method

- Infer scope from the request and start unless a missing boundary would change
  what you inspect. This method owns initial triage. Do not load another domain
  skill for the initial sweep.
- Process the opening, then establish coverage, freshness, currencies, and
  material blind spots. Read history only when it could change the review. Use
  factual changes only when the opening or a surviving candidate calls for
  them; never let a generated label set the review's agenda.
- Query one bounded transaction scope. When it has continuations, download and
  combine every page before analysis. Use the supplied JSON Pointer and JSON
  Schema directly; do not probe the wrapper or record shape.
- Produce the completion contract's four lists in one code pass. Then test each
  candidate and classify it as supported, unresolved, or ordinary context.
- Use `recurring` to test recurring candidates. Query other datasets only when
  a surviving candidate or the request makes them material.
- After the sweep, rank surviving leads by defensible financial effect,
  deadline, reversibility, and what the user can change. Do not let the first
  plausible story end triage.
- Load one deeper method only when its procedure could change a surviving
  answer. Define the next action, owner, authority, observable outcome, and
  revisit trigger for each material unfinished lead.

## Evidence checklist

- Coverage and the four-list ledger cover the claimed window.
- Every finding has a baseline or comparator, not a label alone.
- Missing-inflow claims use the observed window and relevant positive precedent.
- Full rows stayed out of model-facing output.
- Facts, external research, user context, assumptions, and judgment remain
  distinct.

## Candor query recipes

- This method is complete for a first pass. For a periodic review, life event,
  or formal recommendation handoff, read
  [the extended review workflows](references/workflows.md).
- When the user explains what a merchant or transaction means, load
  `candor-transaction-organization` and inspect the related transactions,
  corrections, and rules. Do not leave reusable interpretation as chat-only
  context.

## Caveats

A broad review is bounded triage; absent accounts or context limit conclusions.

## User-facing answer

Lead with the few supported findings that could improve the user's financial
life. For each, give the exact amount and date, the baseline or comparator, why
it matters, uncertainty, and the next action. Omit unsupported candidates;
ordinary context is not a lower-priority finding.

Do not advertise setup, monitoring, budgets, goals, files, memory writes, or
the workspace itself unless they materially answer the request. Describe your
follow-through as what you will remember or check, not the mechanism you used.
Never expose Candor, provider names, command names, status literals, record ids,
or method mechanics unless the user asks how the evidence was obtained.

## Safe Candor writebacks

- Linked Markdown note only for a supported unfinished outcome, with exact
  baseline, verification recipe, meaning of each result, owner, and revisit
  date. Re-read the exact source record before writing and link its actual id;
  never approximate an identifier. Never preserve a mere missing field or
  unsupported possibility.
- User-approved budget or goal version through its typed command.
- Bounded recurring, correction, or normalization state within the user's
  explicit maintenance scope.

## Approval boundaries

- An explicit request to handle, fix, clean up, or organize a bounded workspace
  area grants task-scoped authority for inspected, reversible Candor
  writebacks. Do not ask again for each record.
- Goals, risk tolerance, priorities, and tradeoffs encode the user's values;
  confirm their substance rather than inferring it from records.
- External transfers, purchases, cancellations, applications, elections,
  filings, trades, messages, and professional engagements are actions to take
  rather than records to write, and each needs authority you can recover from
  your own context or a fresh ask.

## Stopping conditions

Stop when missing user or regulated-domain facts determine the recommendation,
or before acting when responsibility, authority, or exact terms are unclear.
