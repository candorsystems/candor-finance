# Insurance and plan-year workflows

## Reconstruct observed plan-year cost

1. Confirm the policy type, covered people or property, policy identity, plan
   year, renewal date, and currencies.
2. Inspect coverage and likely premium or claim-related merchants:

   ```sh
   candor coverage get --reason "Check insurance-review coverage" --task-key TASK_KEY
   candor transactions list --since START --until END --limit 100 --reason "Find insurance and care transactions" --task-key TASK_KEY
   candor transactions list --merchant MERCHANT --since START --until END --limit 100 --reason "Inspect plan-year insurance spending" --task-key TASK_KEY
   ```

3. Separate premiums, observed out-of-pocket spending, reimbursements, refunds,
   and unrelated merchant activity. Transactions do not establish allowed
   amount, deductible credit, claim status, or coverage.
4. Obtain current policy documents, claim or explanation-of-benefits records,
   and insurer portal facts as authorized. Record source, policy/plan year,
   effective date, retrieval date, and applicability.

Complete when observed cash cost is reproducible and kept separate from insurer
adjudication and policy terms.

## Compare plan or policy scenarios

1. Verify premiums, deductibles, copays or coinsurance, limits, exclusions,
   network or coverage constraints, employer contributions, and renewal terms
   from current authoritative documents.
2. Ask for the user's expected usage or risk scenarios; do not infer medical
   needs, risk tolerance, or required coverage from transactions.
3. Model at least low, expected, and high usage or loss scenarios when
   uncertainty is material. State what is and is not included.
4. Show premium plus modeled out-of-pocket cost separately from nonfinancial
   coverage differences, access, exclusions, and tail risk.
5. Treat tax effects, legal requirements, and medical suitability as
   conditional on current jurisdictional and professional guidance.

Complete when each scenario is traceable to current terms and stated usage or
risk assumptions, without ranking coverage for the user beyond available
context.

## Prepare for renewal

1. Work backward from the renewal or enrollment deadline and identify the last
   date needed for document collection, comparison, and user decision.
2. Research current renewal terms and alternatives from official insurer,
   employer, marketplace, regulator, or policy sources as applicable.
3. Preserve a timed note containing the exact deadline, sources, missing facts,
   responsible party, caveats, and what decision remains:

   ```sh
   candor notes create --file NOTE.json --reason "Track insurance renewal review" --task-key TASK_KEY --parent-action ACTION_ID
   ```

4. Enrollment, cancellation, coverage change, claim submission, or broker
   contact remains external and requires separately granted authority.

Complete when the decision packet and deadline are ready, or the missing
coverage facts are explicitly escalated.
