# lore/

The hand-written layer of the wiki. The record namespace is taken whole from the
world's own record; everything in here was written by a person, in a file, and
every sentence names the file it came from.

One document per node, foldered by kind:

```
lore/
├── biomes/    a place written up with its weather, sound, flora, fauna
├── places/    one file per row of LOCATIONS.md
├── beings/    a being the character folder does not already cover
├── things/    an object, and the physics it runs on
└── history/   the dated chronicle
```

Frontmatter:

```yaml
---
slug: drift-margin                       # must match the tail of attaches_to
attaches_to: record/places/drift-margin  # or `none` when nothing on the record matches
kind: biome                              # biome | place | being | thing | history | physics
sources: [LOCATIONS.md, characters/niff.md]
status: canon                            # canon | draft | not-on-the-record
written_by: hand                         # hand | mixed | script
face: the-wastelands                     # optional, only useful when attaches_to is none
title: The Drift Margin                  # optional display name
---
```

Headings are fixed. The first four map onto the four zones of an entry; the rest
are the field notes and only a biome normally carries them.

| heading | holds |
|---|---|
| `## What it is` | the description a reader wants first |
| `## Where` | position in the world, neighbours, how you arrive |
| `## When` | history, dates, cycles, what recurs |
| `## With` | relations stated in the files, one line each, cited |
| `## Weather` `## Sound` `## Flora` `## Fauna` `## Altitude` `## Season` | the field notes |
| `## Who lives here` | one being per line, `Name: note`, drawn as the cast strip |
| `## Field notes` | the physics of a thing, drawn as a box at the top of its page |
| `## Seam` | what is written here that the world has no row for |

**Every line cites the file it came from, inline, in brackets.** A lore file is a
compilation of what the corpus already says. New invention goes through the world
lane and becomes a row; it does not enter here as an unsourced sentence.

A biome file is what fills the six field notes at the top of a face page and of
any place holding other places, and the first clause of its `## Weather` and
`## Sound` is what the front page's forecast reads for that region.

A file with `attaches_to: none` gets a page of its own carrying a "not yet on the
record" badge, and is listed on the seams page. A file naming a record path that
does not exist stops the survey, so a typo can never quietly vanish.

Character files in the heartbeat's `characters/` folder are read where they
stand and are never copied here.
