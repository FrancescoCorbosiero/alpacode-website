# The marketing map — two sites, five audiences, one ladder

Alpacode speaks to the same people in two registers, on two sites that
share a name.

| | **alpacode.it** — the studio | **fast.alpacode.it** — Alpacode FAST |
| --- | --- | --- |
| Sells | the work done for you: sites, software, programs, training for pros | doing it yourself: guides and crash courses — and sends the big jobs to the studio |
| Tone | professional, concrete, calm | social: one hook per line, the fear named and turned around on the spot |
| Channel | Google (SEO), ads to the landings, word of mouth | Instagram and TikTok (reels, carousels), LinkedIn for freelancers; link in bio |
| Converts with | a form, a call | a DM keyword (WhatsApp, Instagram), a checkout of 22–70 € |
| Prices | 300–450 €/year; the builders' formula on request | 22 € · +48 € · the crash course (price to set) |
| Counts | qualified leads | DMs per keyword, sales, hand-offs to the studio |
| Code | `src/` (the landing kit: `docs/landing-factory.md`) | `fast/` (its own Astro site: `fast/README.md`) |

**Why two sites.** "Why pay thousands of euros for a site?" can't sit on
the domain that sells sites at 300 €/year: on its own subdomain the
aggressive register reaches people the studio never would (they want to
do it themselves, they buy on impulse from a reel) without lowering the
studio's voice. A subdomain keeps the Alpacode name — every guide is
*signed* Alpacode — while search, analytics and tone stay apart. (The
referral program went the other way: it moved *into* alpacode.it because
it speaks like the studio.)

---

## The audiences, remapped

The four groups of `src/data/audiences.ts` (social media managers are
their own door on FAST): for each, the fear or the FOMO the social hook
names, the turn, where FAST takes them and what the studio offers next.

| Audience | The fear / FOMO | The turn (FAST) | FAST door · product | DM keyword | Next, at the studio |
| --- | --- | --- | --- | --- | --- |
| **People who want a site of their own** (small businesses, DIY) | "a site costs thousands" | "Un sito vetrina costa zero. Lo fai tu." | `/sito` · Guide 22 € + Marketing module 48 € | `SITO` | `/offerta/*` — we build it for you (300 €/year) |
| **Freelancers** (partita IVA) | "AI will take my job" | "Temi l'AI? Cavalcala." | `/ai` · crash course *AI al lavoro* + your site made with AI, hosted free the first year | `AI` | `/partner` (bring digital to your clients), `/offerta/liberi-professionisti` |
| **People who build sites** (developers, web designers) | "clients make their own sites with AI now" | "L'AI fa i siti per te." | `/code` · door | `CODE` | `/per-chi-fa-siti` — codebase / course + codebase / 1:1 |
| **Social media managers, creators** | "your brand is a link in bio" | "Il tuo brand, sul tuo dominio." | `/bio` · door | `BIO` | `/social-media-manager` (300 €/year) |
| **People who know someone** | "you know who just opened" | "Segnalarlo vale fino a 100 €." | `/amico` · door | `AMICO` | `/voucher`, `/voucher/nuova-attivita` |

`FAST` — the master keyword — opens the chooser (`/`).

## The ladder

0. **Free content** — a reel or a carousel with the hook: "commenta SITO".
1. **The DM** — the automation answers with the door's link (UTM-tagged).
2. **The way in** — the site guide, 22 €.
3. **The add-on** — the marketing module, +48 € (guide + module: 70 €).
4. **The crash course** for freelancers — price to set.
5. **What recurs** — the site built in the course, hosted by us: free the
   first year, a yearly fee from the second.
6. **The studio** — done for you (300–450 €/year), the builders' formula,
   the partner program. Every FAST page ends on that door.

## The DM keywords

| Keyword | Door | Leads to |
| --- | --- | --- |
| `FAST` | `/` | the chooser |
| `SITO` | `/sito` | the site guide (+ marketing) |
| `AI` | `/ai` | the crash course |
| `CODE` | `/code` | → alpacode.it/per-chi-fa-siti/ |
| `BIO` | `/bio` | → alpacode.it/social-media-manager/ |
| `AMICO` | `/amico` | → alpacode.it/voucher/ |

One keyword per post. The site's own buttons open WhatsApp with the
keyword already typed (`wa.me/…?text=SITO`) and, once the handle is set,
the Instagram DM. What the automation answers to each keyword is drafted
as the chat in each door's hero (`reply` in `fast/src/data/doors.ts`). Links from FAST to the studio carry
`utm_source=fast&utm_medium=social&utm_campaign=<door>`.

## The hooks, in both registers

The brief's punchlines, as FAST says them and as the studio would.

| The brief | FAST | alpacode.it |
| --- | --- | --- |
| "Hai paura che l'AI ti rubi il lavoro? Sfrutta l'AI per creare altro lavoro!" | "L'AI ti ruba il lavoro? → L'AI ti porta lavoro." | "L'AI toglie lavoro a chi la subisce. A chi la usa con metodo toglie la parte ripetitiva." (objection on `/per-chi-fa-siti/ai`) |
| "Perché temere l'AI quando puoi cavalcarla?" | "Temi l'AI? → Cavalca l'AI." | — |
| "Con un approccio corretto, l'AI può fare il lavoro di un team in poche ore" | "Con l'approccio giusto, l'AI fa in poche ore il lavoro di un team." | "Con un metodo, l'AI fa in ore il lavoro ripetitivo che chiedeva un team." |
| "Perché pagare un web designer o uno sviluppatore / migliaia di euro per un sito quando puoi crearlo gratis? Alpacode ti mostra come, paghi a partire dal secondo anno." | "Perché pagare migliaia di euro per un sito? Fattelo con l'AI: il primo anno è gratis." — without the dig at web designers: FAST sells to them too (`/code`) | — (the studio sells the site done for you) |
| "Vuoi creare il tuo sito vetrina gratuitamente? Guida 22 € (+ marketing 48 €)" | "Un sito vetrina costa migliaia di euro? → Costa zero. La guida: 22 €." | — |
| (partners) | — | "L'AI farà fare tutto da soli ai miei clienti? Qualcuno ci proverà; gli altri cercano chi lo fa bene, e si fidano di chi conoscono." (objection on `/partner`) |

## FAST's rules

- **Allowed**: provocative questions, the fear named — and turned around
  in the same line or the same screen; one promise per line; prices
  stated.
- **Not allowed**: countdowns and invented scarcity; invented numbers,
  testimonials or income claims ("guadagna X € al mese"); the
  price-reassurance tic (see the landing factory's house rules); "gratis"
  where it isn't; digs at a group FAST also sells to; promises about time
  or results nobody can keep.
- **Every page**: its keyword, a price or the DM, the signature (the
  studio behind it, with its real work at alpacode.it/lavori), the door
  back to the studio.

## Still to decide

- The crash course's price; the yearly fee from the second year and what
  the free first year includes (hosting, domain, email?).
- Checkout: a merchant of record (Lemon Squeezy, Gumroad, Paddle) handles
  EU VAT on digital products for you; its links go in
  `fast/src/data/products.ts`. Until then the buttons send the keyword.
- The Instagram handle (`fast/src/data/site.ts`).
- The real contents of the guide, the module and the course: the pages
  describe a draft, to line up with the products.
- Consumer prices are shown VAT included: 22 € and 48 € are read as
  final prices.
