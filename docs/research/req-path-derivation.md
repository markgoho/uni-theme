# Requirement-path derivation across mbu and scouting-u

Resolves [uni-theme#7](https://github.com/markgoho/uni-theme/issues/7).
Feeds [#12](https://github.com/markgoho/uni-theme/issues/12), which titles each
search sub-panel "«path» «title»".

**Verdict: the shapes are compatible.** scouting-u's paths (`N`, `N.a`) are a
strict subset of mbu's. Shared search.ts can always derive a display prefix
from a Pagefind sub-result anchor fragment with one rule. The only shapes that
need a display decision are mbu's option slugs (`4.option2`, `6.beef-cattle`),
and those are recognizable by pattern. No template change is required on
either site; two mbu data cleanups would shrink the odd cases.

## 1. Where each site's path comes from

### mbu (nested DRG data)

- Data: `/Users/mgoho/Github/mbu/hugo/data/merit-badges/*.json`. Every
  requirement node stores `req_id` and `path` literally in the data
  (`static/schemas/merit-badge.schema.json` requires both, `minLength: 1`).
- Generation: `scripts/sync-requirements-hybrid.ts` —
  `computePath(parentPath, reqId)` returns
  `parentPath ? `${parentPath}.${reqId}` : reqId`. So `path` is the
  dot-join of `req_id` segments from the root down. Named options get a
  slug `req_id` from `slugifyOption()` (`option1`…`option8`, `beef-cattle`,
  `recurve-bow-or-longbow`, …).
- Anchor emission: the heading always carries `id="{{ $req.path }}"` —
  `layouts/partials/merit-badges/req-card.html` line 118 (depth-1 `<h3>`) and
  `req-child-item.html` lines 127 and 146 (`<h4>`, all three variants:
  chips, rail, options). The `<li>` carries the same value as
  `data-anchor` for deep-link.ts.

### scouting-u (flat two-depth rank data)

- Data: `/Users/mgoho/Github/scouting-u/hugo/data/ranks/scouts-bsa/*.json`
  (7 ranks). Nodes store `req_id`, `path`, `list_number`; children sit in
  `children`, never deeper than depth 2.
- Generation: `scripts/sync-ranks-api.ts` parses the API's `listNumber`
  with `LIST_NUMBER_PATTERN = /^(\d+)([a-z]?)\.?$/i` into a digit stem and
  an optional single letter, lowercases the letter, and uses the same
  dot-join `computePath`. The pattern makes any other shape impossible: a
  nonconforming `listNumber` throws.
- Anchor emission: `layouts/partials/scouts-bsa/ranks/requirement-node.html`
  — `id="{{ $req.path }}"` on the depth-1 `<h3>` (line 91) and the depth-2
  `<h4>` (line 116); `data-anchor` on the `<li>`, same as mbu.

Both sites verified: `path` is unique within every page (no duplicate
anchors in any badge or rank data file).

## 2. Complete path-shape inventory

Segment alphabet notation: `N` = digits, `a` = lowercase letters
(includes roman numerals), `A` = uppercase letter, `SLUG` = hyphenated or
word-like id.

### scouting-u (174 nodes total)

| Shape | Count | Example |
|---|---|---|
| `N` | 66 | `1` |
| `N.a` | 108 | `1.a` |

That is the entire corpus. Digits and one lowercase letter, nothing else.

### mbu (4,546 nodes total)

Token-only shapes (4,467 nodes, 98.3%):

| Shape | Count | Example |
|---|---|---|
| `N` | 1,115 | `1` |
| `N.a` | 2,470 | `1.a` |
| `N.a.N` | 589 | `1.a.1` |
| `N.a.N.a` | 154 | `5.g.2.a` (athletics) |
| `N.a.a` | 57 | `2.a.a` (rifle-shooting) |
| `N.a.N.a.N` | 49 | `8.a.5.a.1` (plant-science) |
| `N.a.a.N` | 14 | `6.b.i.1` (citizenship-in-society) |
| `N.a.N.a.N.a` | 5 | `8.c.6.b.3.a` (plant-science, max depth 6) |
| `N.A` / `N.A.a` | 25 | `2.A`, `2.B.a` (shotgun-shooting only — the one uppercase case) |

Token notes: digit segments go up to `21` (multi-digit continuations of
lettered lists); letter segments are almost all one char, plus roman
`i`/`ii` in citizenship-in-society `6.b.i` / `6.b.ii`.

Slug shapes (79 nodes across 7 badges; slugs and their descendants):

| Slug segment | Paths | Badge |
|---|---|---|
| `option1`…`option8` | `4.optionN`, `9.optionN`, `6.option3`, `11.option3`, `11.option4` | american-business, pioneering, citizenship-in-society |
| `beef-cattle`, `dairy`, `horse`, `sheep-or-goat`, `hog`, `avian` | `6.<slug>` + children `6.<slug>.a` … | animal-science |
| `recurve-bow-or-longbow`, `compound-bow` | `5.<slug>` + `5.<slug>.f.1.a` … | archery |
| two 99-char slugs (`option-a-visit-two-of-the-following-…`) | `4.<slug>`, `4.<slug>.a` … | disabilities-awareness (data bug, see §4) |

Character set across both sites: `[0-9A-Za-z.-]`. Every path starts with a
digit segment. All characters are URL-fragment-safe — no percent-encoding
ever appears, so `decodeURIComponent` is a harmless no-op.

## 3. Derivation rule for shared search.ts

Pagefind sub-results anchor on the heading ids (both sites already place
`id` on a real `h3`/`h4`, the Route A requirement). Given a sub-result URL
fragment `F`:

1. `const path = decodeURIComponent(F)` (defensive; no-op today).
2. Recognize a requirement path with
   `/^\d+(\.[0-9A-Za-z][0-9A-Za-z-]*)*$/`. The leading-digit test cleanly
   separates requirement anchors from any other heading id on the page
   (Hugo's auto-ids for prose headings are word slugs like `resources`).
   A non-match renders the sub-panel with no prefix.
3. Display prefix:
   - Every segment that is digits or 1–4 letters renders verbatim, joined
     with `.` — covers 100% of scouting-u and 98.3% of mbu:
     `2.a`, `5.g.2.a`, `6.b.ii`, `2.A`.
   - A segment matching `/^option(\d+)$/` renders as `Option $1`:
     `4.option2` → `4 · Option 2` (separator per #12's prototype taste;
     the point is it must not render as a dotted token).
   - Any other slug segment renders as title-cased words
     (hyphens → spaces): `6.beef-cattle.a` → `6 · Beef Cattle · a`.
     Truncate slugs longer than ~30 chars with an ellipsis so the two
     disabilities-awareness 99-char slugs cannot wreck the panel title.

This mirrors what the pages themselves already do: mbu's
`req-child-item.html` renders token ids as list markers (`a.`) and slug
ids "bare … since they read as words".

## 4. Minimal alignment proposal

Nothing blocks shared code today — the display rule above covers every
shape that exists. But three mbu data cleanups would shrink the odd space
(anchor ids change, so inbound deep links to those few requirements would
break; all are low-traffic subrequirements):

1. **disabilities-awareness 99-char slugs → `a` / `b`.** The texts are
   "Option A—…" / "Option B—…"; `slugifyOption()`'s own special case
   (letter extraction for "Option A/B") now produces the letter, so a
   resync fixes it. This is the only truly pathological shape.
2. **citizenship-in-society `6.option3`, `11.option3`, `11.option4`.**
   Their texts begin with a stray letter marker ("c Discuss…",
   "d Give…") — these are lettered items mis-extracted as options, and
   their siblings `6.b.i`/`6.b.ii` show the same group rendered the other
   way. A re-extraction should yield letter ids.
3. **shotgun-shooting `2.A` / `2.B` → lowercase** (optional), making
   "letters are lowercase" a site invariant, matching scouting-u's parser
   which lowercases on ingest.

If a shared grammar is ever documented (e.g. in the shared schema), the
contract both sites already satisfy is:

```
path     = digits *( "." segment )
segment  = digits | 1*4ALPHA | "option" digits | word-slug (≤30 chars)
```

with paths unique per page and always emitted as the `id` of the
requirement's own `h3`/`h4`.

## Sources

- mbu: `hugo/layouts/partials/merit-badges/req-card.html`,
  `req-child-item.html`, `req-children.html`;
  `hugo/data/merit-badges/*.json` (all 4,546 nodes enumerated);
  `hugo/static/schemas/merit-badge.schema.json`;
  `scripts/sync-requirements-hybrid.ts` (`computePath`, `slugifyOption`).
- scouting-u: `hugo/layouts/partials/scouts-bsa/ranks/requirement-node.html`;
  `hugo/data/ranks/scouts-bsa/*.json` (all 174 nodes enumerated);
  `scripts/sync-ranks-api.ts` (`LIST_NUMBER_PATTERN`, `parseListNumber`);
  `docs/research/pagefind-requirement-results.md` (heading-id requirement).
- uni-theme: `assets/ts/search.ts` (current state: no prefix derivation yet).
