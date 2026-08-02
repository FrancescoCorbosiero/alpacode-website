# Landing factory — how to mint a new landing page

This repo is built to churn out campaign landing pages fast. There are
two tracks. Pick the cheapest one that fits.

| Track | When | Cost | Examples |
| --- | --- | --- | --- |
| **A — Campaign** | Selling the site offer to a new audience | 1 data entry, ~10 min | `/offerta/educatori-cinofili`, `/offerta/olistica-yoga` |
| **B — Bespoke** | A different pitch (new product, program, offer structure) | 5 small files, ~1–2 h | `/social-media-manager`, `/partner` |

Both tracks ship IT + EN, SEO meta, lead form wired to `/api/contact`
with per-campaign attribution, and the house design system. No new
framework code is ever needed.

---

## Track A — Campaign landing (`/offerta/<slug>`)

Everything lives in `src/data/campaigns.ts`. One entry in `CAMPAIGNS`
generates `/offerta/<slug>` and `/en/offerta/<slug>` at build time,
with the shared machinery for free: countdown + seats scarcity, the
two offer variants, the Italy-digital-gap stats, the AI section,
steps, guarantees, FAQ and the lead form (leads arrive tagged with the
campaign slug).

Recipe:

1. Extend the `CampaignSlug` union with the new slug.
2. Add one `Campaign` object to `CAMPAIGNS`. Copy an existing entry
   and rewrite the audience-specific fields:
   - `audience`, `eyebrow` — who it's for, in their own words.
   - `price` — current tiers for reference: 300 € (consumer-facing
     micro-businesses: SMM, dog trainers, yoga), 350 € (coaches &
     consultants), 450 € (licensed professionals). `seats`/`seatsLeft`
     default 30/30 — **edit `seatsLeft` by hand as people sign up**.
   - `deadlineISO` — reuse the shared `DEADLINE` constant unless the
     campaign has its own window.
   - `hero.line1` / `hero.line2` — a two-beat mirror of their pain
     ("Bravissimo sul campo." / "Invisibile su Google."). `lede` ends
     with the price and "tutto incluso".
   - `pains` — exactly 3, drawn from the audience's real workflow
     (what they cobble together today: Google Forms, Calendly, link
     in bio…), not generic marketing.
   - `heroImage` — `unsplash("<photo-id>")` hotlink. To use a real
     photo instead, drop `src/assets/campaigns/<slug>.jpg` (any of
     jpg/png/webp/avif) — it overrides the hotlink automatically. If
     the remote image fails, a clean placeholder renders; nothing
     breaks.
   - `meta.title` / `meta.description` — follow the pattern
     "Sito per X · N €/anno tutto incluso — Alpacode".
3. Verify: `npm run check && npm run build` — the new pages must
   appear under `dist/client/offerta/<slug>/`.

## Track B — Bespoke landing (top-level slug)

For a pitch that isn't "we build your site for N €/year". Clone the
pattern of the two existing bespoke landings — SMM (`smm` prefix,
magenta) and Partner (`ptn` prefix, green):

1. **Data** — `src/data/<name>-landing.ts`: one typed interface, one
   `Record<Lang, Copy>` with IT and EN. All copy lives here, never in
   components.
2. **Component** — `src/components/pages/<Name>Landing.astro`:
   - Section heads reuse `.section-head` + `.sec-num` + `.lede`
     classes → scroll reveals come free from `src/lib/motion.ts`.
   - Reuse the shared pieces: `Ticker.astro`, `Countdown.tsx`,
     `CampaignForm.tsx` (price offers) or `PartnerForm.tsx`
     (applications), the sticky CTA pill + IntersectionObserver
     script pattern (visible after hero, hidden on the form).
   - Inline scripts must be `is:inline`, idempotent, and re-init on
     `astro:page-load` (view transitions).
   - **One signature interactive element per landing** — the thing
     that makes it memorable (SMM: type-your-name mirror; Partner:
     two-way flow diagram). Vanilla JS only, no dependencies,
     `prefers-reduced-motion` fallback.
3. **Styles** — `src/styles/<name>-landing.css`, imported in
   `src/styles/global.css`. Scope everything under one root class and
   define a scoped palette. Accents already taken: blue (brand),
   yellow (Hive), coral (Pro Kit), magenta `#ff2e88` (SMM), green
   `#2fe08a` (Partner) — pick a new one, dark bg `#0a0a0a`, and keep
   the brutalist DNA: square corners, 1px rules, the 6px strut, mono
   kickers (`§ 0N — …`), Archivo Black / Manrope / JetBrains Mono.
   Paint the body via `body:has(.<root>) { background: var(--ink) }`
   and recolor the minimal header CTA to the landing accent.
4. **Pages** — `src/pages/<slug>.astro` + `src/pages/en/<slug>.astro`:
   `Layout` with `minimal` chrome, `ctaHref` pointing at the form
   anchor, FAQPage JSON-LD built from the data file.
5. **OG card** — `tools/og/og-<name>.svg` following the existing
   ones, then `npm run og` to rasterise it (link-preview scrapers —
   WhatsApp, Facebook, LinkedIn — don't render SVG, so the site
   serves the generated `public/og-<name>.png`; point `ogImage` at
   the `.png`). Keep each headline line under ~20 chars and stack
   the accent word on its own line — display fonts overflow
   otherwise. Eyeball the generated PNG before committing it.
6. **Verify** — `npm run check && npm run build`, serve
   `dist/server/entry.mjs`, screenshot at 1440px and 390px, click the
   interactive element, submit the form end-to-end (without
   `AWS_REGION` the API logs the lead and returns ok — check the
   server log shows the right campaign attribution).

## House rules (both tracks)

- Copy voice: direct, concrete, zero hype. Prices stated plainly.
  Never invent numbers, stats, commissions or delivery promises that
  aren't already agreed — write "condizioni definite per iscritto"
  instead.
- Risk reversal is the brand: "prima vedi, poi paghi" appears on
  every offer.
- No emoji in UI (the linktree parody inside the SMM mirror is the
  one deliberate exception — it depicts the *rented* world).
- Cross-link related landings with the bordered "portal" card pattern
  (see `.smm-bridge` / `.ptn-cross`), using the target landing's
  accent color.
- Every form posts to `/api/contact` with a distinct `campaign` value
  so leads are attributable per landing.
