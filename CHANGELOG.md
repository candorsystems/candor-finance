# Release notes

Changes relevant to agents using the Candor package, CLI, and MCP tools.
Earlier releases predate these notes; the list starts with the first recorded summary.

## 0.1.72

Investment history follows Plaid’s stable offset ordering without duplicate reads; incomplete collections cannot insert or overwrite canonical activity, and prior verified records remain available.

## 0.1.71

Investment activity uses API schema 2026-09-08.1; retired accounts no longer affect history coverage, and multi-page history verifies its ID set before reconciling removals.

## 0.1.70

Investment activity exports use format v22; mixed-account refresh status reflects unavailable accounts, transient apply retries reach a bounded outcome, and recovery guidance uses forced refresh.

## 0.1.69

Investment activity has Candor-defined kinds, retained coverage and separate refresh health. Plaid uses recent refreshes and periodic full reconciliation; staged failures expose safe diagnostics with bounded retries.

## 0.1.68

Plaid investment activity feeds the canonical dataset with security details, replay-safe identity, source-range removal handling, and separate history coverage.

## 0.1.67

Recurring candidates refresh from bounded transaction evidence; your agent confirms or declares the durable schedule. Existing curation is preserved, and dashboard setup and review prompts help your agent maintain the list.

## 0.1.66

Prompt search tolerates punctuation in public Explore and the dashboard; copy feedback clears when prompts change and ignores outdated clipboard results.

## 0.1.65

A shared prompt catalog now powers public Explore pages and the dashboard library, with editable one-time and recurring prompts for connected agents.

## 0.1.64

Remote MCP declares no change notifications and closes subscription streams cleanly, ending 30-minute reconnect loops in 2026-era clients; request analytics now record client name, version, and protocol.

## 0.1.63

llms.txt now points agents at a sourced comparison of ChatGPT's built-in Finances and Candor, so an agent asked about ChatGPT personal finance can cite what each does and where Candor differs.

## 0.1.62

Overview saves preserve one operation receipt across retries and record refused actions with subscription recovery when financial access is inactive.

## 0.1.61

MCP visuals offer reload and dashboard recovery when a newer or malformed panel cannot be read, while preserving strict validation of financial output.

## 0.1.60

Agent account deletion is web-only; MCP reads, previews, acknowledgments, and Overview saves are separated, with migration guidance, enforced access, and preserved action context.

## 0.1.59

Hosted CLI and MCP usage now records privacy-safe feature outcomes and authenticated MCP request counts for product analytics, without exporting financial records or agent arguments.

## 0.1.58

CLI Markdown preserves every returned next action, including workspace continuations alongside skill installation or update advice.

## 0.1.57

Opening no longer blocks on stale CLI skills; live schemas explain page scope and note edits, and rejected calls provide exact schema recovery.
