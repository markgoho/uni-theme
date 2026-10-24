# Option E — “Night Watch” (key `E`, file `option-e.html`)

**Thesis:** the campfire at night. Dark-first, cinematic, imagery-led; the emblems glow like lanterns. Quiet luxury rather than loud energy: deep forest greens, amber light, warm off-white text.

**Look:** DARK IS THE DEFAULT (mirror the theme-token pattern: dark on `:root`, light under `prefers-color-scheme: light` guarded `:root:not([data-theme="dark"])` and `:root[data-theme="light"]`). Ground: layered near-black greens (not pure black); accent: **lantern amber**; secondary: pale moss. Soft radial glows, blurred emblem backdrops, thin translucent borders (glass-like but subtle; no neon). Light theme = “dawn”: warm pale grey-green paper with the same amber. Type: an elegant high-contrast serif for display (e.g. **Newsreader**, **Cormorant Garamond** or **Playfair Display**) and a soft humanist sans for body (e.g. **Figtree** or **DM Sans**). Body text warm off-white at ≥16px.

**Structural axes**
- Nav model: **floating glass header** that shrinks on scroll; on award/requirements/guide, a **right-hand floating rail** (not left) with the award identity + section links; mobile = bottom tab bar (Overview / Requirements / Guide) that is part of the design, distinct from the prototype bar.
- Modes: a **glowing amber eyebrow** inside the card header (“Do one of the following”) and children as a vertical rail with lit nodes; select-mode children slightly dimmed until hovered (visual only).
- Requirement list form: **cards in a spotlight**: dark raised cards on darker ground; the focused/hovered card lifts and its number node lights amber while siblings dim slightly (CSS `:has()`/hover, reduced-motion safe). Curated titles in the display serif; verbatim text in the body sans, warm off-white; children as a lit rail.
- Guide chrome: **reading mode**: narrow measure (65ch) centred, the requirement quoted in an amber-ruled block, images full-bleed with soft vignette, callouts as glowing-edged panels; guide nav in a right-side collapsible drawer; a thin amber reading-progress line at the top.
- Search grouping: **award panels with emblem lanterns**: each award a dark panel with the emblem (or a lit level roundel on SU) glowing in a circular frame, its hits as rows; `<mark>` as amber underline-glow rather than a yellow box.

**Home:** MBU — full-bleed hero photo with heavy bottom scrim, headline in the serif, the search field glowing; below, the Eagle-required badges as a “constellation” grid of lantern cards; categories as a quiet list with counts. SU — a night sky with the 7 ranks as rising stars along an ascending line (CSS, each a lit card with level and name); the two phases as two sky bands.

**Award page:** emblem large and floating with glow (SU: a large lit level numeral “2 / 7” and the program), facts in a glass card, “what you’ll do” as a lit rail, resources as a row of quiet buttons.
