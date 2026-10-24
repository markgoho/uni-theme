# Option C — “Ledger” (key `C`, file `option-c.html`)

**Thesis:** a fast, dense reference tool for counselors, leaders and Scouts who already know what they want. Think a modern docs site / spec database, not a brochure. Information density, scannability, keyboard-first search.

**Look:** quiet near-monochrome surfaces with hue-biased greys (olive-tinted), one accent (Scouting olive green; dark theme accent shifts to a brighter leaf green), crisp 1px rules, tight radii (≤6px), tabular numerals. Type: a neutral workhorse sans with real character (e.g. **Figtree**, **Albert Sans** or **Instrument Sans**) for everything; no serif. Small caps/letter-spaced labels for metadata. No mono font for verbatim text (rejected). Hover/focus states matter; everything looks clickable that is.

**Structural axes**
- Nav model: **three-column docs layout** on award/requirements/guide: left = award section nav + full requirement outline (tree), centre = content, right = sticky “on this page” / metadata column. Header is a compact 48px toolbar with a prominent search field (⌘K hint) always present on every page.
- Modes: a **compact label row** under the stem: `All required` / `Choose 1 of 3`, plus a counter on the right margin; children drawn as an indented outline with the path (`3.a`) in a fixed-width column (tabular numerals, same font).
- Requirement list form: a **two-column table-like outline**: left column path, right column content; children indent; zebra-free, rule-separated; a filter toolbar on top (Eagle / mode / “only requirements with guide pages” — visual only). Verbatim text at full size regular weight; curated titles as medium-weight row headers above it.
- Guide chrome: **docs page** with the requirement quoted in a bordered “Requirement” block at the top, right-rail TOC generated from the page’s h2/h3 blocks, prev/next as footer rows.
- Search grouping: **flat ranked rows**, not cards: each hit is one row with award · path · title · excerpt, with a left facet rail (award, Eagle/level) and result count; keyboard-navigable look (first row “selected”).

**Home:** MBU — no hero photo. A big search field with example queries, then a dense **directory**: categories as a compact two-level list (category → counts), an “Eagle-required” table (17 rows: badge, category, requirements), and “What’s on a badge page” as a three-row feature list. SU — the 7 ranks as a **compact table** (level, rank, groups, requirements, guide yes/no), the two phases as table groups, Field Guides and Leadership as link lists.

**Award page:** a **spec sheet**: title row with badges (Eagle-required pill / Rank 2 of 7), a key-value facts grid, the full requirement outline (titles only, collapsed) linking to the requirements page, resources as a plain link list.
