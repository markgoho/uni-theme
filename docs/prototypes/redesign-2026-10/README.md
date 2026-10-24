# Site redesign prototype (October 2026)

Throwaway prototype, not production code. Seven complete redesign options for the two uni-theme consumers (mbu and scouting-u). Each option renders the same five pages for both sites from one template and the real site data: landing page, award landing page (merit badge / rank), requirements page, Digital Resource Guide page, search results.

Open `index.html` in a browser. No build step, no server. Each `option-*.html` has a floating bar: pages `1`–`5`, site `S`, theme `D`, hide bar `H`, previous/next option `←` `→`.

## Files

- `index.html` — gallery and side-by-side matrix (`index-body.html` is the same page without the document skeleton, for publishing as a claude.ai artifact; `build-index.py` + `options.json` generate both).
- `option-a.html` … `option-g.html` — one self-contained option each. A–E are the core options, F and G push modern CSS and platform features.
- `data.js` — the real content for both sites, generated from `mbu/hugo/data`, `scouting-u/hugo/data` and the guide front matter (`data-core.json` is the same data as JSON).
- `proto.js`, `proto.css` — the prototype harness: renders `window.OPTION.render[page](site, ctx)` into `#app`, owns the floating bar, routes internal links to mocked pages.
- `img/` — emblems, hero photos and guide images downloaded from ImageKit as webp (the published artifact cannot load external images).
- `BRIEF.md`, `brief-*.md` — the design briefs each option was built from. `shoot-option.js` screenshots an option for review (needs mbu's Playwright install).

## Verdict

Pending. Record the chosen option (or the mix of options) here, then fold the decision into uni-theme and leave this branch as the primary source.
