# Images — where to drop files

Just add image files here; the code already wires them in. Accepted formats:
`.jpg .jpeg .png .webp .avif`.

## `work/` — Lavori gallery (optimized)

Name each file after the work entry (the Markdown filename in
`src/content/work/`). Drop it in and it's auto-optimized (WebP/AVIF +
responsive `srcset`); the placeholder disappears.

| File to add                          | Card |
|--------------------------------------|------|
| `work/studio-legale.jpg`             | Studio legale · area clienti |
| `work/configuratore-b2b.jpg`         | Configuratore B2B |
| `work/piattaforma-corsi.jpg`         | Piattaforma corsi & community |
| `work/ecommerce-torrefazione.jpg`    | E-commerce torrefazione |
| `work/museo-civico.jpg`              | Sito museo civico |
| `work/dashboard-analytics.jpg`       | Dashboard analytics |

## `blog/` — Blog cover images (optional, optimized)

Drop a cover image anywhere under `src/assets/blog/` and reference it from the
post's frontmatter:

```yaml
cover: ../../assets/blog/my-post-cover.jpg
coverAlt:
  it: "Descrizione dell'immagine"
  en: "Image description"
```

The cover renders large under the article hero and is auto-used as the
`og:image` for that post (better social sharing than the default logo).
Omit the field and the post falls back to the standard logo OG.

## `cases/` — home §02 case picker

Name files by position: `cases/1.jpg`, `cases/2.jpg`, `cases/3.jpg` — matching
the §02 tabs in order (one file works for both IT and EN). These render in an
interactive component, so they are **not** auto-resized: export them
web-sized (~1200px wide).

## Brand / utility files → `public/`

Favicon, OG share images, PDFs, etc. go in `public/` and are served at the
root (e.g. `public/logo.png` → `/logo.png`). Not optimized — used as-is.
