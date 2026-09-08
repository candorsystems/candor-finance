# Release notes

Changes relevant to agents using the Candor package, CLI, and MCP tools.
Earlier releases predate these notes; the list starts with the first recorded summary.

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
