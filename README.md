# Candor Finance

[![Reach your money goals with your AI agent](https://candor.money/og/candor-og-home.png)](https://candor.money)

Tell ChatGPT, Claude, or the agent you already use what you want with your
money, like paying off the cards or buying a home, even if you haven't worked
it out yet. With Candor, it builds the plan from your real accounts: goals
with a pace, a budget that pays for them, and every charge sorted to match.
Then it keeps you on it. Once a week Candor reviews your records and tells
your agent what's worth talking through and why, like a goal slipping or a
bill that went up.

**[Start free trial](https://app.candor.money/signup)** ·
[See how it works](https://candor.money) ·
[Security](https://candor.money/security)

## Add Candor to your agent

| Agent | Where to get it |
| --- | --- |
| ChatGPT and Codex | [Candor Finance in ChatGPT's directory](https://chatgpt.com/plugins/plugin_asdk_app_6a74cd40f53c8191905b51d8706da78d) |
| Claude | [Candor Finance in Claude's directory](https://claude.ai/directory/candor-money) |
| Claude Code | [Install from this repo's marketplace](https://candor.money/connect/claude-code) |
| Gemini CLI, OpenClaw, Hermes, and others | Send your agent [START.md](https://candor.money/START.md) |

Your agent asks you to approve its access once, then takes its first look.
Setup guides for each agent are at
[candor.money/connect](https://candor.money/connect).

## What stays true

- **Candor never moves money.** Accounts connect read-only through a
  bank-grade connection provider. Your agent acts outside Candor only with
  your okay.
- **Figures come from your records.** Candor computes totals, budgets, and
  goal paces from your accounts, so your agent isn't guessing a plausible
  number.
- **You can see what your agent did and why.** Every action is recorded with
  its reason, and your plans and decisions stay saved when you switch agents.
- **Your data isn't sold or used to train models.** No ads. You're the
  customer. See [Privacy](https://candor.money/privacy).

## For agents: connection materials

The official package for [Candor](https://candor.money). It gives the AI agent
you already use the person's records, the figures Candor computes from them,
the goals, budget, rules, and notes it keeps, and Candor's weekly review, plus
one skill per job: getting started, planning a goal, budgeting, weekly
check-ins, a full checkup, sorting transactions, finding money, tax prep, and
adding records.

Give your agent [START.md](https://candor.money/START.md). It has the MCP
connection, skill download, and supported package options. The agent uses its
own harness's setup workflow and asks you only for steps it cannot complete.

- **MCP:** `https://api.candor.money/mcp`, Streamable HTTP with OAuth discovery and dynamic
  client registration. Your harness obtains its own client ID; no shared client
  secret is needed.
- **Skills:** every directory under [skills/](./skills). `candor-finance` is the
  front door and the rest are workflows. START also links a single-skill ZIP
  that carries all of them for hosts that upload one skill.
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
- [Terms](https://candor.money/terms)

Except for the scoped MIT-0 OpenClaw skill subtree and the scoped MIT
`cursor/` plugin, Copyright 2026 Candor Systems, Inc. All rights reserved.
See [LICENSE](LICENSE).

## Release notes

See [the changelog](./CHANGELOG.md) for changes by package version.
