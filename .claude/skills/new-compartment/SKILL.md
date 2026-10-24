---
name: new-compartment
description: Open a new compartment of Alpacode on its own subdomain — a line of work with its own site, register and way of finding clients, included by the house (alpacode.it). Use when the owner asks for a new subdomain or a new "compartimento" ("nuovo compartimento", "un sottodominio per…", "apriamo <x>.alpacode.it"), or to add a door between the house and a compartment.
---

# New compartment

alpacode.it is the house; a compartment is a line of work on its own
subdomain (studio.alpacode.it is the first: the marketing). Read
`docs/marketing-map.md` (why the house and its compartments are
arranged this way) and `sites/studio/README.md` (the worked example)
first.

## 1. Place it

- What it does, who it's for, how it finds clients (inbound like the
  house, or outbound like the studio), its register and its languages
  (the house is IT + EN; a compartment may be IT only). Ask the owner
  what isn't clear: the name and the subdomain are theirs to choose.
- What the house keeps: pages that speak in the house's voice stay on
  alpacode.it (the referral program moved *into* the house for that).

## 2. Register it

- `shared/data/compartments.ts`: an entry (id, name, tag, origin from
  `PUBLIC_<ID>_ORIGIN`, the line in the house's voice, accent and the
  text on it, langs) and its id in `DOORS`.
- The origin variable: `src/env.d.ts` (and the new site's), the root
  `Dockerfile` (ARG/ENV), `.env.example`.

## 3. Build its site

- `sites/<id>/`: its own Astro project, as `sites/studio/` is (its
  `astro.config.mjs` with the `@shared` alias, `tsconfig.json`,
  `Dockerfile`, `README.md`, `CLAUDE.md`, `src/data/*` holding all the
  copy). Prerendered pages; the Node adapter only if it has API routes.
- Scripts in the root `package.json`: `<id>:dev|check|build|start`.
- CI (`.github/workflows/ci.yml`): its check and build.
- `docker-compose.yml`: a service built from `sites/<id>/Dockerfile`,
  with the caddy labels for its domain (`<ID>_DOMAIN`), its volumes
  and env. **Deploy stays `docker compose up -d --build`**: no profiles,
  no extra steps.
- Motion: the alpacode-motion engine, copied (its `src/engine/`: the
  core, the entries it uses, its own `config.ts` and `registry.ts`).
- The house's signature on every page and a header that leads back to
  alpacode.it; links into the house through `doorTo("house", …)`.

## 4. Open its doors on the house

Wherever the house talks about that work: the mega menu
(`src/data/mega.ts`), `/servizi` (`src/data/services.ts`), the footer's
"Le porte" (`Footer.astro`), the ⌘K palette (`Layout.astro`), the
pages that sell it. Every door goes through `doorTo(id, path, { site:
"house", where })` so the UTMs say where it was taken.

## 5. Verify and record

- `npm run check && npm run build`, `npm run <id>:check && npm run
  <id>:build`; serve both and look (1440, 390, reduced motion); follow
  every door both ways.
- `docs/status.md` (what's built, what you assumed), the marketing map,
  `CLAUDE.md` (the table of sites and the commands).
