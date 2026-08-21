# Search-code inventory: shared / should-be-shared / site-specific

Research for [uni-theme#9](https://github.com/markgoho/uni-theme/issues/9)
(part of #6, ratified later by #10). Date: 2026-08-21.

Sources read directly: uni-theme HEAD, `mbu` (including its vendored
surface at `hugo/_vendor/github.com/markgoho/uni-theme/{assets,layouts}`),
`scouting-u`, plus [mbu#162](https://github.com/markgoho/mbu/issues/162),
scouting-u ADR 0002, and uni-theme `CONTRACT.md`.

Snapshot caveat: mbu's id-on-heading fix for mbu#162 is committed as a WIP
commit (`e366b551 "WIP: move requirement id onto a heading for Pagefind
Route A (#162)"`). This inventory describes that state as current. If that
commit is reworked, re-check the mbu rows below.

## Scope notes

- Vendor sync verified: the vendored `search.ts` and `search.css` in both
  consumers are byte-identical to uni-theme HEAD (checked with `diff`).
- Excluded as not site-search: mbu's `scripts/search-youtube-videos.ts`,
  `scripts/lib/build-video-search-queries.ts`, `scripts/search-pdf.py`
  (YouTube/PDF lookup tooling), and the search-and-rescue merit badge
  content tree.

## Bucket 1 — already shared via uni-theme

All paths are uni-theme paths; both consumers vendor them via
`hugo mod vendor`.

| Piece | Path | Notes |
| --- | --- | --- |
| Search page shell | `layouts/partials/search/page.html` | Breadcrumb + header + `#search` mount. Params: `page`, `description` (required), `placeholder`, `zeroResults`, `noResultsEvent`, `resultClickEvent`, `pageSize` — all surfaced as `data-search-*` attributes. |
| Search scripts wiring | `layouts/partials/search/scripts.html` | Loads `/pagefind/pagefind-ui.js` + builds `search.ts` with `/pagefind/pagefind.js` as an esbuild external. Indexing itself is explicitly consumer-owned. |
| Search runtime | `assets/ts/search.ts` | PagefindUI init (`showSubResults`, `showImages`, `excerptLength: 500`), `ranking.termSimilarity: 10`, fuzzy-floor "no results" override (uni-theme#5), excerpt re-truncation around the first `<mark>`, `?q=` URL sync, debounced commit, optional Pirsch no-results / result-click events. |
| Base Pagefind UI CSS | `assets/css/components/search.css` | Custom-property mapping, form/input/clear/message/loading, `.search-header`/`.search-description`, fuzzy-override state. Result-card presentation is deliberately NOT here (see bucket 3). |
| Search icon | `layouts/partials/icons/search.html` | Used by header nav and mbu's home hero. |
| Header `/search/` link | `layouts/partials/header.html` | Per CONTRACT.md "Navigation". |
| Home hero search CSS | `assets/css/pages/home.css` (`.home-search*`) | Consumed today only by mbu's local `home/hero.html`; scouting-u has no home search box yet. |
| Requirement display CSS | `assets/css/pages/merit-badge-requirements.css`, `assets/css/components/req-list.css` | Includes the no-JS `:target` fallback already widened with `:has(:target)` for descendant-heading ids (uni-theme#4 — done at HEAD). |
| Deep-link runtime | `assets/ts/deep-link.ts`, `assets/ts/req-rail.ts` | Search-adjacent: reads `data-anchor`/`data-content-name` from the same `<li>`s the Pagefind conventions annotate. Where `id` lives does not affect it. |
| Contract documentation | `CONTRACT.md` "Search page" section | Documents all `search/page.html` params, the shared `termSimilarity` decision, and that Pagefind indexing (`bunx pagefind --site public`) is not theme-owned. |

## Bucket 2 — should be shared

### 2.1 `req-fallback-title.html` (lead-sentence fallback heading)

- Today: `mbu/hugo/layouts/partials/merit-badges/req-fallback-title.html`.
- What it is: derives a requirement heading from the requirement's own
  leading sentence (markdownify → plainify → first sentence → 80-char
  word-boundary cap with ellipsis). It backs the id-on-heading Pagefind
  convention: every requirement heading must have non-blank text, and mbu's
  DRG title coverage makes the fallback the common case, not the edge.
- Why shared: it is a pure text utility with zero mbu-specific logic.
  scouting-u today uses `$req.short | default (printf "Requirement %s"
  $req.path)` in `requirement-node.html` — exactly the repeated-placeholder
  problem the mbu partial exists to avoid, and it would use this the moment
  a rank node lacks `short`.
- Generic version needs parameterized: `text` (raw markdown, already the
  only param). Consider a `max` length param (default 80) and possibly a
  `fallback` string for empty text. Rename without the `merit-badges/`
  namespace (e.g. `partials/req/fallback-title.html`).

### 2.2 The Pagefind indexing conventions (documentation, not code)

The conventions themselves are now identical in both sites but are written
down only in per-site partial comments and scouting-u docs
(ADR 0002, `docs/research/pagefind-requirement-results.md`, plus long doc
comments in `requirement-node.html` and mbu's `req-card.html` /
`req-child-item.html`). uni-theme's shared code silently depends on them
(`search.ts` `showSubResults`, the `:has(:target)` CSS), so the contract
should state them once, in uni-theme (CONTRACT.md or a doc next to it):

1. `data-pagefind-body` on the requirements wrapper only — one element per
   indexed page; the `/search/` page itself carries none plus a
   `robots: noindex` meta.
2. `id` always on a real `h1`–`h6` with non-blank text (Pagefind Route A
   sub-result grouping), never on the `<li>`. `data-anchor` stays on the
   `<li>` for `deep-link.ts`.
3. `data-pagefind-ignore` on every marker/number-bubble span that sits
   before its own requirement's heading (otherwise Pagefind attributes the
   marker text to the previous region).
4. Never `data-pagefind-index-attrs` — it inlines attribute values into the
   indexed text (verified against Pagefind docs and live search; the root
   cause of mbu#162's garbled excerpts).
5. `data-pagefind-meta` is per-site sugar (see bucket 3), not required.
- Parameterization: none — this item is prose, not a partial.

### 2.3 `layouts/search/list.html` scaffolding

- Today: `mbu/hugo/layouts/search/list.html` (36 lines) and
  `scouting-u/hugo/layouts/search/list.html` (33 lines) are structurally
  identical wrappers: `theme-v2` html class, `robots noindex` meta,
  `search/page.html` in `main`, `search/scripts.html` in `footer-scripts`.
  Only the dict values differ.
- Could become a theme-owned `layouts/search/list.html` (Hugo layout
  precedence lets a site still override it).
- Generic version needs parameterized: `description`, `placeholder`,
  `zeroResults`, the two event names, `pageSize` — most naturally read from
  the `/search/` page's front matter or site params instead of a dict.
- Caveat that keeps this partially ambiguous: mbu computes its description
  dynamically (live badge count from `hugo.Data`, kept consistent with the
  home hero). A theme layout would need a description hook (front-matter
  string with a site-side computed fallback, or a `search-description`
  partial the site may override). See "Ambiguous" below.

## Bucket 3 — correctly site-specific

### mbu

| Piece | Path (under `mbu/hugo/`) | Why it stays local |
| --- | --- | --- |
| Requirements page | `layouts/merit-badges/requirements.html` | Carries `data-pagefind-body`, a hidden `<img data-pagefind-meta="image[src]">` (badge thumbnail in results), and a hidden `data-pagefind-meta="eagle_required:true"` span. All three are badge-data-driven; ranks have no image or eagle concept. |
| Requirement rendering | `layouts/partials/merit-badges/req-card.html`, `req-child-item.html`, `req-children.html` | The chips/rail/options dispatch, DRG guide title lookup with all-or-nothing per-group titles, `subrequirement_mode` pill, resources list — all depend on DRG guide data that only merit badges have. Both partials now carry the shared Pagefind conventions (id-on-heading with visually-hidden fallback title, `data-pagefind-ignore` markers, no index-attrs) per mbu#162 (WIP commit `e366b551`). |
| Guide plumbing | `req-guide-lookup.html`, `req-guide-fragment.html`, `req-preview.html`, `req-pill.html`, `req-text.html` | DRG-specific. |
| Result-card CSS | `assets/css/search.css` (289 lines) | Thumbnail card with whole-card `::after` overlay, excerpt line-clamp, `eagle_required` meta tag pill, narrow-viewport reflow. Its header comment already records the split: base layer theme-owned, presentation local. |
| Stale planning doc | `full-text-search.md` (repo root) | Pre-dates the extraction and still describes `data-pagefind-index-attrs` and a `data-pagefind-filter` that never shipped — i.e. it contradicts convention 4 in bucket 2.2. Recommend mbu deletes or archives it. |

### scouting-u

| Piece | Path (under `scouting-u/hugo/`) | Why it stays local |
| --- | --- | --- |
| Requirements page | `layouts/scouts-bsa/ranks/requirements.html` | `data-pagefind-body` wrapper only; no meta (no images, no eagle flag). |
| Requirement rendering | `layouts/partials/scouts-bsa/ranks/requirement-node.html` | Flat two-depth recursion, `short`-always-as-eyebrow, no guide/pill/resources. Deliberately simpler than mbu's dispatch; its doc comment is currently the best writeup of the Pagefind conventions (feeds bucket 2.2). |
| Result-card CSS | `assets/css/search.css` (114 lines) | Rank card-cluster: page title as eyebrow pill, page-level excerpt and thumbnail suppressed, uncapped nested tiles. Local-first per ADR 0005. |
| Page CSS | `assets/css/pages/rank-requirements.css` | Rank page layout. |
| Docs | `docs/adr/0002-requirement-search-via-pagefind-subresults.md`, `docs/research/pagefind-requirement-results.md` + `docs/research/fixtures/pagefind-subresults/` | Site decision history and reproducible fixtures; stays, but the conventions they established get restated centrally (bucket 2.2). |

### Both (site-owned by contract)

- `package.json` `"index": "bunx pagefind --site hugo/public"` — identical
  one-liner in both repos, but CONTRACT.md already rules indexing
  consumer-owned (the theme cannot run it; it needs the site's built
  `public/`). Stays site-specific; the *convention* (index after every
  build, dev servers must rebuild + re-index) belongs in bucket 2.2's
  documentation.
- `content/search/_index.md` — trivial per-site content stubs.
- The dict values passed to `search/page.html` (descriptions, event names
  `merit-badge-search-*` vs `rank-search-*`, scouting-u's `pageSize 7`) —
  per-site by design; the params exist so they can differ.

## Explicitly ambiguous — for the grilling ticket (#10)

1. **`search/list.html` scaffold (2.3)** — the wrapper is duplicated, but
   mbu's computed description means a theme layout needs a hook. If the
   hook ends up as complex as the 30-line wrapper it replaces, keeping the
   wrapper site-owned is the simpler contract. Draft call: share it, with a
   front-matter/site-param description override; grilling should test that.
2. **Result-card CSS commonality** — both local `search.css` files restyle
   the same fixed `.pagefind-ui__*` DOM and share small pieces (list
   resets, nested-tile pattern, `mark` highlight styling), but the
   presentations are intentionally different (mbu thumbnail card vs
   scouting-u rank cluster) and scouting-u's ADR 0005 explicitly declined
   to lift. Draft call: keep local (bucket 3); revisit only if a third
   consumer appears or the shared subset grows past ~30 lines.
3. **Where the conventions doc lives (2.2)** — CONTRACT.md section vs a
   separate `docs/` page in uni-theme. Draft call: CONTRACT.md, since
   `search.ts` and the `:target` CSS are the things that break when a
   consumer violates the conventions.
4. **`req-dock.html` / `req-sidebar.html` mirrors** — scouting-u's dock
   states it "mirrors exactly" mbu's (77 vs 36 lines; sidebar 167 vs 126),
   both driven by shared `deep-link.ts`. This is deep-linking, not search,
   so it is out of this ticket's scope — but it is the same
   duplicated-partial shape as 2.1/2.3 and probably deserves its own
   inventory ticket rather than being forced into a bucket here.
5. **`data-pagefind-meta` as a convention** — only mbu uses it
   (`image[src]`, `eagle_required`). Whether the shared conventions doc
   should *specify* the meta keys the shared `search.ts` understands
   (`showImages: true` renders `image` meta when present) or stay silent is
   a grilling question. Draft call: document `image[src]` as an optional,
   understood-by-shared-code key; everything else free-form.
6. **mbu#162 landing state** — the mbu rows in bucket 3 assume WIP commit
   `e366b551` lands substantially as-is (id-on-heading + fallback titles in
   all three variants, chips getting a visually-hidden `<h4>`). If it is
   reverted, `req-fallback-title.html` (2.1) has no consumer yet and the
   convention rows for mbu revert to the mbu#162 bug state.
