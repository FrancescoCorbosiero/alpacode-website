# CLAUDE.md — Alpacode

Two websites in one repo, for **Soluzioni Digitali Alpacode** (web studio,
Monza · Milano, P.IVA 14463350968):

| | Where | What |
| --- | --- | --- |
| **alpacode.it** — the studio | `src/` | Astro 5, prerendered pages + Node standalone adapter for the API routes. IT (default, `/`) + EN (`/en/`). Sells done-for-you sites and software, programs (partner, referral), training for pros. Professional voice. |
| **fast.alpacode.it** — Alpacode FAST | `fast/` | A separate static Astro site, Italian only. The social register: the fear of AI turned around, DM keywords, small digital products (guides, crash courses), doors back to the studio. |

**Start every session by reading [`docs/status.md`](docs/status.md)**: what's
done, the open decisions, and the assumptions made without the owner's
confirmation — check those before building on them.

## Working with the owner

- The owner writes in Italian: reply in Italian. Code, comments, commit
  messages and docs in English (the copy itself is Italian first).
- They want initiative: when they say "vedi tu", decide, build, and list
  what you decided. They called the current state "un diamante grezzo":
  it's refined over many chats, so record what you assume (in
  `docs/status.md`) instead of silently cementing it.
- **Deploy is `docker compose up -d --build`, and must stay that.** Never
  add profiles, extra flags or extra steps to the boot.
- They react badly to cheap-sounding copy and to generic "AI-template"
  design. Motion should be bold and purposeful (GSAP), never decoration.

## Commands

```sh
npm run dev | check | build | start      # the studio (start: node dist/server/entry.mjs)
npm run fast:dev | fast:check | fast:build | fast:preview   # Alpacode FAST
npm run og [-- og-name … | fast]         # share cards: tools/og -> public/, fast cards -> fast/public/
npm run icons | media | hero-video       # favicons, media, the home hero video (needs ffmpeg)
```

Node 22 (as in the Dockerfile and CI). CI (`.github/workflows/ci.yml`)
runs check + build for both sites. There are no unit tests: verification
is check, build and looking at the pages (below).

## Map of the studio (`src/`)

- `pages/` — routes; `pages/en/` mirrors them. `pages/api/contact.ts`
  (lead form → AWS SES, logs the lead when `AWS_REGION` is unset) and
  `pages/api/referral.ts` (the referral program) are the only on-demand
  routes.
- `data/` — **all copy and content lives here**, typed, `Record<Lang, …>`
  or `{ it, en }`. Components never hardcode copy. Key files:
  `campaigns.ts` (the `/offerta/*` campaigns), `audiences.ts` (the
  audience registry: which page speaks to whom, the "other doors"),
  `landing/*` and `*-landing.ts` (bespoke landings), `voucher/*`,
  `business.ts` (company facts), `home.ts`, `products.ts`, `courses.ts`.
- `components/` — `Layout.astro` (head, header, footer; `minimal` chrome
  for landings), `landing/` (the landing kit and its views), `voucher/`
  (the referral program), `pages/` (page bodies), `islands/` (React).
- `lib/motion.ts` — the site's motion engine (GSAP + ScrollTrigger +
  Lenis; its header documents the `data-*` API). `lib/landing/scenes.ts`
  — the landings' scenes (a chunk loaded only on `.lnd` pages).
- `styles/` — `tokens.css` (palette, type, the dark theme), `base.css`,
  `components.css`, `motion.css`, `landing.css` (the landing kit, imported
  by its views only), `voucher.css`, page-specific sheets.
- `i18n/` — `ui.ts` (UI strings, meta), `utils.ts` (`localizePath`).
- `content/` — blog and work collections (MDX).

FAST (`fast/`): `src/data/{doors,products,site}.ts` hold everything that
changes; its own `README.md` and `CLAUDE.md`.

## Docs

| Doc | For |
| --- | --- |
| `docs/status.md` | where things stand, decisions, assumptions to validate |
| `docs/marketing-map.md` | the two sites, the audiences, DM keywords, the value ladder, FAST's rules |
| `docs/landing-factory.md` | making a landing: Track A (a campaign entry), B (bespoke on the kit), C (a FAST door); the house rules |
| `docs/voucher.md` | the referral program («Segnala un amico», `/voucher`) |
| `docs/headless-cms.md` | a plan for a CMS (nothing built) |
| `fast/README.md` | running and changing FAST |
| `README.md` | the v3 notes at the top are current; the v2 spec below them is historical where they disagree |
| `docs/history/` | superseded material (the original v2 build prompt) |

Skills: `.claude/skills/new-landing` (any new landing or FAST door),
`.claude/skills/handoff` (end of a session: update `docs/status.md`).

## House rules

- **Copy**: direct, concrete, no hype. Never invent numbers, stats,
  testimonials, deadlines or promises. Banned: the price-reassurance tic
  — "prezzo deciso prima", "niente costi nascosti", "nessuna sorpresa",
  "tutto incluso" and kin (EN "no hidden costs", "no surprises", "price
  agreed up front"). No countdowns, no invented scarcity, no placeholder
  proof (logos, reviews, counts). No emoji in UI.
- **Two registers**: the aggressive, social one (provocative hooks, the
  fear of AI) lives on FAST only — never on alpacode.it.
- **alpacode.it is IT + EN**, always both. FAST is Italian.
- **Brand**: Archivo Black (display) + Manrope (text) + Caveat (the
  studio's handwritten notes); the blue `#3B72E9`; paper `#F0F3F9`, ink
  `#0B0E14`. The studio has square corners; FAST is ink + volt
  `#D4FF3A`, rounded. Each landing has its own accent (list in
  `docs/landing-factory.md`).
- **Motion**: above the fold in CSS (first paint never waits on JS);
  below it GSAP. Nothing hidden by CSS: elements are hidden in JS, at
  init, and only below the fold. Under `prefers-reduced-motion` every
  scene is laid out in its end state. In scrubbed timelines use
  `fromTo`. A pinned stage must fit a phone (390×664).
- **Landings** are data-driven: a campaign is an entry, a page is a
  data file + a view on the kit. Register every landing in
  `src/data/audiences.ts`.

## Verify before pushing

1. `npm run check && npm run build` (and `npm run fast:check && npm run
   fast:build` when `fast/` changed).
2. Serve the build (`PORT=4401 node dist/server/entry.mjs`;
   `npm run fast:preview`) and look: Playwright with the pre-installed
   Chromium (`/opt/pw-browsers/chromium` in Claude Code cloud sessions)
   at 1440×900 and 390×844, pinned scenes at 390×664, plus a
   reduced-motion full-page shot.
3. Forms: submit once; without `AWS_REGION` the server logs the lead
   with its `campaign` attribution.
4. Share cards: re-render only the ones you changed and look at the PNG.

## Git

Work on the branch the session names (`claude/…`). Don't open PRs
unless asked; the owner merges. After a merge, continue from the merged
`main` (fast-forward the branch).
