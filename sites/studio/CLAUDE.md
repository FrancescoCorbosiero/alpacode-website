# CLAUDE.md — Alpacode Studio (`sites/studio/`)

studio.alpacode.it, the first compartment of the house (alpacode.it):
the marketing — social and content, brand, UX and the user journey,
campaigns, SEO, strategy — and the do-it-yourself products bought on the
site. Italian only. Read `sites/studio/README.md` (pages, data, buying on
the site, consent, deploy) and `docs/marketing-map.md` (the house and its
compartments, who each speaks to). The repo-level `CLAUDE.md` and
`docs/status.md` still apply.

- Everything that changes is data: `src/data/pages.ts` (hooks, doors,
  meta), `src/data/services.ts`, `src/data/packages.ts`,
  `src/data/products.ts` (prices VAT included, checkout), `src/data/site.ts`.
  Company facts and the compartments come from `shared/`.
- The register is the studio's: young, direct, provocative — and honest.
  The worry named and turned around in the same line; no countdowns,
  invented numbers, results or reach promised ("virale" is a way of
  working, never a guarantee); "gratis" only where true; none of the
  price-reassurance tic; no digs at anyone the studio also works with.
- No DM keywords on the pages: the buttons are a website's (buy, ask,
  book a call); WhatsApp is one way to write among the others.
- Every page ends on the house (`components/House.astro`) or a way to
  write; links into the house go through `house(path, where)`.
- The hero is CSS (above the fold); GSAP only below it. Reduced motion:
  every piece in its end state.
- Verify: `npm run studio:check && npm run studio:build`, then
  `npm run studio:start` (PORT=…) and look at 390×844 first, then 1440;
  post the form once (without `AWS_REGION` the server logs it).
