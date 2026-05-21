# Headless CMS — implementation handoff

Context gathered while planning a headless CMS for this site. Nothing here is
built yet; this is the map for whoever picks it up. The goal: let non-developers
edit content (bilingual IT/EN) without touching the repo.

---

## 1. The key insight — content already goes through a loader seam

Content uses **Astro 5's Content Layer**, which is loader-based. See
`src/content.config.ts`:

```ts
const work = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
  schema: z.object({ order, year, sector, title, descriptor, tags }),
});
```

Every page reads content **only** through `getCollection(...)` — it has no idea
where the bytes come from. Consumers today:

- `src/components/pages/Blog.astro` — `getCollection("blog")`
- `src/components/pages/Lavori.astro` — `getCollection("work")`
- `src/pages/blog/[slug].astro` + `src/pages/en/blog/[slug].astro`
- `src/pages/blog/rss.xml.ts` + `src/pages/en/blog/rss.xml.ts`

**Going headless = swapping the `loader`.** If the loader maps CMS data back
into the existing zod schema, the schema and all consumers stay byte-for-byte
identical. That is the whole "seamless" claim, and it's real.

### Schemas to preserve (the contract)

`localized = z.object({ it: z.string(), en: z.string() })`

- **blog**: `order:number`, `date:localized`, `category:localized`,
  `title:localized`, `descriptor:localized` + Markdown body
- **work**: `order:number`, `year:string`, `sector:localized`,
  `title:localized`, `descriptor:localized`, `tags:string[]` + Markdown body

~14 entries today. A CMS loader must emit objects of exactly this shape
(keep the `{it,en}` pairs).

### Two distinct kinds of content (decide scope!)

1. **Collections** (`blog`, `work`) — Markdown via loaders. The natural,
   low-friction CMS target.
2. **`src/data/*.ts`** — `business, contatti, courses, faq, home, mega, pages,
   services`. These are typed TS objects holding site copy (mega-menu, FAQ,
   services, home sections, contact info, page meta), all bilingual. Moving
   these into a CMS is a *much* bigger job (they're structured + typed + drive
   layout). Recommend leaving them in code initially and only CMS-managing the
   collections.

---

## 2. Deployment environment (already in place)

- `astro.config.mjs`: `output: 'static'` + `@astrojs/node` standalone adapter.
  i18n `it`(default, root) / `en`(`/en`), `prefixDefaultLocale: false`.
- **No `image:` config block yet** — relevant for remote CMS images (see §5).
- Self-hosted VPS, Docker, **caddy-docker-proxy** (TLS + routing via container
  labels — see `docker-compose.yml` and `deploy/umami.docker-compose.yml` for
  the label pattern).
- **Postgres already runs** for Umami (`deploy/umami.docker-compose.yml`) — a
  self-hosted CMS can reuse that DB engine.
- `PUBLIC_*` env vars are build-time inlined (pattern used for cal.com + Umami:
  `.env.example` → Dockerfile `ARG`/`ENV` → compose `build.args`).

---

## 3. Two routes

### Route A — API-based / truly headless (recommended: Directus)

Self-host **Directus** (or Strapi/Payload) in Docker beside Caddy, on the
existing Postgres. Real admin UI, roles, media library, native i18n.

- **Pros**: proper editor UX for non-devs, media management, roles, i18n.
- **Cons**: +1 container + DB tables, you write a loader, and you need a
  publish→rebuild path (§6).

### Route B — Git-based (Sveltia CMS, or Decap)

A `/admin` UI that commits Markdown straight to `src/content/`. **No schema or
loader change at all** — content stays Markdown.

- **Pros**: near-zero infra, content stays in git, cheapest path.
- **Cons**: editors authenticate via an OAuth provider (e.g. GitHub) through a
  small OAuth proxy; less "CMS-grade" for non-technical teams/media.

**Recommendation:** if editors are non-technical and want a media library →
**Directus**. If edits are occasional and done by someone with repo access →
**Sveltia** is dramatically less work. Both are self-hostable on the current
stack.

---

## 4. The loader swap (Route A mechanics)

Custom Content Layer loader sketch — replaces `glob(...)`, keeps `schema`:

```ts
import type { Loader } from "astro/loaders";

function directusCollection(collection: string): Loader {
  return {
    name: `directus:${collection}`,
    load: async ({ store, parseData, generateDigest }) => {
      const url = import.meta.env.DIRECTUS_URL;
      const res = await fetch(`${url}/items/${collection}?fields=*,translations.*`);
      const { data } = await res.json();
      store.clear();
      for (const row of data) {
        const mapped = mapToSchema(row);            // -> { order, title:{it,en}, ... }
        const parsed = await parseData({ id: row.slug, data: mapped });
        store.set({ id: row.slug, data: parsed, digest: generateDigest(parsed) });
      }
    },
  };
}
```

`content.config.ts` then becomes `loader: directusCollection("work")` with the
**same `schema`**. `mapToSchema` collapses the CMS's i18n rows into the
`{it,en}` pairs the schema expects. Markdown body → set as `rendered`/body so
`render()` keeps working on detail pages.

For Route B (Sveltia/Decap): no loader change. You add `public/admin/` (an
`index.html` + `config.yml`) describing the collection fields mapped to the
Markdown frontmatter keys above, plus an OAuth backend.

---

## 5. Images / media

Current pipeline (built this session — see `src/assets/README.md`): drop
`src/assets/work/<entry-id>.jpg`; `astro:assets` optimizes at build (WebP/AVIF +
srcset). Options when adding a CMS:

- **Keep convention**: CMS manages text only; images stay as local files keyed
  by entry id. Simplest; preserves build-time optimization. Good first step.
- **Remote CMS images** (Directus files): fetch URLs from the CMS. To keep
  `astro:assets` optimization you must add to `astro.config.mjs`:
  ```js
  image: { domains: ['cms.alpacode.it'] } // or remotePatterns
  ```
  (No `image` block exists today.) Otherwise serve the CMS URLs directly,
  unoptimized.
- **Git-based**: Sveltia/Decap upload images into a repo folder → same
  build-time optimization, no config change.

---

## 6. Publishing strategy (the real crux)

**Content Layer / `getCollection` resolves at BUILD time** — even in SSR mode,
loaders run during the build, not per request. So with the loader approach:

- **Static (current) + webhook**: CMS publish → webhook → trigger
  `docker compose up -d --build`. Directus has Flows/webhooks; git-based
  triggers on push. Keeps the elegant `getCollection` seam. **Recommended.**
- **Instant updates (no rebuild)**: fetch the CMS API *directly in the page
  frontmatter* under `output: 'server'` (node adapter already present). This
  abandons `getCollection` for that content and adds runtime coupling +
  caching concerns. Only do this if instant publish is a hard requirement.

So: keep the one-loader-swap elegance → accept rebuild-on-publish. Want instant
→ different posture, more rework.

---

## 7. Decisions to lock before building

1. Route A (Directus, real admin) vs Route B (Sveltia, git-based)?
2. Scope: just `blog` + `work`, or also migrate `src/data/*.ts` copy? (Start
   with collections only.)
3. Images: keep local-by-id, or move into the CMS (needs `image.domains`)?
4. Publishing: rebuild-on-publish (recommended) vs SSR instant updates?
5. Who edits, and what auth? (Drives A vs B.)

## 8. First steps when picking it up (Directus route)

1. Add `deploy/cms.docker-compose.yml`: Directus + reuse Postgres, Caddy label
   `cms.alpacode.it` (mirror `deploy/umami.docker-compose.yml`).
2. Model `work` + `blog` collections in Directus with translations matching the
   schema fields in §1.
3. Add `DIRECTUS_URL` (+ token) to `.env.example` / Dockerfile / compose.
4. Write the loader (§4), swap `content.config.ts`, keep schemas.
5. Decide images (§5) and publishing (§6); wire a rebuild webhook.
6. `npx astro check` + build; verify `blog`/`work` render identically.

Tip: migrate **`work` first, leave `blog` on Markdown** — side-by-side proof
that the seam works before committing fully.

---

## Appendix — what already exists in this codebase (session context)

- **Content**: Astro 5 content collections `blog` + `work` (Markdown, bilingual)
  — `src/content.config.ts`.
- **Images**: build-time `astro:assets` pipeline, drop-in by filename —
  `src/assets/README.md`.
- **Analytics**: Umami (self-hosted, cookieless), env-gated + consent-gated —
  `src/components/Analytics.astro`, `deploy/umami.docker-compose.yml`.
- **Consent**: vanilla-cookieconsent banner (bilingual, brutalist, persists
  across View Transitions) — `src/lib/consent.ts`, `src/styles/consent.css`,
  `#cc-root` in `src/components/Layout.astro`.
- **Booking**: cal.com embed, env-gated — `src/components/CalEmbed.astro`.
- **Deploy**: Docker + caddy-docker-proxy; `PUBLIC_*` build-time env pattern in
  `Dockerfile` / `docker-compose.yml` / `.env.example`.
