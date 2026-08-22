# Pagefind search indexing contract for consumers

uni-theme owns the search page and renders results itself against the raw
Pagefind API: results group by **Award**, with one tile per matching
**Requirement**, and each tile's **Requirement Path** and the Award's
**Emblem** read straight out of the index. Consumers own their own
requirement markup and their own `pagefind` build step, so the quality of
that display is decided in each consumer's HTML, not in the theme. Both
consumers reached the same five rules the hard way — by reading live
`pagefind.search()` output, not from the docs — so they are recorded here
as a contract rather than left as folklore in two repos.

The normative, consumer-facing statement of these rules lives in
`CONTRACT.md` under `## Search page`. This ADR records why each one
exists.

## The rules

### 1. The anchor id goes on the Requirement's heading, not its wrapper

Pagefind builds a sub-result per `id`-bearing heading inside the indexed
body. An `id` on the wrapping `<li>`/`<article>` produces **no sub-results
at all** and garbled cross-Requirement excerpts. mbu moved its ids onto
the heading in `e366b551`; scouting-u did the same in scouting-u#35.

The id's own text *is* the Requirement Path (`2`, `2.a`, `4.option2`), so
the renderer needs no separate path metadata.

**Consequence:** a plain `:target` CSS highlight keyed off the wrapper is
dead for both consumers. uni-theme's requirement CSS matches
`:has(:target)` instead (`c0c910a`, mirroring `eeb88a0`).

### 2. `data-pagefind-ignore` every non-prose span that precedes its own heading

Pagefind attributes text appearing *before* a heading to the region that
came before it — one Requirement too early. Any marker, number bubble,
ring, eyebrow, or mode pill rendered ahead of its own heading therefore
bleeds into the **previous** Requirement's excerpt.

This is the root cause of mbu#162, and it was three holes in mbu, not one:

- the sub-requirement letter marker in `req-child-item.html` — Climbing
  6.e came back as `"e Properly coil a rope. Knots."`;
- the DRG group eyebrow in `req-card.html` — Climbing 1.c came back
  ending `"...Leave No Trace."`, which is Requirement **2**'s label;
- the "Do all" / "Choose N" pill in `req-pill.html`, spliced into the
  middle of an excerpt.

Leaked marker text also defeats the renderer's title dedup: it sits
between the heading's two copies, so the repeat survives. The theme
deliberately does **not** paper over this — a doubled or foreign excerpt
is the signal that a `data-pagefind-ignore` is missing in the consumer.

### 3. Scope the index with `data-pagefind-body` on the requirements region

One `data-pagefind-body` on the Requirement list wrapper, not on the page
and not per Requirement. It keeps chrome, nav, and hero copy out of the
index while leaving page-level `data-pagefind-meta` (the Emblem, filters)
readable from outside it.

### 4. Index only Award requirement pages

Every indexed page is expected to be one Award's requirements, because the
renderer treats a Pagefind result as an Award panel. A non-requirement
page in the index renders as an Award with no Requirements. Both consumers
already satisfy this (143 pages in mbu, 7 in scouting-u; uni-theme#8), and
the search page itself must carry neither `data-pagefind-body` nor an
index entry.

### 5. No `data-pagefind-index-attrs`

It is not the metadata-only mechanism the name suggests: it inlines the
named attributes' **values** into that element's indexed text, mixed in
with the visible content. scouting-u carried
`data-pagefind-index-attrs="data-anchor,data-content-name"` on every
requirement `<li>`, which wove the path and the Award name into the
indexed stream at every Requirement boundary. Attributes a consumer's own
JS reads (`data-anchor`, `data-content-name`) stay on the element; only
the Pagefind directive goes.

## Two keys the renderer reads

- `meta.title` — the **bare** Award name. The **Award Label** suffix is a
  render-time `awardLabel` param, never indexed; putting it in content
  double-stamps it.
- `meta.image`, set with `data-pagefind-meta="image[src]"` — the Award's
  **Emblem**. Absent, the theme's `emblemPlaceholder` param fills the rail.
