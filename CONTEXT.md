# Uni Theme

Shared Hugo theme for Scouting requirement sites (mbu, scouting-u). Consumers pull it as a Hugo module so search, layout, and styling change in one place.

## Language

**Award**:
The unit a site groups requirements under. A merit badge (mbu) and a rank (scouting-u) are both awards.
_Avoid_: Badge, rank, program, guide (when the generic concept is meant)

**Award Label**:
The site-configured suffix appended to an award name at render time, e.g. "Merit Badge" or "Rank". Never part of the indexed title.

**Requirement**:
One numbered task under an award. The same concept on both sites.

**Requirement Path**:
The dotted identifier of a requirement within its award, e.g. `2.a`, `4.option2`. It is the anchor id on the requirement's heading.
_Avoid_: Requirement number (ambiguous with the leading integer alone)

**Emblem**:
The image that represents an award in search results and hero layouts. Read from Pagefind's `image` metadata; a site-configured placeholder fills the slot when absent.
