
# Trial watchdog

Turn "keep an eye on this trial" into a durable, evidence-backed promise. A
trial is not resolved when the reminder becomes due; it is resolved when the
financial outcome is observed.

## Datasets

- `transactions`
- `recurring`
- `coverage`
- `changes`
- `actions`

## Workspace resources

- Use `notes` for the baseline, revisit time, literal re-check recipe, outcome
  meanings, and eventual resolution.

## Non-goals

- Assuming a card authorization proves the final price or billing cadence.
- Promising background monitoring when the agent cannot schedule a future run.
- Cancelling, changing, or contacting a merchant without authority for that
  external action.

## Method

- Recover the merchant, trial start or signup evidence, stated end date, expected
  price and cadence, payment account if known, and the user's desired outcome.
  Record missing terms as unknown; they are not a reason to postpone the
  baseline when the user asked for the outcome to be watched.
- Verify terms from an authoritative confirmation or merchant source when they
  are available. Transaction evidence alone does not establish trial terms.
- Read observable history from coverage records. The earliest or latest
  merchant transaction is activity evidence, not a coverage boundary.
- Search for authorizations, refunds, reversals, and prior recurring series.
  Treat a small authorization as identity evidence, not the final charge.
- Create a timed re-check note before promising follow-through. Its revisit
  time is when a posted charge or confirmed non-charge should be observable.
  Unknown price or cadence becomes an explicit outcome branch in the note, not
  a prerequisite for creating it.
- On revisit, open the due note, rerun its limited check, compare exact new
  evidence with the baseline, and inspect merchant and amount variants.
- Resolve the watched event after observing a posted conversion charge, a
  verified cancellation or non-conversion, or another conclusive outcome.
  Resolve does not certify that an observed charge matched unknown terms; state
  that comparison separately. Otherwise update the baseline and next observable
  time.

## Evidence checklist

- Merchant variants, expected date window, price, cadence, and source of terms
  are recorded or explicitly unknown.
- Baseline records exact observed authorizations or absence plus coverage and
  freshness.
- The re-check recipe and outcome meanings are self-contained.
- Resolution cites the actual posted charge, reversal, or authoritative
  non-conversion evidence.

## Candor query recipes

- For initial capture, revisit, and resolution, read
  [the executable workflows](references/workflows.md).
- Load `candor-recurring-bills` if a live recurring series needs interpretation
  after conversion.

## Caveats

- Due notes surface work; they do not execute it. Promise a dated check only
  when the agent can schedule the revisit.
- Pending transactions, authorizations, and merchant-name drift can make the
  first observation inconclusive.

## User-facing answer

At signup, state what will be checked and when in the user's terms. On revisit,
state the merchant, exact posted amount and date, whether it matches the
expected conversion, and what choice is now available. Do not expose note ids,
commands, status literals, or workspace mechanics unless asked.

## Safe Candor writebacks

- Linked timed re-check note.
- Updated note with a new baseline when the outcome remains unobservable.
- Resolved note after a conclusive financial outcome.
- Confirmed recurring policy only when the series interpretation is established.

## Approval boundaries

- A request to keep an eye on a named trial authorizes the agent's own linked
  note and subsequent evidence checks; it does not authorize cancellation.
- An explicit request to organize the resulting recurring item grants bounded,
  task-scoped authority for reversible internal writeback after inspection.
- Confirm choices that reflect the user's values separately. Whether the
  service is worth keeping and what price is acceptable encode the user's
  values, so ask rather than deciding from the first charge.
- Merchant contact, cancellation, purchase, plan change, or dispute needs
  authority for that external action separately.

## Stopping conditions

- Stop short of promising an automatic dated check when no scheduler exists.
- Stop short of resolution while the charge is pending or coverage is
  incomplete. Stop short of saying an observed charge matched the agreement
  when authoritative price or cadence is missing, but do not leave the
  observation promise open solely because that comparison is unavailable.
- Stop before merchant action without separate authority.
