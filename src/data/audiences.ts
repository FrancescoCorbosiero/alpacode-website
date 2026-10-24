/* ============================================================
   Audiences — who each marketing page speaks to.

   The campaign pages come in groups, one per kind of reader:
     attivita        own a business or a practice, need it online:
                     the /offerta/* campaigns, /social-media-manager
     professionisti  work with clients of their own and would bring
                     them digital work: /partner, /collabora-con-noi
     segnalatori     know someone who needs it: /voucher, both doors
     chi-fa-siti     build sites for clients themselves (developers,
                     web designers): /per-chi-fa-siti and its pages
   New groups get an audience-first path (/per-chi-fa-siti/…); the
   older pages keep the URLs their ads point to.

   Alpacode Studio (sites/studio, studio.alpacode.it), the house's
   marketing compartment, speaks to some of the same people in its own
   register, and its doors lead back here: docs/marketing-map.md.

   The landings' "other doors" (components/landing/Portals.astro)
   and the footer read this registry, so a new landing is one entry
   here. Accents are each page's own (styles/landing.css): a portal
   fills with the colour of the page it leads to.
   ============================================================ */
import type { Lang, Localized } from "../i18n/types";
import { localizePath } from "../i18n/utils";
import { CAMPAIGNS } from "./campaigns";

export type AudienceId = "attivita" | "professionisti" | "segnalatori" | "chi-fa-siti";

export const AUDIENCES: Record<AudienceId, { label: Localized }> = {
  attivita: { label: { it: "Per chi ha un'attività", en: "For business owners" } },
  professionisti: { label: { it: "Per chi lavora con i clienti", en: "For people with clients" } },
  segnalatori: { label: { it: "Per chi conosce qualcuno", en: "For people who know someone" } },
  "chi-fa-siti": { label: { it: "Per chi fa siti", en: "For people who build sites" } },
};

export interface LandingEntry {
  /** Path as localizePath takes it (no language prefix, no slashes). */
  slug: string;
  audience: AudienceId;
  /** The line a portal shows: what the page offers. */
  title: Localized;
  /** Who it's for, above the line. */
  for: Localized;
  accent: string;
  /** Text on the accent. */
  accentOn: string;
}

const INK = "#0b0e14";
const PAPER = "#f0f3f9";

export const LANDINGS: LandingEntry[] = [
  {
    slug: "per-chi-fa-siti",
    audience: "chi-fa-siti",
    title: { it: "Hosting tuo e siti con l'AI.", en: "Your own hosting, sites with AI." },
    for: { it: "Per sviluppatori e web designer", en: "For developers and web designers" },
    accent: "#2ee6c5",
    accentOn: INK,
  },
  {
    slug: "per-chi-fa-siti/hosting",
    audience: "chi-fa-siti",
    title: { it: "Smetti di pagare un hosting per ogni cliente.", en: "Stop paying a hosting plan per client." },
    for: { it: "Per chi fa siti ai clienti", en: "For people who build client sites" },
    accent: "#2ee6c5",
    accentOn: INK,
  },
  {
    slug: "per-chi-fa-siti/ai",
    audience: "chi-fa-siti",
    title: { it: "Sforna siti per i clienti, con l'AI.", en: "Turn out client sites, with AI." },
    for: { it: "Per sviluppatori e web designer", en: "For developers and web designers" },
    accent: "#ff6b1a",
    accentOn: INK,
  },
  {
    slug: "social-media-manager",
    audience: "attivita",
    title: { it: "Il sito per chi gestisce i social degli altri.", en: "The site for people who run other people's socials." },
    for: { it: "Per social media manager e creator", en: "For social media managers and creators" },
    accent: "#ff2e88",
    accentOn: INK,
  },
  ...CAMPAIGNS.filter((c) => c.slug !== "social-media-manager").map(
    (c): LandingEntry => ({
      slug: `offerta/${c.slug}`,
      audience: "attivita",
      title: c.portal,
      for: c.audience,
      accent: "#3b72e9",
      accentOn: "#ffffff",
    }),
  ),
  {
    slug: "partner",
    audience: "professionisti",
    title: { it: "Porta il digitale ai tuoi clienti, senza farlo tu.", en: "Bring digital to your clients without doing it yourself." },
    for: { it: "Per chi ha un portafoglio clienti", en: "For people with a client portfolio" },
    accent: "#2fe08a",
    accentOn: INK,
  },
  {
    slug: "collabora-con-noi",
    audience: "professionisti",
    title: { it: "Lavora ai nostri progetti, da indipendente.", en: "Work on our projects, as an independent." },
    for: { it: "Per professionisti con partita IVA", en: "For independent professionals" },
    accent: "#3b72e9",
    accentOn: "#ffffff",
  },
  {
    slug: "voucher",
    audience: "segnalatori",
    title: { it: "Segnala un amico: fino a 100 € per te.", en: "Refer a friend: up to €100 for you." },
    for: { it: "Per chi conosce qualcuno a cui serve un sito", en: "For people who know someone who needs a site" },
    accent: "#3b72e9",
    accentOn: "#ffffff",
  },
  {
    slug: "voucher/nuova-attivita",
    audience: "segnalatori",
    title: { it: "Conosci chi ha appena aperto? Segnalacelo.", en: "Know someone who just opened? Tell us." },
    for: { it: "Per chi conosce una nuova attività", en: "For people who know a new business" },
    accent: "#3b72e9",
    accentOn: "#ffffff",
  },
];

/** Pages that aren't landings but belong next to some of them. */
const RELATED: Record<string, Omit<LandingEntry, "slug" | "audience">> = {
  learning: {
    title: { it: "Corsi e formazione, AI inclusa.", en: "Courses and training, AI included." },
    for: { it: "Learning", en: "Learning" },
    accent: INK,
    accentOn: PAPER,
  },
  "alpacode-pro-kit": {
    title: { it: "Alpacode Pro Kit: il kit del web master.", en: "Alpacode Pro Kit: the web master's kit." },
    for: { it: "Prodotti", en: "Products" },
    accent: "#e63422",
    accentOn: "#ffffff",
  },
};

export interface Portal {
  href: string;
  for: string;
  title: string;
  accent: string;
  accentOn: string;
}

/** Portals to the given pages (landings or related pages), in order. */
export function portals(slugs: string[], lang: Lang): Portal[] {
  return slugs.flatMap((slug) => {
    const e = LANDINGS.find((l) => l.slug === slug) ?? RELATED[slug];
    if (!e) return [];
    return [{ href: localizePath(slug, lang), for: e.for[lang], title: e.title[lang], accent: e.accent, accentOn: e.accentOn }];
  });
}

/** The other landings of an audience group, this page left out. A page
 *  that isn't in the registry (the SMM campaign's twin of
 *  /social-media-manager) names its group. */
export function siblings(slug: string, audience?: AudienceId): string[] {
  const group = LANDINGS.find((l) => l.slug === slug)?.audience ?? audience;
  return group ? LANDINGS.filter((l) => l.audience === group && l.slug !== slug).map((l) => l.slug) : [];
}
