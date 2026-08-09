# Marketplace information

## Listing

**Name:** Candor Finance

**Short description:** Watch over and improve your financial life.

**Description:** Help the AI agent you already use with personal finance.
Candor organizes connected read-only accounts, spending, budgets, goals,
investments, notes, and prior decisions so your agent can understand what
changed and help you follow through.

## Service endpoints

- Remote MCP: https://api.candor.money/mcp
- Candor account: https://app.candor.money
- Documentation: https://candor.money/START.md
- Support: https://candor.money/support
- Privacy: https://candor.money/privacy
- Terms: https://candor.money/terms
- Security: https://candor.money/security

## Supported agents

- Agent Plugins 1.0.0 clients use the root `plugin.json`, `skills/`, and
  `mcp.json` portable package.
- OpenAI/ChatGPT and Claude use the authenticated remote MCP plus the included
  Candor finance skill.
- OpenClaw uses the CLI-backed skill after its ClawHub release passes review.
- Hermes uses the same ClawHub skill through its community source after
  installation verification succeeds.

Billing operations are not exposed to the model. If account access is inactive,
Candor returns a secure page where the user can finish account or subscription
setup.
