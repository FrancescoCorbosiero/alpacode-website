# Campaign images

Drop image files here to replace the temporary Unsplash photos on the
advertising landing pages (`/offerta/*`). Each file is optimized
automatically by Astro (WebP/AVIF + srcset) at build time.

**Naming** — name the file after the campaign slug (or `ai`):

| File name (any of .jpg/.png/.webp/.avif) | Used on |
|------------------------------------------|---------|
| `social-media-manager.*` | Hero of `/offerta/social-media-manager` |
| `coach-consulenti.*`     | Hero of `/offerta/coach-consulenti` |
| `liberi-professionisti.*`| Hero of `/offerta/liberi-professionisti` |
| `ai.*`                   | AI section (shared on all offer pages) |

Notes:
- Until a matching file exists, the page falls back to the Unsplash
  hotlink defined in `src/data/campaigns.ts` (and to a styled placeholder
  if that fails) — so the build never breaks.
- Recommended hero size: ~1200px on the long edge, landscape or portrait.
- Update the `alt` text in `src/data/campaigns.ts` to match the real photo.
