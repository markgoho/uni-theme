---
name: uni-theme (Merit Badge University, Scouting University)
description: A plain reference layout for Scouts, with official wording kept visibly apart from the site's own labels.
colors:
  # Light theme (screen). Keys are the public token names in CONTRACT.md.
  accent: "#45653a"
  on-accent: "#ffffff"
  accent-container: "#e9f0e3"
  on-accent-container: "#36502d"
  accent-wash-strong: "#dbe7d2"
  mast: "#45653a"
  mast-ink: "#ffffff"
  gold: "#c9a227"
  amber: "#7a5f00"
  amber-container: "#f6ecc4"
  on-amber-container: "#4f3d00"
  error: "#a3271f"
  error-container: "#fbecea"
  on-error-container: "#1d2420"
  surface: "#f3f4f1"
  surface-raised: "#ffffff"
  surface-sunken: "#e9ece6"
  surface-inverse: "#1d2420"
  on-surface: "#1d2420"
  on-surface-muted: "#4d564f"
  on-surface-inverse: "#ffffff"
  outline: "#c9cec5"
  outline-variant: "#e2e5df"
  # Dark theme (screen). Same tokens, re-valued.
  accent-dark: "#a9cc97"
  on-accent-dark: "#10160f"
  accent-container-dark: "#2a3a26"
  on-accent-container-dark: "#cfe5c3"
  accent-wash-strong-dark: "#344a2e"
  mast-dark: "#263a20"
  mast-ink-dark: "#ffffff"
  gold-dark: "#c9a227"
  amber-dark: "#a9cc97"
  amber-container-dark: "#3a3420"
  on-amber-container-dark: "#ecd98a"
  error-dark: "#f0a39c"
  error-container-dark: "#3a211f"
  on-error-container-dark: "#f1ebe9"
  surface-dark: "#151915"
  surface-raised-dark: "#1f2520"
  surface-sunken-dark: "#262d27"
  surface-inverse-dark: "#e7ebe4"
  on-surface-dark: "#e7ebe4"
  on-surface-muted-dark: "#a8b0a6"
  on-surface-inverse-dark: "#151915"
  outline-dark: "#465047"
  outline-variant-dark: "#2f372f"
typography:
  display:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.875rem, 1.25rem + 2.2vw, 2.75rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: "2rem"
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.625rem"
    fontWeight: 700
    lineHeight: "2rem"
    letterSpacing: "-0.015em"
  subtitle:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: "1.625rem"
  body:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "1.75rem"
  body-small:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  label:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: "1.25rem"
  caption:
    fontFamily: "Figtree, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: "1.375rem"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "0.75rem"
  full: "9999px"
spacing:
  page-gutter: "1.5rem"
  tile-gap: "0.75rem"
  tile-padding: "1.5rem"
  column-gap: "2rem"
  section-gap: "2.25rem"
components:
  masthead:
    backgroundColor: "{colors.mast}"
    textColor: "{colors.mast-ink}"
    height: "3.75rem"
    padding: "0.5rem 1.5rem"
  masthead-button:
    textColor: "{colors.mast-ink}"
    rounded: "{rounded.md}"
    height: "2.75rem"
  page-head:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    padding: "0.875rem 1.5rem 0"
  page-head-flag:
    backgroundColor: "{colors.amber-container}"
    textColor: "{colors.on-amber-container}"
    rounded: "{rounded.full}"
    padding: "0.125rem 0.625rem"
  tab:
    textColor: "{colors.on-surface-muted}"
    height: "2.75rem"
    padding: "0 0.75rem"
  tab-hover:
    textColor: "{colors.on-surface}"
  tab-current:
    textColor: "{colors.on-accent-container}"
  link-tile:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "0.625rem 0.625rem 0.625rem 0.75rem"
    height: "4rem"
  link-tile-icon:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
    rounded: "{rounded.md}"
    size: "2.5rem"
  requirement-tile:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "1.375rem 1.75rem 1.5rem 3.875rem"
  requirement-label:
    textColor: "{colors.accent}"
    typography: "{typography.title}"
  requirement-row-selected:
    backgroundColor: "{colors.accent-container}"
    rounded: "{rounded.md}"
    padding: "0.625rem"
  article-tile:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "2.25rem 2.5rem"
  official-box:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "1rem 1.25rem"
  search-field:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.lg}"
    padding: "0.375rem 0.375rem 0.375rem 1rem"
    width: "40rem"
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.md}"
    height: "2.75rem"
    padding: "0 1.25rem"
  button-primary-hover:
    backgroundColor: "{colors.on-accent-container}"
  jump-item:
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    height: "2.75rem"
    padding: "0.375rem 0.5rem"
  jump-item-hover:
    backgroundColor: "{colors.surface-sunken}"
  jump-item-current:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.on-accent-container}"
  pill:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-accent-container}"
    rounded: "{rounded.full}"
    padding: "0.25rem 0.75rem"
  callout-tip:
    backgroundColor: "{colors.accent-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "1.125rem 1.25rem"
  callout-safety:
    backgroundColor: "{colors.error-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "1.125rem 1.25rem"
  callout-prepared:
    backgroundColor: "{colors.amber-container}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: "1.125rem 1.25rem"
---

# Design System: uni-theme

## Overview

**Creative North Star: "The Category Standard, Played Straight"**

This is the plain reference page a Scout already knows how to use. An olive masthead with one gold line sits over a white page head, and the content follows on a light gray ground in flat white tiles with a hairline border. There is no metaphor and no ornament, and a Scout has nothing to learn before reading. The craft bar is BBC Bitesize and Khan Academy: conventional structure, built carefully.

The system does one job beyond layout. It keeps Scouting America's official wording visibly apart from the site's own words. On a requirements page, green headings are the site's short labels and the near-black text under them is the official text, word for word. In the guide, the official requirement sits in the one gray box inside the article tile. Olive always means "ours": labels, links, and the current item.

The sites are independent of Scouting America and must not look official. The palette is the olive and gold of the Scouts BSA program, never Scouting America's corporate red, white and blue. Light and dark themes share one structure; dark lightens the olive on a dark neutral ground.

**Key Characteristics:**
- One sans family (Figtree) in weights 400 to 800, on a fixed size scale.
- One accent (olive). Gold appears as a single 3px line under the masthead.
- Flat tiles with a 1px hairline and 12px corners, and no shadow.
- One page width and one reading-column width on every page.
- Controls, tabs, rows and tiles are at least 2.75rem (44px) tall.
- The same page head on every page, compact on award pages.

## Colors

A neutral gray-green ground with one olive accent, a single gold line, and two quiet status tints.

### Primary
- **Scout Olive** (`accent`, `mast`): the masthead bar, primary buttons, requirement numbers and labels, the current tab's underline, focus rings, and the hover border on tiles. In dark it lightens (`accent-dark`) and the masthead deepens (`mast-dark`).
- **Deep Olive** (`on-accent-container`): link text, current-item text, breadcrumb links, and the hover fill of primary buttons.
- **Olive Tint** (`accent-container`): icon boxes in link tiles, the selected sub-requirement row, pills, and tip and fact callouts.
- **Olive Highlight** (`accent-wash-strong`): the mark behind a matched search term.

### Secondary
- **Trail Gold** (`gold`): the 3px line under the masthead, focus rings on the masthead (olive does not show on olive), the active masthead link's underline, and the text selection color in dark. It has the same value in both themes.
- **Gold Tint** (`amber-container` with `on-amber-container`): the flag beside a title ("Eagle required"), "be prepared" callouts, and text selection in light.

### Tertiary
- **Safety Red** (`error`, `error-container`): safety callouts only, as the icon and title color on a pale tint.

### Neutral
- **Gray Ground** (`surface`): the page background, the official requirement box in the guide, and the hover fill on rows inside a tile.
- **Tile White** (`surface-raised`): the page head, tiles, the footer, and the search field.
- **Sunken Gray** (`surface-sunken`): the hover fill on rail and jump-list items, and the photo placeholder.
- **Ink** (`on-surface`): body text and official wording.
- **Muted Ink** (`on-surface-muted`): secondary lines, counts, captions, and inactive tabs.
- **Hairline** (`outline-variant`): the tile border and dividers. **Strong Hairline** (`outline`): the search field, the sticky phone controls, and the tile border on hover.

### Named Rules
**The Olive Is Ours Rule.** Olive text is the site's own voice: labels, links, and the current item. Scouting America's wording is never olive.

**The One Gold Line Rule.** Gold is one 3px line under the masthead, plus the focus ring and active underline on that same bar. It is never a heading color or a border on content, and its only fill is the text selection highlight in dark.

**The Not Official Rule.** Never Scouting America's red, white and blue as a color scheme. There is no blue anywhere, and red appears only as the status color on safety callouts, never as a brand color.

**The Amber Follows Olive Rule.** In dark, the `amber` token takes the accent value, because the standard look has one accent. Only the amber container pair stays gold.

Print re-values the tokens to black on white with one dark olive (`#36502d`) for links and labels, and removes every tint.

## Typography

**Display Font:** Figtree (with system-ui, -apple-system, Segoe UI, sans-serif)
**Body Font:** Figtree (the same stack)
**Loading:** self-hosted variable WOFF2, weights 400 to 800, in `static/assets/fonts/` (`@font-face` in `assets/css/typography.css`, latin file preloaded in `layouts/partials/head/critical-css.html`). No third-party font host; the sites' CSP allows `font-src 'self'` only.

**Character:** One friendly geometric sans for everything. Hierarchy comes from weight and size, not from a second family.

### Hierarchy
- **Display** (800, clamp(1.875rem, 1.25rem + 2.2vw, 2.75rem), 1.1, -0.025em): the page title in the page head. The accent word is olive. With a photo beside it on an index page it grows to clamp(2.25rem, 1.5rem + 3vw, 3.25rem).
- **Headline** (800, 1.5rem/2rem, -0.015em): section titles on index pages. Section headings inside a guide article are the same size at 700.
- **Title** (700, 1.625rem/2rem, -0.015em, olive): a requirement's number and its label; 1.375rem/1.75rem on a phone.
- **Subtitle** (700, 1.25rem/1.625rem): rows in the overview's "What you'll do" list and sub-headings in an article. Tile headings on the overview are 1.375rem/1.75rem.
- **Body** (400, 1.125rem/1.75rem): official wording and guide prose, capped at 62ch inside requirement tiles; 1.0625rem/1.625rem on a phone.
- **Body small** (400, 1rem/1.5rem): the sticky requirement panel, excerpts, and card descriptions.
- **Label** (600, 1rem/1.25rem): controls. Rail items are the same size at 500 (700 when current), tabs (1.0625rem, 600, 700 when current), and link-tile names (1.0625rem/1.375rem, 700).
- **Caption** (400, 0.9375rem/1.375rem): breadcrumb, tile meta lines, the key, and figure captions. The smallest text is 0.875rem, used for the flag and pills.

### Named Rules
**The Fixed Scale Rule.** Sizes are fixed rem values. The older fluid scale grew body text to 24px on wide screens and was replaced. Only the page title is fluid.

**The Sentence Case Rule.** No uppercase and no letter-spaced labels. The breadcrumb, rail group titles, footer column titles, block labels and the guide's Previous and Next labels are sentence case with normal tracking.

**The Verbatim Title Rule.** When a requirement has no short label, its official sentence takes the heading slot in body style (400, near-black), so it reads as official text and not as a label.

## Layout

Every page is the masthead, a full-width white page head, then content on the gray ground, then a white footer. Content sits on one page width: `--page-max` is 77.5rem, and 92rem from 87.5rem viewport width up, with a 1.5rem gutter. It is the same on every page so the masthead, title and columns do not shift between tabs. Long-form content stops at one reading width, `--read-max` (46rem): requirement tiles, the guide article, the overview column, search results, and worksheets.

- **Award pages, 60rem and up:** an 18rem left rail and the reading column, 2rem apart. The rail is sticky. On the requirements page it holds the numbered jump list, then the key, count, date and official links. On the guide it holds the list of pages. The overview uses the reading column plus a 20rem aside.
- **Guide, 87.5rem and up:** a third column (15rem to 21rem) holds a sticky panel with the current requirement's official text, which changes as the reader passes each requirement.
- **Phones (below 60rem):** one column. The jump list becomes a sticky "Jump to a requirement" control at the top; a one-line key sits above the first tile; the rail's note and links move after the requirements.
- **Index pages:** the page head holds the title, one lede sentence and a search field up to 40rem wide. Below it are sections of link tiles in an auto-fill grid (17rem minimum column, 0.75rem gap). Sections are 2.25rem apart, and groups inside a section are separated by 1.75rem of space, not by boxes.
- **Short pages** still fill the screen: the main area grows so the footer sits at the bottom.

Other breakpoints: 40rem (tile padding and photo ratio) and 30rem (search field). Requirement tiles respond to their own container at 500px.

### Named Rules
**The Same Head Rule.** The page head on every award page is compact and identical in shape: breadcrumb, title with an accent word, an optional flag beside the title, and tabs. Page-specific facts (count, date, official links, the description) go in the body or the left rail, never in the head.

**The One Measure Rule.** One reading-column width (`--read-max`) on every page and one page width (`--page-max`) across tabs. Nothing sets its own measure.

**The One Photo Rule.** An index page may put one photo beside its title, from 60rem up. Below that the photo is dropped, not stacked, so the search field and the list stay near the top.

**The Logical Properties Rule.** CSS uses logical properties only: `padding-inline-start`, `margin-block-end`, `inline-size`, `inset-block-start`.

## Elevation & Depth

The system is flat. All four elevation tokens are set to `none` in both themes, and depth comes from tone: white tiles on a gray ground, a gray box inside a white tile, and a 1px hairline around each.

Shadow is used only where a control floats over content it does not belong to, and as two flat outlines that are not elevation at all. The exact values are in the sidecar.

- **Sticky phone control:** the "Jump to a requirement" control and the guide's page list carry a short soft shadow below and a solid ground-colored band above, so text does not show through as it scrolls under.
- **Fallback action bar:** in browsers without anchor positioning, the requirement action bar floats at the bottom of the screen with one soft shadow. Where the browser can tether it, the bar sits inside the selected requirement with no shadow.
- **Selected requirement:** an olive border with a 2px olive-tint outline.
- **Current rail item:** an inset 1px hairline.

### Named Rules
**The Flat Tile Rule.** A tile never carries a shadow, at rest or on hover. Only a control floating over scrolling content may.

**The Border Hover Rule.** Hover never lifts and never adds a shadow. A tile changes its border color (hairline to strong hairline on requirement tiles, hairline to olive on link tiles and link-out blocks). A row inside a tile takes a gray fill, a primary button darkens, and a text link gains or thickens its underline.

## Shapes

Three radii. Tiles, the search field, sticky controls, and photos use 12px (`lg`). Controls, rows, icon boxes, callouts, and the official box use 8px (`md`). Focus rings on bare text links round to 4px (`sm`). The flag and pills are fully round, and the jump list's number markers are circles.

Borders are 1px hairlines on all four sides. The search field's border is 1.5px. The only thicker lines are the 3px gold line under the masthead and the 3px underline on the current tab. Icons are line or duotone SVG at 1rem to 1.5rem, drawn in the current text color.

## Components

`CONTRACT.md` is the public class and markup contract for all of these and is not repeated here. The building blocks are partials in `layouts/partials/`.

### Masthead
An olive bar at least 3.75rem tall with the 3px gold line under it. It holds the wordmark (800, 1.25rem), the theme toggle, a search link, and one call-to-action button. Buttons on the bar are outlined in translucent white with 8px corners; hover fills them with translucent white. Focus rings on the bar are gold. On a phone, the menu is a flat white sheet with a hairline border under the bar, with each link a 44px row. A site with no menu links keeps its call to action in the bar and shows no Menu button.

### Page head
A white band with a hairline under it (`page-head.html`). Its parts render in a fixed order: breadcrumb, title, optional flag, lede, search field, actions, photo, tabs. Award pages use breadcrumb, title, flag and tabs only. Index, search and not-found pages use title, lede and search field. On a phone the current page's crumb is hidden visually, because the title repeats it.

### Tabs
Overview, Requirements, Guide (`award-tabs.html`); a tab appears only when its page exists. Tabs are muted text, 44px tall, with a 3px transparent underline. The current tab is deep olive, 700, with an olive underline. The row scrolls sideways if it overflows.

### Buttons
- **Primary:** olive fill, white text, 700, 8px corners, 44px tall (Search, Print). Hover darkens to deep olive.
- **Quiet:** a bordered white button with deep-olive text ("Show more" in search, the tethered Copy and Guide buttons). Hover turns the border olive on "Show more" and fills the tethered buttons with olive tint.
- **On the masthead:** see Masthead.

### Link tile
One row of an index (`link-tile.html`): the whole tile is a link, at least 4rem tall, with a 2.5rem olive-tint icon box (a duotone icon or a step number), a 700 name, one muted line, and a chevron. Hover turns the border and the chevron olive.

### Search field
A white field with a 1.5px strong hairline and 12px corners, holding a search icon, the input (1.125rem), and the primary Search button. Focus turns the border olive and adds the 2px focus ring. When a page head has a search field, the masthead's search link is hidden. Below 30rem the icon is dropped to leave room for the placeholder.

### Requirement tile
A white tile per requirement (`req-card.html`), 0.75rem apart. The olive number hangs in the tile's left gutter like a numbered list, and the olive label sits beside it. The official text follows in near-black. Sub-requirements are plain rows with an olive letter; hover fills the row gray, and the selected row is olive tint. Each requirement with its own guide page ends in a visible Guide link (`req-guide-link.html`): olive underlined text with an arrow, not a button, with a 44px hit area. Selecting a requirement shows Copy and Guide buttons inside it (`req-dock.html`). On a phone the number sits beside the heading and the text runs the full tile width.

### Jump list and rail
A numbered list of requirements in the left rail (`req-jump.html`): each item is a 44px row with a circled number. Hover fills it sunken gray. The current item is white with an inset hairline, deep-olive 700 text, and a filled olive circle. Under it sit the key (`req-key.html`: "Green headings are our short labels...") and the count, date and official links (`req-rail-meta.html`). The guide's page list uses the same rows with a letter or number marker, under muted group titles.

### Guide article tile
One white tile holding the article at the reading width (`guide.html`, `prose-page.html`), with 2.25rem by 2.5rem padding (1rem on a phone). Headings are near-black 700. Inside it:
- **Official requirement box:** a gray box with a hairline and 8px corners holding the requirement number in deep olive and the official text. It is the only gray box in the tile, and the recorded exception to the ban on nested cards.
- **Callouts:** a tinted block with no visible border; color is in the icon and title only (olive for tips and facts, red for safety, gold for "be prepared").
- **Checklists, pictures, video, and links out:** hairline blocks with 8px corners. Places and organizations are rows under a hairline, not cards.
- **The way on:** a hairline, a sentence, one primary link, then Previous and Next with the page's position.

### Overview tiles
The overview shows a photo (21:9, 16:9 on a phone), a one-sentence description, a "What you'll do" tile listing each requirement as a row (`req-preview-list.html`), and an aside tile of downloads and official links (`resources-card.html`).

### Search results
One tile per award with its emblem and name, then one row per matching requirement under a hairline, with the requirement path in olive and the matched term highlighted (`search/page.html`).

### Sticky requirement panel
On wide screens the guide keeps the current requirement in view beside the article: a white tile with a hairline, 8px corners, "Requirement N" in deep olive, and the official text at 1rem/1.5rem.

### Footer
A white band with a hairline above it. It holds the site name and tagline, columns of deep-olive links (44px rows, sentence-case column titles), and a muted bottom line.

### Focus
One ring everywhere: 2px olive, offset 2px. On the masthead the ring is gold.

## Do's and Don'ts

### Do:
- **Do** start every page with `page-head.html`, and keep the award page head to breadcrumb, title, optional flag, and tabs.
- **Do** put page-specific facts in the body or the left rail.
- **Do** cap reading content at `--read-max` and page content at `--page-max`.
- **Do** keep olive for the site's own labels, links and current state, and near-black for official wording.
- **Do** give each requirement that has a guide page a visible Guide link.
- **Do** build home and index pages from a search field plus sections of link tiles, with at most one photo beside the title on wide screens.
- **Do** keep the sticky current-requirement panel on the guide at wide widths.
- **Do** make controls, tabs, rows and tiles at least 2.75rem tall, and show the 2px focus ring.
- **Do** use the public tokens and classes in `CONTRACT.md`; renaming one is a breaking change for both sites.
- **Do** check every change on both sites, in both themes, at phone and desktop widths.
- **Do** write American English, and "Scouting America", never "BSA", for the organization.

### Don't:
- **Don't** put a kicker or eyebrow label above a heading.
- **Don't** use a colored side-stripe border on a tile, callout or row.
- **Don't** nest cards as page structure. The official requirement box inside the guide article tile is the one recorded exception, approved by the owner.
- **Don't** use gradient text.
- **Don't** use emoji as icons.
- **Don't** lift a tile or add a shadow on hover.
- **Don't** add a second accent color, or use gold as a fill on content.
- **Don't** use Scouting America's red, white and blue scheme (no blue; red only on safety callouts), or anything that implies endorsement.
- **Don't** add a second font family.
- **Don't** set labels in uppercase or with letter-spacing.
- **Don't** use physical properties (`padding-left`, `margin-right`, `width`) where a logical one exists.
- **Don't** build a landing-page arrangement on the home page: no carousel, featured cards, "how it works" steps, or category icon cards.

## Open Items

These are not done, and nothing above should be read as saying they are.

- **`standard.css` is an override layer.** `assets/css/standard.css` loads last and wins over `tokens-v2.css`, `header.css`, `footer.css`, `components/*` and `pages/*`. Folding each section into the file it overrides, and deleting the rules it replaced, is pending.
- **Print was checked on screen only**, by forcing the print styles. It has not been checked on paper.
- **No accessibility conformance standard is recorded** (see `PRODUCT.md`).
- **`overflow-x` / `overflow-y` stay physical** in `standard.css` (five rules). `overflow-inline` / `overflow-block` are Baseline newly available (September 2025), not widely available.
- **`.card-surface--wash` still grows its corner wash on hover** (`card-surface.css`). No page renders it, but it is a public class in `CONTRACT.md`, so it was left as is.
