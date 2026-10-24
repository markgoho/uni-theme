# Option F — “Expedition” (key `F`, file `option-f.html`) — BOUNDARY PUSHER

**Thesis:** the page is a journey you scroll through. Scroll-driven storytelling with native CSS: pinned, stacking scenes; a progress rail that fills as you read; elements that enter on their own `view()` timeline; view transitions between pages. Push what modern CSS can do without a single animation library — but every page must still be complete and readable at rest and with reduced motion.

**Look:** earthy expedition palette: slate-green, canvas, **ember red-orange** accent, chalk-white; large photographic moments (the hero photos in `img/`, emblems); generous whitespace between scenes. Type: a characterful variable display face (e.g. **Fraunces** with its SOFT/WONK axes or **Bricolage Grotesque**) paired with a clean sans (e.g. **Instrument Sans**). Use variable-font axes on scroll where it reads (e.g. weight of the big title shifting as it pins).

**Required techniques (with fallbacks):** `animation-timeline: scroll()` and `view()` with `@supports (animation-timeline: scroll())`; `position: sticky` scene stacking; `scroll-snap` for horizontal rails; `document.startViewTransition` (the harness already uses it on page switch — give key elements `view-transition-name`s so the award emblem/title morph between award → requirements → guide); `@property` for animatable gradient angles; `text-wrap: pretty`; container queries. Reduced motion: all scroll animations off, everything visible.

**Structural axes**
- Nav model: **no sidebar**. A slim header that becomes a **sticky expedition HUD** on inner pages (award name · section · progress) after you scroll past the hero; section links live in the HUD. Mobile: same HUD.
- Modes: shown as a **“leg of the journey” header**: “Leg 3 · Choose 1 of 3 routes” style eyebrow, children as route options with a small compass glyph; all-mode children as a numbered descent.
- Requirement list form: **scenes**: each top-level requirement is a full-width scene with a sticky left number panel (sticky within its scene) and the content scrolling past; a right-edge **progress rail** fills with scroll (`scroll()` timeline); children as indented stops. Verbatim text in the body sans; curated titles in the display face.
- Guide chrome: **immersive article**: hero image pinned under the title which scrolls over it; a reading-progress bar in the HUD; images with subtle parallax via `view()` timeline; callouts enter from the side on `view()`; the guide nav is an **inline chapter strip** at the top and a “next leg” card at the end; prev/next as footer.
- Search grouping: **staggered reveal**: results as award panels that fade/slide in on their own `view()` timelines; the query echoed as a big display title; hits as rows.

**Home:** MBU — a scroll story: scene 1 the hero photo with the headline and search; scene 2 “142 badges, 14 fields” as a pinned stat panel with a horizontally scroll-snapping rail of featured + Eagle badges; scene 3 categories entering on view timelines; scene 4 the three steps as a stacked card deck. SU — “The trail to Eagle” as a vertical expedition: 7 pinned scenes, one per rank, each with a sticky level numeral and the rank card scrolling past, the progress rail reaching the summit at Eagle.

**Award page:** cinematic hero (emblem / SU level numeral) that compresses into the HUD on scroll (sticky + `scroll()` timeline shrink), then “the route”: the top-level requirements as a horizontal scroll-snap rail of stops, facts and resources as a two-up panel, a big “Start with Requirement 1” ember CTA.
