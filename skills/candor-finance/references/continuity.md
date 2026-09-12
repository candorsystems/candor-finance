> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Useful financial continuity

Read prior actions and notes when they can change this task. Use the live schema
for note, context and impact operations. Do not create an artifact just to finish
a checklist: preserve a user statement, supported finding, decision or observable
follow-up that will help the next conversation.

Notes are your durable memory across conversations. Preserve useful context,
user statements, findings, decisions and open questions. A note does not need
an unfinished outcome, a linked record or a date. Keep user statements,
observed facts, assumptions and recommendations visibly separate. Recording
an assumption does not turn it into a fact or an approved plan.

Use the optional structured `about` link when the note concerns an exact
financial record; an id in Markdown alone is not a record link. If the context
will be useful at a particular future time, set `revisit_at` to that timestamp.
It makes the note due on a later workspace opening. It does not wake an agent
or notify the user. Omit it when no timed resurfacing is useful.

An outcome awaiting verification is one use of notes. Preserve its baseline,
evidence, expected timing and enough context to distinguish the possible
outcomes when you return. Recurring records separately describe expected
financial postings, such as bills, income or transfers. They do not schedule
agent work or execute payments. Use the host scheduler for an authorized later
check, with notes supplying any context that check needs.

Inspect the saved note fields in the write response. Read it back only if that
response does not establish the intended saved state. Update the same note as
context changes; resolve it when no longer current or its question is settled.
Private notes do not create authority or establish an unconfirmed user
preference.

Use composable context notes for durable user context that future agents should
receive on every opening. Tag the note with one or more exact topics returned by
`context_needed`. An explicit user statement is enough to create or update that
private context note; do not ask for a second confirmation. If the statement is
ambiguous or you would be inferring a preference, ask first. Update or resolve
the same note when the context changes. Do not tag ordinary working notes merely
to make them prominent.

When you or the user acts on a specific supported financial benefit, create one
evidence-linked impact and update that same impact as the action and outcome
develop. Keep potential and realized value separate; never annualize or blend
currencies merely to make the value larger. Preserve any context needed to verify an unfinished impact in a note.


Do not promise an automatic check unless the user requested it and the host
scheduler confirms it exists.
