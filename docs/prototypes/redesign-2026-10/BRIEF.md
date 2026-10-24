# Site redesign prototype — shared brief

You are designing ONE complete redesign option for two sibling Hugo sites that share a theme (`uni-theme`):

- **Merit Badge University (MBU)** — merit-badge.university. 142 Scouting America merit badges. Award = merit badge (e.g. Camping). Has categories (14) and an Eagle-required subset.
- **Scouting University (Scouting U)** — scouting.university. 7 Scouts BSA ranks, earned in sequence (Scout → Eagle). Award = rank (e.g. Tenderfoot, rank 2 of 7). Ranks have no emblem image yet. Has Field Guides and Leadership sections.

Audience: Scouts age 11–17, their parents, and merit-badge counselors / troop leaders. People come to (1) read the exact official requirement text, (2) understand how to do it (the guide), (3) find a requirement across all awards (search).

The SAME templates render BOTH sites (that is the point of the shared theme). Your option must look native and cohesive on both — flip the site toggle and nothing should look like it was designed for the other site.

## Deliverable

One file: `option-<key>.html` in this folder (the per-option brief gives your key, name and concept). A complete standalone HTML document (`<!doctype html>`, `<html lang="en">`, `<head>`, `<body>`). It must:

1. Load `<link rel="stylesheet" href="proto.css">`, `<script src="data.js"></script>` in `<head>` (plus your Google Fonts `<link>`s).
2. Contain `<div id="app"></div>` in `<body>`.
3. Define `window.OPTION` in an inline `<script>` AFTER `#app`, then load `<script src="proto.js"></script>` as the LAST script. proto.js renders `OPTION.render[page](site, ctx)` into `#app` and draws the floating prototype bar (page tabs, site toggle, theme toggle, prev/next option). Do not restyle `.proto-bar`.
4. Hold all your CSS in one `<style>` in `<head>`; all your JS in that one inline script. No build step. No libraries unless one does substantial work (then a pinned UMD from cdnjs).

```js
window.OPTION = {
  key: 'X', name: 'Name', thesis: 'one line',
  render: {
    home(site, ctx){ return `...full page html...` },
    award(site, ctx){ ... },          // the badge / rank landing page
    requirements(site, ctx){ ... },
    guide(site, ctx){ ... },          // one Digital Resource/Requirements Guide page
    search(site, ctx){ ... },         // results page, query already typed
  },
  mount(ctx, appEl){ /* optional: attach JS behaviour after each render */ }
};
```

`ctx = { page, siteKey: 'mbu'|'su', dark: boolean, site }`. Each render returns the FULL page: header/nav, breadcrumb where appropriate, main content, footer. The harness sets `data-site`, `data-page` and (when forced) `data-theme` on `<html>`. Internal links (`href="/..."`) are intercepted by the harness and routed to the matching mocked page, so link real URLs from the data (award url → award page, requirementsUrl → requirements, guide urls → guide, `/search/` → search, `/` → home). External `https://` links open in a new tab.

## Data (`data.js` → `window.DATA.mbu` and `window.DATA.su`) — all real content

Site: `key, name, short, domain, tagline, awardLabel ("Merit Badge"|"Rank"), awardPlural, guideLabel ("Digital Resource Guide"|"Digital Requirements Guide"), nav[{name,url}], cta{label,href}, footer[{title,links[{label,href}]}], hero{image,alt}, counts, breadcrumbs{award,requirements,guide,search: string[]}`.

MBU only: `categories[{name,count,icon,url}]`, `featured[3]`, `eagle[17]`, `more[12]` (badge cards: `slug,title,category,eagle,reqCount,emblem (img path),url`), `steps[3]`, `counts{badges:142, eagle:13 (Eagle-required categories), eagleBadges:17, categories:14}`.
Scouting U only: `ranks[7]{slug,title,level,description,groups,leafCount,samples[3],url,hasGuide}`, `phases[2]{title,ranks,text}`, `fieldGuides[4]`.

`site.award` (MBU: Camping; SU: Tenderfoot): `title, label, description, reqCount, updated, url, requirementsUrl, guideUrl, guidePrintUrl, guidePages, requirements[], guideNav[{title, items[{path?,marker?,title,url}]}]`. MBU extras: `category, categoryIcon, eagle:true, emblem, officialUrl, pamphletUrl, worksheetUrl`. SU extras: `program, level, totalLevels, prev{title,url}, next{title,url}, groupCount, footerNote (html), footnotes[]`, `emblem: null`.

Requirement node (recursive): `path ("1", "1.a", "4.a"), marker (last segment: "1", "a"), title (curated short label or null), text (verbatim official wording; may be "" for SU group stems and "Do the following:" for MBU stems), textFormat ('html' on SU), mode ({type:'all'}|{type:'select',count:N}|null — how children must be completed), list ({type:'ul',items[]}|null — SU bullet list inside a requirement), children[], resources[{title,url}], guide (url of its guide page or null)`.

`site.guide`: one guide page: `title, kicker, path, url, prev{title,url}, next{title,url}, requirement{number,text}, blocks[]`. Block types: `p{html}`, `h2{text}`, `h3{text}`, `ul{items[html]}`, `ol{items[html]}`, `tip{html}`, `safety{html}`, `be-prepared{title,safety,items[]}`, `checklist{title,subtitle,items[]}`, `image{src,width,height,alt,caption?}`, `video{title,url,channel}` (NO iframe — design a poster card that links out), `external-link{title,url,description}`, `next-page{text,teaser,url,title}`.

`site.search`: `query, total, description, results[{slug,title,emblem|null,url,hits[{path,title|null,excerpt}], ...}]`. Highlight the query term in excerpts with `<mark>`. Append `site.awardLabel` to result titles at render time ("Climbing" → "Climbing Merit Badge").

## Non-negotiable rules

- **Verbatim vs curated.** Requirement `text` is Scouting America's official wording and must appear verbatim and legible at body size. Curated `title`s are ours. Make the two visibly distinct **without a third typeface** (a mono/third font for verbatim text was tried and rejected as "too busy"). Use colour, weight, measure, indentation, a rule, a label, a background — not a font.
- **First-class data, not decoration:** requirement paths (`2.a`), the subrequirement mode (“Do ONE of the following” / all), Eagle-required (MBU), rank level “2 of 7” (SU), resources, SU `list` items and SU `footerNote`. Every one needs a designed home.
- **Both sites.** Render from `site`; never hard-code Camping or Tenderfoot. Where a field is MBU-only or SU-only, branch and design the other site's equivalent (e.g. SU has no emblem — design a typographic/level-based identity; MBU has no prev/next rank).
- **Chrome is in scope.** Header, footer, breadcrumb, search affordance, theme toggle, mobile nav — redesign them to fit your concept.
- **Theme-aware.** Define every colour as a token on `:root` (light), then redefine under `@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){…; color-scheme:dark} }` and `:root[data-theme="dark"]{…; color-scheme:dark}`. Explicit `body{background:var(--…)}`. Design dark properly; do not just invert. (Option E is dark-first: mirror the pattern.)
- **Responsive to 400px** with no horizontal page scroll; side gutter ≥16px; `min-width:0` on text-holding flex/grid children. Mobile nav must work (use `<details>`/`popover` or simple CSS).
- **Modern CSS encouraged**: container queries, `:has()`, logical properties (`padding-inline`, `margin-block-start` — never `padding-left`), `text-wrap: balance/pretty`, `clamp()` type scale, `color-mix()`, oklch, view transitions, scroll-driven animations, `popover`, anchor positioning (with fallbacks). Respect `prefers-reduced-motion`. Visible `:focus-visible`.
- **External resources:** only Google Fonts (`fonts.googleapis.com`) and images from the local `img/` folder. Icons: use **Material Symbols Rounded** via Google Fonts (`<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet">`, then `<span class="ms">campaign</span>` with `.ms{font-family:'Material Symbols Rounded';font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24}`) or inline SVG. No icon fonts from other CDNs, no iframes, no external images.
- **Real content only.** No lorem ipsum, no invented badge names, no made-up statistics or features (no progress tracking, accounts, or checkboxes that imply saved state — these are static sites with no user accounts). Example "Scout" quotes/testimonials are forbidden.
- **Accessibility:** semantic landmarks, one `<h1>` per page, headings in order, `aria-current`, alt text from data, 4.5:1 text contrast in both themes.
- **Avoid the AI-default look** unless your brief asks for it: warm cream + terracotta + serif, purple/blue gradient hero, hairline-rule broadsheet, Inter/Space Grotesk, emoji as markers, everything centered, uniform rounded cards with accent bars. Make choices specific to Scouting (olive/tan/red/gold brand family, outdoor materials, handbook conventions, trail signage, patrol culture) and to your concept.
- **Structure, not palette.** Your per-option brief fixes five structural axes (nav model, how modes read, requirement list form, guide chrome, search grouping). Follow them; they are what makes the options comparable.

## Quality bar and process

1. Read your per-option brief (`brief-<key>.md`), then `data.js` (skim the structure), `proto.js` (the contract), and look at `shots/current/*.png` — screenshots of today's live sites — so you know what you are replacing.
2. Write a short design plan as a comment at the top of your `<style>`: tokens (4–6 colours, 2 font roles), one-line layout concept per page.
3. Build all five pages for both sites. Aim for 900–1800 lines total. Use template helpers (e.g. `header(site)`, `footer(site)`, `reqNode(node, depth)`) to keep both sites on one template.
4. Test: `cd <this folder> && NODE_PATH=/Users/mgoho/github/mbu/node_modules node shoot-option.js option-<key>.html` writes `shots/option-<key>/*.png` (10 light pages, 2 dark, 3 mobile) and prints `HORIZONTAL-OVERFLOW!` or JS `ERRORS` per shot. View every PNG (Read tool) and fix what is broken, clipped, overlapping, unreadable or lazy. Re-shoot once after fixing. Max two full fix rounds; then stop and report.
5. Do not edit `data.js`, `proto.js`, `proto.css`, `shoot-option.js`, or any other option file.
6. Final report (brief, plain prose): the file path, the five structural choices you made per page, any brief item you could not honour and why, and anything still visibly rough.
