> Native MCP: calls below are generated from Candor's shared operation catalog. Substitute placeholder values and execute them through MCP; do not invoke a `candor` executable.

# Read and present evidence

Use current schemas and returned continuations rather than memorizing calls.
Describe unfamiliar operations before using them. Every root operation needs a
reason explaining what you are establishing; a reason never grants authority.
Keep action context such as `parent_action` outside operation-specific arguments.

Every bounded read returns compact working records and native pagination. Use
the matching detail operation only for records that need deeper evidence. Any
cursor-based read keeps its records, deterministic calculations, and
pagination together under `data.page`. Calculations cover exactly the records
in that page, never later pages or the whole requested window. Follow
`next_actions` for the exact continuation. Do not infer that later pages are
represented in the current response.

Every Candor response returns whole in the tool result; there is no download
step and no delivery option to set. Keep responses bounded at the query with
page limits, cursors, filters, and scoped datasets, and follow `next_actions`
for the exact continuation. Treat stdout and any file your harness writes for
a large result as model context: emit only counts, aggregates, and a capped
set of candidate records needed for the next decision. The delivered result
is working evidence, not a user export.

When a visual would materially improve the conversation, use the current
Candor visual operation with one focused panel or the stored Overview. Read the
returned text and every panel's `context` before discussing the visual; the
rendered image is not model context by itself. Treat panel values, ranges,
caveats, and talking points as one server-owned projection, and pass the exact
`View in Candor` link through when the user may want the full interactive view.
If the current host cannot render MCP Apps, use that same context and link
instead of reconstructing or calculating the visual in the client.


Use returned `view_url` values for links. A response-level URL opens the related
view; a record URL selects that record. Never construct URLs from record ids.
For novel joins, discover the snapshot operation and preserve its scope and manifest.


For partial results, inspect the warning and calculation scope before making a
claim. Follow the returned `next_actions` to continue or narrow the read. A page
calculation covers that page; an incomplete source aggregate does not establish
a complete-period total. When recovery cannot supply the missing evidence,
retain that limit in the answer rather than treating omitted records as zero.
For budget baselines, use the disclosed months and estimate flag. The agent
chooses the budget; an observed-data average does not approve a spending plan.
