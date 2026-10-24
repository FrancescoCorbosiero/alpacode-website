# CLAUDE.md — Alpacode FAST (`fast/`)

The social-first sibling of alpacode.it, served at fast.alpacode.it: a
static Astro site of its own, Italian only. Read `fast/README.md` (pages,
data, motion, share cards, deploy) and `docs/marketing-map.md` (why it
exists, the audiences, the DM keywords, FAST's rules). The repo-level
`CLAUDE.md` and `docs/status.md` still apply — the open decisions about
prices, checkout and the Instagram handle are listed there.

- Everything that changes is data: `src/data/doors.ts` (hooks, keywords,
  chat replies, meta), `src/data/products.ts` (prices VAT included,
  contents, checkout links), `src/data/site.ts` (facts, links, handle).
- FAST imports nothing from the studio's `src/`; facts duplicated from
  `src/data/business.ts` must stay in step.
- The register is aggressive but honest: the fear named and turned
  around in the same line; no countdowns, invented numbers or income
  claims; "gratis" only where true; no digs at a group FAST also sells
  to.
- The hero's turn is CSS (above the fold); GSAP only below it
  (`src/lib/motion.ts`). Reduced motion: every piece in its end state.
- Verify: `npm run fast:check && npm run fast:build`, then
  `npm run fast:preview` and look at 390×844 first (that's where it's
  read), then 1440.
