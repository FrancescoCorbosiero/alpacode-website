# Alpacode Studio — studio.alpacode.it

The house's marketing compartment. alpacode.it is the house: it speaks
for everything Alpacode does, in its own voice. The studio is the part
that goes out to find clients — social and content, brand, UX and the
user journey, campaigns, SEO, strategy — with its own register (young,
direct, provocative and honest) and its own ways in: SEO, ads, products
bought on the site. Why the house and its compartments are arranged this
way: [`docs/marketing-map.md`](../../docs/marketing-map.md). The
compartments themselves: `shared/data/compartments.ts`.

An Astro site of its own (Italian only), in this repo for the shared
lockfile, `shared/` and the brand fonts. Pages are prerendered; the Node
standalone adapter runs the contact form and the payment providers'
webhooks.

```sh
npm run studio:dev      # http://localhost:4321
npm run studio:check
npm run studio:build    # -> sites/studio/dist
npm run studio:start    # node sites/studio/dist/server/entry.mjs
```

## Pages

| Path | What |
| --- | --- |
| `/` | the hook, the doors (one per reader; the last ones open on the house), the three verbs, the packages, the products, the house behind it |
| `/servizi/` | strategy first, then the three verbs — farsi vedere (social, formats), farsi ricordare (brand, positioning), farsi scegliere (UX, campaigns, SEO) — the method, the questions |
| `/pacchetti/` | Social Start, Social ogni mese, Brand Kit, Landing & ADV |
| `/prodotti/` | the do-it-yourself products: `/prodotti/guida-sito-vetrina/` (22 € + the marketing module, 48 €), `/prodotti/ai-al-lavoro/` (the crash course) |
| `/contatti/` | the form (a link can choose the offer: `?pacchetto=<id>`, `?prodotto=<id>`), the call, email, WhatsApp |
| `/grazie/` | where a payment provider brings the buyer back (`noindex`) |
| `/privacy/`, `/cookie/`, `/condizioni-di-vendita/` | drafts; the site terms are the house's |

Every page: the hook that turns the worry around (`components/Turn.astro`,
CSS above the fold), the house's signature (`components/House.astro`) and
a way to write. No DM keywords: the buttons are a website's — buy, ask,
book a call. WhatsApp is one way to write among the others.

## Data — where to change things

- `src/data/pages.ts` — each page's sticker, hook, lede and meta; the
  doors of the home.
- `src/data/services.ts` — the three verbs and their services, the
  strategy, the method, the services' questions.
- `src/data/packages.ts` — the packages; `price: null` shows "Su
  richiesta" (the prices are still to be set).
- `src/data/products.ts` — the products, their offers, prices (VAT
  included), contents (a draft: line them up with the real products) and
  their checkout.
- `src/data/site.ts` — the navigation and the links into the house
  (`house(path, where)`, tagged for the house's analytics).
- `src/data/legal.ts` — the legal pages (drafts).
- The company facts are the house's: `shared/data/business.ts`.

## Buying on the site

Every offer has a `checkout` in `src/data/products.ts` (packages in
`src/data/packages.ts`): `null` until the product exists on a payment
provider — the button then says "Chiedi" and opens the contact form with
the offer chosen — or `{ provider, url }`:

| Provider | `url` | On the page | Webhook (set it at the provider) | Secret (.env) |
| --- | --- | --- | --- | --- |
| `lemonsqueezy` | the product's checkout link | an overlay (lemon.js, fetched on intent) | `/api/checkout/lemonsqueezy`, event `order_created` | `LEMONSQUEEZY_WEBHOOK_SECRET` |
| `gumroad` | the product's gumroad.com link | Gumroad's page | Ping URL `/api/checkout/gumroad?key=…` | `GUMROAD_WEBHOOK_KEY` (+ `GUMROAD_SELLER_ID`) |
| `stripe` | a Payment Link | Stripe's page | `/api/checkout/stripe`, event `checkout.session.completed` | `STRIPE_WEBHOOK_SECRET` |

Set the provider's success URL to `https://studio.alpacode.it/grazie/`.
A merchant of record (Lemon Squeezy — now part of Stripe — or Gumroad)
handles EU VAT on digital products and delivers the files; with Stripe
alone the VAT is yours. A verified sale is appended to `ORDERS_LEDGER`
(one JSON per line, the `studio-data` volume) and emailed to the studio;
an unsigned or stale notification is refused (401), a provider without its
secret gets 503 so it retries once configured.

## Ads, consent, analytics

Umami is cookieless: `PUBLIC_UMAMI_SRC` + `PUBLIC_UMAMI_STUDIO_ID` at
build, no banner. The ad tags (`PUBLIC_META_PIXEL_ID`, `PUBLIC_GADS_ID`)
ship only when set; then a consent banner asks once (`lib/consent.ts`)
and the tags load only after a yes. Conversions (`lead`, `checkout`) go to
Umami always and to the ad tags when allowed.

## Motion

`src/engine/`, the studio's motion engine, on the same contract as the
house's (that of the motion catalog `FrancescoCorbosiero/alpacode-motion`,
reference only: never edited from here): its core, and the effects the
studio uses — `reveal` (rising blocks), `deal` (the readers' cards
landing), `skew` (the band leaning with the scroll), `meter` (the
course's pinned meter) and `feed` (the home's three verbs told on a
phone), both standing on `stage`; and the studio's own small moves,
`type` (the readers' phrases typing themselves), `scribble` (the notes
in the hand writing themselves), `grow` (the last call's «crescere»),
`stamp` (the products' prices), `tilt` (cards and phones leaning to the
mouse). `config.ts` maps the studio's classes onto their hooks;
`registry.ts` lists them. Each effect's header is its markup API. The
hero is CSS (the core's intro section is left out of `core.css`: the
studio's hero has its own). Under reduced motion nothing runs and every
piece sits in its end state; the hooks show the old words struck
through next to the new ones.

## Share cards

`tools/og/studio.mjs` → `sites/studio/public/og-studio*.png`:
`npm run og -- studio` (or one card by name). Check the PNGs.

## Deploy

Its own container (`sites/studio/Dockerfile`, Node), behind the same
caddy-docker-proxy as the house, in the same `docker-compose.yml`: the
usual `docker compose up -d --build` brings up both. Point
`studio.alpacode.it` (or `STUDIO_DOMAIN`) at the VPS first — or a
wildcard `*.alpacode.it`, which covers every compartment to come.
