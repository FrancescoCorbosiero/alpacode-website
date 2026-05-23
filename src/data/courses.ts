import type { Lang } from "../i18n/types";

export interface Course {
  lvl: string;
  t: string;
  price: string;
  h: string;
  items: string[];
}
export interface LearningPageData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  target: string;
  courses: Course[];
}

export const learning: Record<Lang, LearningPageData> = {
  it: {
    crumb: "05 · LEARNING",
    h1Line1: "Insegnare",
    h1Line2: "quello che sappiamo.",
    lede: "Corsi e percorsi pratici per chi vuole imparare a muoversi nel digitale — dai primi passi fino agli approfondimenti, AI inclusa.",
    target: "Per professionisti, team aziendali, studenti.",
    courses: [
      { lvl: "FONDAMENTA", t: "WordPress Gutenberg", price: "Su richiesta", h: "24 ore · 6 settimane", items: ["Blocchi nativi & custom", "theme.json a fondo", "Full-site editing", "Performance & accessibilità", "Progetto finale guidato"] },
      { lvl: "INTERMEDIO", t: "Front-end moderno", price: "Su richiesta", h: "32 ore · 8 settimane", items: ["HTML semantico, CSS moderno", "JavaScript senza framework", "Accessibilità (WCAG)", "Design systems & token", "Build & deploy"] },
      { lvl: "INTERMEDIO", t: "WordPress + AI", price: "Su richiesta", h: "12 ore · 4 settimane", items: ["Automatizza la creazione di siti WordPress", "Generazione di contenuti e blocchi con l'AI", "Workflow editoriali assistiti", "Strumenti pratici già pronti", "Esempi reali e snippet"] },
      { lvl: "AVANZATO", t: "Back-end & API", price: "Su richiesta", h: "28 ore · 7 settimane", items: ["Node ed Express", "PHP moderno", "REST e GraphQL", "Database relazionali", "Sicurezza & autenticazione"] },
      { lvl: "AVANZATO", t: "WordPress with Sage Theme", price: "Su richiesta", h: "20 ore · 5 settimane", items: ["Roots Sage da zero", "Template Blade", "Webpack/Bud workflow", "Strutture custom & ACF", "Deploy professionale"] },
      { lvl: "AVANZATO", t: "Advanced Java with Spring Boot", price: "Su richiesta", h: "32 ore · 8 settimane", items: ["Java moderno (LTS)", "Spring Boot 3 a fondo", "API REST e validazione", "Sicurezza con Spring Security", "Test, profiling e deploy"] },
      { lvl: "KIT PRO", t: "Snippet WordPress", price: "Su richiesta", h: "Pacchetto digitale", items: ["80+ snippet pronti", "Documentazione in italiano", "Aggiornamenti a vita", "Licenza commerciale"] },
      { lvl: "KIT PRO", t: "Starter Next.js", price: "Su richiesta", h: "Repository + corso", items: ["Setup completo", "CMS headless", "Componenti base", "Autenticazione", "2 ore di video"] },
      { lvl: "AZIENDE", t: "Formazione su misura", price: "Su richiesta", h: "Da 1 giornata", items: ["Calibrata sui team", "Materiali brand-coerenti", "In aula o remoto", "Esercizi su casi reali", "Supporto post-aula"] },
    ],
  },
  en: {
    crumb: "05 · LEARNING",
    h1Line1: "Teach",
    h1Line2: "what we know.",
    lede: "Practical courses and paths for anyone who wants to find their way in digital — from first steps to deeper dives, AI included.",
    target: "For professionals, internal teams, students.",
    courses: [
      { lvl: "FOUNDATION", t: "WordPress Gutenberg", price: "On request", h: "24 hours · 6 weeks", items: ["Native & custom blocks", "theme.json in depth", "Full-site editing", "Performance & accessibility", "Guided final project"] },
      { lvl: "INTERMEDIATE", t: "Modern front-end", price: "On request", h: "32 hours · 8 weeks", items: ["Semantic HTML, modern CSS", "JavaScript without frameworks", "Accessibility (WCAG)", "Design systems & tokens", "Build & deploy"] },
      { lvl: "INTERMEDIATE", t: "WordPress + AI", price: "On request", h: "12 hours · 4 weeks", items: ["Automate WordPress site creation", "AI-generated content and blocks", "AI-assisted editorial workflows", "Ready-to-use practical tools", "Real examples and snippets"] },
      { lvl: "ADVANCED", t: "Back-end & APIs", price: "On request", h: "28 hours · 7 weeks", items: ["Node and Express", "Modern PHP", "REST and GraphQL", "Relational databases", "Security & auth"] },
      { lvl: "ADVANCED", t: "WordPress with Sage Theme", price: "On request", h: "20 hours · 5 weeks", items: ["Roots Sage from scratch", "Blade templates", "Webpack/Bud workflow", "Custom structures & ACF", "Professional deploy"] },
      { lvl: "ADVANCED", t: "Advanced Java with Spring Boot", price: "On request", h: "32 hours · 8 weeks", items: ["Modern Java (LTS)", "Spring Boot 3 in depth", "REST APIs and validation", "Security with Spring Security", "Testing, profiling and deploy"] },
      { lvl: "PRO KIT", t: "WordPress snippets", price: "On request", h: "Digital pack", items: ["80+ ready snippets", "Italian documentation", "Lifetime updates", "Commercial license"] },
      { lvl: "PRO KIT", t: "Next.js starter", price: "On request", h: "Repo + course", items: ["Full setup", "Headless CMS", "Base components", "Authentication", "2 hours of video"] },
      { lvl: "COMPANIES", t: "Bespoke training", price: "On request", h: "From 1 day", items: ["Calibrated for teams", "Brand-coherent materials", "On-site or remote", "Real-case exercises", "Post-class support"] },
    ],
  },
};
