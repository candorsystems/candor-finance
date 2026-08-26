# Candor Finance

The official personal finance package for [Candor](https://candor.money). It
gives the AI agent you already use an organized view of accounts, spending,
budgets, goals, investments, notes, and the decisions you approve.

Paste [https://candor.money/START.md?v=0.1.32](https://candor.money/START.md?v=0.1.32) into your
agent. It will inspect its own installation capabilities, choose or assemble a
complete setup from Candor's official materials, request the normal
installation and account-access approvals, and handle the rest.

This package includes the `candor-finance` Agent Skill and the secure Candor
connection used by OpenAI/ChatGPT, Codex, Claude, and Gemini CLI. Standard
`plugin.json`, `skills/`, and `mcp.json` files support clients that follow
the [Agent Plugins 1.0.0](https://agent-plugins.org/specification) format, and
`server.json` identifies the remote service in the official MCP Registry.
Agent-specific configuration is included where needed. OpenClaw's manual route
uses the CLI-managed skill under `~/.agents/skills`; its future ClawHub route
uses the dedicated CLI-backed skill under `openclaw/skills/`. The Candor CLI
keeps its managed copy for release preflight in both cases, and OpenClaw's
documented skill precedence makes the same-named CLI projections deterministic.
Hermes can install the root MCP-native skill with its remote MCP client; a
future Hermes ClawHub install instead uses the CLI-backed projection. Do not
mix skill and tool projections. Candor continues to enforce sign-in, access,
and every financial-data permission.

Manage your Candor account and subscription at
[app.candor.money](https://app.candor.money). When Candor gives the agent a
secure account link, it explains the required step and opens that exact page.

- [Installation materials and guides](https://candor.money/START.md?v=0.1.32)
- [Connector support](https://candor.money/support)
- [Privacy](https://candor.money/privacy)
- [Terms](https://candor.money/terms)
- [Security](https://candor.money/security)

Except for the scoped MIT-0 OpenClaw skill subtree, Copyright 2026 Candor
Systems, Inc. All rights reserved. See [LICENSE](LICENSE).
