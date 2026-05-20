import type { Lang } from "../i18n/types";

export interface Course {
  lvl: string;
  t: string;
  price: string;
  h: string;
  items: string[];
}
export interface ScuolaPageData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  target: string;
  courses: Course[];
}

export const scuola: Record<Lang, ScuolaPageData> = {
  it: {
    crumb: "§04 · SCUOLA",
    h1Line1: "Insegnare",
    h1Line2: "quello che sappiamo.",
    lede: "Corsi e kit professionali per chi lavora con il web ogni giorno e per chi vuole imparare bene, dalla prima riga di codice.",
    target: "Per professionisti, team aziendali, studenti.",
    courses: [
      { lvl: "FONDAMENTA", t: "WordPress Gutenberg", price: "€ 600", h: "24 ore · 6 settimane", items: ["Blocchi nativi & custom", "theme.json a fondo", "Full-site editing", "Performance & accessibilità", "Progetto finale guidato"] },
      { lvl: "INTERMEDIO", t: "Front-end moderno", price: "€ 850", h: "32 ore · 8 settimane", items: ["HTML semantico, CSS moderno", "JavaScript senza framework", "Accessibilità (WCAG)", "Design systems & token", "Build & deploy"] },
      { lvl: "AVANZATO", t: "Back-end & API", price: "€ 950", h: "28 ore · 7 settimane", items: ["Node ed Express", "PHP moderno", "REST e GraphQL", "Database relazionali", "Sicurezza & autenticazione"] },
      { lvl: "KIT PRO", t: "Snippet WordPress", price: "€ 49", h: "Pacchetto digitale", items: ["80+ snippet pronti", "Documentazione in italiano", "Aggiornamenti a vita", "Licenza commerciale"] },
      { lvl: "KIT PRO", t: "Starter Next.js", price: "€ 79", h: "Repository + corso", items: ["Setup completo", "CMS headless", "Componenti base", "Autenticazione", "2 ore di video"] },
      { lvl: "AZIENDE", t: "Formazione su misura", price: "Su richiesta", h: "Da 1 giornata", items: ["Calibrata sui team", "Materiali brand-coerenti", "In aula o remoto", "Esercizi su casi reali", "Supporto post-aula"] },
    ],
  },
  en: {
    crumb: "§04 · SCHOOL",
    h1Line1: "Teach",
    h1Line2: "what we know.",
    lede: "Courses and pro kits for people who work on the web every day, and for those who want to learn well from the first line of code.",
    target: "For professionals, internal teams, students.",
    courses: [
      { lvl: "FOUNDATION", t: "WordPress Gutenberg", price: "€ 600", h: "24 hours · 6 weeks", items: ["Native & custom blocks", "theme.json in depth", "Full-site editing", "Performance & accessibility", "Guided final project"] },
      { lvl: "INTERMEDIATE", t: "Modern front-end", price: "€ 850", h: "32 hours · 8 weeks", items: ["Semantic HTML, modern CSS", "JavaScript without frameworks", "Accessibility (WCAG)", "Design systems & tokens", "Build & deploy"] },
      { lvl: "ADVANCED", t: "Back-end & APIs", price: "€ 950", h: "28 hours · 7 weeks", items: ["Node and Express", "Modern PHP", "REST and GraphQL", "Relational databases", "Security & auth"] },
      { lvl: "PRO KIT", t: "WordPress snippets", price: "€ 49", h: "Digital pack", items: ["80+ ready snippets", "Italian documentation", "Lifetime updates", "Commercial license"] },
      { lvl: "PRO KIT", t: "Next.js starter", price: "€ 79", h: "Repo + course", items: ["Full setup", "Headless CMS", "Base components", "Authentication", "2 hours of video"] },
      { lvl: "COMPANIES", t: "Bespoke training", price: "On request", h: "From 1 day", items: ["Calibrated for teams", "Brand-coherent materials", "On-site or remote", "Real-case exercises", "Post-class support"] },
    ],
  },
};
