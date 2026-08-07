# Marketplace information

## Listing

**Name:** Candor Finance

**Short description:** Watch over and improve your financial life.

**Description:** Give your existing AI agent a durable personal-finance
workspace with connected read-only financial records, deterministic summaries,
approved budgets and goals, evidence-first finance methods, and auditable
follow-through.

## Service endpoints

- Remote MCP: https://api.candor.money/mcp
- Web control plane: https://app.candor.money
- Documentation: https://candor.money/START.md
- Support: https://candor.money/support
- Privacy: https://candor.money/privacy
- Terms: https://candor.money/terms
- Security: https://candor.money/security

## Host projections

- Agent Plugins 1.0.0 clients use the root `plugin.json`, `skills/`, and
  `mcp.json` portable package.
- OpenAI/ChatGPT and Claude use the authenticated remote MCP plus the bundled
  native skill.
- OpenClaw uses the CLI-backed skill after its ClawHub release passes review.
- Hermes uses the same ClawHub skill through its community source after
  installation verification succeeds.

Billing operations are not exposed to the model. If account access is inactive,
Candor returns a private web URL for the user to complete subscription setup or
administration.
