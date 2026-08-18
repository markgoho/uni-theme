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

## Dark mode

Dark mode is the `.dark` class on `<html>`, set before first paint and
toggled at runtime by the consuming site. `.theme-v2` / `.theme-v2.dark`
carry the v2 palette; today's default (`:root`) is the v1 look. A
consumer's own CSS may key off `.dark` the same way.

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

## Versioning

No semver. `mbu` (and later `scouting-university`) pin `uni-theme` to a
commit via Go's pseudo-version. Every push to `uni-theme`'s `master`
branch opens a PR in each consumer bumping the pin, with the range of new
`uni-theme` commits as the PR body — that changelog, not a version
number, is what a reviewer should read before merging. A bump PR must
re-run `hugo mod vendor`, not just bump `go.mod`/`go.sum` — a stale
`hugo/_vendor` silently builds the old CSS with no error.
