# Release notes

Changes relevant to agents using the Candor package, CLI, and MCP tools.
Earlier releases predate these notes; the list starts with the first recorded summary.

## 0.1.138

ChatGPT and Codex install steps for the Candor Finance plugin now include selecting Connect when prompted, before signing in to Candor. Tools and the finance skill are unchanged.

## 0.1.137

ChatGPT setup now leads with the approved Candor Finance plugin, which installs the tools and finance skill together, and Codex guides offer it too; the Developer mode custom app remains the ChatGPT fallback.

## 0.1.136

Candor's MCP and API requests respond faster: access tokens verify without a network round trip and large catalogs load only on the routes that use them. Tools, arguments, and results are unchanged.

## 0.1.135

No change to CLI commands, MCP tools, or responses. The hosted API's Stripe webhook now also accepts invoice.paid so a subscription's first paid charge is recorded for ad conversion reporting.

## 0.1.134

New agent connections include candor:connections, so candor_connections can refresh accounts the user already connected; connecting and removing accounts stay in the web app. Every tool description now says when to use it.

## 0.1.133

MCP tool and parameter descriptions now state what each tool does, when to use it, and what it accepts, without naming other tools or instructing the model; continuations stay in next_actions and navigation in the skill.

## 0.1.132

To set an attention card aside until a date, write a note about its situation (about resource situations) with revisit_at; the card leaves at once, reads as deferred, and returns on that date if it still applies.

## 0.1.131

Transaction labels show the bank's own description unless a rule or a curated import names them; provider merchant enrichment stays a separate hint, and label counts still group by merchant.

## 0.1.130

Saved conversation results now report policy_version conversation-relevance.v2. Larger workspaces that were refused as over budget get suggestions and attention cards again, so expect refreshed picks after the next evaluation.

## 0.1.129

llms.txt renders its guides from one index and adds the guide hub, an Era comparison, a forgotten-subscriptions how-to, and a corrected refund case study summary.

## 0.1.128

llms.txt lists new Claude and Meta Muse personal finance guides and describes the AI personal finance agent guide as advisor-led, with a short list of what needs a decision.

## 0.1.127

Attention cards keep their places across evaluations and carry since, arrival, and a cleared list with reasons; a dismissed card is refilled at once, and judgments run on material change or at most daily.

## 0.1.126

Saved conversation reads carry judged attention situations with their dashboard cards, evidence, and dispositions; workspace openings list the same situations under attention.situation, cards first.

## 0.1.125

Context-only note reads can exhaust opening overflow. Export v23 includes note provenance and permitted saved suggestions after billing expires. Dismissal preserves other cards and pinned handoffs.

## 0.1.124

Conversation reads poll only pending evaluations and preserve the selected result ID. Shared context includes authorized linked notes, and observations retain every captured currency.

## 0.1.123

Saved conversation results provide up to five Jev-ranked library prompts with authored assignments and shared context. Overview and the library show the same ordered suggestions; agents investigate the user-selected question.

## 0.1.122

Conversation suggestions use one catalogue choice with a shared financial picture and notes. Saved reads return the selected prompt and assignment without duplicate recipe, reason or ranking fields.

## 0.1.121

Conversation handoffs recover one selected prompt with its saved financial picture and shared notes. The dashboard stays compact; the agent receives the context needed to investigate.

## 0.1.120

Read saved personalized suggestions selected across the prompt library using attributed notes and connected financial observations; curate onboarding context with recoverable edits and retain more context than fits in the opening preview.

## 0.1.119

Recurring dataset pages explain detection progress and temporary failures even when empty. Automatically included bills retain their posted payments in dashboard totals.

## 0.1.118

Clear recurring predictions now populate the schedule automatically, while uncertain candidates remain reviewable and approved agent overrides stay authoritative.

## 0.1.117

The harness roster carries a builder for Claude's prefilled custom-connector link, so the signed-in dashboard can open Claude's connector form with the deployment's MCP address filled in.

## 0.1.116

Setup asks the agent to walk the user through connecting Candor as an MCP server and to hand off to a new conversation when tools load there. When blocked, the agent gives a one-tap setup help link instead of an email address.

## 0.1.115

Setup guides hand the work to the harness and link each vendor's own instructions. The dashboard shows new connections live. A user is never asked for a Client ID; apps that add connections only in a browser say so.

## 0.1.114

ChatGPT visuals restore nullable fields omitted by the host and receive delayed tool results correctly, so Budget, Recurring, and other panels render while financial data validation stays strict.

## 0.1.113

MCP annotations disclose private action and audit writes. OAuth discovery stops advertising unsupported identity scopes, and inactive MCP accounts receive an access explanation without a subscription purchase link.

## 0.1.112

Muse and ChatGPT setup guides replace internal test history with connection checks and recovery steps, while public setup and support copy directs users to supported routes.

## 0.1.111

Product feedback is offered, not automatic: after Candor misbehaves or needs a workaround, the agent tells the user and sends the report only when they agree or ask, with sensitive data stripped from the report text.

## 0.1.110

Skill release 2026-09-14 gives the reworded product feedback guidance its own identifier, so installed agents are advised to update; no other content changes.

## 0.1.109

Setup prefers remote MCP for any harness and reserves the CLI for hosts where the approving browser shares the shell's machine. Opening descriptions name where the checkpoint lives, and cursor errors say to replay the full next action.

## 0.1.108

Product feedback guidance rewritten: feedback.submit files a report about Candor's software with Candor's feedback endpoint after the user's task, with financial and personal details stripped from the report text.

## 0.1.107

OAuth clients that omit resource receive MCP-bound authorization. Agent connections include consented background access and refresh capability by default. Muse setup uses hosted OAuth and remote MCP instead of CLI loopback login.

## 0.1.106

Same-day postings no longer form recurring candidates; possible_matches compares compacted labels, reports role and account differences, and names where a missed bill moved; unmatched reads default to changes since the last opening.

## 0.1.105

transactions.get lists only the rules that matched or applied by default and reports omitted_count; pass rules=all (CLI --rules all) to see every active rule with the criterion it failed.

## 0.1.104

Every MCP result now returns inline, whatever its size; the short-lived download artifact, resource links, delivery_options, and the inline_response argument are gone, so open and large reads need no extra step.

## 0.1.103

feedback.submit (candor feedback) sends a bug, friction, or idea report about Candor itself to the Candor team after the user's task; it leaves the workspace and must carry no financial data.

## 0.1.102

Recurring schema guidance identifies presentable payment dates, amounts, and proposed merchant facts separately from working IDs and match signals.

## 0.1.101

Recurring payments follow approved calendars and explicit amount ranges, exact otherwise. Reversible associations preserve evidence. Opening preserves continuations, flags incomplete scans, and omits dead links on removed rows.

## 0.1.100

Recurring suggestions respect confirmation constraints, exact-id reads reach records beyond bounded scans, and opening and list continuations can page through all recurring records with scope-preserving filters.

## 0.1.99

Opening includes checkpoint-scoped transaction changes and direct skill downloads; category provenance filters support quiet reviews, and recurring candidates propose durable explicit associations without sparse-pattern missed bills.

## 0.1.98

MCP descriptions clarify schema selection, change reads, write arguments, and recovery. Includes hosted checkout and identity-verification improvements while retaining current CLI upgrade guidance.

## 0.1.97

CLI versions before 0.3.118 must upgrade to execute current bounded-read continuations. Change comparisons use request time so default periods and time-based evidence stay current.

## 0.1.96

Explicit task reasons remain visible in agent activity with continuations grouped under them; recurring lists expose calendar anchors, and detected semimonthly schedules retain their slots after February.

## 0.1.95

Budget help describes capped reads as partial results with observed totals and warnings; recurring change coverage counts the records analyzed.

## 0.1.94

Cashflow roles fall back to the effective category at low confidence when no explicit role or recognized Plaid code exists, so existing category-only rules keep their meaning. Budget baselines count synced activity months as covered.

## 0.1.93

Schema orientation uses fixed system reasons. Partial reads expose actual recovery only. Budget guidance distinguishes unspent allocations from spending safety and uses the reported baseline denominator.

## 0.1.92

Partial changes, categories and rule previews expose recovery actions. MCP validates context and comparison dates; CLI retains compatible-response errors. Recurring forecasts preserve month-end anchors.

## 0.1.91

Onboarding distinguishes unattended monitoring from session-only timers. Notes may preserve monitoring context or routine references; the host scheduler remains authoritative for execution.

## 0.1.90

Notes lead with durable context and optional revisit dates; CLI, MCP and skill descriptions distinguish recurring financial postings from host-scheduled agent work.

## 0.1.89

Financial review supports evidence-led analysis without a prescribed tool sequence. Continuity guidance makes dated record links explicit and accepts saved-state proof from write responses.

## 0.1.88

Unknown MCP tools return refresh and schema recovery without ending the connection. Capped action detail and rule preview samples use the shared partial-result warning and recovery pattern.

## 0.1.87

CLI update notices include an executable upgrade action. Linked actions preserve explicit task reasons; MCP accepts omitted reasons on continuations so the backend can inherit them. System orientation reasons remain fixed.

## 0.1.86

Keeps low-confidence classification for source-only imports behind agent roles and Plaid. Partial change recovery preserves account scope; baseline guidance distinguishes observed averages from approved budgets.

## 0.1.85

Financial roles prioritize agent assignments then Plaid, with a limited import fallback. Baselines use available months; partial reads expose recovery. CLI responses warn of updates and require upgrades when incompatible.

## 0.1.84

Financial reads explain calculation scope and preserve useful observed totals. Fixes cover date comparisons, cashflow roles, portfolio values, recurring dates, extraction confidence, and cost cadence.

## 0.1.83

Change descriptions explain raw sample totals, unequal periods and the limit's effect on sampled evidence; write guidance leaves preview prerequisites to the operation contract.

## 0.1.82

Finance skills share a shorter operating contract, compose domain methods around user goals, preserve requested schedules, and clarify recurring candidate curation and verified no-change outcomes.

## 0.1.81

Hosted requests reuse Convex-verified identity while preserving live-session checks; agent OAuth requests retain signature, audience, expiry, and grant-revocation verification.

## 0.1.80

Recurring Web and MCP visuals display server-projected paid amounts without calculating payment counts in the renderer; payment and series sections keep their lists without client-derived count badges.

## 0.1.79

Recurring visuals lead with what is left to pay this month over one paid-versus-to-come bar; the page groups expected postings by week with missed ones first, and the Overview card lists the next two weeks the same way.

## 0.1.78

MCP connections that do not report their skill version receive informational metadata instead of a warning or update action. Package guidance survives compact responses; confirmed older versions still receive update instructions.

## 0.1.77

Identify dashboard-link guidance as part of the September 10 skill release across native packages, managed installs, and agent discovery.

## 0.1.76

Dashboard-backed reads consistently return view URLs in CLI and MCP responses; transaction links select the exact table row, and agent guidance distinguishes section links from record links.

## 0.1.75

CLI credentials default to private files on macOS and Linux for unattended access without Keychain prompts. Existing keyring users sign in once after upgrading; explicit keyring storage remains available.

## 0.1.74

Authentication initializes less unrelated code, and the app reuses its fresh token for the initial access check. MCP loads its transport on demand while preserving authorization and session checks.

## 0.1.73

The app uses stable START.md links, direct support, and public setup guides instead of duplicate instructions. Claude and ChatGPT avoid unlisted directories. Connector and Explore pages add distinct guidance.

## 0.1.72

Investment history follows Plaid’s stable offset ordering without duplicate reads; incomplete collections cannot insert or overwrite canonical activity, and prior verified records remain available.

## 0.1.71

Investment activity uses API schema 2026-09-08.1; retired accounts no longer affect history coverage, and multi-page history verifies its ID set before reconciling removals.

## 0.1.70

Investment activity exports use format v22; mixed-account refresh status reflects unavailable accounts, transient apply retries reach a bounded outcome, and recovery guidance uses forced refresh.

## 0.1.69

Investment activity has Candor-defined kinds, retained coverage and separate refresh health. Plaid uses recent refreshes and periodic full reconciliation; staged failures expose safe diagnostics with bounded retries.

## 0.1.68

Plaid investment activity feeds the canonical dataset with security details, replay-safe identity, source-range removal handling, and separate history coverage.

## 0.1.67

Recurring candidates refresh from bounded transaction evidence; your agent confirms or declares the durable schedule. Existing curation is preserved, and dashboard setup and review prompts help your agent maintain the list.

## 0.1.66

Prompt search tolerates punctuation in public Explore and the dashboard; copy feedback clears when prompts change and ignores outdated clipboard results.

## 0.1.65

A shared prompt catalog now powers public Explore pages and the dashboard library, with editable one-time and recurring prompts for connected agents.

## 0.1.64

Remote MCP declares no change notifications and closes subscription streams cleanly, ending 30-minute reconnect loops in 2026-era clients; request analytics now record client name, version, and protocol.

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
