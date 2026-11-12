---
version: 1
slug: "assets-css-pages-merit-badge-requirements-css"
primary_target: "assets/css/pages/merit-badge-requirements.css"
related_targets: []
---

# Award pages: overview, requirements, guide (both sites)

Mode: Read. Shared CSS in `assets/css/standard.css` (to be folded into
`assets/css/pages/merit-badge-requirements.css` and siblings); templates live
in the consumers (`mbu/hugo/layouts/merit-badges/`,
`scouting-u/hugo/layouts/scouts-bsa/ranks/`) and the theme's
`layouts/_default/guide.html`.

## Direction contract

THESIS: The category standard, played straight, chosen by the owner for its
simplicity. A plain reference page a Scout already knows how to use. It refuses
novelty: no metaphor, no ornament, nothing to learn before reading.

OWN-WORLD: Olive masthead bar with one gold line; white page head; light gray
ground; flat white tiles with a hairline border and 12px corners; one sans
family in four weights. Olive is for our words (labels, links, current state).
Near-black body text under a green heading is official wording. Dark theme: same
structure on a dark neutral ground with lightened olive.

STORY: The Scout sees which award and page this is, jumps to a requirement,
reads the official words, and opens the guide for that requirement.

FIRST VIEWPORT: Desktop: masthead (site name, theme toggle, search link, one
"Browse" button); a compact white head, identical in shape on every award
page: breadcrumb, title with an accent word, an optional flag beside the title,
and a tab row (Overview, Requirements, Guide). Content starts about a quarter
of the way down. Requirements: a left rail with the numbered jump list, then
the key line, count, date and official links; requirement tiles in one reading
column (46rem), each requirement with a visible Guide link. Guide: page list
on the left, the article in the same reading column, and on screens 1400px and
wider a sticky panel showing the current requirement. Overview: photo, one
sentence, "What you'll do" list, downloads aside. Phone: masthead, head, a
sticky "Jump to a requirement" control, one line of key, tiles full width.
Primary action: the Guide link on each requirement.

FORM: Category standard (the standing exit), taken by the owner in place of the
assigned form (Field guide, position 3 on the ordered list). seed:bfbe3f1a510b8ce7.
Craft bar: BBC Bitesize and Khan Academy.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Owner decisions (2026-11-11)

- The guide article is one white tile, with the official requirement shown as a
  gray box inside it. The owner approved this layout as built ("great let's
  stick with this"). It is the one allowed case of a box inside a tile.
- Page width and reading-column width are the same on Overview, Requirements
  and Guide, so nothing shifts between tabs. The owner asked for this after
  seeing the widths differ; the empty right column on Requirements at wide
  screens is the accepted cost.
- On large screens the guide keeps the current requirement in view in a sticky
  panel beside the article ("this is a UX requirement").
- The head carries no page-specific facts. Counts, dates, the key line and
  "Page N of M" live in the rail or the body.
