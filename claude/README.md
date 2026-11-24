# Candor Finance

Candor is a personal finance app that helps you reach your money goals with Claude. Your agent works from your real bank, card, loan, and investment accounts: it sets up goals and a budget with you, finds money you are losing to fees, price increases, or missed refunds, and remembers your plan and decisions between conversations. Candor reviews your spending, bills, debt, savings, and investments and tells your agent what's worth talking through and why. Candor never moves money.

**[Start free](https://app.candor.money/signup)** ·
[See how it works](https://candor.money) ·
[Security](https://candor.money/security)

- Free to try with your own transactions. The Personal plan connects your US banks, cards, and brokerages so everything comes in automatically.
- Your data is not sold or used to train models.
- Every action Claude takes is recorded with its reason.

Candor is not a licensed financial advisor, and what Claude tells you with it is not professional financial, investment, tax, or legal advice.

## Add Candor to Claude

Install this plugin, then ask Claude about your money. Claude asks you to
approve its access once, then takes its first look. The setup guide is at
[candor.money/connect/claude](https://candor.money/connect/claude).

## What stays true

- **Candor never moves money.** Accounts connect read-only through a
  bank-grade connection provider. Claude acts outside Candor only with
  your okay.
- **Figures come from your records.** Candor computes totals, budgets, and
  goal paces from your accounts, so Claude isn't guessing a plausible
  number.
- **You can see what Claude did and why.** Every action is recorded with
  its reason, and your plans and decisions stay saved when you switch agents.
- **Your data isn't sold or used to train models.** No ads. You're the
  customer. See [Privacy](https://candor.money/privacy).

## What this plugin runs and sends

- **No hooks, commands, agents, or background processes.** The plugin adds
  skills and one MCP server, nothing else.
- **Skills are instructions.** Each skill is Markdown, with no scripts.
- **One MCP server, Candor's own.** It is the hosted server at
  `https://api.candor.money/mcp`, which Claude authorizes with OAuth. Through it
  Claude reads and saves your Candor workspace. It cannot move money or change
  anything at a financial institution.
- **Two non-secret headers.** Requests to that server carry
  `Candor-Agent-Package-Version` and, where the host supports it,
  `Candor-Agent-Package-Route`, naming the package version and where it
  was installed from. Neither holds a credential or personal data.
- **No local secrets.** The plugin reads no environment variables,
  credentials, or local files.

## Support

Manage your Candor account and subscription at
[app.candor.money](https://app.candor.money). When Candor gives Claude a
secure account link, it explains the required step and opens that exact page.

- [Support](https://candor.money/support)
- [Privacy](https://candor.money/privacy)
- [Terms](https://candor.money/terms)

Copyright 2026 Candor Systems, Inc. All rights reserved. See [LICENSE](LICENSE).
