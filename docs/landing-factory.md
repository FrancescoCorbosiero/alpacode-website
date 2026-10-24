# Landing factory — how to mint a new landing page

Every campaign page is built on one kit — the landing kit, `.lnd`:
blueprint and paper plates, the studio's pen on the copy, scenes that
move with the scroll. There are two tracks. Pick the cheapest one that
fits.

| Track | When | Cost | Examples |
| --- | --- | --- | --- |
| **A — Campaign** | Selling the site offer to a new audience | 1 data entry, ~15 min | `/offerta/educatori-cinofili`, `/offerta/olistica-yoga` |
| **B — Bespoke** | A different pitch (product, program, formula) | data file + view + CSS block + 2 pages + OG card, half a day | `/social-media-manager`, `/partner`, `/per-chi-fa-siti/*` |
| **C — A studio page** | The marketing compartment: a service, a package, a product bought on the site | data entries in `sites/studio/src/data/` + 1 card, under an hour | studio.alpacode.it `/servizi`, `/pacchetti`, `/prodotti/*` |

Tracks A and B are alpacode.it, the house's voice: formal, never the
aggressive register. Track C is Alpacode Studio, its own site
(`sites/studio/`): the young register, the worry named and turned
around, products bought on the site — on its own subdomain on purpose
(`docs/marketing-map.md`).

Tracks A and B ship IT + EN, SEO meta with FAQPage + BreadcrumbList
JSON-LD, a lead form wired to `/api/contact` with per-landing
attribution, and the same motion; the house's full header and footer
(the landings are pages of the house, not a separate funnel). No new
framework code is needed.

---

## Audiences first

The marketing pages come in groups, one per kind of reader. The
registry is `src/data/audiences.ts`:

| Group | Who | Pages |
| --- | --- | --- |
| `attivita` | own a business or a practice, need it online | `/offerta/*`, `/social-media-manager` |
| `professionisti` | work with clients and would bring them digital work | `/partner`, `/collabora-con-noi` |
| `segnalatori` | know someone who needs it | `/voucher`, `/voucher/nuova-attivita` |
| `chi-fa-siti` | build sites for clients (developers, web designers) | `/per-chi-fa-siti`, `/hosting`, `/ai` |

- **Every landing is one entry in `LANDINGS`**: slug, group, the line
  other pages use to point at it, its accent. The "other doors"
  (`Portals.astro`, via `portals([...slugs], lang)`) and the footer
  read it; `siblings(slug)` gives the rest of a group.
- **A new group gets an audience-first path**: a hub at its root
  (`/per-chi-fa-siti/`: the doors, a band, the shared formula) and one
  page per pitch under it. Pages that already exist keep their URLs —
  ads point at them.
- **One reader, two profiles?** Use the profile switch, not two pages:
  `ProfileSwitch.astro` + `[data-for="dev|designer"]` copy, remembered
  across the group (`alpacode_profile`), preset by `?per=designer` so an
  ad can aim at one of them (`lib/landing/profile.ts`).

## The kit

- **Styles** — `src/styles/landing.css`, imported by the views only
  (other pages don't carry it). The root is `.lnd`, each landing adds
  `.lnd--<name>` with its accent:
  - `--ac` fills, marks, the pen · `--ac-ink` the accent as text on
    paper (≥ 4.5:1) · `--ac-on` text on an accent fill · `--ac-soft`
    the highlighter band.
  - Plates: `.lnd-plate` (paper), `--print` (blueprint), `--ink`,
    `--paper-2`; `.lnd-grid-bg` (drafting grid), `.lnd-crop` (crop
    marks). Type: `.lnd-display`, `.lnd-title` (`--md`), `.lnd-sub`,
    `.lnd-lede`, `.lnd-body`, `.lnd-hand` (`--kicker`) for the margin
    notes.
  - Accents: the house's blue for every landing (on the blueprint,
    `#8fb0f5`): the landings speak as the house. The colours per door
    belong to the studio (`sites/studio/src/data/pages.ts`). The
    product pages (Hive, Pro Kit) keep their own.
- **Components** — `src/components/landing/`:
  - `Mark` (`kind`: highlight, underline, strike, circle, box) — the pen
    on a word; `Hand` (`arrow`, `kicker`) — a note in the margin;
    `Lines` — a title split on `\n`.
  - `Formula` — the three-step ladder (each tier carries the one
    below, the one that suits the reader marked by hand; a tier's
    button ticks it in the form). Copy in `data/landing/*`.
  - `Objections` (`variant`: list or chat), `LeadForm` (see below),
    `Portals`, `ProfileSwitch`.
  - The views: `OfferLanding` (Track A), `SmmLanding`, `PartnerLanding`,
    `HostingLanding`, `AiLanding`, `BuildersHub`.
- **Scripts** — `src/lib/landing/`: `lead.ts` (the form), `formula.ts`,
  `profile.ts`, `offer.ts` (the proposal's tabs),
  `calc.ts`, `makeof.ts`, `mirror.ts`, `schema.ts`
  (`landingJsonLd({ lang, site, crumbs, faq })`), `scenes.ts`.
- **The lead form** posts `{ campaign, audience, topic, offer, price,
  details[] }` with the person's fields to `/api/contact`. `choices`
  become the offer; `extra` and `profile` arrive as labelled details;
  `id` sets the anchor (`#parliamone` by default; `/partner` keeps
  `#candidatura`, which its old links use).

## Motion: scenes

- **Above the fold it's CSS** — `[data-intro]` with `--i`, the
  display's lines, the hero's marks. The first paint never waits on
  JavaScript.
- **Below the fold it's a scene** — `data-scene="<name>"` runs the
  function of that name in `SCENES` (`lib/landing/scenes.ts`, a chunk
  `motion.ts` loads only on `.lnd` pages, inside the page's
  `gsap.context()`, reverted on navigation). Two kinds:
  - *Pinned*: `<section class="lnd-scene" data-scene="x" style="--len:3">`
    with a `.lnd-stage` inside — the stage sticks for `--len` screens
    of scroll while `scrubbed(root)` plays; `beats(tl, root, [...])`
    hands the text over, `.lnd-progress` draws the rule.
  - *Machines*: a hero object that plays on its own (the press, the
    loop) — pause it off screen.
- **Rules that keep scenes correct**:
  - In scrubbed timelines use `fromTo` — the timeline owns its start
    states; later tweens on the same target take
    `immediateRender: false`.
  - Measure from layout (`centre(el, within)`), not transformed boxes,
    so a refresh mid-scene stays right.
  - Hide things only in JS, at init, and only below the fold
    (`below(el)`). **Nothing is hidden by CSS**: under reduced motion
    the chunk never runs and `landing.css` lays every scene out in its
    end state. Look at the reduced-motion still of every page.
  - Phones: a pinned stage must fit about 660px of height (Safari's
    small viewport) — shoot it at 390×664. Secondary copy can step out
    of sight there with the visually-hidden pattern under
    `.has-motion [data-scene="x"]` (never `display: none`: screen
    readers keep it).
- The site-wide hooks still work inside landings: `data-split`,
  `data-reveal`, `data-scrub` (`motion.ts` header).

## Track A — Campaign landing (`/offerta/<slug>`)

Everything lives in `src/data/campaigns.ts`. One entry in `CAMPAIGNS`
generates `/offerta/<slug>` and `/en/offerta/<slug>` on
`OfferLanding`: the pen's correction in the hero, the search scene
(what their clients type, and the result that's finally them), the
stats, the proposal sheet with the two versions as tabs, the steps,
the objections and the form, plus the group's other doors.

1. Extend the `CampaignSlug` union with the new slug.
2. Add one `Campaign` to `CAMPAIGNS` — copy an entry and rewrite:
   - `audience`, `eyebrow` — who it's for, in their own words.
   - `price` — tiers for reference: 300 € (consumer-facing
     micro-businesses), 350 € (coaches and consultants), 450 €
     (licensed professionals).
   - `hero.line1` / `line2` — a two-beat mirror of their situation
     ("Bravissimo sul campo." / "Invisibile su Google."); `hero.fix`
     (optional): the pen strikes `strike` out of line 2 and writes
     `write` above it. `lede` says what's included, plainly ("con
     hosting ed email").
   - `search` — what their clients type into Google.
   - `pains` — exactly three, from the audience's real workflow (what
     they cobble together today), not generic marketing.
   - `heroImage` — `unsplash("<photo-id>")`, or drop
     `src/assets/campaigns/<id>.jpg` to override it.
   - `meta.title` — "Sito per X · N €/anno con dominio e hosting —
     Alpacode"; `meta.description`; `portal` — the line other pages use
     to point here.
3. Verify: `npm run check && npm run build` — the pages must appear in
   `dist/client/offerta/<slug>/`.

## Track B — Bespoke landing

For a pitch that isn't "we build your site for N €/year".

1. **Registry** — one `LANDINGS` entry in `data/audiences.ts` (a new
   group if the reader is new; see above).
2. **Data** — `src/data/<name>-landing.ts` (or `data/landing/<name>.ts`
   for a group's pages): one typed interface, `Record<Lang, Copy>`, IT
   and EN. All copy lives here, never in components.
3. **View** — `src/components/landing/<Name>Landing.astro`: import
   `landing.css`, root `<div class="lnd lnd--<name>">`, plates in
   sequence — hero (copy + its machine), a kinetic band, the scenes
   that tell the pitch, steps, objections, the form, the portals.
   **At least one scene of its own**, the thing that makes
   it memorable (SMM: the link-in-bio's links move into the site;
   partner: the loop between you and us, the scale that balances).
4. **Styles** — a block at the end of `landing.css` headed by the
   landing's name: the scene's pieces, then its `@media` rules.
5. **Scenes** — the functions in `scenes.ts`, listed in its header and
   in `SCENES`.
6. **Pages** — `src/pages/<slug>.astro` + `src/pages/en/<slug>.astro`:
   `Layout` (the full chrome), `jsonLd={landingJsonLd({ … faq })}`.
7. **OG card** — `tools/og/og-<name>.svg` on the blueprint (see
   `og-hosting.svg`, `og-partner.svg`), then `npm run og -- og-<name>`
   (only those cards; link-preview scrapers don't render SVG, the site
   serves `public/og-<name>.png`). Keep each headline line under ~20
   characters; eyeball the PNG before committing it.
8. **Verify** — `npm run check && npm run build`, serve
   `dist/server/entry.mjs`, tour the page at 1440 and 390 (and the
   pinned scenes at 390×664), the reduced-motion still, and submit the
   form: without `AWS_REGION` the API logs the lead — check its
   campaign and details.

## Track C — a studio page (`studio.alpacode.it`)

The marketing compartment's pages are data. The playbook is
`sites/studio/README.md`; the register and its rules are in
`docs/marketing-map.md`.

1. A service: `sites/studio/src/data/services.ts` (under its verb: farsi
   vedere, farsi ricordare, farsi scegliere). A package:
   `sites/studio/src/data/packages.ts` (`price: null` reads "Su
   richiesta"). A product: `sites/studio/src/data/products.ts` (price
   VAT included, contents, `checkout` or `null`: then the button asks
   instead), with its page in `sites/studio/src/pages/prodotti/`.
2. A door on the studio's home, if it's a new reader:
   `sites/studio/src/data/pages.ts` (`DOORS`), with its accent. A door
   from the house: `doorTo("studio", path, { site: "house", where })`
   (`shared/data/compartments.ts`) where the house talks about that
   work.
3. Its share card in `tools/og/studio.mjs`, then `npm run og -- studio`.
4. `npm run studio:check && npm run studio:build`, then look at it at
   390 and with reduced motion. No DM keywords, no countdowns.

## House rules (all tracks)

- **Voice**: direct, concrete, zero hype. Say what's included and how
  it's done. Never invent numbers, stats, commissions or delivery
  promises; where terms aren't fixed, say they're agreed on the first
  call and put in writing.
- **Banned: the price-reassurance tic.** "Prezzo deciso prima",
  "prezzo chiaro", "niente costi nascosti", "nessuna sorpresa",
  "nessun costo a sorpresa", "tutto incluso" and kin (EN "price agreed
  up front", "no hidden costs", "no surprises", "all included") read
  cheap. Name the things instead: "con dominio, hosting ed email",
  "una proposta scritta dopo la prima call". (A real term of an offer
  — the Pro Kit founders' locked price — is not the tic.)
- **No countdowns, no fake scarcity**: no rounds, no seats, no
  deadlines on the pages.
- **Risk reversal is the brand**: "prima vedi, poi paghi" on every
  offer of the site.
- **No placeholder proof.** No logos, reviews or counts until they're
  real.
- No emoji in UI (the linktree parody in the SMM mirror depicts the
  *rented* world on purpose).
- Every form posts to `/api/contact` with its own `campaign` value.
- A landing that is a whole program (several pages, its own API) is a
  module: `/voucher` (`docs/voucher.md`) keeps its pieces in
  `components/voucher/`, its copy in `data/voucher/`, its scripts in
  `lib/voucher/` and its stylesheet scoped under `.rf`. A new door for
  an existing program is a data entry there, not a new landing
  (`/voucher/nuova-attivita/` is `program: "nuova-attivita"`).
