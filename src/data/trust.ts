/* ============================================================
   Trust / credentials block — shared by the SMM and Partner
   landings so the authority story stays identical everywhere.

   Badges and proof tiles are IMAGE SLOTS: drop a file named
   src/assets/trust/<id>.<ext> (png/jpg/webp/avif/svg) and it
   renders automatically; until then an elegant bordered
   placeholder with the label is shown. Nothing breaks.

   Claims are sober and factual — no testimonials, no hype.
   ============================================================ */
import type { Lang } from "../i18n/types";

export interface TrustClaim {
  t: string;
  d: string;
}

export interface TrustSlot {
  /** File basename under src/assets/trust/, e.g. "badge-google". */
  id: string;
  label: Record<Lang, string>;
}

export interface TrustProof {
  id: string;
  caption: Record<Lang, string>;
}

/** Certification / platform badges — a quiet horizontal strip. */
export const TRUST_BADGES: TrustSlot[] = [
  { id: "badge-google", label: { it: "Google", en: "Google" } },
  { id: "badge-aws", label: { it: "AWS · CloudFront", en: "AWS · CloudFront" } },
  { id: "badge-ads", label: { it: "Google Ads", en: "Google Ads" } },
  { id: "badge-lighthouse", label: { it: "Lighthouse 100", en: "Lighthouse 100" } },
];

/** Larger proof tiles — screenshots of real results. */
export const TRUST_PROOF: TrustProof[] = [
  {
    id: "proof-ads",
    caption: {
      it: "Risultati di campagne Google Ads gestite per i clienti",
      en: "Results of Google Ads campaigns managed for clients",
    },
  },
  {
    id: "proof-work",
    caption: {
      it: "Risultati misurati sui progetti consegnati",
      en: "Measured results on delivered projects",
    },
  },
];

export const TRUST_CLAIMS: Record<Lang, TrustClaim[]> = {
  it: [
    {
      t: "Infrastruttura enterprise",
      d: "I siti che consegniamo girano su cloud AWS con CDN globale, certificato SSL e backup automatici. La stessa infrastruttura dei grandi, per ogni progetto.",
    },
    {
      t: "Performance misurabili",
      d: "Progettiamo per il massimo dei punteggi nei Core Web Vitals: velocità che Google premia e che i visitatori sentono.",
    },
    {
      t: "Insegniamo quello che facciamo",
      d: "Alpacode è anche scuola: corsi su WordPress, sviluppo e AI. Chi forma altri professionisti non può nascondersi dietro il gergo.",
    },
  ],
  en: [
    {
      t: "Enterprise infrastructure",
      d: "The sites we ship run on AWS cloud with a global CDN, SSL certificates and automatic backups. Big-league infrastructure, on every project.",
    },
    {
      t: "Measurable performance",
      d: "We design for top Core Web Vitals scores: the speed Google rewards and visitors feel.",
    },
    {
      t: "We teach what we do",
      d: "Alpacode is also a school: courses on WordPress, development and AI. Whoever trains other professionals can't hide behind jargon.",
    },
  ],
};
