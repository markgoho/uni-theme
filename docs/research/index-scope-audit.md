# Pagefind Index Scope Audit (mbu, scouting-u)

Research for [uni-theme#8](https://github.com/markgoho/uni-theme/issues/8), part of #6.
Date: 2026-08-21. Sources: local repos `mbu` and `scouting-u` (read-only),
uni-theme `layouts/partials/search/`, and the built Pagefind output in each
site's `hugo/public/pagefind/`.

## Decision under audit

Each site must index ONLY award requirement pages:

- mbu: merit-badge requirement pages (`/merit-badges/{slug}/requirements/`)
- scouting-u: rank requirement pages (`/scouts-bsa/ranks/{slug}/requirements/`)

## Verdict

**Both sites already conform. No changes are required.**

Empirical proof: the fragments in each site's built index
(`hugo/public/pagefind/fragment/`, decoded from gzip with the
`pagefind_dcd` prefix removed) contain only requirement-page URLs:

- mbu: 143 fragments, all `/merit-badges/{slug}/requirements/` (one per
  badge; the `content/merit-badges/` directory has 143 badge dirs plus
  `_index.md`). Both indexes were built on 2026-08-21, so this reflects
  the current layouts.
- scouting-u: 7 fragments, all `/scouts-bsa/ranks/{slug}/requirements/`
  (scout, tenderfoot, second-class, first-class, star, life, eagle).

No home, about, guide/DRG, landing, list, category, or search pages are
in either index.

## Why the scope is correct (mechanism)

Pagefind's documented rule: when `data-pagefind-body` appears anywhere
on a site, every page WITHOUT that attribute is excluded from the index
([pagefind.app/docs/indexing](https://pagefind.app/docs/indexing/)).
Each site puts the attribute in exactly one layout — the requirements
layout — so all other page kinds are excluded automatically.

### mbu

- `hugo/layouts/merit-badges/requirements.html:33` — `data-pagefind-body`
  on `<div class="requirements">`. The same block carries
  `data-pagefind-meta="image[src]"` (badge emblem) and
  `data-pagefind-meta="eagle_required:true"` on hidden elements.
- `data-pagefind-ignore` keeps decoration out of the indexed text:
  - `hugo/layouts/partials/merit-badges/req-card.html:103`
  - `hugo/layouts/partials/merit-badges/req-child-item.html:136,139`
    (number bubble and marker spans)
- No other layout (`index.html`, `merit-badges/badge-landing.html`,
  `merit-badges/guide.html`, `merit-badges/guide-print.html`,
  `merit-badges/printable.html`, `merit-badges/list.html`,
  `categories/`, `eagle-required/`, `search/`, `_default/`) contains
  `data-pagefind-body`, so none of those pages are indexed.

### scouting-u

- `hugo/layouts/scouts-bsa/ranks/requirements.html:40` —
  `data-pagefind-body` on `<div class="rank-requirements">`.
- `data-pagefind-ignore` on marker spans:
  `hugo/layouts/partials/scouts-bsa/ranks/requirement-node.html:86,112`.
- `hugo/layouts/search/list.html:5` has an explicit comment that the
  search page carries no `data-pagefind-body` and is therefore excluded.
- No other layout (`index.html`, `scouts-bsa/ranks/list.html`,
  `scouts-bsa/ranks/rank-landing.html`, `_default/`) contains
  `data-pagefind-body`.

### uni-theme

The shared theme only ships the search UI, not indexing scope:

- `layouts/partials/search/scripts.html` loads `/pagefind/pagefind-ui.js`
  and builds `assets/ts/search.ts`.
- No `data-pagefind-*` attributes exist anywhere in uni-theme layouts,
  so the theme cannot accidentally widen a consumer site's index.

## Indexing pipeline (identical in both repos)

- No `pagefind.yml` / `pagefind.toml` exists in either repo; all scope
  control is via the HTML attributes above.
- `package.json` scripts:
  - `"index": "bunx pagefind --site hugo/public"`
  - `"build": "cd hugo && hugo --minify && bun run index"`
  - `"build:local": "rm -rf hugo/public && cd hugo && hugo && bun run index"`
    (mbu's variant omits the `rm -rf` differences; both run hugo then index)
- CI: `.github/workflows/firebase-hosting-merge.yml` in both repos runs
  `bun run build` ("Build Hugo site and search index") before deploy, so
  the deployed index always matches the layouts.
- Both pin `pagefind ^1.5.2`.

## Exact per-site changes needed

None. Both sites conform to the decision today.

### Optional hardening (not required)

The scope currently depends on a single implicit rule: only one layout
per site carries `data-pagefind-body`. If a future layout added the
attribute, its pages would silently join the index. To make the decision
explicit and future-proof, each site could pin the indexer to the
requirement pages with a glob:

- mbu: `bunx pagefind --site hugo/public --glob "merit-badges/*/requirements/**/*.{html}"`
- scouting-u: `bunx pagefind --site hugo/public --glob "scouts-bsa/ranks/*/requirements/**/*.{html}"`

(`--glob` limits which files Pagefind even considers; see
[pagefind.app/docs/config-options](https://pagefind.app/docs/config-options/).)
This is a belt-and-suspenders measure only; the current attribute-based
scoping is the Pagefind-recommended pattern and works correctly.
