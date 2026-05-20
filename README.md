# Handoff — Alpacode Soluzioni Digitali · site v2

## Overview

This package contains a complete, working high-fidelity design for the
**Alpacode Soluzioni Digitali** corporate website (v2 — editorial brutalist
direction). It includes 7 pages, a bilingual IT/EN system, a global mega-nav
with command palette, scroll-triggered animations, and the full design
language derived from the company logo.

The deliverable here is a **design reference** — the HTML/CSS/JSX files in
`design_reference/` are prototypes built in plain React + Babel-in-the-browser
so they can be opened directly with a static file server. **They are not
production code.** The job of the implementing developer is to **recreate
this exact design in a real codebase** with the same look, behavior,
typography, palette, and interactions — using a proper toolchain.

---

## Fidelity

**High-fidelity (hifi).** Pixel-perfect intent — final colors, typography,
spacing, copy, and interactions are all decided. The developer should
reproduce the visual result very closely, then layer in the production
plumbing (CMS, forms, analytics, deploy).

---

## Design direction (read this first)

The whole design comes out of the logo. Three pixels of decision:

| Element                  | Choice                                                   |
|--------------------------|----------------------------------------------------------|
| **Direction**            | Editorial brutalist · monumental Swiss                    |
| **Palette source**       | Sampled from logo pixels — no invented colors             |
| **Signature motif**      | **The blue strut** — the horizontal bar between ALPACODE and SOLUZIONI DIGITALI in the logo, used as the structural connective tissue of the whole site (top of header, section dividers, active tab borders, footer, quote bars, etc.) |
| **Typography**           | **Archivo Black** (display, monumental) + **Manrope** (body, geometric humanist) + **JetBrains Mono** (micro-labels & numerals only) |
| **Tone**                 | Calm, confident, plain Italian / English. No tech jargon. |

The v1 design used navy + lime, topographic rings, GPS coordinates, and
Inter + Fraunces + JBMono. **None of those elements appear in v2.**

---

## Recommended tech stack

The site is mostly static, content-heavy, multilingual, with light
interactivity. Two reasonable paths — pick based on how much editorial
control the client needs.

### Path A — **Astro 5** (recommended)

Best fit for the actual content profile of this site.

| Layer                | Choice                                            | Why |
|----------------------|---------------------------------------------------|-----|
| Framework            | **Astro 5** + **TypeScript**                       | Zero-JS by default, multi-page is native, MDX for blog/case-studies, great SEO. |
| Styling              | **Vanilla CSS** with CSS custom properties (already structured this way in `styles.css`) — or **Tailwind v4** if the team prefers utilities. | The token system in `styles.css` is already small and intentional; lifting it 1:1 into a single global stylesheet keeps the editorial calm. |
| Animations           | **Plain CSS + IntersectionObserver** (already implemented in `animations.js`) — or `@motionone/dom` for the few choreographed sequences. | Don't add Framer Motion; the on-load stagger and scroll reveals don't need a runtime. |
| i18n                 | **Astro i18n** routing (`/it/`, `/en/`) + a small `useLang` cookie/localStorage helper for the persistent toggle. | Matches the IT/EN toggle in the design. |
| Content              | **MDX collections** (`src/content/blog`, `src/content/work`, `src/content/courses`) with frontmatter for date, category, metrics, tags. | Editorial team can edit blog and case studies in Markdown. |
| Forms                | **Resend** + Astro API route (server endpoint) — or **Formspree** if no backend desired. | The contact form on `contatti.html` is server-side. |
| Search / ⌘K palette  | **`fuse.js`** (3kb) against a generated static index (`pages.json + courses.json + actions.json`). | The palette already works on a static array — just generate the index at build time. |
| Analytics            | **Plausible** or **Umami** (self-hosted). | Cookie-less, GDPR-friendly. |
| Hosting              | **Vercel** or **Cloudflare Pages**. | Both have native Astro support and free SSL. |
| Image handling       | Astro `<Image>` (sharp under the hood) for the `image-slot` placeholders, which become real `<picture>` elements in production. | Auto-srcset, AVIF/WebP. |
| Versioning           | Standard Git workflow; no SSR needed. | |

### Path B — **Next.js 15 + App Router**

Choose this only if the client plans to add a logged-in area (client portal,
LMS, etc.) shortly after launch. Otherwise it's overpowered for a 7-page
corporate site.

| Layer       | Choice                                                          |
|-------------|------------------------------------------------------------------|
| Framework   | Next.js 15, React 19, App Router, RSC                            |
| Styling     | Same — vanilla CSS modules or Tailwind v4                         |
| Animations  | Same — CSS + IO; consider `framer-motion` only for case-tab swap |
| i18n        | `next-intl` with persistent cookie                                |
| Content     | MDX via `@next/mdx` + content collections (`contentlayer`)        |
| Forms       | Server Actions + Resend                                          |
| Search      | Fuse.js, generated index at build                                 |
| Hosting     | Vercel                                                           |

### What **not** to use

- **No** dynamic JSX-in-browser like in the prototype (`type="text/babel"`)
  — that's only for the design reference.
- **No** Bootstrap, Material, Chakra. The design is custom; component
  libraries will fight it.
- **No** rounded-corner / soft-shadow component kits. This is brutalist —
  borders are 1px hard rules, corners are square.
- **No** heavy CMS like Drupal or full WordPress unless the client
  insists. If WP is non-negotiable, use it **headless** and consume from
  Astro via REST/GraphQL.

---

## Project structure (target)

```
alpacode/
├── src/
│   ├── pages/                  Astro routing
│   │   ├── index.astro
│   │   ├── servizi.astro
│   │   ├── lavori.astro
│   │   ├── scuola.astro
│   │   ├── blog.astro
│   │   ├── blog/[slug].astro
│   │   ├── faq.astro
│   │   ├── contatti.astro
│   │   └── en/...              English routes (same tree)
│   ├── components/
│   │   ├── Header.astro
│   │   ├── MegaNav.astro
│   │   ├── CmdK.tsx            (Astro island, client:idle)
│   │   ├── LangToggle.tsx      (client:load)
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Verbs.astro
│   │   ├── Cases.tsx           (client:visible)
│   │   ├── Manifesto.astro
│   │   ├── CTAFinal.astro
│   │   ├── PageHero.astro
│   │   ├── ImageSlot.astro     (real <picture> in prod)
│   │   └── motion.ts           IntersectionObserver scanner
│   ├── content/
│   │   ├── blog/*.mdx
│   │   ├── work/*.mdx
│   │   └── config.ts
│   ├── styles/
│   │   ├── tokens.css          (palette, type, scale)
│   │   ├── base.css
│   │   ├── motion.css
│   │   └── components/*.css    (one file per section, optional)
│   ├── lib/
│   │   ├── i18n.ts             dictionary + helpers
│   │   └── search.ts           Fuse index loader
│   └── env.d.ts
├── public/
│   ├── assets/logo.png
│   ├── assets/logo-mark.svg    (the blue strut alone, derived)
│   └── og/                     pre-rendered OG cards per page
├── astro.config.mjs
├── tailwind.config.ts          (if Tailwind chosen)
└── package.json
```

---

## Design tokens

Lift these **exactly** from `design_reference/styles.css`:

### Colors

| Name           | Value      | Use |
|----------------|------------|-----|
| `--ink`        | `#0A0A0A`  | Primary text, dark surfaces, footer/manifesto bg |
| `--ink-2`      | `#1B1B1B`  | Hover/dark variant |
| `--paper`      | `#F4F1E8`  | Page background (warm cream) |
| `--paper-2`    | `#EBE7DA`  | Card hover, image-slot bg |
| `--paper-3`    | `#DDD8C7`  | Subtle alt surface |
| `--rule`       | `#C9C3B1`  | 1px borders, dividers |
| `--mute`       | `#7D7A72`  | Mono labels, captions |
| `--mute-2`     | `#54524C`  | Body secondary text |
| `--blue`       | `#3B72E9`  | **Signature accent** — sampled from logo bar |
| `--blue-deep`  | `#2756C2`  | Hover/pressed |
| `--blue-soft`  | `#DCE5FA`  | Soft accent surface |

### Typography

- **Display**: `Archivo Black`, fallback `Helvetica Neue, Helvetica, Arial, sans-serif`
- **Sans**: `Manrope` weights 400/500/600/700/800
- **Mono**: `JetBrains Mono` weights 400/500 — for micro-labels (uppercase, 10–11px, letter-spacing 0.18em)

Type scale (use `clamp()` for fluidity — see `styles.css`):

| Role            | Size                              | Line   | Tracking |
|-----------------|-----------------------------------|--------|----------|
| Hero wordmark   | `clamp(72px, 14vw, 220px)`        | 0.85   | -0.025em |
| Page H1         | `clamp(56px, 9vw, 144px)`         | 0.86   | -0.03em  |
| Section H2      | `clamp(40px, 6vw, 88px)`          | 0.92   | -0.02em  |
| Verb word       | `clamp(48px, 6vw, 76px)`          | 0.9    | -0.02em  |
| Pillar H3       | 36px                              | 0.95   | -0.015em |
| Body            | 16px                              | 1.5    | 0        |
| Eyebrow (mono)  | 11px UPPER                        | 1.0    | 0.18em   |

### Spacing & structure

- Gutter: 32px (16px desktop padding)
- Max content width: 1240px (`.wrap`) / 1480px (`.wrap-wide`)
- Strut height: 6px (default) → 3px (collapsed header)
- 1px hard rules — no rounded corners anywhere; **all corners square**
- Section padding: 96px top/bottom desktop, 56px mobile

### Motion

| Token       | Value                              |
|-------------|-------------------------------------|
| `--ease`    | `cubic-bezier(0.2, 0.72, 0.2, 1)`   |
| `--ease-out`| `cubic-bezier(0.16, 1, 0.3, 1)`     |
| `--dur-1`   | 600ms                               |
| `--dur-2`   | 800ms                               |
| `--dur-3`   | 1000ms                              |

Reveal patterns (set via `data-reveal="up|rise|bar|mask|fade"`, triggered by
`[data-shown]` attribute when IntersectionObserver fires). Honor
`prefers-reduced-motion`.

---

## Pages — content + behavior

### Header (every page)

- Top: 6px **blue strut**, shrinks to 3px when `window.scrollY > 6`
- Row: brand mark (inverted logo on black square 44×44) + wordmark
  "ALPACODE / Soluzioni Digitali" · numbered nav · `⌘K` badge ·
  IT/EN toggle · CTA "Prenota call"
- **Mega-menu** on `Servizi` and `Scuola` (hover, 120ms delayed close):
  3-column dropdown, left column is a black feature card with the
  practice headline and a blue inline CTA; right two columns are
  numbered link lists with title + descriptor.
- **Numbered nav**: `01 Home`, `02 Servizi`, `03 Lavori`, `04 Scuola`,
  `05 Blog`, `06 FAQ`, `07 Contatti`. Active item gets a blue underline.

### Footer (every page)

- 6px blue strut at top, on `--ink` background, `--paper` text.
- 4 columns: brand (huge "ALPACODE" wordmark with blue bar) ·
  Informazioni (sede, P.IVA, orari) · Naviga (all 7 pages) ·
  Scrivici + Legale (email, CTA, social, privacy/cookies/terms).
- Bottom row (mono, 11px, uppercase): rights · location · version.

### ⌘K Command palette

- Triggered by `Cmd/Ctrl + K` (also by the badge in the header).
- Backdrop dim, 1.5px ink border modal with blue strut at top.
- Three sections: **Pages** (7 entries with numbered prefix) ·
  **Courses** (3 entries) · **Actions** (book a call, email, switch
  language).
- Keyboard: `↑ ↓` navigate, `↵` open/execute, `ESC` close.
- Filter is substring against title + sub + kind.
- The "switch language" action toggles IT↔EN and persists in localStorage.

### IT / EN toggle

- Two-button segmented control in the header.
- State stored in `localStorage["alpacode_v2_lang"]` and dispatched
  globally via a `CustomEvent("alpa-lang", { detail })` so any island can
  react.
- All copy is bilingual; the language toggle never reloads the page in the
  prototype. **In production**, use proper URL routing (`/` vs `/en/`)
  for SEO; keep the localStorage hint so the toggle remembers the user's
  choice across visits.

### Home (`index.html`)

1. **Hero** — Monumental wordmark composition. Centerpiece is a
   re-creation of the logo at viewport scale: "ALPACODE" wipes in,
   the blue bar grows from zero, "SOLUZIONI DIGITALI" wipes in, then
   the claim and CTAs fade up, then a 4-cell meta row staggers in.
   Meta cells: Sede · Operatività · Progetti · Ambiti.
2. **§01 Servizi** — Three vertical cards in a 3-column rule-bordered
   grid: **Costruire / Consigliare / Insegnare**. Each card has a
   monumental verb (last syllable in blue), a short paragraph, a
   65px blue strut that grows to 128px on hover, and a 4-item list.
3. **§02 Casi di studio** — Interactive picker with 3 tabs (left
   column, vertical). The active tab has black background, paper text,
   and a 6px blue strut on its left edge. Right side: image-slot tag
   ("2025 · WEB + SOFTWARE") · `image-slot` for project photo · problem
   headline · narrative · before/after metrics (the "after" value in
   blue) · a pull-quote with a 6px blue left border, plus attribution.
   Tab change **crossfades** the panel (`caseSwap` keyframe, 500ms).
4. **§03 Manifesto** — Full-bleed black section (`--ink`). 2×2 grid of
   4 pillars (I/II/III/IV) on dark, each with a blue strut, a
   monumental H3, and a paragraph in 75% opacity paper.
5. **§04 CTA finale** — Massive "Hai un progetto? Parliamone." with
   "Parliamone." underlined with a 6px blue rule. 3-cell info grid
   (Scrivici / Prenota call / Sede) and a primary blue CTA button.

### Servizi (`servizi.html`)

Page hero with the bar prefix. Then 6 detail rows. Each row:
2-column grid (200px serial number in display + content). Number is
big with a blue dot. Content has H3, paragraph, and a 3-cell meta
table (Stack / Tempi / Da). Bordered top/bottom of each row with
`--rule`. Ends with `CTAFinal`.

### Lavori (`lavori.html`)

Page hero. Then a 2-column grid (mobile: 1-col) of 6 work cards.
Each card: `image-slot` (320px tall) · meta row (mono — serial,
year, sector) · H3 · short description · tag chips
(bordered 1px, mono uppercase). Hover: card lifts 2px, image
contrast tweaks +4%.

### Scuola (`scuola.html`)

Page hero. Eyebrow note ("Per professionisti, team aziendali,
studenti."). Then a 3-column course grid (mobile: 1-col) with 6
cards. Each card: level tag (FONDAMENTA / INTERMEDIO / AVANZATO /
KIT PRO / AZIENDE) · H3 · price (display) · hours (mono eyebrow) ·
5-item bullet list (blue dash bullets) · "Iscriviti" button.

### Blog (`blog.html`)

Page hero. Then a list of 8 row entries. Each row is a 4-column
grid: `date | H3 + descriptor | category-mono | arrow`. Hover:
12px left padding (rows slide in), background flips to `--paper-2`,
arrow translates 6px right and turns blue.

### FAQ (`faq.html`)

Page hero. 8 accordion items, first one open by default. Each
item: numbered prefix · question (display, clamp(20px, 2.4vw, 28px))
· `+` / `—` icon that flips on open. Body fades in below.

### Contatti (`contatti.html`)

Page hero. Then a 2-column layout:
- Left: 6-field form (Nome, Azienda opt., Email, Topic dropdown,
  Budget dropdown, Messaggio). Fields are minimalist — no boxes,
  just a mono label and a display-sized input, separated by 1px
  rules. Consent checkbox required. Submit is a blue primary button.
  On submit, show a mono confirmation chip "● GRAZIE — TI RISPONDIAMO PRESTO".
- Right: contact info blocks (Email, Sede, P. IVA, Orari, Tempo di
  risposta), then a black "● DISPONIBILE" card announcing Q3 2026
  availability.

In production wire the form to **Resend** (preferred) or **Formspree**;
add a hidden honeypot field; include `<meta name="robots" content="noindex">`
only on the legal/thank-you pages.

---

## State management

The prototype keeps everything in component-local React state. In a real
codebase you only need:

| State                       | Where                       | Persist?  |
|-----------------------------|-----------------------------|-----------|
| `lang` (IT/EN)              | global (cookie + localStorage) | yes     |
| `cmdkOpen`                  | global (React context or Zustand) | no |
| `cmdkQuery`, `cmdkIdx`      | local to CmdK island        | no        |
| `headerScrolled`            | local to Header             | no        |
| `caseIndex`                 | local to Cases island       | no        |
| `faqOpen`                   | local to FAQ                | optional (per session) |
| Contact form fields         | local; submit to server     | no        |

Everything else is static, server-rendered.

---

## Data sources

- **Pages metadata** (page-mega-nav, ⌘K index): generate at build time
  from a single TS dictionary (`src/lib/pages.ts`).
- **Case studies (Home §02)**: short-form, can stay inline or move to
  `src/content/featured-cases/`. Long-form versions live in
  `src/content/work/` and link out.
- **Blog**: MDX in `src/content/blog/`.
- **Courses (Scuola)**: a single `src/content/courses.ts` with strict
  TypeScript types for level / price / hours / items / sign-up link.
- **FAQ**: also a TS file — 8 entries, IT + EN copy side by side.
- **Business info** (P. IVA, email, sede, hours): a single
  `src/lib/business.ts` so it's one place to change.

---

## Assets

- `assets/logo.png` — the squared PNG logo on transparent background
  (1024×1024). Ship as-is plus regenerate a 256×256 favicon and an
  SVG version if possible.
- `assets/logo-mark.svg` — recommended new asset: just the blue
  horizontal bar (or "A" letterform) as a square mark for OG cards,
  the header inverted square, and small contexts.
- **OG images**: generate per-page OG cards at build time
  (`@vercel/og` or `satori`) using the same Archivo Black + blue strut
  treatment.
- **Project photos for `image-slot`s**: these are placeholders in the
  reference. In production they become real `<picture>` elements; the
  client provides real photos for the case studies (Home §02) and the
  6 Lavori cards.

---

## Animations checklist

The reference implements all of these; the developer should reproduce
the **timing** as well as the **feel**.

| Where                         | Trigger                       | Effect                                                          |
|-------------------------------|-------------------------------|------------------------------------------------------------------|
| Hero on load                  | 40ms after first paint        | Wordmark wipe L→R · blue bar scaleX → 1 · SOLUZIONI DIGITALI wipe · claim/CTAs fade up · meta row staggers |
| Page hero on load             | 40ms after first paint        | H1 rises + opacity · bar wipes · crumb + lede fade               |
| Section heads                 | IO `threshold: 0.08`          | sec-num + H2 + lede stagger up                                   |
| Verb cards / pillars / works / courses / blog / faq | IO | Vertical stagger 50–110ms per item |
| Case tab swap                 | state change                  | `caseSwap` 500ms (translateY 8px + opacity)                      |
| Header strut                  | scrollY > 6                   | height 6px → 3px (280ms)                                         |
| Verb hover                    | hover                         | Strut width 64px → 128px                                         |
| Buttons                       | hover                         | Arrow translateX +4px; color flips blue                          |
| Blog row                      | hover                         | padding-left +12px; arrow blue + 6px right                       |
| ⌘K palette                    | open                          | Backdrop 200ms + scale 0.99→1 260ms                              |
| Mega menu                     | open                          | translateY(-6px → 0) + opacity 220ms                             |
| Status dot                    | infinite                      | Polite blink (3.6s cycle)                                        |

All gated behind `@media (prefers-reduced-motion: reduce) { … !important }`.

---

## Accessibility checklist

- All interactive elements use semantic HTML (`<a>`, `<button>`).
- `aria-selected` on case-picker tabs; `role="tablist" / tab"`.
- `aria-expanded` on FAQ buttons; the `display: none` swap on
  `.faq-a` should be replaced in production with `hidden` attribute
  + animated height (or `<details>` if you want native semantics).
- Mega-menu should be reachable by keyboard (current prototype is
  hover-only — add focus-visible support in prod).
- Color contrast: ink/paper = 17:1 ✓, blue/paper = 5.4:1 ✓ for body
  copy, but the blue-on-paper button (`btn-blue`) should keep its
  white text (≥ 4.5:1). Verify with axe-core in CI.
- Skip link to `#app` / `<main>`.
- Logo image has empty `alt=""` (decorative — the wordmark beside it
  carries the brand). Keep that.

---

## i18n

- Two languages: **IT** (default) and **EN**.
- Dictionary structure already used in the prototype (`T = { nav: { home: { it, en } } }`) is straightforward; in production use **next-intl** (Next) or **Astro i18n** with a JSON message catalog.
- Persist user preference in a cookie (`alpacode_lang`) **and** localStorage
  so the toggle is sticky on refresh.
- The "switch language" action in ⌘K should swap the URL prefix in
  production (`/contatti` → `/en/contact`), not just toggle a state.

---

## Files in this bundle

```
design_handoff_alpacode_v2/
├── README.md                          ← you are here
└── design_reference/                  ← the working prototype
    ├── index.html                     (Home)
    ├── servizi.html
    ├── lavori.html
    ├── scuola.html
    ├── blog.html
    ├── faq.html
    ├── contatti.html
    ├── styles.css                     ← ALL the tokens, lift these 1:1
    ├── animations.js                  ← motion contract (IO + on-load gates)
    ├── image-slot.js                  ← drag-and-drop placeholder (replace in prod)
    ├── assets/
    │   └── logo.png
    └── components/
        ├── Layout.jsx                 (Header, MegaNav, CmdK, Footer, useLang)
        ├── Home.jsx                   (Hero, Verbs, Cases, Manifesto, CTAFinal)
        └── Pages.jsx                  (Servizi, Lavori, Scuola, Blog, FAQ, Contatti)
```

The JSX files use `<script type="text/babel">` so they can be opened
directly with `python -m http.server` or any static server. Do **not**
ship the Babel transformer to production.

---

## Implementation order (suggested)

1. **Set up the Astro project**, copy `styles.css` into `src/styles/tokens.css` + `src/styles/global.css`, load the three Google Fonts in the document head.
2. **Build the Layout** (Header + Footer) as Astro components; pass the active page key as a prop.
3. **Build the ⌘K palette** as a React island (`client:idle`) — Fuse.js over a generated `pages.json`.
4. **Build the IT/EN toggle** with proper routing.
5. **Port the Home** sections one by one. Cases is the only one needing client-side state (React island).
6. **Port the 6 other pages** — they're mostly static; only FAQ accordion and Contatti form need JS.
7. **Wire animations.css** + `motion.ts` IntersectionObserver scanner. Honor reduced motion.
8. **Wire the contact form** to Resend + a /api/contact route. Add reCAPTCHA v3 or Turnstile.
9. **Generate OG cards** with `@vercel/og`.
10. **Lighthouse pass** — target 100 / 100 / 100 / 100. Astro should give this for free; the only risk is the Google Fonts request.

---

## Notes

- The site uses **no emoji, no rounded corners, no gradients, no left-border accent cliché, no fake icon sets** by design. Keep it that way.
- The blue strut is the brand. If in doubt, use a blue 6px horizontal
  bar instead of any other accent.
- "Prime Steve Jobs" tone — confident, calm, plain language. Don't
  let copy drift toward marketing-speak ("transformative",
  "synergy", "cutting-edge").
- The current `image-slot` web component is a designer tool — replace
  with real `<picture>` (Astro Image / next/image) in production.
- Don't downsize the wordmark in the hero. It is the page.
