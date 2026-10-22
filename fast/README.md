# Alpacode FAST — fast.alpacode.it

The studio's social register: small digital products (a site guide, its
marketing module, a crash course for freelancers) sold through DM
keywords, and doors back to alpacode.it for the bigger jobs. Why it
lives apart, who it speaks to and the tone it may use:
[`docs/marketing-map.md`](../docs/marketing-map.md).

Its own Astro site (static, Italian), in this repo for the shared
lockfile and brand fonts. It imports nothing from the studio's `src/`.

```sh
npm run fast:dev        # http://localhost:4321
npm run fast:check
npm run fast:build      # -> fast/dist
npm run fast:preview
```

## Pages

| Path | Door | Keyword |
| --- | --- | --- |
| `/` | the chooser (where the bio link lands) | `FAST` |
| `/sito/` | the site guide, 22 € · + marketing module, 48 € | `SITO` |
| `/ai/` | the crash course · the site built in it, hosted free the first year | `AI` |
| `/code/` · `/bio/` · `/amico/` | three punches, then the studio's page for that audience | `CODE` · `BIO` · `AMICO` |

Every page: the hook that turns the fear around (`components/Turn.astro`,
CSS above the fold), a chat that shows the keyword being answered, the
DM buttons (WhatsApp with the keyword already typed; Instagram once the
handle is set), the bar that follows, the studio's signature and its
door.

## Data — where to change things

- `src/data/doors.ts` — each door's hook, keyword, chooser card, the
  chat's reply (also the suggested auto-reply for the DM automation),
  meta. A new door: an entry here (plus `CHOOSER` / `BRIDGES`), a card
  in `tools/og/fast.mjs`, `npm run og -- fast`.
- `src/data/products.ts` — prices (VAT included), contents (a draft: line
  them up with the real products), checkout links. **No `checkout` = sold
  through the keyword**: the buttons open WhatsApp. Paste a link from a
  merchant of record (Lemon Squeezy, Gumroad, Paddle: they handle EU VAT
  on digital products) and the button becomes "Compra". `COURSE.price`
  and `HOSTING.yearTwo` are `null` until decided: the page then sends
  the keyword and names the yearly fee without a figure.
- `src/data/site.ts` — the studio's facts (in step with
  `src/data/business.ts`), the Instagram handle (empty hides its
  buttons), the links to alpacode.it (UTM-tagged:
  `utm_source=fast&utm_medium=social&utm_campaign=<door>`).

## Motion

`src/lib/motion.ts` (GSAP: rising blocks, the chooser's cards landing,
keywords scrambling on hover, the band leaning with the scroll, the
`/ai` meter pinned and scrubbed) and `src/lib/bar.ts`. Under reduced
motion nothing runs and every piece sits in its end state; the hook
shows the old words struck through next to the new ones.

## Analytics

Umami, cookieless: set `PUBLIC_UMAMI_SRC` and `PUBLIC_UMAMI_FAST_ID` at
build. Events: `dm` (keyword, channel: whatsapp, whatsapp-top,
whatsapp-bar, instagram), `checkout` (keyword or offer).

## Share cards

`tools/og/fast.mjs` → `fast/public/og-fast*.png`:
`npm run og -- fast` (or one card by name). Links travel in DMs and
WhatsApp: check the PNGs before committing.

## Deploy

Its own container (`fast/Dockerfile`: build with Node, serve with Caddy,
`fast/Caddyfile`), behind the same caddy-docker-proxy as the studio,
started only with the `fast` profile:

1. Point `fast.alpacode.it` (or `FAST_DOMAIN`) at the VPS.
2. `docker compose --profile fast up -d --build`

`FAST_DOMAIN` also sets the canonical URLs, the sitemap and
`robots.txt` (build argument `FAST_SITE`).
