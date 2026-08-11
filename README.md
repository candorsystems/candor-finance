# Candor Finance

The official personal finance package for [Candor](https://candor.money). It
gives the AI agent you already use an organized view of accounts, spending,
budgets, goals, investments, notes, and the decisions you approve.

Paste [https://candor.money/START.md](https://candor.money/START.md) into your
agent. It will select the supported package for its environment, request the
normal installation and account-access approvals, and handle the rest.

This package includes the `candor-finance` Agent Skill and the secure Candor
connection used by OpenAI/ChatGPT, Codex, Claude, and Gemini CLI. Standard
`plugin.json`, `skills/`, and `mcp.json` files support clients that follow
the [Agent Plugins 1.0.0](https://agent-plugins.org/specification) format, and
`server.json` identifies the remote service in the official MCP Registry.
Agent-specific configuration is included where needed. OpenClaw and Hermes use
the Candor command-line app after the ClawHub release passes review. Candor
continues to enforce sign-in, access, and every financial-data permission.

Manage your Candor account and subscription at
[app.candor.money](https://app.candor.money). When Candor gives the agent a
secure account link, it explains the required step and opens that exact page.

- [Installation and package selection](https://candor.money/START.md)
- [Connector support](https://candor.money/support)
- [Privacy](https://candor.money/privacy)
- [Terms](https://candor.money/terms)
- [Security](https://candor.money/security)

Except for the scoped MIT-0 OpenClaw skill subtree, Copyright 2026 Candor
Systems, Inc. All rights reserved. See [LICENSE](LICENSE).
