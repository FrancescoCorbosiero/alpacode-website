import type { Lang } from "../i18n/types";

export interface ServiceMeta {
  k: string;
  v: string;
}
export interface ServiceRow {
  n: string;
  t: string;
  d: string;
  meta: ServiceMeta[];
}
export interface ServiziPageData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  rows: ServiceRow[];
}

export const servizi: Record<Lang, ServiziPageData> = {
  it: {
    crumb: "§02 · SERVIZI",
    h1Line1: "Costruire. Consigliare.",
    h1Line2: "Insegnare.",
    lede: "Tre aree, otto anni di pratica. Niente bundle gonfi, niente upsell. Ti diciamo prima cosa serve e quanto costa.",
    rows: [
      {
        n: "01",
        t: "Sviluppo siti & web app",
        d: "Costruiamo siti istituzionali, e-commerce, portali e prodotti SaaS su misura. WordPress quando ha senso, headless o Next.js quando serve di più. Il codice è scritto a mano, leggibile, documentato.",
        meta: [
          { k: "Stack", v: "WordPress · Next.js · Node" },
          { k: "Tempi", v: "da 4 a 12 settimane" },
          { k: "Da", v: "€ 8.000" },
        ],
      },
      {
        n: "02",
        t: "Software & integrazioni",
        d: "Back-end, automazioni, integrazioni con ERP e CRM, configuratori, dashboard interne. Trasformiamo file Excel in flussi che si tengono in piedi da soli.",
        meta: [
          { k: "Stack", v: "Node · PHP · PostgreSQL" },
          { k: "Tempi", v: "da 6 a 20 settimane" },
          { k: "Da", v: "€ 15.000" },
        ],
      },
      {
        n: "03",
        t: "Consulenza digitale",
        d: "Audit, scelta tecnologica, roadmap, selezione fornitori. Lavoriamo a fianco del cliente in italiano, senza fumo. A volte la consulenza si chiude in tre incontri.",
        meta: [
          { k: "Formato", v: "Remoto · in studio" },
          { k: "Tempi", v: "da 2 a 8 settimane" },
          { k: "Da", v: "€ 2.500" },
        ],
      },
      {
        n: "04",
        t: "Performance & SEO",
        d: "Misuriamo, miglioriamo Core Web Vitals, sistemiamo l'indicizzazione, scriviamo schema. Senza promesse magiche: solo cose che funzionano e si verificano.",
        meta: [
          { k: "Strumenti", v: "CrUX · GSC · Looker" },
          { k: "Tempi", v: "4 settimane" },
          { k: "Da", v: "€ 3.500" },
        ],
      },
      {
        n: "05",
        t: "Manutenzione & supporto",
        d: "Aggiornamenti, monitoraggio, sicurezza, backup, modifiche piccole e grandi. Un canale dedicato, risposte in mezza giornata lavorata.",
        meta: [
          { k: "Formato", v: "Mensile / annuale" },
          { k: "SLA", v: "8h lavorate" },
          { k: "Da", v: "€ 350/mese" },
        ],
      },
      {
        n: "06",
        t: "Corsi & kit professionali",
        d: "Formiamo team interni, professionisti e studenti. Materiali che restano dopo il corso, esercizi reali, supporto post-aula.",
        meta: [
          { k: "Formato", v: "In aula · Remoto" },
          { k: "Durata", v: "8 — 32 ore" },
          { k: "Da", v: "€ 600/persona" },
        ],
      },
    ],
  },
  en: {
    crumb: "§02 · SERVICES",
    h1Line1: "Build. Advise.",
    h1Line2: "Teach.",
    lede: "Three areas, eight years of practice. No inflated bundles, no upsell. We tell you up front what's needed and what it costs.",
    rows: [
      {
        n: "01",
        t: "Websites & web apps",
        d: "We build institutional sites, e-commerce, portals and custom SaaS products. WordPress when it fits, headless or Next.js when more is needed. Code written by hand, readable, documented.",
        meta: [
          { k: "Stack", v: "WordPress · Next.js · Node" },
          { k: "Lead time", v: "4 to 12 weeks" },
          { k: "From", v: "€ 8,000" },
        ],
      },
      {
        n: "02",
        t: "Software & integrations",
        d: "Back-end, automations, ERP/CRM integrations, configurators, internal dashboards. We turn Excel files into flows that stand on their own.",
        meta: [
          { k: "Stack", v: "Node · PHP · PostgreSQL" },
          { k: "Lead time", v: "6 to 20 weeks" },
          { k: "From", v: "€ 15,000" },
        ],
      },
      {
        n: "03",
        t: "Digital consulting",
        d: "Audits, tech choices, roadmaps, vendor selection. Plain language, no smoke. Sometimes a consulting engagement closes in three meetings.",
        meta: [
          { k: "Format", v: "Remote · in studio" },
          { k: "Lead time", v: "2 to 8 weeks" },
          { k: "From", v: "€ 2,500" },
        ],
      },
      {
        n: "04",
        t: "Performance & SEO",
        d: "We measure, improve Core Web Vitals, fix indexing, write schema. No magic promises: only things that work and can be verified.",
        meta: [
          { k: "Tools", v: "CrUX · GSC · Looker" },
          { k: "Lead time", v: "4 weeks" },
          { k: "From", v: "€ 3,500" },
        ],
      },
      {
        n: "05",
        t: "Maintenance & support",
        d: "Updates, monitoring, security, backups, small and large changes. A dedicated channel, replies in half a worked day.",
        meta: [
          { k: "Format", v: "Monthly / yearly" },
          { k: "SLA", v: "8 worked hours" },
          { k: "From", v: "€ 350/month" },
        ],
      },
      {
        n: "06",
        t: "Courses & pro kits",
        d: "We train internal teams, professionals and students. Materials that last beyond the course, real exercises, post-class support.",
        meta: [
          { k: "Format", v: "In person · Remote" },
          { k: "Duration", v: "8 — 32 hours" },
          { k: "From", v: "€ 600/person" },
        ],
      },
    ],
  },
};
