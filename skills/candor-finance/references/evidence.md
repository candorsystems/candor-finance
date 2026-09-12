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

Candor keeps small responses inline. When any tool returns
`delivery: "resource"`, inspect `data.delivery_options` and use exactly one
supported path. When resource links work, download the short-lived
`resource_link` to a relative file in your current writable working directory
and verify `artifact.digest`. When resource links are unsupported and your
client can materialize a large tool result into a private code sandbox without
placing the full payload in model context, immediately repeat the identical
tool call with `data.delivery_options.inline_response.retry_same_tool_with`.
Preserve every other argument; do not reduce the query scope or page size as a
delivery workaround.
The descriptor already gives you the analysis root as
`artifact.payload.json_pointer` and its limited, value-free JSON Schema as
`artifact.payload.schema`: write analysis against that contract immediately
rather than probing keys, printing sample rows, or using a model-facing fetch
tool to discover the shape. Treat stdout as model context; emit only counts,
aggregates, and a capped set of candidate records needed for the next decision.
Retry transient download failures with the sandbox's retry-capable HTTP client,
then use the supported inline option or report the evidence gap if the result
remains unavailable. The delivered result is working evidence, not a user
export.

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
