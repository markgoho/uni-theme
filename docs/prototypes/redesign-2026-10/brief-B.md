# Option B — “Trailhead” (key `B`, file `option-b.html`)

**Thesis:** the site is a trail map. Every page answers “where am I, where next, how far.” Wayfinding UI borrowed from topographic maps, trailhead kiosks and blaze markers.

**Look:** olive and tan from the Scouting palette as ground, **blaze orange** as the single accent (trail markers), contour-line texture drawn with CSS (repeating radial/conic gradients or an inline SVG pattern, low contrast, never behind body text). Dark theme = night map: deep green-black ground, orange blazes, pale contour lines. Type: a condensed grotesque for labels and headings (e.g. **Barlow Condensed** or **Oswald**) paired with a sturdy readable sans for body (e.g. **Source Sans 3** or **Atkinson Hyperlegible**). Signage conventions: all-caps condensed labels with letter-spacing, arrow glyphs, distances (“10 requirements · 26 guide pages”), legend boxes.

**Structural axes**
- Nav model: **persistent left “trail legend” rail on desktop** (collapses to a bottom sheet on mobile) on award/requirements/guide pages; the header is a slim kiosk bar with site name as a trailhead sign.
- Modes: rendered as **trail-junction signs**: a small signpost block before the children: “DO ALL ↓” / “CHOOSE 1 OF 3 →” with children drawn as forks off a vertical trail line.
- Requirement list form: a **vertical trail**: one continuous line with numbered blaze markers (squares/diamonds like real trail blazes) at each requirement; sections for each top-level requirement; children as side spurs; selected requirement highlighted like “you are here”. Verbatim text is the trail description in body sans; curated title is the condensed caps waypoint name.
- Guide chrome: **mile-marker left gutter** showing the guide’s groups as waypoints with the current one filled; a sticky “you are here” requirement box at the top that condenses on scroll; callouts styled as trail signs (tip = green blaze sign, safety = orange/red warning sign, be-prepared = kiosk board, checklist = kiosk checklist).
- Search grouping: **a legend-style filter rail** on the left (award type, Eagle-required on MBU / rank level on SU — visual only) and results as **map pins**: one pin block per award with its hits listed as waypoints with path markers; MBU emblem as a round pin photo, SU rank as a level roundel.

**Home:** MBU — a full-width illustrated “trail map” hero: the hero photo under a contour overlay, categories plotted as named trailheads (a grid of signposts, each with count), Eagle-required trail called out as the marked “Trail to Eagle” route; search as the kiosk’s big input. SU — the home IS the trail: the 7 ranks as a winding path with blazes (CSS, not a canvas), each rank a trailhead card with distance (requirement count) and 3 sample waypoints; two phases as map regions.

**Award page:** a trailhead kiosk: big sign with award name, a “distance board” (requirements, guide pages, category/Eagle or rank 2 of 7, updated), a “route preview” showing the top-level requirements as a horizontal elevation-style strip, resources as the kiosk’s pamphlet rack.
