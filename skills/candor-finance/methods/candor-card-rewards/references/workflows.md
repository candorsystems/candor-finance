> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Credit-card rewards workflows

## Inventory existing cards and spend

1. Confirm the product identity of each card without requesting full account
   numbers. Separate card ownership from user-authorized usage preferences.
2. Inspect visible accounts, coverage, and category totals:

   ```text
   candor_get({
     "operation": "coverage.get",
     "reason": "Check card and transaction coverage",
     "task_key": "TASK_KEY"
   })
   candor_get({
     "operation": "accounts.list",
     "reason": "Inventory visible card accounts",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   candor_get({
     "operation": "spending_categories.list",
     "reason": "Summarize observed category spend",
     "task_key": "TASK_KEY",
     "args": {
       "since": "START",
       "until": "END"
     }
   })
   candor_get({
     "operation": "merchants.list",
     "reason": "Inspect material merchant spend",
     "task_key": "TASK_KEY",
     "args": {
       "limit": 100
     }
   })
   ```

3. If the analysis requires assigning spend to a specific card, take that
   card's exact `id` from `accounts list` and use it as the
   `source_account_id` transaction filter:

   ```text
   candor_get({
     "operation": "transactions.list",
     "reason": "Inspect spend assigned to this card",
     "task_key": "TASK_KEY",
     "args": {
       "source_account_id": "SOURCE_ACCOUNT_ID",
       "since": "START",
       "until": "END",
       "limit": 100
     }
   })
   ```

   Follow `pagination.next_cursor` until `pagination.has_more` is false before
   treating the period as complete. If the card is not visible or its
   transaction coverage is insufficient, do not allocate aggregate spend to
   it; ask for another source or present an aggregate scenario.

Complete when card identities, observed spend, currencies, account assignment,
and coverage gaps are explicit.

## Evaluate current-card routing

1. Obtain current official issuer terms for each relevant card: earning rules,
   merchant-category definitions, caps, exclusions, annual fee, credits,
   redemption constraints, and effective dates.
2. Record publisher, product identity, URL/document, effective date, retrieval
   date, and user applicability. Treat marketing summaries as secondary to the
   benefit guide or card agreement.
3. Model only observed eligible spend. Separate:
   - base and category rewards;
   - caps or thresholds;
   - credits the user can realistically use without induced spending;
   - annual fees;
   - cash-equivalent value from subjective travel value; and
   - unmodeled merchant coding or redemption uncertainty.
4. Present a routing plan as a draft behavior choice. Ask before recording any
   rule or note that reflects the user's values.

Complete when the incremental value versus the current course is reproducible
and the user can see fees, caps, effort, uncertainty, and behavioral risks.

## Review an annual fee or possible card change

1. Verify the fee amount and renewal date from a current statement or issuer
   source.
2. Compare verified benefits actually used, realistically usable benefits, and
   observed rewards with the fee. Do not count a credit at face value when it
   requires unwanted spending.
3. Before discussing an application, closure, or product change, gather the
   user's credit, liquidity, upcoming borrowing, account-age, and preference
   context outside Candor as needed. State what remains unknown.
4. Research current product and credit-impact information from authoritative
   sources. Never present modeled rewards alone as a recommendation.
5. Any application, retention call, product change, or closure is external and
   requires separately granted authority.

Complete when the analysis separates current-card economics from the broader
credit decision and stops before external action without authority.
