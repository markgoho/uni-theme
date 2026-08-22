# Extract shared presentation/behavior immediately, never build local first

**Status**: accepted

## Context

The requirement-card markup (`.req-card`/`.req-child`) is a case study
in the cost of deferring extraction. `uni-theme` already owned the CSS
and the interactive behavior (`deep-link.ts`) for this system, but the
markup that produces the classes those depend on was hand-maintained
separately in `mbu` and in `scouting-university`, against an unwritten
contract. Two real defects followed directly from that gap:
`scouting-university`'s cards never emitted `data-guide`, so the shared
dock's Study Guide link silently rendered `href=""`; and a curation
change in `scouting-university` (promoting a blank curated label's
requirement text into the heading) collided with `mbu`'s title-echo-
stripping logic in `req-text.html` without either side aware the other
existed.

`scouting-university`'s own ADR trail arrived at the same conclusion
independently: ADR 0005 there set a "build local, converge into
uni-theme only on a named trigger" default; ADR 0006 and ADR 0007 each
show that default failing in practice — building locally first just
meant re-deriving a shape `uni-theme` should have owned from the start;
ADR 0008 formally flips the default to "uni-theme-first, check
CONTRACT.md before building locally."

## Decision

Shared presentation or behavior — anything a second consumer would
otherwise duplicate — gets extracted into `uni-theme` at the point it's
recognized as shared, not deferred behind a "wait for a second
consumer" or "wait for a trigger" threshold. There is no local-first
phase.

Content genuinely bound to one consumer's own data shape — `mbu`'s DRG
guide-page lookups (`req-guide-lookup.html`/`req-guide-fragment.html`,
which use Hugo `Page`/`Fragments` machinery), a group's title-
suppression curation, `subrequirement_mode` → variant/pill mapping —
stays local. That carve-out (content-bound stays local; presentation
and behavior extract) is unchanged; what changes is the timing: the
carve-out decides *what* extracts, not *when*.

## Consequences

A consumer discovering it needs to duplicate a theme-adjacent partial,
CSS rule, or behavior should treat that as the extraction trigger
itself, not as license to build a local copy "for now." This session's
extraction of the requirement-node partials (`req-card.html`,
`req-child-item.html`, `req-children.html`, `req-text.html`,
`req-pill.html`, `text/heading-for.html`, `text/transition-key.html` —
see CONTRACT.md's "Requirement-rendering behavior" section) is the
first case decided this way.
