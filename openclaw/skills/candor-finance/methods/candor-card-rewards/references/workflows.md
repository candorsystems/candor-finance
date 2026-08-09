# Credit-card rewards workflows

## Inventory existing cards and spend

1. Confirm the product identity of each card without requesting full account
   numbers. Separate card ownership from user-authorized usage preferences.
2. Inspect visible accounts, coverage, and category totals:

   ```sh
   candor coverage get --reason "Check card and transaction coverage" --task-key TASK_KEY
   candor accounts list --limit 100 --reason "Inventory visible card accounts" --task-key TASK_KEY
   candor spending-categories list --since START --until END --reason "Summarize observed category spend" --task-key TASK_KEY
   candor merchants list --limit 100 --reason "Inspect material merchant spend" --task-key TASK_KEY
   ```

3. If the analysis requires assigning spend to a specific card, inspect the
   transaction schema first. When the declared query cannot express the join,
   use a bounded snapshot:

   ```sh
   candor data schema transactions --reason "Check whether card-specific spend is available" --task-key TASK_KEY
   candor data snapshot --datasets accounts,transactions,spending_categories --since START --until END --output SNAPSHOT.sqlite --reason "Analyze bounded card-specific spend" --task-key TASK_KEY
   ```

   If the snapshot lacks a reliable account join, do not allocate aggregate
   spend to a card; ask for another source or present an aggregate scenario.

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
