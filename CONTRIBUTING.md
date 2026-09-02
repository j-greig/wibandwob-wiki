# Contributing to WIBWOBWIKI

The wiki has three namespaces, and where a page lives says who may write it.

| namespace | who writes | how |
|---|---|---|
| `site/record/` (and the map, the changes bulletin, the front) | nobody, by hand | generated from Wibwobworld's record on every survey and overwritten; edit the record, never the page |
| `lore/` | Wib&Wob and the keepers | hand-written, in-world voice, one file per subject with frontmatter |
| `tales/` | you | the fandom's pages; intake is r/wibwobworld with the TALE flair, then a docket |

## Filing a tale

1. Post it on [r/wibwobworld](https://www.reddit.com/r/wibwobworld/) with the TALE flair. That is
   the intake. You may also open a pull request adding the file yourself.
2. One tale is one markdown file at `tales/<kind>/<slug>.md`, where `<kind>` is `places`,
   `beings`, `things` or `events` and `<slug>` is the tale's own name, not the name of the thing
   it is about.
3. The frontmatter is seven lines and all of them are required:

   ```yaml
   ---
   slug: the-shape-under-the-anchor-beds
   title: The Shape Under the Anchor Beds
   attaches_to: record/places/drift-margin.niffs-garden
   kind: place
   status: fan
   docket: pending
   by: u/yourhandle
   source: https://www.reddit.com/r/wibwobworld/comments/...
   ---
   ```

   `attaches_to` is the path of the page your tale belongs under, with no `.html` on the end. It
   may name a record entry or one of the hand-written pages in `lore/`. `status` is `fan` for
   anything written from outside; `example` is reserved for the keepers' placeholder.
4. **A docket is the number a keeper gives a tale once they have read it**, in the form
   `WW-2026-014`. Write `docket: pending` and leave it. A pending tale prints in full from the day
   it arrives, under whatever it is about, with `pending` in the docket column of the tales front;
   the number is a receipt, never a gate. Tales still waiting for one are listed on the seams page
   under "Tales waiting on a docket".
5. A tale whose `attaches_to` names something the wiki does not hold is never dropped. It gets a
   page of its own badged *a tale, not yet on the record*, and waits there in the open.
6. **Promotion** is what happens when the strip or a plate adopts a tale: the file moves from
   `tales/` into `lore/`, gains its citations, and becomes part of the world's own account of
   itself. Your handle travels with it. Promotion is the only thing that ever moves a tale.
7. Your prose is quoted, never edited. A keeper may decline a tale, or ask you to change it, and
   will say so; nobody rewrites it silently.
8. Nothing in `site/record/` is edited by hand. A pull request that touches it is closed with
   thanks.

Format, folders and craft notes in full: `tales/README.md`.

## Two registers

The chrome is civic paperwork: kickers, dockets, notices, forecasts, column headings. It is flat,
plain and never in character. Lore and tales may speak in any voice the world allows. Neither
mentions the machinery that prints the paper.

## Credit

Joan Stark's pieces are credited in the caption beside the work, never inside the drawing. The
`jgs` signature inside her pieces stays. Finished Wib&Wob plates carry `wib&wob` once, low right.
