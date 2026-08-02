---
name: new-landing
description: Mint a new marketing landing page for an ad campaign. Use when asked to create a landing ("nuova landing", "landing per <audience>", "sforna una pagina per…"), add a campaign audience, or clone the SMM/partner landing pattern for a new pitch.
---

# New landing

Read `docs/landing-factory.md` first — it is the complete playbook.
This skill is the operational checklist.

## 1. Pick the track

- The pitch is "we build your website for N €/year" aimed at a new
  audience → **Track A**: add one entry to `CAMPAIGNS` in
  `src/data/campaigns.ts`. That is the whole job.
- The pitch is anything else (product, program, partnership) →
  **Track B**: clone the SMM/Partner pattern (data file + page
  component + scoped stylesheet + IT/EN pages + OG card in
  `tools/og/` rendered to PNG via `npm run og`).

If the user's brief doesn't clearly say which, default to Track A and
say so in the reply.

## 2. Gather from the brief (ask only if truly missing)

- Audience and their current workaround (what they use instead of a
  site today) — this drives hero + pains.
- Price tier (existing: 300/350/450 €). Default 300 € and flag it.
- Slug (kebab-case, Italian).

## 3. Execute

Follow `docs/landing-factory.md` for the track. Non-negotiables:

- IT + EN always.
- Copy in the data layer, never hardcoded in components.
- No invented numbers/stats/promises; "prima vedi, poi paghi" present.
- Track B: one signature interactive element, scoped palette with a
  NEW accent, `body:has()` dark paint, sticky CTA pill, FAQ JSON-LD.

## 4. Verify before pushing

- `npm run check` and `npm run build` pass; new routes exist in
  `dist/client/`.
- Serve `node ./dist/server/entry.mjs` and screenshot desktop (1440)
  + mobile (390) with the pre-installed Playwright chromium.
- Submit the lead form: the server log must show the new `campaign`
  attribution.

## 5. Deliver

Commit with a message following the repo's style ("Campaigns: add …" /
"<Name> landing: …"), push to the working branch, and reply with the
new URLs and screenshots.
