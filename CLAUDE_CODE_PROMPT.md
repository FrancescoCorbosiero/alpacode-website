# Prompt for Claude Code

Paste this into Claude Code, in a fresh directory, with the
`design_reference/` folder available in the workspace.

---

I want you to implement the Alpacode Soluzioni Digitali corporate
website (variant v2) in production code, using the design reference in
`./design_reference/` and the spec in `./README.md`.

## Stack

- **Astro 5** + **TypeScript** (strict)
- **Vanilla CSS** with CSS custom properties (do **not** add Tailwind
  unless I explicitly ask later). Token system is already defined in
  `design_reference/styles.css` — lift it 1:1 into `src/styles/`.
- **React islands** only where genuine interactivity is needed:
  - `<CmdK />` — command palette (client:idle, Fuse.js for fuzzy match)
  - `<LangToggle />` — IT/EN segmented control (client:load)
  - `<Cases />` — Home §02 case picker (client:visible)
  - `<FaqList />` — accordion (client:visible)
  - `<ContactForm />` — Contatti page (client:idle)
- **Astro i18n routing** — `/` for IT, `/en/` for EN. Persist last
  language in a cookie + localStorage.
- **MDX collections** for `blog/` and `work/`; TS dictionaries for
  `courses`, `faq`, `services`, `business`, `pages` (nav).
- **Forms**: a `/api/contact.ts` route that posts to Resend. Add a
  honeypot field and Turnstile.
- **Animations**: pure CSS keyframes + a tiny IntersectionObserver
  scanner in `src/lib/motion.ts`. Honor `prefers-reduced-motion`. Do
  not pull in Framer Motion.
- **OG images** generated at build time with `@vercel/og`.
- **Hosting**: assume Vercel.

## Constraints

- **Pixel-perfect to the design reference.** When in doubt, open the
  HTML files in `./design_reference/` in a browser and match what you
  see, including the on-load hero sequence and scroll reveals.
- **Square corners everywhere.** No `border-radius`. No drop-shadow.
  No gradients.
- **The blue strut (`#3B72E9`, 6px tall, scaleX from 0 on reveal) is
  the brand.** It appears at the top of the header, under the hero
  wordmark, under section dividers, as the left edge of the active
  case-picker tab, as the quote bar, and across the top of the
  footer. Use it consistently.
- **Type pair is non-negotiable**: Archivo Black for display, Manrope
  for body, JetBrains Mono only for mono labels and numerals.
- **Bilingual IT/EN** with a persistent toggle. All page copy is in
  the prototype — copy it verbatim into a message catalog. The
  default landing is **Italian**.
- **No emoji** anywhere in the UI.
- **Accessibility**: semantic HTML, `aria-*` on tab/accordion
  patterns, keyboard reachable mega-menu, axe-core in CI.
- **Performance**: Lighthouse 100 on Performance, Accessibility,
  Best Practices, SEO. Self-host the fonts via fontsource.
- Business info is fixed: Nome **Soluzioni Digitali Alpacode**,
  sede **Monza · Milano · IT**, P. IVA **14463350968**, email
  **ciao@alpacode.it**, CTA principale **"Prenota una call" / "Book a call"**.

## Implementation order

1. Scaffold the Astro project with TS strict, ESLint, Prettier, and
   `astro-icon` if needed.
2. Copy the design tokens into `src/styles/tokens.css` (variables) and
   `src/styles/base.css` (resets + helpers). Lift `styles.css` from
   the reference, then split it into a `motion.css` and per-section
   CSS files.
3. Build the global `<Layout>`: `<Header>` + `<Footer>` + slot. Pass
   `active` and `lang` as props.
4. Build the static `<Hero>`, `<Verbs>`, `<Manifesto>`, `<CTAFinal>`
   Astro components. Mount the interactive `<Cases />` island for
   §02.
5. Build the 6 page templates (Servizi, Lavori, Scuola, Blog, FAQ,
   Contatti). Lavori cards consume an MDX collection.
6. Wire i18n: every page exists at `/` and `/en/`. The `<LangToggle />`
   island flips the URL prefix and writes the cookie.
7. Implement the `<CmdK />` palette with a build-time `search-index.json`
   that includes pages, courses, and actions. Cmd/Ctrl+K opens it.
8. Implement motion: a `data-reveal` attribute system + a
   `motion.ts` IntersectionObserver scanner that flips
   `data-shown="true"`. Use **data attributes**, not classes — React
   re-renders strip class additions made externally.
9. Implement the contact form with server-side validation + Resend.
   Add a thank-you state and a `?sent=1` URL pattern.
10. Generate OG cards (`@vercel/og`) for each route with the same
    Archivo Black + blue strut treatment.
11. Run Lighthouse and axe-core; fix anything that isn't 100/0.

## What to read first

- `./README.md` — the full design spec (palette, type, motion,
  section-by-section content, accessibility, i18n notes)
- `./design_reference/styles.css` — the source of truth for all tokens
- `./design_reference/animations.js` — the motion contract (selectors,
  timings, on-load gates)
- `./design_reference/components/Layout.jsx`, `Home.jsx`, `Pages.jsx` —
  the structure and copy of every page

## What NOT to do

- Don't ship the Babel-in-the-browser setup. The reference uses it
  because it's a static HTML prototype.
- Don't introduce a component library (Bootstrap, Chakra, Material).
- Don't change the palette, the type stack, or the structural rule
  ("blue strut + 1px borders + square corners"). If you think
  something needs to change, ask first.
- Don't replace the editorial layout with cards-with-shadows. This is
  brutalist editorial; that's the whole point of v2.
- Don't add stock icons. Where the design currently shows no icon,
  none is needed.

When you're done, deploy a preview to Vercel and link me the URL.
