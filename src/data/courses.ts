import type { Lang } from "../i18n/types";
import { doorTo } from "@shared/data/compartments";

/** The studio sells the do-it-yourself products (studio.alpacode.it/prodotti). */
const studioProducts = doorTo("studio", "/prodotti/", { site: "house", where: "learning" });

export interface Course {
  lvl: string;
  t: string;
  h: string;
  items: string[];
  /** A course that lives in a compartment (Alpacode Studio): its link and
   *  button label, in place of the call booking. */
  href?: string;
  cta?: string;
}
export interface LearningPageData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  target: string;
  /** The scrubbed sentence after the course grid. */
  statement: string;
  courses: Course[];
}

export const learning: Record<Lang, LearningPageData> = {
  it: {
    crumb: "Learning",
    h1Line1: "Insegnare",
    h1Line2: "quello che sappiamo.",
    lede: "Corsi e percorsi pratici per chi vuole imparare a muoversi nel digitale — dai primi passi fino agli approfondimenti, AI inclusa.",
    target: "Per professionisti, team aziendali, studenti.",
    statement: "Quello che impariamo lo restituiamo in corsi, guide e risorse. La conoscenza serve poco se resta chiusa.",
    courses: [
      { lvl: "Fai da te", t: "Guide e corsi brevi", h: "Su Alpacode Studio", items: ["Il tuo sito vetrina, da solo, con l'AI", "Il modulo Marketing", "AI al lavoro, per partite IVA", "Da comprare sul sito, in digitale"], href: studioProducts, cta: "Vai allo studio" },
      { lvl: "Fondamenta", t: "WordPress Gutenberg", h: "24 ore · 6 settimane", items: ["Blocchi nativi & custom", "theme.json a fondo", "Full-site editing", "Performance & accessibilità", "Progetto finale guidato"] },
      { lvl: "Intermedio", t: "Front-end moderno", h: "32 ore · 8 settimane", items: ["HTML semantico, CSS moderno", "JavaScript senza framework", "Accessibilità (WCAG)", "Design systems & token", "Build & deploy"] },
      { lvl: "Intermedio", t: "WordPress + AI", h: "12 ore · 4 settimane", items: ["Automatizza la creazione di siti WordPress", "Generazione di contenuti e blocchi con l'AI", "Workflow editoriali assistiti", "Strumenti pratici già pronti", "Esempi reali e snippet"] },
      { lvl: "Avanzato", t: "Back-end & API", h: "28 ore · 7 settimane", items: ["Node ed Express", "PHP moderno", "REST e GraphQL", "Database relazionali", "Sicurezza & autenticazione"] },
      { lvl: "Avanzato", t: "WordPress with Sage Theme", h: "20 ore · 5 settimane", items: ["Roots Sage da zero", "Template Blade", "Webpack/Bud workflow", "Strutture custom & ACF", "Deploy professionale"] },
      { lvl: "Avanzato", t: "Advanced Java with Spring Boot", h: "32 ore · 8 settimane", items: ["Java moderno (LTS)", "Spring Boot 3 a fondo", "API REST e validazione", "Sicurezza con Spring Security", "Test, profiling e deploy"] },
      { lvl: "Kit pro", t: "Snippet WordPress", h: "Pacchetto digitale", items: ["80+ snippet pronti", "Documentazione in italiano", "Aggiornamenti a vita", "Licenza commerciale"] },
      { lvl: "Kit pro", t: "Starter Next.js", h: "Repository + corso", items: ["Setup completo", "CMS headless", "Componenti base", "Autenticazione", "2 ore di video"] },
      { lvl: "Aziende", t: "Formazione su misura", h: "Da 1 giornata", items: ["Calibrata sui team", "Materiali brand-coerenti", "In aula o remoto", "Esercizi su casi reali", "Supporto post-aula"] },
    ],
  },
  en: {
    crumb: "Learning",
    h1Line1: "Teach",
    h1Line2: "what we know.",
    lede: "Practical courses and paths for anyone who wants to find their way in digital — from first steps to deeper dives, AI included.",
    target: "For professionals, internal teams, students.",
    statement: "What we learn we give back as courses, guides and resources. Knowledge serves little if it stays locked away.",
    courses: [
      { lvl: "DIY", t: "Guides and short courses", h: "On Alpacode Studio, in Italian", items: ["Your showcase site, on your own, with AI", "The marketing module", "AI at work, for freelancers", "Bought online, delivered digitally"], href: studioProducts, cta: "Go to the studio" },
      { lvl: "Foundation", t: "WordPress Gutenberg", h: "24 hours · 6 weeks", items: ["Native & custom blocks", "theme.json in depth", "Full-site editing", "Performance & accessibility", "Guided final project"] },
      { lvl: "Intermediate", t: "Modern front-end", h: "32 hours · 8 weeks", items: ["Semantic HTML, modern CSS", "JavaScript without frameworks", "Accessibility (WCAG)", "Design systems & tokens", "Build & deploy"] },
      { lvl: "Intermediate", t: "WordPress + AI", h: "12 hours · 4 weeks", items: ["Automate WordPress site creation", "AI-generated content and blocks", "AI-assisted editorial workflows", "Ready-to-use practical tools", "Real examples and snippets"] },
      { lvl: "Advanced", t: "Back-end & APIs", h: "28 hours · 7 weeks", items: ["Node and Express", "Modern PHP", "REST and GraphQL", "Relational databases", "Security & auth"] },
      { lvl: "Advanced", t: "WordPress with Sage Theme", h: "20 hours · 5 weeks", items: ["Roots Sage from scratch", "Blade templates", "Webpack/Bud workflow", "Custom structures & ACF", "Professional deploy"] },
      { lvl: "Advanced", t: "Advanced Java with Spring Boot", h: "32 hours · 8 weeks", items: ["Modern Java (LTS)", "Spring Boot 3 in depth", "REST APIs and validation", "Security with Spring Security", "Testing, profiling and deploy"] },
      { lvl: "Pro kit", t: "WordPress snippets", h: "Digital pack", items: ["80+ ready snippets", "Italian documentation", "Lifetime updates", "Commercial license"] },
      { lvl: "Pro kit", t: "Next.js starter", h: "Repo + course", items: ["Full setup", "Headless CMS", "Base components", "Authentication", "2 hours of video"] },
      { lvl: "Companies", t: "Bespoke training", h: "From 1 day", items: ["Calibrated for teams", "Brand-coherent materials", "On-site or remote", "Real-case exercises", "Post-class support"] },
    ],
  },
};
