# Candor Finance

The official personal finance package for [Candor](https://candor.money). It
gives the AI agent you already use an organized view of accounts, spending,
budgets, goals, investments, notes, and the decisions you approve.

Give your agent [START.md](https://candor.money/START.md). It has the MCP
connection, skill download, and supported package options. The agent uses its
own harness's setup workflow and asks you only for steps it cannot complete.

## Connection materials

- **MCP:** `https://api.candor.money/mcp`, Streamable HTTP with OAuth discovery and dynamic
  client registration. Your harness obtains its own client ID; no shared client
  secret is needed.
- **Skill:** the complete [skills/candor-finance](./skills/candor-finance)
  directory, including its methods and references. START also links a skill ZIP.
- **Supported packages:** Agent Plugins 1.0.0 (`plugin.json`, `skills/`,
  `mcp.json`), Claude and Codex marketplaces (`.claude-plugin/` and
  `.codex-plugin/`), and a Gemini CLI extension (`gemini-extension.json`).
  Use whichever format your harness supports, or install skill and MCP separately.

Your harness owns installation, authorization, skill locations, and reloads.
Keep working installations. Once the skill and tools are available, call
`candor_open` for MCP or run `candor open` for the CLI, then continue into
the user's financial task. Use a private runtime or per-user account isolation
before authorizing personal financial access on a shared host.

Grok Bot installs the `cursor/` plugin from the Cursor Marketplace. It pairs
the same MCP-based skill with the remote MCP server and is listed for Grok Bot
only; `.cursor-plugin/marketplace.json` points the marketplace at it.

The root skill uses MCP, including for capable OpenClaw and Hermes hosts.
The separate `openclaw/skills/` projection uses the Candor CLI and is only for
CLI installations. Keep the skill matched to the connection it operates.
Candor continues to enforce sign-in, access, and financial-data permissions.

Manage your Candor account and subscription at
[app.candor.money](https://app.candor.money). When Candor gives the agent a
secure account link, it explains the required step and opens that exact page.

- [Installation materials and guides](https://candor.money/START.md)
- [Connector support](https://candor.money/support)
- [Privacy](https://candor.money/privacy)
- [Terms](https://candor.money/terms)
- [Security](https://candor.money/security)

Except for the scoped MIT-0 OpenClaw skill subtree and the scoped MIT
`cursor/` plugin, Copyright 2026 Candor Systems, Inc. All rights reserved.
See [LICENSE](LICENSE).

## Release notes

See [the changelog](./CHANGELOG.md) for changes by package version.
