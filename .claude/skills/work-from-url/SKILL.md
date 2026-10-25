---
name: work-from-url
description: Add or refresh the projects of the showcase (/lavori, the home's cases, the map) from an address and a few keywords. Use when the owner lists works as "URL -> keywords" ("estrai i contenuti dei lavori", "aggiungi questo lavoro", "questo sito l'abbiamo fatto noi", "metti i lavori in quest'ordine"), gives a client's site to show, or asks to update a case.
---

# A project from its address and its keywords

The owner's brief for a project is one line: its address (or
addresses) and a few keywords — what we built, what changed. Everything
else comes from the site itself.

1. **The list** — `tools/work/lavori.txt`, one line per project, in the
   order of importance the owner gives: `address [address…] -> keywords`;
   a project without an address goes by its entry's name
   (`src/content/work/<id>.md`). Add or move the owner's lines there,
   their words as they are (it's a brief, not copy).
2. **Read the sites** — `npm run work-pull` (or `-- <id> …`): it sets
   every entry's `order` to its line, creates the missing entries as
   drafts, writes a digest of each site (`tools/work/digests/<id>.md`:
   titles, descriptions, menu, headings, text, buttons, footer,
   structured data) and takes its screenshots (`src/assets/work/<id>.png`,
   the first screen, kept when it exists, `--shots` to retake;
   `<id>-full.jpg`, the whole page). It needs the network to reach the
   clients' hosts: if it reports them unreachable, read the environment's
   network documentation (`read_documentation`, environment.network) and
   tell the owner which hosts to allow; meanwhile write from the keywords
   and what the repo already shows (a screenshot already in
   `src/assets/work/` is a source too).
3. **Write the entry** (IT + EN), from the keywords first and the
   digest second:
   - `title` — the brand as the site writes it; `sector` — two or three
     words, lower case; `kind` — `sito`, `ecommerce` or `software` (the
     filters of /lavori); `place` — the client's town from the footer or
     the structured data (a new one goes in `src/data/places.ts`, with
     its coordinates, and `tools/og/work.mjs`); `year` — only if known.
     Unknown, leave `place` or `year` out: the pages skip them.
   - `descriptor` — one sentence: what we built, for whom, the pieces.
   - `tags` — three: the pieces of the work, not adjectives.
   - `url` — the main address; `also` — the others, with a label (a B2B
     catalogue, a portal).
   - `case` (problem, what we did, before and after) — only when the
     keywords or the owner say what the problem was and what changed.
     Before and after are words ("Offline" → "Su Google"), a number only
     if the owner gave it.
   - `featured` — the home tells three cases: the first three of the
     list that have a `case`.
   - `quote` — never written by us: a quote stays out, or stays a
     placeholder with `quoteConfirmed: false` (it doesn't show).
   - The body (the long case study) is the owner's: leave it empty
     unless they wrote it.
   - Then remove `draft: true`.
4. **The house's rules** (`CLAUDE.md`): direct, concrete, no hype; never
   invented numbers, results or quotes; none of the price-reassurance
   tic ("tutto incluso" and kin, even when it's the owner's keyword —
   name the pieces instead); no prices on alpacode.it. The client's own
   claims on their site (years, counts, stars) are theirs, not ours to
   repeat.
5. **Share cards** — `npm run og -- work` (look at the new PNGs).
6. **Verify** — `npm run check && npm run build`; serve it and look at
   `/lavori/`, the case pages (IT and EN), the home's cases and the map,
   at 1440×900 and 390×844. Record in `docs/status.md` what you assumed
   (a brand's spelling, a sector, a place) for the owner to confirm.
