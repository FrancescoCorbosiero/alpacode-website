# The marketing map — the house and its compartments

Alpacode is one name with one house and, around it, compartments: a line
of work that runs on its own subdomain, with its own register and its own
way of finding clients. The house includes them ("Alpacode ingloba
studio.alpacode", the owner): it talks to the same people, opens each
compartment's door wherever it talks about that work, and every
compartment signs as Alpacode and leads back home.

| | **alpacode.it** — the house | **studio.alpacode.it** — Alpacode Studio |
| --- | --- | --- |
| Direction | inbound: people come to us ("VENIAMO contattati NOI") | outbound: we go and find them ("NOI contattiamo LORO") |
| Does | IT consulting, digitalization, automation, sites and e-commerce, custom software, LLM integrations, professional training; the programs (partner, referral) | marketing: social and content, brand, UX and the user journey, campaigns, SEO, strategy; small products bought on the site |
| Voice | authoritative, sharp, minimal, never corporate: a small studio (a ditta individuale) that knows its craft. The copy is already good: refine it, don't rewrite it | young, direct, provocative and honest: the worry named and turned around in the same line. A website, not Instagram: no DM keywords |
| Languages | IT + EN, always both | IT |
| Look | the editorial blueprint: Archivo Black + Manrope (+ Caveat for the studio's notes), the blue `#3B72E9`, paper and ink, square corners | ink and volt `#D4FF3A`, rounded, a colour per door |
| Channel | Google (SEO), word of mouth, the landings' ads | SEO, ads, social content that points to the site |
| Converts with | a form, a call | a purchase on the site (Lemon Squeezy, Gumroad or Stripe), the contact form, a call |
| Code | `src/` (the landing kit: `docs/landing-factory.md`) | `sites/studio/` (`sites/studio/README.md`) |

The registry is `shared/data/compartments.ts` (name, origin, line, accent,
languages). `doorTo(id, path, from)` builds a link to a compartment and
tags it `utm_source=<site>&utm_medium=door&utm_campaign=<where>`, so each
side's analytics see where a visitor came through. Future compartments
get a subdomain each (the `new-compartment` skill).

**Why two sites.** The studio's register would lower the house's voice,
and the house's would slow the studio down. A subdomain keeps the name —
every studio page carries the house's signature (`House.astro`) — while
search, analytics and tone stay apart. The referral program went the
other way: it lives inside alpacode.it because it speaks like the house.

## Where the doors are

On the house, the studio's door is wherever the house talks about its
work:

- the mega menu: the "Far crescere" column (social, brand, campaigns)
  leads to the studio (`src/data/mega.ts`);
- `/servizi`: the growth group's door; `/prodotti`: Brand Kit and
  Landing & ADV are "Su Alpacode Studio";
- the footer's "Le porte", the ⌘K palette, the learning page's studio
  card.

On the studio, the home's doors are one per reader; the last two open on
the house (`/per-chi-fa-siti`, `/voucher`), and the header and the
signature lead back to alpacode.it.

## The audiences

| Reader | Where | What they find | Next |
| --- | --- | --- | --- |
| Businesses and professionals who need a site, an e-commerce, a tool | alpacode.it (home, `/servizi`, `/lavori`) | the work done for you; the showcase; the method | a call, the contact form |
| The audiences of the campaigns: small businesses, professionals, coaches, educators, wellness | `/offerta/*` (`src/data/campaigns.ts`) | a site at a yearly fee, said in the house's voice | the landing's form |
| People who build sites (developers, web designers) | `/per-chi-fa-siti/` (hosting, AI) | the codebase, the course, 1:1 | the form |
| Agencies | `/partner` | the three models (refer, resell, swap) | the application |
| Social media managers and creators | `/social-media-manager` | their brand on their own domain | the form |
| People who know someone | `/voucher` (+ `/nuova-attivita`) | the referral program | their link |
| People who want to be seen, remembered, chosen | studio.alpacode.it | social, brand, UX, campaigns, SEO; the packages | the form, a package |
| People who want to do it themselves | studio `/prodotti` | the site guide (22 €, + marketing module 48 €), the crash course *AI al lavoro* | the checkout |

The house's audience registry (which page speaks to whom, the "other
doors") is `src/data/audiences.ts`; the studio's doors are
`sites/studio/src/data/pages.ts`.

## The ladder

0. **Free content** — the blog (the house), the studio's social posts.
1. **The way in** — the studio's products: the site guide (22 €), the
   marketing module (+48 €), the crash course (price to set).
2. **The packages** — Social Start, Social ogni mese, Brand Kit, Landing
   & ADV (prices to set).
3. **The house** — done for you: sites and e-commerce at a yearly fee
   (`/offerta/*`), software, LLM integrations, consulting, training; the
   builders' formula; the partner program.

## The two registers

- **The house**: never the aggressive register. Objections are answered
  calmly where they arise (the AI one on `/per-chi-fa-siti/ai` and
  `/partner`).
- **The studio** may provoke: a question that names the worry, answered
  in the same line ("Il tuo brand si perde nel feed? → si fa ricordare").
  One promise per line, prices stated.
- **Neither**: countdowns, invented scarcity, invented numbers,
  testimonials or income claims, placeholder proof, the price-reassurance
  tic (`docs/landing-factory.md`), "gratis" where it isn't, digs at a
  group we also sell to.

## FAST, retired

Alpacode FAST (fast.alpacode.it, `fast/`) was the social register's first
site: DM keywords, small products. The owner retired it ("FAST per ora
sparisce"); it never went online (no DNS). Its products moved to the
studio, its look became the studio's, its DM keywords were dropped. The
code is in the git history before the studio commit.

## Still to decide

- The packages' prices and the crash course's; the checkout links of
  every product (`sites/studio/src/data/products.ts`, `packages.ts`).
- The real contents of the guide, the module and the course.
- Whether the studio needs English.
- The next compartment, when there is one.
