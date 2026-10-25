---
name: new-landing
description: Mint a new marketing landing page for an ad campaign. Use when asked to create a landing ("nuova landing", "landing per <audience>", "sforna una pagina per…"), add a campaign audience or audience group, build a bespoke pitch page on the landing kit (like /partner, /social-media-manager, /per-chi-fa-siti), or add a page to Alpacode Studio (studio.alpacode.it: a marketing service, a package, a small product bought on the site).
---

# New landing

Read `docs/landing-factory.md` first — it is the complete playbook.
This skill is the operational checklist.

## 1. Place it: audience, then track

- **Audience** — which group in `src/data/audiences.ts` reads it
  (`attivita`, `professionisti`, `segnalatori`, `chi-fa-siti`)? A new
  kind of reader is a new group with an audience-first path and a hub
  (`/per-chi-fa-siti/` is the model). One reader with two profiles is
  the profile switch, not two pages.
- **Track A** — the pitch is "we build your website for N €/year" for a
  new audience: one entry in `CAMPAIGNS` (`src/data/campaigns.ts`).
  That is the whole job.
- **Track B** — anything else (product, program, partnership,
  formula): data file + view on the kit + a CSS block in
  `landing.css` + its scenes + IT/EN pages + OG card.
- **Track C** — the marketing compartment's register (a provocative
  hook turned around in the same line, a package, a small product
  bought on the site): a page on Alpacode Studio (`sites/studio/`,
  studio.alpacode.it), never on alpacode.it. Follow
  `sites/studio/README.md` and the rules in `docs/marketing-map.md`.
  No DM keywords: it's a website.

If the brief doesn't clearly say which, default to Track A and say so
in the reply.

## 2. Gather from the brief (ask only if truly missing)

- Audience and their current workaround (what they use instead of a
  site today) — this drives the hero, the pains and the search scene.
- Price tier (existing: 300/350/450 €). Default 300 € and flag it.
- Slug (kebab-case, Italian).

## 3. Execute

Follow `docs/landing-factory.md` for the track. Non-negotiables:

- IT + EN always; copy in the data layer, never in components.
- Register the page in `LANDINGS` (`data/audiences.ts`) and give it
  portals to its group.
- No invented numbers, stats or promises; "prima vedi, poi paghi" on
  offers. None of the banned price-reassurance phrases, no countdowns,
  no placeholder proof (the list is in the playbook's house rules).
- Track B: the house's blue (the landings speak as the house), at
  least one scene of its own in `lib/landing/scenes.ts`, the full
  chrome (no `minimal`), `landingJsonLd` (FAQ + breadcrumb), OG card
  rendered with `npm run og -- og-<name>`.
- Scenes: `fromTo` in scrubbed timelines, hide only in JS and below
  the fold, every scene laid out in its end state without motion. A
  move that isn't this page's alone is a catalog entry, born in
  alpacode-motion and copied into `src/engine/effects/` (the pen, the
  kinetic band, knoll, bars… already are): look in its `catalog.md`
  before writing one.

## 4. Verify before pushing

- `npm run check` and `npm run build` pass; new routes exist in
  `dist/client/`.
- Serve `node ./dist/server/entry.mjs` and, with the pre-installed
  Playwright chromium, tour the page at 1440 and 390, shoot each pinned
  scene at 390×664 (it must fit), and take the reduced-motion still.
- Submit the lead form: the server log must show the new `campaign`
  and the details.

## 5. Deliver

Commit with a message following the repo's style ("Campaigns: add …" /
"<Name> landing: …"), push to the working branch, and reply with the
new URLs and screenshots.
