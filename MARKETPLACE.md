# Marketplace information

## Listing

**Name:** Candor Finance

**Short description:** Your financial workspace.

**Description:** Candor is your financial workspace for budgets, goals,
recurring bills, and the decisions you want to keep. Connect your accounts on
Candor, then use your agent to review your finances with the records and
context in one place.

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
  Candor finance skill. ChatGPT installs both from the Candor Finance listing
  in its plugin directory. Claude on paid plans and Claude Code sync this
  repository as a plugin marketplace.
- Grok Bot and other agents with their own computer fetch `skills/candor-finance`
  and add the remote MCP server themselves.
- OpenClaw uses the root finance skill with native MCP and OAuth where its
  installed host supports them. Reuse a working CLI-managed installation;
  the separate ClawHub projection remains CLI-backed while review is pending.
  On a shared host, configure per-user credential isolation before authorizing
  personal financial access.
- Hermes can install the root multi-file MCP-native skill directly from GitHub
  while a centralized listing is pending. A future ClawHub install uses the
  separate CLI-backed projection.

Use the harness's native setup first. A client registers itself; if an app
asks for a Client ID, leave it blank. Manual connection values are on
[Agent Connections](https://app.candor.money/agents).
[Email us](mailto:support@candor.money) if setup remains blocked.

Billing operations are not exposed to the model. If account access is inactive,
Candor returns a secure page where the user can finish account or subscription
setup.
