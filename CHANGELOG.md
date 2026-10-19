# Release notes

Changes relevant to agents using the Candor package, CLI, and MCP tools.
Earlier releases predate these notes; the list starts with the first recorded summary.

## 0.1.219

candor reviews list and reviews update print each area's id, records, and outcome in Markdown, and candor open keeps the whole review ahead of the first pass.

## 0.1.218

With CLI 0.3.152, candor open shows each review area's id, records, full text, and own reviews.update. Quiet reviews say why, gaps no longer count as open work, and retired attention calls point to reviews.update.

## 0.1.217

candor open keeps the weekly review, what your watches came to, and your notes come due in sections of their own, each with a line on what it is for, apart from Candor's factual signals. Needs Candor CLI 0.3.151 or newer.

## 0.1.216

The development eval seed route for focus cards is removed; evals seed the weekly review instead.

## 0.1.215

Record what came of a weekly review area with candor reviews update: looked into, with what you found, or set aside, with why. The dashboard shows it and the next review reads it. Needs Candor CLI 0.3.150 or newer.

## 0.1.214

The attention engine is removed: attention.list and attention.update answer attention_retired, and Candor's weekly review is what the opening and dashboard raise.

## 0.1.213

Candor's weekly review replaces attention cards: the opening lists areas and gaps that point at their records, candor reviews list reads past reviews, and attention.list and attention.update are retired.

## 0.1.212

An unknown operation name no longer slows schema suggestions: closest-operation matching skips names that cannot be within two edits. Suggestions, tools, and finance skills are unchanged.

## 0.1.211

The marketplace logo now uses smooth vector contours while preserving the Candor mark, colors, and white background plate. Tools and finance skills are unchanged.

## 0.1.210

No change for agents: the package README now opens with what Candor does for people and where to add it, and keeps the connection materials under a section for agents.

## 0.1.209

No change for agents: the development deployment gains a secret-gated Stripe test-mode fixture route that end-to-end tests use to exercise trials, cancellation, and declined charges.

## 0.1.208

API schema 2026-10-09.1 records the goal preview's measured reading and the held and decisions fields on attention situations.

## 0.1.207

goals.preview reads the draft's measure as the saved goal will (months covered for cover) and refuses what saving would. Held attention items list their own decision states. Budget findings say budgeted, not approved.

## 0.1.206

Agents save the budget, goals, and priorities they work out with the person, say what they saved, and adjust as they react. MCP and the CLI pass each body to the service's validator, so input passes or fails as over HTTP.

## 0.1.205

A changed goal amount offers its budget line's update; cap drafts keep spent lines and name the room left; reads take account_name, a next_step sentence, and situation; goal_not_tracked names recorded progress.

## 0.1.204

budget.status pace reads budget lines only, like the dashboard (new pace_actual_to_date). A saved goal that takes money monthly or caps spending offers a ready budget draft or goal line; budget saves offer lines for goals missing one.

## 0.1.203

Asked findings stop coming back as held; refusals carry the corrected call; transaction reads take search, account_id, and direction; payee searches offer a linked re-check note; local today dates are accepted; Money schemas are smaller.

## 0.1.202

Findings carry the facts their dashboard lines use (fee dates, usual amounts, months, account names); two cash findings get distinct titles. Overview is fixed, led by what to know today; candor_configure_overview is retired, saving nothing.

## 0.1.201

Openings name each large arrival's payee history and count from the last opening when none was acknowledged; months show money moved out; grown debts read as added; goal names that read as notes get a warning.

## 0.1.200

A goal measured by a tag no rule sets yet now saves, warning goal_measure_tag_unset with the tagging rule offered, instead of being refused and losing the goal.

## 0.1.199

rules.preview checks a draft rule before it is saved; changes carry transaction_count with the first 10 ids; budget reads offer one category read; finding statements give posting sizes, not signed amounts.

## 0.1.198

Agent-suggested goals save with proposed true; the opening leads with goal steps that came due; a stopped recurring series that charges again keeps the posting (charged_after_stop) instead of a new candidate.

## 0.1.197

A note's watch can be an account balance floor (watch.crossed while below) or any transaction over an amount (watch.seen), so low-balance and large-charge alerts need no recomputing.

## 0.1.196

Catalog search finds common intents (remind me later, cancel a subscription, split, mark as transfer, debts); budget lines take money text; splits and account policies need no approval note; wrong-tool errors name the right tool.

## 0.1.195

Recorded progress on a measured goal warns goal_progress_not_counted; account share and account-taken refusals name the goals holding the account and what is left.

## 0.1.194

Notes refuse links to nothing and take goal keys; held findings offer reads of balances and payments due; transactions.list filters by tag; MCP reads args from input when misplaced; spending and watches are in server instructions.

## 0.1.193

goal_id takes a goal_key; one rule matches a list of payees; refusals carry the accounts or goals to retry with; revisit_at takes a date; actions nested in data inherit the parent action; goals.list reads at dashboard level.

## 0.1.192

Goal reads show what feeds a measure: a tagged goal's rules, whether each is still applying, and its transaction count; account names; baselines. goals.list carries each figure; rules name the goals that read their tags.

## 0.1.191

Monthly goal targets take target_bound (at_least or at_most) and may be zero; tagged measures count net, in, or out; a spending measure reads household spending; goal.moved reports a monthly goal's month so far.

## 0.1.190

Stopping a recurring charge offers a no_charge watch; tagging rules offer goals.create when no goal exists; rules.create describes its shorthand; openings count arrivals apart from retagged history and stop asking for goals once saved.

## 0.1.189

next_step takes a structured check Candor renders for the person and a private note. Notes take a watch. Openings lead with what a watch came to: watch.seen, watch.broken, watch.missed, or watch.held.

## 0.1.188

Untracked goals warn and offer ready measures; openings show each goal figure and goal.moved; tagged goals add this month so far; workspace_not_opened greets a returning connection; candor_write keeps what settles.

## 0.1.187

The goal measure tagged tracks the monthly net of transactions your rules tag; cover tracks months of spending covered; parent_goal_id groups goals as parts of one ambition; rules that add tags offer measuring a goal.

## 0.1.186

After asked, an adviser check's follow-up offers settled, not confirmed. Situations drawn from postings offer a transactions.get read of their basis. A starting amount on a recorded goal is an adjustment, not a contribution.

## 0.1.185

Goal saves warn goal_plan_missing without a monthly amount and refuse a past target date; held findings ask you to check postings before confirming; next steps are one plain sentence about what you check or ask.

## 0.1.184

Held findings are explicit at each step: opening, acknowledge, attention.update (on_dashboard, held_remaining, next), and goal and budget writes. A check is a question: settled once answered, never confirmed.

## 0.1.183

attention.update takes confirmed, with what shows a finding holds: the dashboard states a finding only once an agent confirms it, and processing an opening no longer releases it. Only findings, not adviser checks, show under a goal.

## 0.1.182

Findings wait for the agent: the opening marks held ones, and attention.update state asked records its question to the user. Measures take held_elsewhere (saved_so_far fills it); a plan short of its target warns goal_plan_short.

## 0.1.181

Goals and budgets need no approval: agents save and edit them from the conversation and say what they saved. approval_note is optional, previews take the save body, and skills, prompts, and the opening act instead of asking for a yes.

## 0.1.180

goals.preview and goals.create take saved_so_far, money the user already has toward a goal: the draft takes it off the target, and the saved goal starts from it. The preview names it until the user says.

## 0.1.179

Attention items the records or the user show do not hold can be dismissed with what shows it, so the dashboard stops raising them; the opening and attention list say so.

## 0.1.178

A note about what the user wants offers goals.preview to save the goal it states, in their words, before it has numbers; the opening asks to save each named goal once they agree, adding figures later.

## 0.1.177

Once a goal is saved, the focus card leads with the person's first-ranked goal, its reason, figures from its measure or plan, and its saved next step; the opening links saved goals and carries their priority.

## 0.1.176

Goals can be measured by the accounts that hold them, a share of one account, or the cards or loans they pay down; progress and monthly pace then come from balances, and goal lists show priority and next step.

## 0.1.175

Goals take the person's priority, reason, and a dated next step; priority or next step alone needs no approval, and goal writes ask for both. The CLI now sends null fields, so clearing a value works.

## 0.1.174

The first-pass conversation asks for up to three things worth talking through, and to say so when nothing needs it, instead of always naming three.

## 0.1.173

A saved goal or budget offers notes.create for the user's words, decisions, and next step with a revisit date, about the saved record. The intent says why: the review and the dashboard read notes, not the agent's own memory.

## 0.1.172

goals.preview and budget.preview show a draft and what it implies without writing; the save continuation waits for the user's yes. The brief asks agents to show the draft first and use only figures and dates the user gave.

## 0.1.171

The opening leads with the user's goals (attention.focus_card), also in conversations.get. Until something is built toward a known goal, the brief asks agents to save settled targets and plans as goals and budgets with approval.

## 0.1.170

A user can ask for just the essentials: preferences.update saves it, the opening carries help_depth, and the brief stops goal and household questions. Money issues a note already took up are not raised again.

## 0.1.169

llms.txt and discovery copy describe Candor as honest help with hard money questions across the whole financial life: ask what the user is working toward, then pick up what Candor raises as worth talking through.

## 0.1.168

Prompt library entries and conversation cards are named as the questions people ask ("Can we afford to move?", "Could we handle a setback?"), and the first pass leads with what is worth talking through.

## 0.1.167

Onboarding starting points are the hard questions people bring, "Not sure yet", or the user's own words. A goal stated there gets goals.understand_what_they_want: one natural follow-up that makes it concrete.

## 0.1.166

The opening's agent brief adds goals.ask_what_they_want: after anything that needs action now, ask one natural question about what the user is working toward and keep their answer in a note. context_needed lists that topic first.

## 0.1.165

Situations the review could not confirm or rule out from their postings reach the agent, not a card: evidence unclear_in_postings in the opening and reason postings_unclear in attention.list. Read the postings before raising one.

## 0.1.164

attention.list adds the not_supported cleared reason: the review read the postings behind a detected situation and found they do not show it, such as an introductory price ending.

## 0.1.163

Candor's MCP tools are a complete setup without the finance skill, now recommended for its methods. Server instructions say to start each visit with candor_open and keep pending checks in notes with revisit dates.

## 0.1.162

Openings lead with agent_brief, standing instructions for the agent's own upkeep with stable codes. The first asks the agent to fill open household facts from the records and save them before asking the user.

## 0.1.161

Agents on an older package are no longer told to update: Candor's responses carry the current contract and win where a skill differs. Only a package below the supported minimum gets agent_package_unsupported.

## 0.1.160

Operation detail in candor_schema gives each query argument's type, allowed values, example, and meaning. transactions.list accepts cashflow_role, and action history says when a continuation shares its root.

## 0.1.159

attention.list reads every attention situation by state with its reason, and attention.update records the user's decision to defer, dismiss, settle, or restore one. A deferral note whose date passed no longer settles its card.

## 0.1.158

Openings keep the published attention cards while a re-review is on its way, a held review returns current notes, and a person who asks what they might be missing gets one card from their account records.

## 0.1.157

The review sweep's fee lens counts only charges the provider classifies as bank fees or filed under Bank Fees, so HOA dues and tuition no longer read as avoidable. Transaction rows drop the description-based sign flags.

## 0.1.156

First openings carry a compact first pass: 24 months of cash flow, accounts with rates and due dates, recurring series, and each situation's aim. Recurring marks lapsed series; refused filters list the accepted ones.

## 0.1.155

Opening attention items say what each rests on: stated_in_notes cites the notes that answer it, and a check still missing a fact names it in missing_facts. evidence_detail says what that means next.

## 0.1.154

New workspaces can start with an "About my household" context note: the user's own onboarding answers on work, dependents, coming changes, age, housing, workplace plan, and health coverage. Read it before asking.

## 0.1.153

The attention review raises more of what a planner would, such as student loans, Medicare, and required withdrawals. Debt situations offer debts.list, which now returns every term, including a loan's repayment plan.

## 0.1.152

Errors now lead to a runnable step: a mistyped operation offers the one it likely meant, an MCP CLI hint becomes a schema describe or search, and an abandoned write offers action history. CLI 0.3.140 drops em-dashes.

## 0.1.151

Reads now offer their next steps: recurring confirm and dismiss, debt terms, account activity, term previews, holding history, and change evidence as actions; a partial refresh returns partial_success with its recovery reads.

## 0.1.150

Over MCP, each offered next step's shell is now the tool call that runs it, lineage included, and a write can offer its request body as a template in args.input that the gateway lifts. The response schema is unchanged.

## 0.1.149

Offered next steps now run as given: MCP accepts parent_action inside args, data.query steps nest their filters, a missing id offers the read that lists current ids, a rejected body offers its schema, and paged reads say continue.

## 0.1.148

The notes.create description now matches context_topics: tag durable user context, including a household fact that open lists in context_needed and you inferred from the records. Commands and tools are unchanged.

## 0.1.147

When the attention review cannot tell whether a check applies, it names the household fact your notes are missing. candor open lists the top two in context_needed with how_to_answer, and a fact you infer from the records counts.

## 0.1.146

No change to CLI commands, MCP tools, or responses. An agent connection can now carry the Candor workspaces the user chose at consent; connections to one workspace behave exactly as before.

## 0.1.145

The dashboard and Connections page now give users one setup message for any agent, and a follow-up when setup stalls asks you to check what is missing against START and name the one next step. Skills and tools are unchanged.

## 0.1.144

Plugin listings describe Candor as the finance app for your AI agent that tells it what matters most. Skills and tools are unchanged.

## 0.1.143

Claude setup now leads with the Candor Finance connector in Claude's connector directory, open on every plan; the finance skill still loads separately and the custom connector remains the fallback. Tools are unchanged.

## 0.1.142

The hosted llms.txt now describes Candor as the platform you use to look after the user's whole financial life, and its source moves to its own module. Tools and the finance skill are unchanged.

## 0.1.141

The other-agents setup references point to the open Model Context Protocol and Agent Skills documentation instead of a list of coding tools, which also drops Roo Code (shut down in May 2026). Tools and the finance skill are unchanged.

## 0.1.140

The package adds an MIT-licensed Cursor Marketplace plugin for Grok Bot that pairs the finance skill with Candor's remote MCP server. Tools and the finance skill are unchanged.

## 0.1.139

Plugin marketplace listings now use the same name and tagline as Candor's ChatGPT and Claude directory listings, and open with the same description. Tools and the finance skill are unchanged.

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
