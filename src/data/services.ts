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
    lede: "Tre aree, un solo metodo: capire cosa serve davvero e trovare la soluzione più adatta — anche al tuo budget.",
    rows: [
      {
        n: "01",
        t: "Sviluppo siti & web app",
        d: "Costruiamo siti, e-commerce, portali e prodotti digitali su misura. Soluzioni curate, pensate per durare e semplici da gestire nel tempo.",
        meta: [
          { k: "Stack", v: "WordPress · Next.js · Node" },
          { k: "Tempi", v: "da 4 a 12 settimane" },
          { k: "Preventivo", v: "Su misura" },
        ],
      },
      {
        n: "02",
        t: "Software & integrazioni",
        d: "Back-end, automazioni, integrazioni con ERP e CRM, configuratori, dashboard interne. Trasformiamo fogli di calcolo in flussi che si tengono in piedi da soli.",
        meta: [
          { k: "Stack", v: "Node · PHP · PostgreSQL" },
          { k: "Tempi", v: "da 6 a 20 settimane" },
          { k: "Preventivo", v: "Su misura" },
        ],
      },
      {
        n: "03",
        t: "Consulenza digitale",
        d: "Audit, scelta della tecnologia, roadmap, selezione fornitori. Lavoriamo a fianco del cliente, in italiano e senza fumo. A volte basta qualche incontro.",
        meta: [
          { k: "Formato", v: "Remoto · in studio" },
          { k: "Tempi", v: "da 2 a 8 settimane" },
          { k: "Preventivo", v: "Su misura" },
        ],
      },
      {
        n: "04",
        t: "Performance & SEO",
        d: "Misuriamo, miglioriamo i Core Web Vitals, sistemiamo l'indicizzazione. Senza promesse magiche: solo cose che funzionano e si verificano.",
        meta: [
          { k: "Strumenti", v: "CrUX · GSC · Looker" },
          { k: "Tempi", v: "4 settimane" },
          { k: "Preventivo", v: "Su misura" },
        ],
      },
      {
        n: "05",
        t: "Manutenzione & supporto",
        d: "Aggiornamenti, monitoraggio, sicurezza, backup, modifiche piccole e grandi. Un canale dedicato, risposte in mezza giornata lavorata.",
        meta: [
          { k: "Formato", v: "Mensile / annuale" },
          { k: "SLA", v: "8h lavorate" },
          { k: "Preventivo", v: "Su misura" },
        ],
      },
      {
        n: "06",
        t: "Corsi & risorse",
        d: "Formiamo team, professionisti e chi inizia. Materiali che restano dopo il corso, esempi concreti, supporto anche dopo l'aula.",
        meta: [
          { k: "Formato", v: "In aula · Remoto" },
          { k: "Durata", v: "8 — 32 ore" },
          { k: "Preventivo", v: "Su misura" },
        ],
      },
    ],
  },
  en: {
    crumb: "§02 · SERVICES",
    h1Line1: "Build. Advise.",
    h1Line2: "Teach.",
    lede: "Three areas, one method: understand what you actually need and find the right solution — for your budget too.",
    rows: [
      {
        n: "01",
        t: "Websites & web apps",
        d: "We build websites, e-commerce, portals and custom digital products. Thoughtful solutions, made to last and easy to maintain over time.",
        meta: [
          { k: "Stack", v: "WordPress · Next.js · Node" },
          { k: "Lead time", v: "4 to 12 weeks" },
          { k: "Quote", v: "Tailored" },
        ],
      },
      {
        n: "02",
        t: "Software & integrations",
        d: "Back-end, automations, ERP/CRM integrations, configurators, internal dashboards. We turn spreadsheets into flows that stand on their own.",
        meta: [
          { k: "Stack", v: "Node · PHP · PostgreSQL" },
          { k: "Lead time", v: "6 to 20 weeks" },
          { k: "Quote", v: "Tailored" },
        ],
      },
      {
        n: "03",
        t: "Digital consulting",
        d: "Audits, tech choices, roadmaps, vendor selection. We work next to the client, plainly, no smoke. Sometimes a few meetings are enough.",
        meta: [
          { k: "Format", v: "Remote · in studio" },
          { k: "Lead time", v: "2 to 8 weeks" },
          { k: "Quote", v: "Tailored" },
        ],
      },
      {
        n: "04",
        t: "Performance & SEO",
        d: "We measure, improve Core Web Vitals, fix indexing. No magic promises: only things that work and can be verified.",
        meta: [
          { k: "Tools", v: "CrUX · GSC · Looker" },
          { k: "Lead time", v: "4 weeks" },
          { k: "Quote", v: "Tailored" },
        ],
      },
      {
        n: "05",
        t: "Maintenance & support",
        d: "Updates, monitoring, security, backups, small and large changes. A dedicated channel, replies in half a worked day.",
        meta: [
          { k: "Format", v: "Monthly / yearly" },
          { k: "SLA", v: "8 worked hours" },
          { k: "Quote", v: "Tailored" },
        ],
      },
      {
        n: "06",
        t: "Courses & resources",
        d: "We train teams, professionals and beginners. Materials that last beyond the course, real examples, support after class too.",
        meta: [
          { k: "Format", v: "In person · Remote" },
          { k: "Duration", v: "8 — 32 hours" },
          { k: "Quote", v: "Tailored" },
        ],
      },
    ],
  },
};
