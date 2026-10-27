# CLAUDE.md — Alpacode

The house and its compartments, in one repo, for **Soluzioni Digitali
Alpacode** (Monza · Milano, P.IVA 14463350968):

| | Where | What |
| --- | --- | --- |
| **alpacode.it** — the house | `src/` | Astro 5, prerendered pages + Node standalone adapter for the API routes. IT (default, `/`) + EN (`/en/`). Authority and craft: IT consulting, digitalization, automation, sites and e-commerce, custom software, LLM integrations, professional training; the programs (partner, referral); its marketing pages in its own formal voice. People come to it. |
| **studio.alpacode.it** — Alpacode Studio | `sites/studio/` | The first compartment: the marketing (social, brand, UX, campaigns, SEO, strategy). Its own Astro site (Node adapter for the contact form and the checkout webhooks), Italian only, young register, products bought on the site. It goes out to find clients. |

The house includes its compartments: it talks to the same people and
opens their doors where it talks about their work; every compartment
signs as Alpacode and leads back home (`docs/marketing-map.md`). The
registry is `shared/data/compartments.ts`; a new one follows the
`new-compartment` skill. Alpacode FAST (`fast/`) is retired.

**Start every session by reading [`docs/status.md`](docs/status.md)**: what's
done, the open decisions, and the assumptions made without the owner's
confirmation — check those before building on them.

## Working with the owner

- The owner writes in Italian: reply in Italian. Code, comments, commit
  messages and docs in English (the copy itself is Italian first;
  `docs/status.md` is in Italian, the owner reads it).
- They want initiative: when they say "vedi tu", decide, build, and list
  what you decided. They called the current state "un diamante grezzo":
  it's refined over many chats, so record what you assume (in
  `docs/status.md`) instead of silently cementing it.
- **Deploy is `docker compose up -d --build`, and must stay that.** Never
  add profiles, extra flags or extra steps to the boot.
- They react badly to cheap-sounding copy and to generic "AI-template"
  design. Motion should be bold and purposeful (GSAP), never decoration:
  each section gets a move born from its own content (the «guizzo» they
  miss; `docs/motion-direction.md`).
- The house's copy is already good: refine it, don't rewrite it. Don't
  make the house corporate: it's a small studio that knows its craft.
  Keep the mega menu and the alpacas.

## Commands

```sh
npm run dev | check | build | start      # the house (start: node dist/server/entry.mjs)
npm run studio:dev | studio:check | studio:build | studio:start   # Alpacode Studio
npm run og [-- og-name … | studio | work | services]   # share cards: tools/og -> public/ (studio -> sites/studio/public/)
npm run icons | media | hero-video       # favicons, media, the home hero video (needs ffmpeg)
npm run work-shots [-- id …]             # the projects' full-page screenshots, from their url
npm run work-pull [-- id …]              # tools/work/lavori.txt (URL -> keywords): order, drafts, digests, shots
```

Node 22 (as in the Dockerfiles and CI). CI (`.github/workflows/ci.yml`)
runs check + build for both sites. There are no unit tests: verification
is check, build and looking at the pages (below).

## Map of the house (`src/`)

- `pages/` — routes; `pages/en/` mirrors them. `pages/api/contact.ts`
  (lead form → mail through SMTP or AWS SES, `shared/server/mail.ts`; with
  neither it only logs the lead, "NOT SENT"; a filled honeypot or the
  rate limit mails nothing and logs it; the visitor gets the themed
  auto-reply, `shared/server/reply.ts`) and
  `pages/api/referral.ts` (the referral program) are the only on-demand
  routes. `pages/lavori/[slug].astro`: a page per project.
- `data/` — **all copy and content lives here**, typed, `Record<Lang, …>`
  or `{ it, en }`. Components never hardcode copy. Key files:
  `campaigns.ts` (the `/offerta/*` campaigns), `audiences.ts` (the
  audience registry: which page speaks to whom, the "other doors"),
  `landing/*` and `*-landing.ts` (bespoke landings), `service-pages/*`
  (a page per service, `/servizi/<slug>`), `voucher/*`,
  `home.ts`, `services.ts` (`/servizi`), `products.ts`, `courses.ts`,
  `wizard.ts` (the contact page's brief), `mega.ts` (the mega menu),
  `faq.ts` (the FAQ by topic), `chi-siamo.ts`, `work.ts` +
  `places.ts` (the showcase).
- `content/` — the blog (MDX) and the work: one entry per project
  (`content/work/<id>.md`: kind, place, the case in short, its quote
  shown only once confirmed, `draft` until it's written; the body is
  the long case study), in the order of `tools/work/lavori.txt` (the
  owner's "URL -> keywords" lines); screenshots in
  `assets/work/<id>.png` or `.webp`, one per id (`<id>-full.jpg`: the
  whole page, scrolled inside the case page's frame).
- `components/` — `Layout.astro` (head, header, footer), `landing/` (the
  landing kit and its views; `ServiceLanding.astro` and `machines/`, the
  service pages), `voucher/` (the referral program),
  `pages/` (page bodies), `home/`, `BrowserFrame.astro`, `islands/`
  (React).
- Motion: `engine/`, the site's motion engine, written on
  alpacode-motion's contract: `core/` (the page lifecycle, Lenis, the
  header, the guards) and one module per effect in `effects/` (a hook
  and `init(kit)`; its header is its markup API: `data-split`,
  `data-reveal`, `data-rail`, `data-marquee`, `data-mark`, …);
  `config.ts` (the house's classes for the hooks) and `registry.ts`
  (which effects, eager or fetched only where their hook is). The house's scenes are effects too: `effects/cases`,
  `method`, `map`, `alpaca`, `team`, `pane` (light on the glass),
  `lib/landing/scenes.ts` (the landings' scenes, fetched only on
  `.lnd [data-scene]` pages) and `lib/landing/machines.ts` (the service
  pages' machines, `.lnd [data-machine]`). Page scripts import
  the moves they call from their entry (`celebrate`, `nudge`,
  `scrollToTarget` from `core/scroll`, …).
- `styles/` — `tokens.css` (palette, type, the dark theme), `base.css`
  (with `tokens.css`, the glass facade: the field, the mullions, the
  panes), `components.css`, `engine.css` (the engine's CSS: the core's
  and the entries'), `motion.css` (the house's own: the intro's order, the
  hovers), `landing.css` (the landing kit, imported by its views only),
  `voucher.css`, `showcase.css`, page-specific sheets.
- `i18n/` — `ui.ts` (UI strings, meta), `utils.ts` (`localizePath`).

`shared/` — what both sites use: `i18n.ts`, `data/business.ts` (the
company facts), `data/compartments.ts` (`doorTo()`), `server/*` (env,
guard, mail, JSONL). Alpacode Studio (`sites/studio/`): its own
`README.md` and `CLAUDE.md`; everything that changes is in
`sites/studio/src/data/`.

## Docs

| Doc | For |
| --- | --- |
| `docs/status.md` | where things stand, decisions, assumptions to validate (Italian) |
| `docs/marketing-map.md` | the house and its compartments, the audiences, the ladder, the two registers |
| `docs/landing-factory.md` | making a landing: Track A (a campaign entry), B (bespoke on the kit), C (a studio page); the house rules |
| `docs/voucher.md` | the referral program («Segnala un amico», `/voucher`) |
| `docs/motion-direction.md` | the house's motion direction: «corpi rigidi, luce fluida», a brainstorm to decide (Italian) |
| `docs/headless-cms.md` | a plan for a CMS (nothing built) |
| `sites/studio/README.md` | running and changing Alpacode Studio, buying on the site |
| `README.md` | the v3 notes at the top are current; the v2 spec below them is historical where they disagree |
| `docs/history/` | superseded material (the original v2 build prompt) |

Skills: `.claude/skills/new-landing` (any new landing or studio page),
`.claude/skills/new-compartment` (a new subdomain),
`.claude/skills/work-from-url` (a project of the showcase from its
address and keywords), `.claude/skills/handoff` (end of a session:
update `docs/status.md`).

`FrancescoCorbosiero/alpacode-motion`, the motion catalog, is **reference
only**: context for the engine's contract and its rules, read when it's
attached, **never edited** from a session on this repo, never linked or
installed. A new move is born here, in `src/engine/effects/`: its module
(hook, `init(kit)`), its CSS with the reduced-motion end state, its
place in `registry.ts`.

## House rules

- **Copy**: direct, concrete, no hype. Never invent numbers, stats,
  testimonials, deadlines or promises. Banned: the price-reassurance tic
  — "prezzo deciso prima", "niente costi nascosti", "nessuna sorpresa",
  "tutto incluso" and kin (EN "no hidden costs", "no surprises", "price
  agreed up front"). No countdowns, no invented scarcity, no placeholder
  proof (logos, reviews, counts, unconfirmed quotes). No emoji in UI.
- **Two registers**: the provocative one (the worry named and turned
  around) lives on the studio only — never on alpacode.it. No DM
  keywords anywhere: these are websites.
- **alpacode.it is IT + EN**, always both. The studio is Italian.
- **Brand**: Archivo Black (display) + Manrope (text) + Caveat (the
  studio's handwritten notes); the blue `#3B72E9`; paper `#F0F3F9`, ink
  `#0B0E14`. The house has square corners and its landings take its
  blue; it stands on a glass facade (a fixed field of blue light with
  mullions, glass panes: `--field*`, `--glass*`), never a flat cream
  or "editorial" paper; the studio is ink + volt `#D4FF3A`, rounded, a
  colour per door.
- **Motion**: above the fold in CSS (first paint never waits on JS);
  below it GSAP. Nothing hidden by CSS: elements are hidden in JS, at
  init, and only below the fold. Under `prefers-reduced-motion` every
  scene is laid out in its end state. In scrubbed timelines use
  `fromTo`. A pinned stage must fit a phone (390×664). A sticky stage
  needs no `overflow: hidden` above it (use `clip`). A scene's motion
  layout switches on `[data-scene-live]` (set by its script), never on
  `.has-motion` alone.
- **Landings** are data-driven: a campaign is an entry, a page is a
  data file + a view on the kit. Register every landing in
  `src/data/audiences.ts`.

## Verify before pushing

1. `npm run check && npm run build` (and `npm run studio:check && npm
   run studio:build` when `sites/studio/` or `shared/` changed).
2. Serve the builds (`PORT=4401 node dist/server/entry.mjs`;
   `PORT=4402 node sites/studio/dist/server/entry.mjs`) and look:
   Playwright with the pre-installed Chromium (`/opt/pw-browsers/chromium`
   in Claude Code cloud sessions) at 1440×900 and 390×844, pinned scenes
   at 390×664, plus a reduced-motion full-page shot.
3. Forms: submit once; without `AWS_REGION` the server logs the lead
   with its `campaign` attribution.
4. Share cards: re-render only the ones you changed and look at the PNG.

## Git

Work on the branch the session names (`claude/…`). Don't open PRs
unless asked; the owner merges. After a merge, continue from the merged
`main` (fast-forward the branch).
