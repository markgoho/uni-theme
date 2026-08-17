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

## Asset path collisions

When a theme-owned asset path (e.g. `assets/css/button.css`) and a
same-path file in the consuming site both exist, **the theme's file wins
silently** — there is no override mechanism. A consumer that needs
badge/site-specific variants must use a **different filename**
(e.g. `button-eagle.css` in `mbu`, concatenated after `button.css` in the
site's own critical-CSS pipeline) rather than shadowing the theme's path.

## Versioning

No semver. `mbu` (and later `scouting-university`) pin `uni-theme` to a
commit via Go's pseudo-version. Every push to `uni-theme` trunk opens a PR
in each consumer bumping the pin, with the range of new `uni-theme`
commits as the PR body — that changelog, not a version number, is what a
reviewer should read before merging.
