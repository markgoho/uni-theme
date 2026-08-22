# Consumer contract

`uni-theme` is a Hugo Module consumed by `mbu` today and a future
`scouting-university` repo. This file is the boundary a consumer can rely
on. Anything not listed here can change without a corresponding bump
convention (see `## Versioning`).

## Public custom properties

Only the **semantic** tokens defined in `assets/css/tokens-v2.css` are
public. Consumers may read and override these:

- Surfaces: `--surface`, `--surface-raised`, `--surface-sunken`,
  `--surface-inverse`
- Text: `--on-surface`, `--on-surface-muted`, `--on-surface-inverse`
- Accent: `--accent`, `--accent-container`, `--on-accent`,
  `--on-accent-container`
- Secondary: `--secondary`, `--secondary-container`,
  `--on-secondary-container`
- Outline: `--outline`, `--outline-variant`
- Error: `--error`, `--error-container`, `--on-error-container`
- Fonts: `--font-display`, `--font-body`
- Radius: `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-xl`,
  `--radius-full`
- Shadow: `--shadow-card`, `--shadow-raised`
- Spacing (`assets/css/spacing.css`): `--space-3xs` … `--space-3xl`,
  `--border-width-sm`/`-md`, `--border-radius-sm`/`-md`/`-lg`/`-pill`
- Type scale (`assets/css/typography.css`): `--step--2` … `--step-6`,
  `--font-weight-light`/`-regular`/`-semibold`/`-bold`/`-boldest`

**Not public**: raw color ramps in `assets/css/colors.css` (`--brown-*`,
`--olive-*`, `--teal-*`, `--v2-*`, etc). These back the semantic tokens
above and can be re-mixed or renamed freely.

## Public component CSS classes

`assets/css/layout.css` and `assets/css/base.css` are foundational
(`.container`, `.main`, `.visually-hidden`, reset rules) — every consumer
pulls both in. `assets/css/components/` holds classed, opt-in UI pieces:

- `breadcrumb.css` — `.breadcrumb`, `.breadcrumb__list`,
  `.breadcrumb__item`(`--current`), `.breadcrumb__link`,
  `.breadcrumb__separator`. Paired with `partials/breadcrumb.html`.
- `card-surface.css` — `.card-surface`, `.card-surface--wash`.
- `tag.css` — `.tag`, `.tag-group`, `.top-tags`.
- `timeline.css` — `.timeline`, `.timeline__item`, `.timeline__node`(`-text`),
  `.timeline__panel`.
- `icon.css` — `.icon--duotone`, styling the SVGs from `partials/icon.html`.
- `callout.css` — `.callout`, `.callout__icon`, `.callout__text`.
- `nav-card.css` — `.nav-cards-container`, `.nav-card-container`,
  `.nav-cards`, `.nav-card`, `.nav-card__icon`/`__title`/`__description`.
- `forms.css` — `.form-container`, `.form`, `.search-form`, `.date-grid`,
  `.form__label`/`__input`/`__error-message`/`__confirmation`, plus bare
  `fieldset`/`legend` styling.
- `search.css` — the base Pagefind UI layer: `.pagefind-ui` custom-property
  mapping, `.pagefind-ui__form`/`__search-input`/`__search-clear`/
  `__filter-panel`/`__message`/`__loading`/`__button`, plus
  `.search-header`/`.search-description`. Paired with
  `partials/search/page.html` and `partials/search/scripts.html` — see
  `## Search page`. Result-card presentation (thumbnails, excerpt
  line-clamp, meta tag pills) is consumer-specific and stays out of this
  file; `mbu` keeps its own `search.css` for that.
- `drg-blocks.css` — the guide page's content blocks, all under the
  `req-` prefix despite the filename (see `## Page CSS`): `.req-callout`
  (`--safety`/`--fact`/`--tip`), `.req-be-prepared`, `.req-checklist`
  (`--print` for the print variant), `.req-requirement` (`--lead`/`--sub`),
  `.req-rail__inner` (the sticky in-page echo of the current requirement,
  paired with `.req-rail` in `drg.css` and behavior in `req-rail.ts`),
  `.req-external-link`/`.req-download`, `.req-video`, `.req-next-page`,
  `.req-experience-card`, `.req-org-card`, `.req-tabs`.

- `badge-hero.css` — `.badge-hero` and its `__bg`/`__inner`/`__content`/
  `__eyebrow`/`__title`/`__lead`/`__meta`/`__actions`/`__image*` parts,
  plus the `--hero-on`/`--hero-on-muted` pair it defines for its own
  light/dark text split. "Badge" here is the hero's own name, not a
  merit-badge dependency.

`callout.css`, `nav-card.css`, and `forms.css` currently have no markup
in `mbu` using their classes — they came from mbu unused, not vetted
against a live consumer. Treat them as available but unverified rather
than confirmed-working. Everything else in this section and in
`## Page CSS` below is verified against live `mbu` markup.

## Page CSS

`assets/css/pages/` holds whole-page shells. Unlike `components/`, each
file assumes a page template shaped a particular way — a consumer either
uses a matching template or gets unused rules, not a broken page.

Content-page shells (#152):

- `home.css` — homepage shell: `.home-main` (full-bleed `main-class`),
  the shared section measure on `.home-steps`/`.home-categories`/
  `.home-featured`, `.home-hero`, `.home-search*`, `.home-steps*`,
  `.home-categories*`, `.category-tile*`, `.home-featured*`, and the
  cinematic `.hero-d*` hero.
- `merit-badges.css` — browse-grid shell: `.badge-count`, `.badges-grid`
  (including its `content-visibility` deferral past the sixth card),
  the `.badge-card` family (`__band`, `__category*`, `__eagle*`,
  `__image`, `__content`, `--with-image`), and `.req-count`. Generic
  card-grid CSS despite the filename; the Scouting reading of "badge"
  lives in the markup, not here.
- `merit-badge-landing.css` — landing-page bento shell:
  `.badge-overview`, `.badge-preview*`, `.badge-glance*`,
  `.badge-resources*`, `.badge-start-cta*`. The *template* that fills it
  stays in `mbu` (it reads merit-badge front matter); only the CSS is
  theme-owned.

Sections a consumer keeps for itself, because they are Scouting-specific
rather than shell: `mbu` styles `.home-eagle*` and `.eagle-group*` in its
own `css/eagle-required.css`, re-declaring the shared section measure for
`.home-eagle` since the theme's grouped selector no longer names it. The
`.discontinued-notice` styling stays with mbu's merit-badge-specific
partial of the same name, in `css/components/discontinued-notice.css`.

Requirement-rendering shells, extracted from mbu's `drg-` (Digital
Resource Guide) pages per #150. The `drg-` class prefix was renamed to
the generic `req-` during extraction — no
class name here is merit-badge-specific, even though the filenames still
say `drg`/`merit-badge` (renaming the files themselves would break
`critical-css.html`'s fixed manifest for no behavioral gain):

- `drg.css` — the guide page shell: `.req-page-main`/`.req-page`/
  `.req-page-body`/`.req-body-grid`/`.req-content`, the desktop
  `.req-sidebar`(`-wrap`)/`.req-nav` and mobile `.req-mobile-nav` navs,
  `.req-rail` (paired with `.req-rail__inner` in `drg-blocks.css` and
  `req-rail.ts`), `.req-header`, `.req-footer-nav`, `.req-illustration`,
  `.req-table-scroll`.
- `drg-print.css` — the guide's print stylesheet: `.req-worksheet` and its
  parts, `.req-print-header`/`.req-print-btn`/`.req-print-divider`/
  `.req-print-section`, plus `@media print` rules hiding `drg.css`'s and
  `drg-blocks.css`'s interactive chrome.
- `merit-badge-requirements.css` — the plain requirements-page shell:
  `.req-page`/`.req-main`/`.req-sidebar`, the requirement-tree card family
  `.req-card`/`.req-child`(`-item`)/`.req-children` (`--chips`/`--options`/
  `--rail` variants), `.req-dock`, `.req-pill`, `.req-timeline`,
  `.req-toast`, `.req-guide-lookup`. `.badge-identity`/`.badge-description`
  are a deliberate exception to the `req-` rename: Scouting rank badges are
  themselves badges, so "badge" reads as generic vocabulary here, unlike
  "drg" which is merit-badge-specific by definition.

## Requirement-rendering behavior

`assets/ts/deep-link.ts` and `assets/ts/req-rail.ts` (paired with `.req-rail`
above) are the interactive layer for both requirement-card families
(`merit-badge-requirements.css`'s `.req-card`/`.req-child` and
`drg.css`'s `.req-requirement`). `deep-link.ts` reads a `data-content-name`
attribute (set by the consumer's template, e.g. on `.req-card`/
`.req-child-item`) to label its `pirsch("requirement-copy-text", ...)`
analytics call — both names are generic; a consumer without Pirsch loaded
just skips the call (`typeof pirsch !== "undefined"` guard).

## Dark mode

Dark mode is the `.dark` class on `<html>`, set before first paint by
`partials/head/theme-init.html` (theme-owned) and toggled at runtime by
`assets/ts/theme-toggle.ts`. `.theme-v2` / `.theme-v2.dark` carry the v2
palette; today's default (`:root`) is the v1 look. A consumer's own CSS
may key off `.dark` the same way.

## Public button classes

`.button`, `.button-secondary`, `.button-icon`, `.button-small` from
`assets/css/button.css`. Compose new variants as separate classes (see
`## Asset path collisions`) — don't add new modifiers directly to
`button.css` from a consuming repo.

## Icons

`partials/icon.html` resolves an icon name (and weight) to an SVG partial
under `partials/icons/<name>.html` (regular) or
`partials/icons/duotone/<name>.html`:

```
partial "icon.html" (dict "name" "tree-evergreen" "class" "req-card__icon")
partial "icon.html" (dict "name" "tree-evergreen" "weight" "duotone")
```

Params: `name` (required), `weight` (`"regular"` default or `"duotone"`),
`class`, `size`, `title` (accessible name; when present the icon gets
`role="img"` and a `<title>`, otherwise `aria-hidden="true"`). An unknown
`name` or a weight not vendored for that name fails the build loudly via
`errorf`.

The full icon set (Phosphor regular + duotone) is theme-owned; consumers
do not maintain their own copies.

## Header/footer parameters

`partials/header.html` and `partials/footer.html` render site chrome from
`[params.theme]` in the consumer's `hugo.toml`:

- `siteTitle`, `siteTitleShort` — text logo (see below) and footer/copyright
  branding. Copyright reuses `siteTitle`; there is no separate param.
- `tagline` — shown under the footer brand title.
- `cta.label` / `cta.href` — optional. Omit the `[params.theme.cta]` table
  entirely to suppress the navbar CTA button.
- `footerColumns` — list of `{title, links: [{label, href}]}` tables,
  rendered as the footer nav columns.

Nav links (`.Site.Menus.main`), the `/search/` link, and the theme toggle
are fixed chrome — not parameterized.

All chrome styling (`.navbar__*`/`.footer__*` in `assets/css/header.css`
and `assets/css/footer.css`, including the `.visually-hidden` utility
those partials rely on), and the theme-toggle behavior
(`assets/ts/theme-toggle.ts`, pulled in via `resources.Get`), are
theme-owned. A consumer needs no CSS/JS of its own for the chrome to
render and function correctly.

There is no `errorf` validation on these params; a consumer that omits a
required one (e.g. `siteTitle`) gets an empty render, not a build error.

### Logo override

The logo renders via `partials/theme/logo.html`, which a consumer can
override with its own `layouts/partials/theme/logo.html` (e.g. an image
mark) — this is a plain Hugo layout override, not a new param. The
default renders `siteTitle`/`siteTitleShort` as text.

## Image CDN (ImageKit)

`partials/imagekit/img.html` renders every ImageKit-backed `<img>`;
`partials/imagekit/url.html` builds a single ImageKit URL. Both read the
consumer's account/CDN settings from `[params.imagekit]` in `hugo.toml`:

- `endpoint` (required) — e.g. `https://ik.imagekit.io/<account>`. There
  is no default; `url.html` fails the build via `errorf` if unset.
- `widths` — the responsive srcset ladder, e.g. `[400, 600, 800, 1200,
  1600]`. If unset (or empty), `img.html` falls back to a single-source
  `<img>` at the requested `maxWidth`/`width` with no `srcset`.

```
partial "imagekit/img.html" (dict
  "path"   "/merit-badges/camping/guide/tick-removal"
  "alt"    "…"
  "width"  800
  "height" 450
  "sizes"  "(max-width: 800px) 100vw, 800px")
```

`path`, `alt`, `width`, `height`, and `sizes` are always required and
caller-supplied — the partials hold no image-path or transform-preset
assumptions of their own. See the doc comment atop `img.html` for the
full param list (`v`, `maxWidth`, `tr`, `class`, `loading`,
`fetchpriority`, `decoding`, `attrs`).

Image quality and output format are **not** URL params here — they're
account-level settings in the ImageKit dashboard. A new consumer's
ImageKit account must have its dashboard configured to match (or
intentionally differ from) `mbu`'s before images will render at the
expected quality/format; there is no build-time check for this.

## Base template and head partials

`layouts/_default/baseof.html` is the site's HTML skeleton. It wires in
the `head/*` partials below, then exposes these blocks for pages to
override:

- `html-class` — class list on `<html>`.
- `hero` — full-bleed content before `<header>`.
- `header` — defaults to `partial "header.html"`.
- `main` / `main-class` — page body / extra class on `<main>`.
- `footer` — defaults to `partial "footer.html"`.
- `head-styles` / `head-scripts` — inserted mid-`<head>`, after critical
  CSS / before non-critical CSS and analytics respectively.
- `footer-scripts` — end of `<body>`.

`layouts/partials/head/`:

- `site.html`, `theme-init.html` (sets `.dark` pre-paint, see
  `## Dark mode`), `resource-hints.html`, `meta.html` — head boilerplate.
  `resource-hints.html` hardcodes `dns-prefetch` hints for
  `filestore.scouting.org`, `api.pirsch.io`, and `www.clarity.ms`, and a
  `prefetch` for `/pagefind/pagefind-ui.js` — all mbu-specific; a
  consumer without those domains/pagefind gets a harmless dead hint, not
  a build error.
- `analytics.html`, `clarity.html` — embed mbu's Pirsch site code and
  Clarity project ID directly. A second consumer reports into mbu's
  analytics properties until these are parameterized; treat as an
  override point (replace the file locally), not as configurable today.
- `critical-css.html`, `non-critical-css.html` — concatenate a **fixed,
  mbu-specific manifest** of asset paths, in that exact order. Many
  entries resolve to theme-owned files (the `css/components/` and
  `css/pages/` files documented above); every path the theme does *not*
  own, the consumer must supply — even as an empty file — or
  `resources.Concat` fails on a nil resource. Read the manifest itself
  for the current split rather than trusting a list here.

  Order matters as much as presence: where a theme file was split so the
  consumer could keep the non-generic part (`css/eagle-required.css`
  after `css/pages/merit-badges.css`, `css/badge-view-transitions.css`
  after `css/view-transitions.css`), the consumer-owned file is
  concatenated immediately after its parent, which is what keeps the
  cascade identical to before the split.

  This is the one theme-owned file that most clearly encodes mbu's
  specific asset layout rather than a generic one.

## JSON-LD partials

`partials/json-ld/organization.html` hardcodes mbu's name, description,
and GitHub URL, and reads `data/badge-images.json` (`.site["og-default"].v`)
plus `partials/imagekit/url.html`. `partials/json-ld/breadcrumb-auto.html`
is generic except for the same `guide`→"Digital Resource Guide" label
mapping as `partials/breadcrumb.html` below. Both are override points
(replace the file locally per the `theme/logo.html` precedent), not
parameterized.

## Breadcrumb

`partials/breadcrumb.html` renders the ancestor-to-current trail via
`.Parent` walking. It hardcodes two label overrides: pages with
`.Layout "guide"` on an `.IsSection` render "Digital Resource Guide", and
pages with `.Layout "requirements"` render "Requirements"; everything
else uses `.Title`. A consumer without those layouts gets plain
`.Title` crumbs — harmless, not an error.

## Text utilities

`partials/text/lead-sentence.html` reduces a block of markdown to its
leading sentence as plain text: `markdownify` → `plainify` → first
sentence → terminal punctuation dropped → capped at 80 characters on a
word boundary with a trailing ellipsis. The return value is therefore
never longer than 81 characters.

Params (dict): `text` — the source markdown. Returns a plain-text string.

Empty in, empty out. A caller that needs a guaranteed non-blank result —
an id-bearing heading under the Pagefind sub-result convention, say —
must supply its own placeholder.

Its reason to exist is headings: a requirement whose title lookup comes
up empty still needs a heading with real, distinct text, and the
requirement's own opening words beat a repeated "Requirement N"
placeholder for both accessible names and search sub-result titles.

## Search page

`partials/search/page.html` renders the search page shell (breadcrumb,
`<h1>`/description header, and the `#search` mount point Pagefind's UI
attaches to); `partials/search/scripts.html` is the paired
`footer-scripts` partial that loads `/pagefind/pagefind-ui.js` and the
built `assets/ts/search.ts`. A consumer's own build step must produce
`/pagefind/` (e.g. `bunx pagefind --site public`) — that indexing step is
not theme-owned.

```
{{ define "main" }}
  {{ partial "search/page.html" (dict "page" . "description" "…") }}
{{ end }}
{{ define "footer-scripts" }}
  {{ partial "search/scripts.html" . }}
{{ end }}
```

`page.html` params: `page` and `description` are required (`errorf` on
either missing). `placeholder` and `zeroResults` are optional UI copy,
defaulting to `"Search..."` / `"No results found"`. `noResultsEvent` and
`resultClickEvent` are optional Pirsch event names; each is only fired
by `search.ts` when its param is supplied, so a consumer without Pirsch
can omit both and get no analytics calls. `pageSize` is an optional int
overriding Pagefind's own built-in top-level-result page size (5) —
omit to keep that default; pass it when a consumer's corpus can
plausibly match more than 5 distinct pages on one query, so a broad
query doesn't hide real matches behind a "Load more" click (scouting-u
passes 7, one per rank). All five surface as `data-search-*` attributes
on `#search`. `mbu` passes its pre-extraction values
(`merit-badge-search-no-results`, `merit-badge-search-result-click`) so
the Pirsch event taxonomy didn't change when this moved.

Result-card presentation (thumbnails, excerpt line-clamp, meta tag
pills) is not part of this partial or `search.css` — see the `search.css`
entry under `## Public component CSS classes`.

`search.ts` sets `ranking.termSimilarity: 10` (Pagefind's default is 1.0)
on every consumer — not a per-consumer param. This demotes short
fuzzy-match noise (e.g. a query like "knives" against a corpus that only
has "knife" otherwise surfacing a 1-character "(k)" match) below genuine
matches when both are present in a result set. It does not produce a
"no results" state for a query whose only candidate is noise — Pagefind's
ranking API re-scores results, it never drops one from the list.

## Asset path collisions

When a theme-owned asset path (e.g. `assets/css/button.css`) and a
same-path file in the consuming site both exist, **the theme's file wins
silently** — there is no override mechanism. A consumer that needs
badge/site-specific variants must use a **different filename**
(e.g. `button-eagle.css` in `mbu`, concatenated after `button.css` in the
site's own critical-CSS pipeline) rather than shadowing the theme's path.

This is the opposite of `layouts/`: for templates and partials, the
**site wins over the theme** (standard Hugo precedence), which is what
makes the `theme/logo.html` override above possible.

`view-transitions.css` follows the same pattern: the theme's copy carries
the shared `@view-transition` opt-in and the requirement-preview↔guide
pairing (`req-num`/`req-eyebrow`/`req-title`/`req-text` transition
classes); `mbu`'s own badge-card↔badge-hero pairing lives in its local
`badge-view-transitions.css`, concatenated after the theme's file in
`critical-css.html`.

## Versioning

No semver. `mbu` (and later `scouting-university`) pin `uni-theme` to a
commit via Go's pseudo-version. Every push to `uni-theme`'s `master`
branch opens a PR in each consumer bumping the pin, with the range of new
`uni-theme` commits as the PR body — that changelog, not a version
number, is what a reviewer should read before merging. A bump PR must
re-run `hugo mod vendor`, not just bump `go.mod`/`go.sum` — a stale
`hugo/_vendor` silently builds the old CSS with no error.
