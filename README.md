# Candor Finance

The official agent package for [Candor](https://candor.money), the durable
financial workspace for your AI agent.

Paste [https://candor.money/START.md](https://candor.money/START.md) into your
agent. It will select the supported package for its environment, request the
normal installation and account-access approvals, and handle the rest.

This package bundles the `candor-finance` Agent Skill and Candor's authenticated
remote MCP connection for OpenAI/ChatGPT, Codex, Claude, and Gemini CLI.
Its root `plugin.json`, `skills/`, and `mcp.json` also implement the
[Agent Plugins 1.0.0](https://agent-plugins.org/specification) portable package
format for clients that support that standard. Harness-specific manifests stay
alongside the portable files for clients that require them.
The CLI-backed skill is prepared for publication to ClawHub, where OpenClaw
and Hermes can install it after the public release passes review. The skill
instructions are source-available because agent hosts cache them locally.
OAuth, financial records, durable state, tools, and actions remain enforced by
Candor's operated service.

Subscription selection and administration happen only in Candor's private web
control plane at [app.candor.money](https://app.candor.money). When Candor
returns a `safe_url` or `recovery_url`, the agent explains the required user
step and passes that exact URL through verbatim.

- [Installation and package selection](https://candor.money/START.md)
- [Connector support](https://candor.money/support)
- [Privacy](https://candor.money/privacy)
- [Terms](https://candor.money/terms)
- [Security](https://candor.money/security)

Except for the scoped MIT-0 OpenClaw skill subtree, Copyright 2026 Candor
Systems, Inc. All rights reserved. See [LICENSE](LICENSE).
