# Product

<!-- impeccable:product-schema 1 -->

One record for both consumer sites. `uni-theme` holds the tokens, the shared
stylesheets and the shared partials. Each consumer also keeps a small amount of
content-bound CSS and layouts of its own (scouting-u ADRs 0005 and 0006;
`CONTRACT.md` lists what stays consumer-local).

Out of scope: mbu's Event Platform (`../mbu/app`, `../mbu/api`), a separate
SvelteKit product that does not use this theme.

## Platform

web

## Users

Scouts, aged 11 to 17, working on a merit badge or a rank themselves. They come to
find out exactly what a requirement asks and to prepare for it.

When needs conflict, the Scout wins. Parents, adult leaders and merit badge
counselors are not a confirmed audience.

## Product Purpose

Two sibling sites present Scouting America's official requirements in a form a
Scout can read and act on:

- **Merit Badge University** (merit-badge.university) covers every merit badge.
- **Scouting University** (scouting.university) covers Scouts BSA ranks.

Success is a Scout finding the right requirement, understanding what it asks, and
knowing what to do next.

## Positioning

_Drafted from the three `CONTEXT.md` files, not yet confirmed by the owner._

The official requirement text, kept verbatim and in sync with Scouting America's
sources, with a deep-linkable address for every single requirement and a
human-written Digital Resource Guide beside it. The guide supplements the
official text and never overrides it.

## Operating Context

- Used evenly in two situations, and neither may be degraded for the other:
  - a quick lookup of one requirement on a phone, at a meeting or on an outing;
  - a long reading session on a laptop or desktop at home, working through a
    Digital Resource Guide.
- Five page types carry the product: site landing, award landing, requirements,
  Digital Resource Guide page, and search.
- The two sites link to each other: rank pages link to merit badges, and guide
  links can target either site.
- Digital Resource Guides have a print stylesheet
  (`assets/css/pages/drg-print.css`). How often they are printed is not known.

## Capabilities and Constraints

- **Shared theme.** Both sites pull `uni-theme` as a Hugo module. A change here
  ships to both, so every change is checked on both.
- **Consumer contract.** `CONTRACT.md` lists the public semantic tokens,
  component classes and partials. Renaming any of them is a breaking change.
- **Vocabulary.** `CONTEXT.md` is binding: Award, Award Label, Requirement,
  Requirement Path, Emblem. The organisation is "Scouting America", never "BSA"
  (scouting-u ADR 0013). The programme name "Scouts BSA" is official and stays.
- **Official wording is not ours to edit.** Requirement text is rendered as
  published. Short Labels on scouting-u and all guide prose are the project's
  own writing and must not be presented as official.
- **Search.** Pagefind. Results group by award, with one tile per matching
  requirement (uni-theme ADR 0001).
- **Deep links.** Every requirement heading carries its Requirement Path as an
  anchor.
- **Light and dark themes**, switched by the visitor.
- **Machine-readable twins.** Markdown variants of pages, `llms.txt`, and agent
  discovery files are part of the product.
- **Static sites today.** The two Hugo sites have no accounts and keep no
  record of what a Scout has completed.

## Brand Commitments

- **Independent of Scouting America, and must not look official.** The design
  never imitates Scouting America's identity or implies endorsement. Official
  wording is shown verbatim and attributed. In colour, "official" means
  Scouting America's corporate red, white and blue: never use that family.
- **Olive and gold stay.** They are the colours of the Scouts BSA programme
  and the sites keep them on purpose (owner, 2026-11-11).
- **Familiar over novel.** The owner chose the category standard in the
  2026-11 direction round. Craft bar: BBC Bitesize and Khan Academy.
- **Names.** "Merit Badge University", short form "MBU"; "Scouting University",
  short form "Scouting U".
- **Taglines in use.** "Your comprehensive resource for Scouting America merit
  badges." and "Your guide to Scouting America rank requirements."
- _Unconfirmed:_ that the two sites should read as one family, differing only
  by award type. The shared theme implies it; the owner has not said it.

## Evidence on Hand

- Real content for every page type lives in the consumer repos: `../mbu/hugo`
  (every merit badge, each with a Digital Resource Guide) and
  `../scouting-u/hugo` (Scouts BSA ranks).
- `exampleSite/` is a build fixture. It has no real awards and is not a design
  reference.
- Award emblems come from site content; a site-configured placeholder fills the
  slot when one is missing.
- There are no testimonials, usage figures, endorsements or partner logos.
  Future work must not invent any.

## Product Principles

1. **The Scout is the reader.** Write and structure for an 11-to-17-year-old
   doing the work, not for an adult supervising it.
2. **Simplicity at its heart.** The readers are children. Every page does one
   plain thing, with few elements, nothing to learn before reading, and no
   cleverness that costs a Scout a second of understanding.
3. **Official text is sacred, and visibly distinct from ours.** A Scout must
   always be able to tell what Scouting America requires from what the site
   adds.
4. **Every requirement is a destination.** Lookup, linking and search all
   resolve to one requirement, not just to a page.
5. **Phone lookup and long reading are equals.** A design that serves one at the
   other's expense is wrong.
6. **Independent and honest about it.** Useful because it is clearer than the
   official source, never because it passes for it.

## Accessibility & Inclusion

Open decision: no conformance standard is recorded in any of the three repos.
