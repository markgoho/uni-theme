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
- `search.css` — the whole search page: `.search-header`/`.search-description`,
  the form (`.search__form`/`__input`/`__clear`/`__message`/`__more`), and
  the results display (`.award-result` and its `__emblem`/`__body`/`__title`/
  `__requirements`, `.requirement-result` and its `__title`/`__path`/
  `__excerpt`). Paired with `partials/search/page.html` and
  `partials/search/scripts.html` — see `## Search page`. Result-card
  presentation is theme-owned as of uni-theme#14, so a consumer no longer
  ships result CSS of its own: `assets/css/search.css` in a consumer is
  **not loaded** and should be deleted.
- `drg-blocks.css` — the guide page's content blocks, all under the
  `req-` prefix despite the filename (see `## Page CSS`): `.req-callout`
  (`--safety`/`--fact`/`--tip`), `.req-be-prepared`, `.req-checklist`
  (`--print` for the print variant), `.req-requirement` (`--lead`/`--sub`),
  `.req-rail__inner` (the sticky in-page echo of the current requirement,
  paired with `.req-rail` in `drg.css` and behavior in `req-rail.ts`),
  `.req-external-link`/`.req-download`, `.req-video`, `.req-next-page`,
  `.req-experience-card`, `.req-org-card`, `.req-tabs`.

- `badge-hero.css` — `.badge-hero` and its `__backdrop`/`__glow`/`__grid`/
  `__content`/`__eyebrow-row`/`__eyebrow`/`__eagle-chip`/`__pill`/
  `__title`/`__lead`/`__ctas`/`__cta`/`__emblem-col`/`__emblem` parts,
  plus the `--hero-on`/`--hero-on-muted` pair it defines for its own
  light/dark text split. "Badge" here is the hero's own name, not a
  merit-badge dependency. Paired with `layouts/partials/hero.html` (#26),
  which owns the `.badge-hero-wrap`/`.badge-hero` markup shape; callers
  supply pre-rendered eyebrow/backdrop/emblem HTML and own their own
  domain derivation (icons, category links, view-transition-name values).

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
  `.badge-resources*`, `.badge-start-cta*`. `.badge-preview*` and
  `.badge-start-cta*` stay filled by each consumer's own template (it
  reads merit-badge/rank front matter). `.badge-glance*`/
  `.badge-resources*` markup is filled by
  `layouts/partials/glance-card.html`/`resources-card.html` (#29),
  which take a generic rows slice ({icon, label, value} / {icon, label,
  url}) — callers own
  which facts/links exist and pre-compute row data from their own
  domain (mbu's badge rows differ from scouting-u's rank rows), but not
  the row markup itself.

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
  `.req-page-body`/`.req-body-grid`/`.req-content`, the desktop `.req-nav`
  and mobile `.req-mobile-nav` navs, `.req-rail` (paired with
  `.req-rail__inner` in `drg-blocks.css` and `req-rail.ts`), `.req-header`,
  `.req-footer-nav`, `.req-illustration`, `.req-table-scroll`.
  `.req-sidebar`(`-wrap`) is defined once, in
  `merit-badge-requirements.css` below, since `drg.css` always loads
  alongside it (see #3 — two divergent definitions of the same selector
  silently cascade-fought each other).
- `drg-print.css` — the guide's print stylesheet: `.req-worksheet` and its
  parts, `.req-print-header`/`.req-print-btn`/`.req-print-divider`/
  `.req-print-section`, plus `@media print` rules hiding `drg.css`'s and
  `drg-blocks.css`'s interactive chrome.
- `merit-badge-requirements.css` — the plain requirements-page shell:
  `.req-page`/`.req-main`/`.req-sidebar`(`-wrap`), the requirement-tree card family
  `.req-card`/`.req-child`(`-item`)/`.req-children` (`--chips`/`--options`/
  `--rail` variants), `.req-dock`, `.req-pill`, `.req-timeline`,
  `.req-toast`, `.req-guide-lookup`, `.req-text-list` (a node's structured
  `list`, see "Text utilities"), `.req-footnotes`(`__heading`/`__list`/
  `__item`/`__marker`/`__text`) (see "Footnotes"). `.badge-identity`/
  `.badge-description` are a deliberate exception to the `req-` rename:
  Scouting rank badges are themselves badges, so "badge" reads as generic
  vocabulary here, unlike "drg" which is merit-badge-specific by
  definition. Paired with `layouts/partials/identity.html` (#27), which
  owns the `.badge-identity` markup shape (icon glow-ring, eyebrow,
  title, micro-tag); callers supply plain data (icon name, eyebrow text
  and optional URL, title, micro-tag text) and own their own domain
  derivation (icon lookup by slug, category URL, rank level text) via a
  local `badge-identity.html`/`rank-identity.html` that calls it.

## Requirement-rendering behavior

`assets/ts/deep-link.ts` and `assets/ts/req-rail.ts` (paired with `.req-rail`
above) are the interactive layer for both requirement-card families
(`merit-badge-requirements.css`'s `.req-card`/`.req-child` and
`drg.css`'s `.req-requirement`). `deep-link.ts` reads a `data-content-name`
attribute (set by the consumer's template, e.g. on `.req-card`/
`.req-child-item`) to label its `pirsch("requirement-copy-text", ...)`
analytics call — both names are generic; a consumer without Pirsch loaded
just skips the call (`typeof pirsch !== "undefined"` guard).

### The `.req-card`/`.req-child` markup, theme-owned

`layouts/partials/req-card.html` (depth-1), `req-child-item.html`
(depth ≥2, recursive), `req-children.html` (dispatches a group of
children to the `rail`/`chips`/`options` variant it's told to use),
`req-text.html`, and `req-pill.html` render the full `.req-card`/
`.req-child` markup `deep-link.ts` and `merit-badge-requirements.css`
depend on. A consumer maps its own data into a **node dict** and calls
`req-card.html` once per top-level requirement:

```
path          - dot-separated path, e.g. "3.a"                 (required)
marker        - bubble/marker text (depth-1 number, or nested
                marker "a."/"beef-cattle")                      (required)
content_name  - badge/rank name, for data-content-name + Pirsch (required)
title         - curated title, "" if none                       (optional)
text          - markdown body text, "" if none/boilerplate      (optional)
text_format   - "markdown" | "html", default "markdown". "html"
                for a consumer whose own pipeline already produces
                sanitized HTML (e.g. pre-rendered upstream content) --
                text is emitted via safeHTML instead of markdownify
                (optional)
eyebrow       - group label shown above title, depth-1 only     (optional)
pill          - {type: "select"|"all", count: N} or nil         (optional)
guide_href    - resolved study-guide URL, "" if none             (optional)
resources     - [{title, url}]                                  (optional)
list          - {type: "ul"|"ol", items: [string, ...]}, renders
                after this node's own text, inside the same text
                element -- see "Text utilities" below            (optional)
children      - [node, ...], same shape, recursive              (optional)
variant       - "rail" | "chips" | "options", default "rail"    (optional)
ring          - bool, options-variant marker-as-ring; default true (optional)
transition_num       - bool, number bubble carries a view-transition-name (optional, default false)
text_transition_key  - override the text block's transition key, default this node's own path-derived key (optional)
```

Every field is a pre-resolved scalar or slice — no Hugo `Page` object,
no site-specific lookup, ever passed in or performed inside these
partials. Content-bound resolution (a DRG guide-page lookup, `mbu`'s
`req-guide-lookup.html`/`req-guide-fragment.html`; a group's curated-vs-
derived title and whether every sibling in it resolved one;
`subrequirement_mode` → `pill`/`variant`) is the calling site's own job,
done before it builds the node dict — see `mbu`'s ADR 0002 and
`scouting-university`'s ADR 0005/0006/0008 for why that split holds.
**`variant` is never computed inside the theme.** A heuristic over
group content (e.g. "children are all short leaves → chips") belongs to
whichever consumer's data it was derived from; auto-applying one
consumer's heuristic to another's data is exactly the kind of silent
behavior change this split exists to prevent.

**Empty-title-slot policy** (`layouts/partials/text/heading-for.html`):
a heading always renders and always carries `id="{path}"` on an actual
`h1`-`h6` — see the Pagefind invariant below — even with no curated
`title`:

- `title` set → shown normally, separate text block below.
- `title` empty, `text` a single short sentence (`text/lead-
  sentence.html` captures it whole) → the full text renders **visibly**
  as the heading (`req-card__title--verbatim`/`req-child__title--
  verbatim`), no separate text block. Nothing would be left to show
  there, and rendering it hidden instead would double the one sentence
  in `deep-link.ts`'s copy-text paste (title line + body line, same
  sentence twice).
- `title` empty, `text` longer/multi-sentence → a derived lead sentence
  renders as a **visually-hidden** heading; the full text renders
  visibly in a separate text block.
- `title` and `text` both empty (a bare group stem) → `"Requirement
  {path}"`, hidden.

`req-card__title--verbatim`/`req-child__title--verbatim` are theme-owned
(styled in `merit-badge-requirements.css`, next to the base title
rules) — a consumer never supplies its own CSS for them.

**`site.Params.theme.hideReqChildTitles`** (bool, default `false`,
`req-child-item.html` only — `req-card.html`'s depth-1 heading is
unaffected) forces every child heading into the visually-hidden shape
regardless of what `text/heading-for.html` returned, so only the marker
and requirement text show. `node.title`/`node.text` still flow through
unchanged — a consumer sets this to stop rendering redundant per-child
headings on a page that already carries a group heading one level up,
while keeping `node.title` populated for other surfaces (search
results, landing-page previews, a future guide page) that read it
separately from this render path.

**Chips never promote.** A chip's marker and text sit directly under its
`<li>` with no `.req-child__body`/`.req-card__panel` wrapper (see below)
— `req-child-item.html`'s chips branch always renders the hidden-heading
shape regardless of what `text/heading-for.html` returned, since a chip
is already a short single-sentence label by construction (the exact
condition that triggers promotion elsewhere) and has nowhere else for
promoted text to go. `node.list` is not supported on chips for the same
reason — a chip's text renders inline inside its `<li>`, with no
element a block-level list could legally nest inside.

**`node.list` and promotion.** Stripping a trailing list out of
`node.text` can leave a short remaining sentence that would otherwise
promote into the heading (e.g. "Demonstrate first aid for the
following:"). A node with both a curated `title` and a `list` is
unaffected — promotion only ever applies when `title` is empty. A node
that relies on promotion (`title` empty, short remaining sentence) still
gets its list rendered: `req-card.html`/`req-child-item.html` call
`req-text.html` whenever `node.list` is set, even when text alone would
have promoted, passing an empty `text` so only the list appears in the
body below the promoted heading.

`layouts/partials/text/transition-key.html` derives the `view-
transition-name` key from a path (`"3.a"` → `"3-a"`); use it rather than
reimplementing the dots-to-hyphens-plus-digit/letter-boundary pattern
per call site — a consumer's own landing-page preview partial should
call the same helper so its keys agree with the requirements page's.

### The `deep-link.ts` markup contract

`deep-link.ts` selects, dock-targets, and copies text for a requirement
purely by reading this markup — nothing here is theme-internal, a
consumer's own `req-card.html`/`req-child-item.html` output (whether
rendered via the shared partials above or, historically, a local copy)
must match it exactly:

- **`[data-anchor="{path}"]`** on the whole node (`<li class="req-card">`
  at depth 1, `<li class="req-child req-child--{variant}">` nested) is
  the single thing that makes an element "a requirement" to this script.
  `tabindex="-1"` is required on it (focus-driven scroll-into-view and
  the no-JS `:focus-within` fallback both depend on it).
- **`data-content-name`** (own or nearest ancestor) labels the
  `requirement-copy-text` Pirsch event.
- **`data-guide`** (optional) is the study-guide URL; omitted entirely
  when there is none — the dock's guide button hides itself on
  `href=""`.
- **Body scope**: `:scope > .req-card__panel` (depth 1) or `:scope >
  .req-child__body` (nested). **Chips have neither** — `deep-link.ts`
  falls back to reading `:scope > .req-child__text` directly off the
  `<li>` when no scope wrapper is found.
- **Title**: `:scope > .req-card__header .req-card__title` (depth 1) /
  `:scope > .req-child__title-row > .req-child__title` (nested).
- **Text**: `:scope > .req-card__text` / `:scope > .req-child__text`.
- **Resources**: `:scope > .resources li a`.
- **Recursion**: `:scope > .req-children > [data-anchor]`.

`deep-link.ts`'s copy-text paste (`requirementText()`) reads title then
body: when title is present it emits `"{path}. {title}"` then the body
on the next line; when title is empty it emits `"{path}. {body}"`. A
`visually-hidden` title element still has real `textContent`, so
`requirementText()` treats a title as "present" only when its element
does **not** carry `.visually-hidden` — a curated title (shown normally)
or a promoted one (`--verbatim`, shown as the heading) counts; a hidden-
derived heading does not, and is read as if title were empty. This is
why a hidden-derived node's body renders the **full**, unstripped text
(including the sentence the derived heading was built from) rather than
having it echo-stripped: the same sentence would otherwise exist nowhere
a sighted reader can see it, since the derived heading is visually
hidden. `req-text.html`'s title-echo stripping only ever runs against a
CURATED title (`node.title`, never `text/heading-for.html`'s `display`)
for exactly this reason — stripping against a derived title would delete
the requirement's own opening words from the only place they're visibly
shown.

### The Pagefind non-blank-heading invariant

**The id goes on the heading, never the wrapping `<li>`, and the heading
is never blank.** Pagefind's Route A sub-result grouping needs the `id`
on an actual `h1`-`h6` with real text to bound an excerpt region
correctly; an `id` on the `<li>` instead yields no sub-results at all,
and a blank heading yields an unusable sub-result title. Both `mbu` and
`scouting-university` re-derived this independently, empirically,
against a live `pagefind.search()` index rather than from Pagefind's own
docs. `text/heading-for.html`'s fallback chain (derived lead sentence,
then `"Requirement {path}"`) exists entirely to guarantee this — see
indexing convention 1 below, which states the id-placement half of the
same rule.

## DRG shortcodes and guide layouts

`layouts/shortcodes/drg/*.html` (13: `requirement`, `inherited-
requirement`, `tip`, `did-you-know`, `safety-first`, `be-prepared`,
`checklist`, `external-link`, `download`, `video`, `next-page`,
`org-card`, `experience-card`) render the `req-*` markup
`drg-blocks.css`/`drg.css`/`drg-print.css` style, for use inside a
guide page's markdown body. `mbu` keeps its own local copy of all 13 at
`hugo/layouts/shortcodes/drg/` (plus two the theme does not ship:
`phishing-email`, a one-off hardcoded illustration, and `image`,
ImageKit-bound) — Hugo's standard site-over-module layout precedence
means mbu's copies keep winning for all of mbu's content, so this
addition is purely additive there (verified empirically: a same-named
scratch shortcode in each location resolves to the site's local one).
A future consumer with no local override gets the theme's copy.

Every shortcode here follows the node-dict split above: `.Get`/`.Inner`
and the calling page's own `.Params`/`.Page.Store` only, never a
`hugo.Data` lookup.

**`requirement` and `inherited-requirement` take a `text_format`
param** (`"markdown"` default | `"html"`), same convention as the
node-dict's own `text_format` field above. Requirement text sourced
from a JSON dataset is typically already pre-rendered HTML (embedded
`<a href>`, `<sup>` footnote markers) rather than markdown; running it
through `markdownify` is a second, unrelated goldmark pass that
silently strips those tags to `<!-- raw HTML omitted -->` on any
consumer without `markup.goldmark.renderer.unsafe = true` set (mbu sets
it; a rank consumer following the plan's own constraints does not).
Discovered empirically verifying this port: `.Inner` substituting into
a `{{< >}}`-delimited shortcode's output is safe (goldmark never
touches it), but a shortcode's own subsequent `| markdownify` call on
that same string is not the same operation and does not inherit that
safety. Pass `text_format="html"` for pre-rendered source text — e.g.
scouting-u's Phase 3 scaffold, which writes the exact rank-JSON `text`
verbatim, should always pass it. The `requirement` shortcode also
threads `text_format` through `Page.Store.Set "leadRequirement"` so
`guide.html`'s `.req-rail` renders the same string the same way.

**`inherited-requirement` is the one shortcode whose
mbu source violates that split** — mbu's copy resolves its parent
requirement's text itself via `index hugo.Data "merit-badges" $slug`
and a recursive tree walk. The theme's copy keeps mbu's grammar/merge
algorithm (verb detection, article insertion, sentence-trimming,
capitalization — pure text transformation, not a lookup) but replaces
that lookup with an explicit required param:

```
inherited-requirement:
  number       - requirement number, e.g. "6.a"
  topic        - the child's own (possibly bare) text, or .Inner
  parent_text  - REQUIRED. The parent requirement's verbatim text,
                 pre-resolved by the calling site (e.g. scouting-u's
                 Phase 3 scaffold, which reads rank JSON directly and
                 can write the exact string as a literal param at
                 generation time — no runtime Hugo lookup needed).
```

This is a different, simpler contract than mbu's local copy — mbu is
unaffected (its own copy still wins for its own content) and no mbu
content needs to change.

`layouts/_default/guide.html` and `guide-print.html` are the page
shells for a `layout: guide`/`layout: guide-print` page. They live
under `_default/`, not a type-specific directory, because a consumer
whose guide content sits under a type-specific section (mbu's own
`layouts/merit-badges/guide.html`, more specific, always wins there and
never resolves to this file) is expected to keep its own copy; this
file is for a consumer selecting the layout purely by front-matter
`layout:`. No `hugo.Data` lookup: `guide_nav` and `identity` are read
off `.Params`/`.CurrentSection.Params`/`.Parent.Params`, both pre-
resolved by the calling content or its scaffold. `.Page.Store.Get
"leadRequirement"` (set by the `requirement` shortcode) feeds `.req-
rail`. `guide.html` does not render a hero — no hero markup exists in
`drg.css`/`drg-blocks.css`; a consumer wanting one renders it via its
own hero partial elsewhere (e.g. the badge/rank landing page's own
hero, which already links *to* the guide — see `guide_href` above).

`layouts/partials/drg/sidebar.html` is the guide's sticky sidebar plus
mobile nav, generalized from mbu's local `merit-badges/drg-sidebar.html`.
Params:

```
page       - the current guide Page (resolves the "active" nav item)
guide_nav  - [{group_title, items: [{title, url}]}, ...]
identity   - dict, passed straight to `identity.html` unmodified
             (icon, eyebrow, eyebrow_url, title, demote_heading,
             micro_tag) -- resolved by the calling site exactly like
             mbu's `badge-identity.html`/scouting-u's `rank-identity.html`
             already do for their landing pages, never inside this
             partial
req_url    - URL of the requirements page, "" renders no Reference item
print_page - the "print complete guide" Page, nil renders no item
```

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

- `html-class` — class list on `<html>` (defaults to `"theme-v2"`).
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
- `analytics.html`, `clarity.html` — read their tracking codes from
  `[params.analytics]` in the consumer's `hugo.toml`:
  - `pirsch_code` — Pirsch site code. No `<script>` emitted when unset.
  - `clarity_id` — Clarity project ID. No `<script>` emitted when unset.
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

`partials/json-ld/merit-badge-landing.html` and
`merit-badge-requirements.html` render `Course` schema for a badge's
landing and requirements pages. These two are still merit-badge-shaped,
not generic: they read `hugo.Data "merit-badges"` keyed by
`.File.ContentBaseName`/`$badge.File.ContentBaseName` for fields like
`slug`, `requirements`, `eagle_required`, and `pamphlet_url`. A future
rank-schema consumer needs its own partials, not a dict-driven call into
these — scouting-u's rank data has no `pamphlet_url`/`eagle_required`/
`subrequirements` equivalent (see uni-theme#23).

`drg-index.html` and `drg-requirement.html` render `LearningResource`
schema for a Digital Resource/Requirements Guide, and **are** generic:
both read `.Params.badge_name` (mbu) **or** `.Params.rank_name` (a rank
consumer) for the subject's name, and `.Params.drg_noun` (default
`"Merit Badge"`, mbu never sets it) for the noun used in the schema's
`name`/`description` fields — a rank consumer sets `drg_noun: "Rank"`.
No `hugo.Data` lookup in either partial; every field is a pre-resolved
Param the calling content/scaffold already wrote, per the node-dict
split above. The guide-label string (`"— Digital Resource Guide"`
suffix in `drg-index.html`'s `name`, `drg-requirement.html`'s
`isPartOf.name`) reads the same `site.Params.theme.guideLabel` param as
`## Breadcrumb` below. `drg-index.html`'s provider name reads
`.Site.Title`; everything else that names the org hardcodes "Scouting
America" as the awarding body, which is correct for any Scouting
America program, not mbu-specific.

## Breadcrumb

`partials/breadcrumb.html` and `partials/json-ld/breadcrumb-auto.html`
render the ancestor-to-current trail via `.Parent` walking. Both
hardcode one label override via `site.Params.theme.guideLabel` (default
`"Digital Resource Guide"`, mbu's existing string — mbu never sets the
param so its output is unchanged): pages with `.Layout "guide"` on an
`.IsSection` render that label. `partials/breadcrumb.html` additionally
renders "Requirements" for pages with `.Layout "requirements"`;
everything else in both partials uses `.Title`. A consumer without
those layouts gets plain `.Title` crumbs — harmless, not an error. A
rank consumer sets `[params.theme] guideLabel = "Digital Requirements
Guide"` in `hugo.toml`.

## Text utilities

Two internal partials resolve `text_format` so downstream code doesn't
have to. Neither takes a default for `text_format` — both `errorf` on
anything other than `"markdown"`/`"html"`, since the node-dict default
(`"markdown"`) lives exactly once, at `req-card.html`/
`req-child-item.html` per the node dict above; a forgotten pass anywhere
downstream now fails the build instead of silently defaulting to the
format that strips a consumer's HTML.

`partials/text/plain-text.html` resolves text to a plain-text string:
`markdownify` → `plainify` → `htmlUnescape` for `"markdown"`; `plainify`
→ `htmlUnescape` for `"html"` (the `htmlUnescape` undoes `markdownify`'s
own smart-quote entities, e.g. `'` → `&rsquo;`, that `plainify` doesn't
decode and raw output would otherwise double-escape). Params: `text`,
`text_format` (required). Returns a plain-text string.

`partials/text/render.html` renders text as safe HTML: `markdownify` for
`"markdown"`, `safeHTML` for `"html"`. Params: `text`, `text_format`
(required). Returns safe HTML. `req-text.html`, `req-child-item.html`'s
chips variant, and `req-footnotes.html` all call this for their final
output, rather than each branching on `text_format` itself.

`req-text.html` additionally takes an optional `list` param —
`{type: "ul"|"ol", items: [string, ...]}` — rendered as a real
`<ul>`/`<ol class="req-text-list">` immediately after the text above,
inside the *same* element (`.req-card__text`/`.req-child__text`), not as
a sibling. Items are plain text, auto-escaped; there is no per-item
`text_format`. See the node dict's `list` field and "`node.list` and
promotion" above.

`partials/text/lead-sentence.html` reduces already-resolved plain text
(the output of `text/plain-text.html`) to its leading sentence: first
sentence → terminal punctuation dropped → capped at 80 characters on a
word boundary with a trailing ellipsis. The return value is therefore
never longer than 81 characters unless `uncapped` is set. It does not
know about `text_format` at all — `text/heading-for.html` resolves
plain text once and passes the same resolved string into both its
capped and uncapped call, rather than each call re-deriving it.

Params (dict): `text` — plain text. `uncapped` — bool, default false;
skips the 80-character cap, for `text/heading-for.html`'s own promotion
test, which needs the full sentence, not a capped one, when deciding
whether a requirement's text is short enough to promote. Returns a
plain-text string.

Empty in, empty out. A caller that needs a guaranteed non-blank result —
an id-bearing heading under the Pagefind sub-result convention, say —
must supply its own placeholder.

Its reason to exist is headings: a requirement whose title lookup comes
up empty still needs a heading with real, distinct text, and the
requirement's own opening words beat a repeated "Requirement N"
placeholder for both accessible names and search sub-result titles.

`exampleSite/` is a minimal Hugo site (a local Hugo Module import of
this repo, see its `go.mod`) that renders one `req-card.html` fixture
per `text_format` value, with representative `<sup>`/`<ul>` content in
the `"html"` fixture (both a `req-text.html` node and a chips-variant
child, covering `text/render.html`'s two call sites), plus a `node.list`
fixture (one promoted, one not) and a `req-footnotes.html` call whose
markers resolve the fixture's own `<sup>` links. The
`build-fixture` job in `.github/workflows/notify-consumers.yml` builds
it on every push/PR and fails if the output contains `raw HTML
omitted` — that string only appears when `"html"`-formatted text gets
routed through `markdownify` instead of `safeHTML`, i.e. a
`text_format` threading regression. `dispatch` in the same workflow
depends on `build-fixture` and only runs on push, so this gate blocks a
bump PR from ever reaching a consumer, rather than catching the
regression after the fact. This is uni-theme's only build-time coverage
of the `"html"` path: no consumer in this repo ever sets it, so without
this fixture a regression here would only surface once a bump PR
reached scouting-u (uni-theme#24).

## Footnotes

`partials/req-footnotes.html` renders a badge/rank-level list of footnote
definitions as a real endnotes section — one `<section class="req-
footnotes">` call per page, not per-node. Params: `footnotes` — `[{marker,
text, text_format}, ...]`, required (renders nothing if empty/unset);
`heading` — optional visible section title, default `"Notes"`.

Each entry gets `id="fn-{marker}"`, so a consumer's own citation markup
(e.g. a bare `<sup>N</sup>` in some `node.text`, rewritten by the
consumer's own ingestion into `<sup><a href="#fn-N">N</a></sup>`) has
something real to link to. **All parsing, marker extraction, and
marker-to-definition matching is the consumer's job**, done before
calling this partial — same "no site-specific lookup inside the
partials" split as the node dict above. This partial never inspects
`node.text` for citation markers itself. Forward links only: no
`id="fnref-N"` back-reference on the citation side, since one footnote
can be cited from more than one requirement (an id there would be
duplicated across the page).

A footnote's own `text`/`text_format` render through `text/render.html`
exactly like a requirement's — a definition can itself contain HTML
(e.g. a nested `<ul>`).

```
partial "req-footnotes.html" (dict "footnotes" (slice
  (dict "marker" "2" "text" "…" "text_format" "html")
  (dict "marker" "3" "text" "…" "text_format" "html")
))
```

## Search page

`partials/search/page.html` renders the whole search page: breadcrumb,
`<h1>`/description header, the search form, and the `#search-results`
region. `partials/search/scripts.html` is the paired `footer-scripts`
partial that loads the built `assets/ts/search.ts`. A consumer's own
build step must produce `/pagefind/` (e.g. `bunx pagefind --site public`)
— that indexing step is not theme-owned.

**Pagefind's Default UI is not used.** `search.ts` renders results itself
against the raw Pagefind API (uni-theme#14), so `/pagefind/pagefind-ui.js`
is never loaded and no `.pagefind-ui__*` class exists on the page.

```
{{ define "main" }}
  {{ partial "search/page.html" (dict "page" . "description" "…" "awardLabel" "Merit Badge") }}
{{ end }}
{{ define "footer-scripts" }}
  {{ partial "search/scripts.html" . }}
{{ end }}
```

`page.html` params: `page`, `description`, and `awardLabel` are required
(`errorf` on any missing). `awardLabel` is the suffix appended to each
result's award title at render time — `"Hiking"` renders as `"Hiking
Merit Badge"` — so the suffix is never indexed and never has to be
repeated in content. `emblemPlaceholder` is an optional URL for the image
shown in an award's emblem rail when Pagefind has no `image` meta for
that page; omit it and the rail renders an empty tinted ground rather
than a broken image. `placeholder`, `zeroResults`, and `minQueryHint` are
optional UI copy, defaulting to `"Search..."` / `"No results found"` /
`"Type at least 3 characters to search."`. `minQueryHint` replaces
`zeroResults` while the field holds 1-2 characters, since Pagefind's
index isn't queried below `search.ts`'s own `MIN_QUERY_LENGTH` of 3 — an
empty field shows neither message.
`noResultsEvent` and `resultClickEvent` are optional Pirsch event names;
each is only fired by `search.ts` when its param is supplied, so a
consumer without Pirsch can omit both and get no analytics calls.
`pageSize` is an optional int — how many award panels render before the
"Load more" button appears, defaulting to 5. It is now theme-implemented
pagination over Pagefind's raw result list rather than a pass-through to
Pagefind's own UI; behavior is unchanged. Raise it when a consumer's
corpus can plausibly match more than 5 distinct pages on one query, so a
broad query doesn't hide real matches behind a click (scouting-u passes
7, one per rank). All optional params surface as `data-search-*`
attributes on `#search`. `mbu` passes its pre-extraction event values
(`merit-badge-search-no-results`, `merit-badge-search-result-click`) so
the Pirsch event taxonomy has never changed.

### Indexing conventions

A consumer's own requirement markup decides the quality of this display,
because `search.ts` reads Pagefind's index and nothing else. Five rules,
each of them found by reading live `pagefind.search()` output rather than
inferred from Pagefind's docs — the reasoning is recorded in
[ADR 0001](docs/adr/0001-pagefind-search-indexing-contract.md).

1. **The anchor id goes on the requirement's heading**, not on the
   wrapping `<li>`/`<article>`. Pagefind builds a sub-result per
   `id`-bearing heading; an id on the wrapper yields no sub-results at
   all. The id's text is the requirement path the tile renders.
2. **`data-pagefind-ignore` every non-prose span that renders before its
   own heading** — markers, number bubbles, rings, group eyebrows, mode
   pills. Pagefind attributes pre-heading text to the *previous* region,
   so an unignored span lands in the wrong requirement's excerpt (mbu#162).
3. **Scope the index with one `data-pagefind-body`** on the requirement
   list wrapper — not the whole page, not one per requirement. Page-level
   `data-pagefind-meta` outside it is still read.
4. **Index only award requirement pages.** The renderer treats one
   Pagefind result as one award panel, so any other indexed page renders
   as an award with no requirements. The search page itself carries no
   `data-pagefind-body`.
5. **No `data-pagefind-index-attrs`.** It inlines the named attributes'
   *values* into the indexed text; it is not a metadata-only mechanism.
   Keep the attributes for a consumer's own JS, drop the directive.

A doubled or foreign excerpt in the results is the symptom of rule 2 being
broken somewhere in the consumer's markup. The theme does not paper over
it — see the excerpt note below.

### Results display

Results group by Award: one `.award-result` panel per matching page, with
an emblem rail, the award title, and one `.requirement-result` tile per
matching Requirement. The panel as a whole is not a link — the emblem and
the award title point at the award page, and each requirement tile is its
own click target, pointing at that requirement's anchor.

Three things the renderer reads from a consumer's index, all governed by
the indexing conventions above:

- **`meta.title`** is the bare award name, with no label suffix. Adding
  the suffix in content would double-stamp it.
- **`sub_result.anchor.id` is the requirement path** (`2`, `2.a`,
  `4.option2`), shown as the tile's path prefix. An id that doesn't match
  that shape still renders its tile, just without a path.
- **`meta.image`** (via `data-pagefind-meta="image[src]"`) is the award
  emblem. Absent, `emblemPlaceholder` fills the rail.

Pagefind's sub-result excerpt begins with the heading's own text, so a
requirement whose heading comes from `partials/text/lead-sentence.html`
would otherwise render its title twice over. `search.ts` strips a leading
repeat of the title from the excerpt. When a requirement's whole body
*is* its lead sentence (a short, single-sentence "chip" requirement) both
repeats strip away to nothing; rather than showing no excerpt at all,
`search.ts` falls back to leaving one repeat standing, so the match stays
visible. A tile whose excerpt is still empty after that (a grouping
heading like "5 Hiking" that matched on title text alone, with no body of
its own) is dropped entirely whenever one of its own child requirements
is also in the result set — the assumption is that the child's tile
already carries the match. `search.ts` also moves a leading/trailing
punctuation character out of a Pagefind `<mark>` (e.g. `hammer,` renders
as `<mark>hammer</mark>,`) so only the matched word is highlighted. None
of this compensates for marker text leaking into an excerpt — that means
a `data-pagefind-ignore` is missing in the consumer's own markup.

`search.ts` sets `ranking.termSimilarity: 10` (Pagefind's default is 1.0)
on every consumer — not a per-consumer param. This demotes short
fuzzy-match noise (e.g. a query like "knives" against a corpus that only
has "knife" otherwise surfacing a 1-character "(k)" match) below genuine
matches when both are present in a result set. Because Pagefind's ranking
API re-scores results and never drops one, `search.ts` additionally
suppresses the entire result set when the best score falls below its own
`FUZZY_MATCH_FLOOR`, showing `zeroResults` instead — see uni-theme#5.

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
