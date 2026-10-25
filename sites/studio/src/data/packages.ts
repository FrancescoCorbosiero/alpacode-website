/* ============================================================
   The packages: marketing with a defined scope, ready to start.
   `price: null` shows "Su richiesta" (the prices are to be set:
   docs/status.md); a package with a `checkout` (data/products.ts,
   Checkout) can be bought from the page, the others open the
   contact form with the package already chosen.
   ============================================================ */
import type { Checkout } from "./products";

export interface Package {
  id: string;
  name: string;
  /** Which verb it serves (data/services.ts). */
  tag: string;
  forWho: string;
  blurb: string;
  includes: string[];
  meta: { k: string; v: string }[];
  /** Euro, VAT excluded for businesses; null shows "Su richiesta". */
  price: number | null;
  /** What the price is for ("una tantum", "al mese"). */
  per?: string;
  checkout: Checkout | null;
  accent: string;
  featured?: boolean;
}

export const PACKAGES: Package[] = [
  {
    id: "social-start",
    name: "Social Start",
    tag: "Farsi vedere",
    forWho: "Per chi vuole partire bene sui social",
    blurb: "I profili sistemati, una linea grafica riconoscibile e il primo mese di contenuti già pronti.",
    includes: ["Analisi e sistemazione dei profili", "La linea grafica dei post", "Il piano editoriale del primo mese", "I contenuti del primo mese"],
    meta: [
      { k: "Durata", v: "Un mese" },
      { k: "Canali", v: "Instagram · Facebook · TikTok" },
    ],
    price: null,
    per: "una tantum",
    checkout: null,
    accent: "#ff2e88",
  },
  {
    id: "social-mese",
    name: "Social ogni mese",
    tag: "Farsi vedere",
    forWho: "Per chi vuole i social seguiti, tutti i mesi",
    blurb: "La gestione continuativa: piano, contenuti, community e numeri, ogni mese.",
    includes: ["Il piano editoriale mensile", "Post, reel e caroselli", "La gestione della community", "Il report del mese"],
    meta: [
      { k: "Durata", v: "Mensile" },
      { k: "Canali", v: "Da scegliere insieme" },
    ],
    price: null,
    per: "al mese",
    checkout: null,
    accent: "#ff2e88",
    featured: true,
  },
  {
    id: "brand-kit",
    name: "Brand Kit",
    tag: "Farsi ricordare",
    forWho: "Per chi parte da zero o rinnova",
    blurb: "Logo, colori e identità visiva pronti all'uso: tutto quello che serve per presentarti bene, ovunque.",
    includes: ["Logo e varianti", "Palette e caratteri", "Linee guida d'uso", "Template per i social", "Biglietti e firme email"],
    meta: [
      { k: "Tempi", v: "Circa due settimane" },
      { k: "Consegna", v: "File pronti all'uso" },
    ],
    price: null,
    per: "una tantum",
    checkout: null,
    accent: "#ff6b1a",
  },
  {
    id: "landing-adv",
    name: "Landing & ADV",
    tag: "Farsi scegliere",
    forWho: "Per un lancio, un evento, una promozione",
    blurb: "Una pagina pensata per convertire e una campagna avviata e tracciata.",
    includes: [
      "Una landing page mirata",
      "Il tracciamento delle conversioni",
      "Le campagne Google e Meta impostate",
      "Il primo mese di gestione",
      "Il report dei risultati",
    ],
    meta: [
      { k: "Tempi", v: "Una o due settimane" },
      { k: "Budget pubblicitario", v: "A parte" },
    ],
    price: null,
    per: "una tantum",
    checkout: null,
    accent: "#2ee6c5",
  },
];

export const PACKAGES_QA = [
  {
    q: "Posso cambiare quello che c'è in un pacchetto?",
    a: "Sì: è un punto di partenza. Se ti serve qualcosa in più o in meno, lo scriviamo nella proposta.",
  },
  {
    q: "Come si parte?",
    a: "Scegli il pacchetto e scrivici: una call per conoscerci, poi la proposta scritta e si comincia.",
  },
  {
    q: "Fate anche il sito?",
    a: "Lo fa Alpacode, la casa dello studio: siti ed e-commerce, sullo stesso progetto e con le stesse persone.",
  },
];
