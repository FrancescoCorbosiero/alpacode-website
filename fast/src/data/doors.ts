/* ============================================================
   The doors — one per audience of docs/marketing-map.md, each with
   its DM keyword and its hook.

   A hook names the fear and turns it around: `turn` is the headline
   with the pieces that change ({ from, to }); the page strikes `from`
   and writes `to` (components/Turn.astro). `said` is the same sentence
   for screen readers, in full.

   Copy rules (docs/marketing-map.md, "FAST's rules"): the fear always
   turned in the same line; no invented numbers, scarcity or income
   claims; "gratis" only where it's true.
   ============================================================ */

export type DoorId = "home" | "sito" | "ai" | "code" | "bio" | "amico";

export type Turn = (string | { from: string; to: string; quiet?: boolean })[];

export interface Door {
  id: DoorId;
  /** Path on FAST: "/" for the chooser. */
  path: string;
  keyword: string;
  /** On the chooser's card: who's reading, in their words. */
  who: string;
  /** On the card: what they get. */
  what: string;
  sticker: string;
  turn: Turn;
  said: string;
  lede: string;
  /** The hero's chat: what the DM answers to the keyword (also the
   *  suggested auto-reply, docs/marketing-map.md). */
  reply: string;
  /** Doors that lead to the studio: three punches and where they go. */
  pointsTitle?: string;
  points?: string[];
  studio?: { path: string; label: string; note: string };
  meta: { title: string; description: string; og: string };
}

export const DOORS: Record<DoorId, Door> = {
  home: {
    id: "home",
    path: "/",
    keyword: "FAST",
    who: "",
    what: "",
    sticker: "Alpacode FAST",
    turn: ["L'AI ti ", { from: "ruba il", to: "porta" }, " lavoro", { from: "?", to: ".", quiet: true }],
    said: "L'AI ti ruba il lavoro? No: ti porta lavoro.",
    lede: "Guide e crash course firmati Alpacode, per usare l'AI invece di subirla: il tuo sito, i tuoi clienti, il tuo tempo.",
    reply: "Ciao! Da dove parti? Il tuo sito da solo, l'AI sul tuo lavoro, i siti per i clienti: ti mando il link giusto.",
    meta: {
      title: "Alpacode FAST · L'AI ti porta lavoro",
      description:
        "Guide e crash course firmati Alpacode: il tuo sito vetrina fatto da te, l'AI al lavoro sul tuo mestiere. Scrivi FAST in DM.",
      og: "/og-fast.png",
    },
  },
  sito: {
    id: "sito",
    path: "/sito/",
    keyword: "SITO",
    who: "Voglio il mio sito, da solo.",
    what: "Guida Sito Vetrina · 22 €",
    sticker: "Guida FAST · 22 €",
    turn: ["Un sito vetrina costa ", { from: "migliaia di euro?", to: "zero." }],
    said: "Un sito vetrina costa migliaia di euro? No: costa zero.",
    lede: "Lo fai tu, con l'AI e la guida rapida firmata Alpacode: dalla prima pagina al sito online, e poi come gestirlo. Il sito non costa niente. La guida, 22 €.",
    reply: "Ecco la guida Sito Vetrina: 22 €. Con il modulo Marketing, 70 €. Quale ti mando?",
    meta: {
      title: "Il tuo sito vetrina, gratis · Guida FAST 22 € — Alpacode",
      description:
        "La guida rapida firmata Alpacode per creare e gestire da solo il tuo sito vetrina, con l'AI. 22 €; con il modulo Marketing, 70 €. Scrivi SITO in DM.",
      og: "/og-fast-sito.png",
    },
  },
  ai: {
    id: "ai",
    path: "/ai/",
    keyword: "AI",
    who: "Ho la partita IVA. E l'AI mi preoccupa.",
    what: "Crash course · AI al lavoro",
    sticker: "Crash course",
    turn: [{ from: "Temi", to: "Cavalca" }, " l'AI", { from: "?", to: ".", quiet: true }],
    said: "Temi l'AI? Cavalcala.",
    lede: "Con l'approccio giusto, l'AI fa in poche ore il lavoro di un team. Il crash course firmato Alpacode per professionisti con partita IVA: mettila al lavoro sul tuo mestiere, e trasforma il tempo che ti restituisce in lavoro nuovo.",
    reply: "Ecco il programma di «AI al lavoro». E il sito che costruisci nel corso, il primo anno lo ospitiamo noi.",
    meta: {
      title: "Temi l'AI? Cavalcala · Crash course per partite IVA — Alpacode FAST",
      description:
        "Con l'approccio giusto l'AI fa in poche ore il lavoro di un team. Il crash course firmato Alpacode per professionisti, e il tuo sito fatto con l'AI: gratis il primo anno. Scrivi AI in DM.",
      og: "/og-fast-ai.png",
    },
  },
  code: {
    id: "code",
    path: "/code/",
    keyword: "CODE",
    who: "Faccio siti per i clienti.",
    what: "Il metodo dello studio",
    sticker: "Per sviluppatori e web designer",
    turn: ["L'AI fa i siti ", { from: "al posto tuo?", to: "per te." }],
    said: "L'AI fa i siti al posto tuo? No: li fa per te.",
    lede: "I clienti provano a farsi il sito da soli. Tu, con l'AI e un metodo, i siti li sforni in serie: i clienti pagano le scelte, non le ore.",
    reply: "Ecco il metodo dello studio: codebase, corso + codebase o formazione 1:1. Sviluppatore o web designer?",
    pointsTitle: "Come si fa.",
    points: [
      "Una codebase pronta: ogni cliente nuovo parte da lì, non da zero.",
      "L'AI fa la parte ripetitiva. Tu fai le scelte, che i clienti pagano.",
      "Un server tuo al posto di un hosting per cliente: il margine resta a te.",
    ],
    studio: {
      path: "/per-chi-fa-siti/",
      label: "Guarda il metodo",
      note: "Codebase, corso o formazione 1:1: sul sito dello studio.",
    },
    meta: {
      title: "L'AI fa i siti per te · Per sviluppatori e web designer — Alpacode FAST",
      description:
        "I clienti provano a farsi il sito con l'AI. Tu sfornali in serie: una codebase pronta, l'AI sulla parte ripetitiva, un server tuo. Scrivi CODE in DM.",
      og: "/og-fast-code.png",
    },
  },
  bio: {
    id: "bio",
    path: "/bio/",
    keyword: "BIO",
    who: "Gestisco i social degli altri.",
    what: "Il tuo sito da creator · 300 €/anno",
    sticker: "Per social media manager e creator",
    turn: ["Il tuo brand ", { from: "è un link in bio?", to: "ha un dominio." }],
    said: "Il tuo brand è un link in bio? Da oggi ha un dominio.",
    lede: "Fai crescere i brand degli altri. Quando un brand cerca te, merita di trovare un sito: portfolio, media kit e contatti, sul tuo dominio.",
    reply: "Ecco il sito per creator: portfolio, media kit e contatti sul tuo dominio, 300 € l'anno.",
    pointsTitle: "Cosa ti serve.",
    points: [
      "Portfolio, media kit e contatti, in un posto solo.",
      "Sul tuo dominio: chi ti cerca su Google trova te, non un elenco di link.",
      "300 € l'anno, con dominio e hosting. Lo vedi finito, poi decidi.",
    ],
    studio: {
      path: "/social-media-manager/",
      label: "Guarda l'offerta",
      note: "Lo costruisce lo studio: tu continui a postare.",
    },
    meta: {
      title: "Il tuo brand ha un dominio · Il sito per creator — Alpacode FAST",
      description:
        "Fai crescere i brand degli altri? Ora tocca al tuo: portfolio, media kit e contatti sul tuo dominio, 300 € l'anno con dominio e hosting. Scrivi BIO in DM.",
      og: "/og-fast-bio.png",
    },
  },
  amico: {
    id: "amico",
    path: "/amico/",
    keyword: "AMICO",
    who: "Conosco chi ha bisogno di un sito.",
    what: "Fino a 100 € a segnalazione",
    sticker: "Segnala un amico",
    turn: ["Segnalarlo ", { from: "non costa niente.", to: "vale fino a 100 €." }],
    said: "Segnalarlo non costa niente, e vale fino a 100 €.",
    lede: "Conosci chi ha bisogno di un sito, o chi ha appena aperto un'attività? Ce lo presenti tu: se diventa cliente, fino a 100 € sono tuoi.",
    reply: "Ecco come funziona: crei il tuo link, lo passi, e se diventa cliente fino a 100 € sono tuoi.",
    pointsTitle: "Come funziona.",
    points: [
      "Crei il tuo link personale: basta il nome e l'email.",
      "Lo passi a chi ha bisogno di un sito, o di tutto il digitale.",
      "Se diventa cliente, fino a 100 €: con bonifico, PayPal o buono.",
    ],
    studio: {
      path: "/voucher/",
      label: "Crea il tuo link",
      note: "Il programma «Segnala un amico», sul sito dello studio.",
    },
    meta: {
      title: "Segnalarlo vale fino a 100 € · Segnala un amico — Alpacode FAST",
      description:
        "Conosci chi ha bisogno di un sito, o chi ha appena aperto? Ce lo presenti tu: se diventa cliente, fino a 100 € sono tuoi. Scrivi AMICO in DM.",
      og: "/og-fast-amico.png",
    },
  },
};

/** The chooser, in order. */
export const CHOOSER: DoorId[] = ["sito", "ai", "code", "bio", "amico"];

/** Doors that are a page of their own on FAST but lead to the studio. */
export const BRIDGES: DoorId[] = ["code", "bio", "amico"];
