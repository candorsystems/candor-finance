
# Property tracking

Keep each physical property, its dated evidence, and its contribution to net
worth consistent. Use the user's agent judgment to assess estimates; a provider
estimate is evidence with a date and range, not an appraisal or a sale price.

## Datasets

- `properties`
- `accounts`
- `balances`
- `transactions` only when reconciling actual rent receipts or payments
- `actions`

## Workspace resources

- Read a property's selected values and valuation history through its canonical ID.
- Use `notes` for sourced context that does not fit the typed property record.

## Non-goals

- Creating income transactions from potential rent.
- Treating property value as available cash.
- Inferring ownership or joint debt responsibility from an address or account name.
- Recording a sale, loan payoff, or refinance merely by archiving a property.

## Method

- Find the existing property before creating one. Match the physical address,
  including the unit, and use its canonical ID for all further imports.
- Establish whole-property value, observation date, currency, ownership share,
  and source. Provider identifiers are namespaced; never treat a provider ID
  as the canonical property ID.
- Read the linked loan account and its current balance. Set
  `mortgage_balance_scope: "full_account"` only when the entire recorded
  balance is confirmed to belong in the equity calculation. Property ownership
  percentage does not establish debt responsibility. Otherwise omit that field
  and leave equity unknown. Net worth counts the account's recorded debt once.
- Use the complete intended property input for preview. A current manual value
  selects manual tracking and stops automatic replacement. An older appraisal
  produces `effect: "history_only"`: it extends history without changing the
  selected value, rent, ownership, mortgage link, or refresh schedule.
- Inspect the preview's address, amounts, date, ownership, and effect, then apply
  that exact preview within the authorized task. A changed property requires a
  fresh preview. Do not apply a stale preview or create a second property as a
  workaround.
- Re-read the property and relevant net-worth view. History changes alone must
  not change current wealth. Valuation changes are not investment returns or
  received income.

## Evidence checklist

- Values are whole-property Money amounts with source and observation date.
- Owned value uses the recorded ownership percentage exactly once.
- A loan is linked once, with debt responsibility distinguished from ownership.
- Rental estimates identify whole-property versus per-unit basis. Per-unit
  estimates are excluded from portfolio rent totals and are not multiplied by
  an assumed unit count.
- Failed automatic refreshes retain the last estimate; report its original date.
- Unconfirmed mortgage details make net worth partial when there is no linked
  visible loan balance. Confirmed paid-off properties need no mortgage link;
  a recorded zero loan balance is also valid.

## Candor query recipes

- Start with `candor properties list --limit 25` and follow returned continuations.
- Read the selected property and dated evidence with
  `candor properties get PROPERTY_ID --limit 100`.
- Preview an import with `candor properties preview --file PROPERTY.json`.
  Use the live PropertyInput schema for the complete input; for an existing
  property include `property_id`.
- In manual mode, omit `monthly_rent` to preserve a selected estimate or send
  `monthly_rent: null` to clear it. Zero means an actual zero estimate. Historical
  imports never clear current rent.
- Apply with `candor properties apply PREVIEW_ID`. Reverse the latest import
  with `candor properties revert PREVIEW_ID` when appropriate. A later change
  prevents reversal from overwriting newer evidence; submit a correction instead.
- Use `candor net-worth summary` to verify the current contribution.
- Use `candor properties archive PROPERTY_ID` only to stop tracking. Past
  evidence is retained; this does not create sale proceeds or remove loan debt.

## Caveats

- Automatic estimates currently use RentCast for US properties, refresh about
  every 30 days, and depend on provider availability and the configured budget.
  Manual values support the workspace's supported currencies and other countries.
- For an existing automatically tracked property, name, ownership, and mortgage
  edits reuse the saved estimate when address, property type, and provider stay
  the same. Keep `property_id`; these edits preserve provider identity and the
  refresh schedule. Ownership edits affect history from their apply time.
- Other automatic previews contact the provider; ordinary reads do not. On
  `property_rate_limited` or `property_provider_budget_exhausted`, honor
  `retry_after_seconds` before another estimate attempt. Saved estimates and
  manual tracking remain available.
- One loan can link to one property. Fractional loan allocation, multiple secured
  loans, and sale accounting are not modeled by property tracking.

## User-facing answer

Give the relevant value, owned share, equity if established, observation date,
and material uncertainty. Separate estimated gross rent from actual receipts
and expenses. Explain missing debt responsibility without inventing a balance.

## Safe Candor writebacks

- Preview and apply sourced current values or older appraisals within the user's
  request, preserving canonical identity and the preview's effect.
- Record verified supporting context as a linked note when it changes how the
  evidence should be interpreted.

## Approval boundaries

- A bounded request to track, update, import, or correct property evidence
  grants task-scoped authority for the inspected reversible writebacks needed
  to complete it.
- Recover ownership and debt responsibility from evidence or prior user context;
  ask only when a missing fact prevents the requested calculation.
- Rental strategy and risk tolerance encode the user's values; establish their
  substance before recording a preference or goal.
- External sales, refinancing, applications, transfers, and account changes
  require their own authority.

## Stopping conditions

- Stop a conflicting or stale import and re-read the canonical property.
- Keep manual tracking usable when automated estimates are unavailable.
- Leave equity unknown when debt responsibility is unresolved. Do not fabricate
  an allocation to make the financial picture look complete.
