/* ============================================================
   Every page's first screen and meta, and the doors of the home.

   A hook names what worries the reader and turns it around in the
   same line: `turn` is the headline with the pieces that change
   ({ from, to }); the page strikes `from` and writes `to`
   (components/Turn.astro, CSS: it's above the fold). The sentence
   must read right once turned. `said` is the same sentence for
   screen readers, in full.

   The register is the studio's: direct, young, provocative — and
   honest (CLAUDE.md): what worries the reader always turned in the
   same line; no invented numbers, scarcity or results promised;
   "gratis" only where it's true; no digs at anyone the studio
   also works with.
   ============================================================ */
import { house } from "./site";

export type Turn = (string | { from: string; to: string; quiet?: boolean })[];

export interface PageHead {
  /** The sticker above the hook. */
  sticker: string;
  /** The word huge and hollow behind the hero. */
  ghost: string;
  turn: Turn;
  said: string;
  lede: string;
  meta: { title: string; description: string; og: string };
}

export type PageId = "home" | "servizi" | "pacchetti" | "prodotti" | "guida" | "corso" | "contatti";

export const PAGES: Record<PageId, PageHead> = {
  home: {
    sticker: "Alpacode Studio",
    ghost: "STUDIO",
    turn: ["Il tuo brand ", { from: "si perde nel feed?", to: "si fa ricordare." }],
    said: "Il tuo brand si perde nel feed? Da oggi si fa ricordare.",
    lede: "Lo studio di marketing di Alpacode: social e contenuti, brand, UX, campagne e SEO. Per attività e professionisti che vogliono crescere online, anche fuori dal mondo IT.",
    meta: {
      title: "Alpacode Studio · Marketing digitale, brand e social",
      description:
        "Lo studio di marketing di Alpacode: social e contenuti, brand e identità, UX e user journey, campagne Meta e Google, SEO. Monza · Milano, in tutta Italia.",
      og: "/og-studio.png",
    },
  },
  servizi: {
    sticker: "Servizi",
    ghost: "METODO",
    turn: ["Marketing ", { from: "a caso?", to: "con un metodo." }],
    said: "Marketing a caso? No: con un metodo.",
    lede: "Farsi vedere, farsi ricordare, farsi scegliere: il percorso del tuo cliente, dalla prima volta che ti incontra al messaggio che ti scrive. Con una strategia prima di ogni post.",
    meta: {
      title: "Servizi · Social, brand, UX, campagne e SEO — Alpacode Studio",
      description:
        "Social e contenuti, brand e posizionamento, UX e user journey, campagne Meta e Google, SEO: il marketing di Alpacode Studio, con una strategia scritta e i numeri veri ogni mese.",
      og: "/og-studio-servizi.png",
    },
  },
  pacchetti: {
    sticker: "Pacchetti",
    ghost: "PRONTI",
    turn: [{ from: "Non sai da dove partire?", to: "Parti da qui." }],
    said: "Non sai da dove partire? Parti da qui.",
    lede: "Pacchetti con un contenuto definito e tempi chiari: i social, il brand, una campagna. Il punto di partenza, il resto si costruisce.",
    meta: {
      title: "Pacchetti · Social, Brand Kit, Landing & ADV — Alpacode Studio",
      description:
        "Social Start, Social ogni mese, Brand Kit, Landing & ADV: i pacchetti di marketing di Alpacode Studio, con un contenuto definito e tempi chiari.",
      og: "/og-studio-pacchetti.png",
    },
  },
  prodotti: {
    sticker: "Fai da te",
    ghost: "DA TE",
    turn: ["Fallo ", { from: "fare a qualcuno?", to: "da te." }],
    said: "Fallo fare a qualcuno? O fallo da te.",
    lede: "Guide e crash course firmati Alpacode: il metodo che usiamo con i clienti, in mano tua. Li compri qui, li ricevi subito.",
    meta: {
      title: "Prodotti · Guide e crash course — Alpacode Studio",
      description:
        "La Guida Sito Vetrina (22 €) con il modulo Marketing, il crash course «AI al lavoro» per partite IVA: il metodo di Alpacode, da fare da te.",
      og: "/og-studio-prodotti.png",
    },
  },
  guida: {
    sticker: "Guida · 22 €",
    ghost: "SITO",
    turn: ["Un sito vetrina costa ", { from: "migliaia di euro?", to: "zero." }],
    said: "Un sito vetrina costa migliaia di euro? No: costa zero.",
    lede: "Lo fai tu, con l'AI e la guida rapida firmata Alpacode: dalla prima pagina al sito online, e poi come gestirlo. Il sito non costa niente. La guida, 22 €.",
    meta: {
      title: "Il tuo sito vetrina, gratis · Guida 22 € — Alpacode Studio",
      description:
        "La guida rapida firmata Alpacode per creare e gestire da solo il tuo sito vetrina, con l'AI. 22 €; con il modulo Marketing, 70 €.",
      og: "/og-studio-guida.png",
    },
  },
  corso: {
    sticker: "Crash course",
    ghost: "AI",
    turn: [{ from: "Temi", to: "Cavalca" }, " l'AI", { from: "?", to: ".", quiet: true }],
    said: "Temi l'AI? Cavalcala.",
    lede: "Con l'approccio giusto, l'AI fa in poche ore il lavoro di un team. Il crash course firmato Alpacode per professionisti con partita IVA: mettila al lavoro sul tuo mestiere, e trasforma il tempo che ti restituisce in lavoro nuovo.",
    meta: {
      title: "Temi l'AI? Cavalcala · Crash course per partite IVA — Alpacode Studio",
      description:
        "Con l'approccio giusto l'AI fa in poche ore il lavoro di un team. Il crash course firmato Alpacode per professionisti, e il tuo sito fatto con l'AI: gratis il primo anno.",
      og: "/og-studio-corso.png",
    },
  },
  contatti: {
    sticker: "Contatti",
    ghost: "CIAO",
    turn: [{ from: "Da dove si comincia?", to: "Da qui." }],
    said: "Da dove si comincia? Da qui.",
    lede: "Raccontaci cosa vuoi far crescere: ti rispondiamo con una proposta, non con un listino. Oppure prenota una call di trenta minuti.",
    meta: {
      title: "Contatti — Alpacode Studio",
      description: "Scrivi ad Alpacode Studio o prenota una call: social, brand, campagne, SEO, i pacchetti e i prodotti.",
      og: "/og-studio.png",
    },
  },
};

/* ---------- The doors of the home ---------- */

export interface Door {
  id: string;
  /** Who's reading, in their words. */
  who: string;
  /** What's behind the door. */
  what: string;
  href: string;
  accent: string;
  /** A door into the house (alpacode.it). */
  house?: boolean;
}

export const DOORS: Door[] = [
  { id: "social", who: "Voglio crescere sui social.", what: "Social e contenuti", href: "/servizi/#vedere", accent: "#ff2e88" },
  { id: "brand", who: "Il mio brand non lo ricorda nessuno.", what: "Brand e identità", href: "/servizi/#ricordare", accent: "#ff6b1a" },
  { id: "clienti", who: "Mi vedono, ma non mi scrivono.", what: "UX, campagne e SEO", href: "/servizi/#scegliere", accent: "#2ee6c5" },
  { id: "sito", who: "Voglio il mio sito, da solo.", what: "Guida Sito Vetrina · 22 €", href: "/prodotti/guida-sito-vetrina/", accent: "#d4ff3a" },
  { id: "ai", who: "Ho la partita IVA. E l'AI mi preoccupa.", what: "Crash course · AI al lavoro", href: "/prodotti/ai-al-lavoro/", accent: "#9d8cff" },
  {
    id: "chi-fa-siti",
    who: "Faccio siti per i clienti.",
    what: "Codebase e formazione, su alpacode.it",
    href: house("/per-chi-fa-siti/", "home-porte"),
    accent: "#3b72e9",
    house: true,
  },
  {
    id: "amico",
    who: "Conosco chi ha bisogno di un sito.",
    what: "Fino a 100 € a segnalazione, su alpacode.it",
    href: house("/voucher/", "home-porte"),
    accent: "#3b72e9",
    house: true,
  },
];
