# tales/

The fandom writes here. A tale is a story about the world, written by somebody
outside it, printed exactly as it was set down.

The wiki has three registers stacked on one page. `record/` is taken whole from
the world's own record and nobody edits it by hand. `lore/` is the keepers'
layer, in-world voice, every sentence naming the file it came from. `tales/` is
this one, and it is yours. The two rules that separate them: a tale is never
edited, and a tale is never mistaken for the record. It prints under its own
label with your handle on it and a link back to where you filed it.

## Where a file goes

```
tales/
├── places/    a tale about somewhere
├── beings/    a tale about someone
├── things/    a tale about an object
└── events/    a tale about something that happened
```

One file per tale: `tales/<kind>/<slug>.md`. The slug is the tale's own name,
not the name of the thing it is about.

## Frontmatter

```yaml
---
slug: the-shape-under-the-anchor-beds        # this tale's own key
title: The Shape Under the Anchor Beds       # how it prints
attaches_to: record/places/drift-margin.niffs-garden   # the page it is about
kind: place                                  # place | being | thing | event
status: fan                                  # fan, unless a keeper wrote it
docket: pending                              # pending, until a keeper numbers it
by: u/yourhandle                             # your handle, however you sign
source: https://www.reddit.com/r/wibwobworld/comments/...   # where you filed it
---

Your tale, in markdown. Headings are yours to choose or leave out.
```

`attaches_to` is the path of the page the tale belongs under, without the
`.html`. It may name a record entry (`record/places/...`, `record/beings/...`)
or one of the hand-written pages (`lore/biomes/...`). If it names something the
wiki does not hold, the tale is not thrown away: it gets a page of its own,
badged *a tale, not yet on the record*, and is listed with the others that are
waiting. A story about a place nobody has written down yet is the reason this
folder exists.

## What a docket is

A docket is the number a keeper gives a tale once they have read it, in the
form `WW-2026-014`. It is the tale's place in the queue and its receipt.

Until a keeper assigns one, write `docket: pending`. A pending tale still
prints, in full, under the thing it is about, with `pending` in the docket
column of the tales front. Nothing waits on the number.

The path a tale takes:

```
  posted with the TALE flair on r/wibwobworld
        │
        ▼
  a file lands under tales/<kind>/       docket: pending
        │
        ▼
  a keeper reads it, assigns a number    docket: WW-2026-014
        │
        ├──▶ prints under whatever it is about, forever
        │
        └──▶ if the strip or a plate adopts it, it is promoted:
             it moves into lore/ and becomes part of the world's
             own account of itself. Your handle travels with it.
```

Promotion is the only thing that ever moves a tale, and it moves it up.

## The two registers

Two kinds of writing live in this wiki and they never blur into each other.

**The chrome is civic paperwork.** Kickers, dockets, notices, forecasts, column
headings: plain, flat, unexcited, the voice of a municipal survey. Nothing in
the chrome is in character and nothing in it mentions the machinery that prints
the paper.

**The tale is a story.** Inside your own file, write in any voice the world
allows. Be strange. The panel around your words stays paperwork so that your
words can be something else.

## Craft

- Keep it short enough to read standing up. Three sentences is a tale.
- Write about a specific place, being, thing or day. A tale attached to
  everything is attached to nothing.
- Contradicting the record is allowed and interesting. Pretending to be the
  record is not.
- No links inside the prose. The source link in the frontmatter carries the
  credit.

The file `places/the-shape-under-the-anchor-beds.md` is a placeholder written by
the keepers so the panel has something to render. It carries `status: example`
and prints with an EXAMPLE badge. Yours carries `status: fan`.

Filing steps are in `../CONTRIBUTING.md`.
