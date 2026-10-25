/* ============================================================
   What the studio does, in three verbs: the user journey, from the
   first time someone sees you to the moment they write to you.
     vedere     be seen: social, content, formats that get shared
     ricordare  be remembered: brand, identity, positioning
     scegliere  be chosen: UX and the journey, campaigns, SEO
   Strategy comes before all three (STRATEGY), the method after
   (STEPS). Each group has its colour: its door on the home takes it.

   Copy rules (CLAUDE.md, house rules): no invented numbers, no
   promises about reach or results ("virale" is a way of working,
   never a guarantee), no price-reassurance phrases.
   ============================================================ */

export interface Service {
  id: string;
  t: string;
  d: string;
  items: string[];
}

export interface ServiceGroup {
  id: "vedere" | "ricordare" | "scegliere";
  verb: string;
  lede: string;
  accent: string;
  services: Service[];
}

export const GROUPS: ServiceGroup[] = [
  {
    id: "vedere",
    verb: "Farsi vedere.",
    lede: "Dove sono i tuoi clienti, con quello che vogliono guardare: un piano, non un post a caso.",
    accent: "#ff2e88",
    services: [
      {
        id: "social",
        t: "Social e contenuti",
        d: "Il piano editoriale, i contenuti e la gestione dei profili: post, reel, caroselli, storie. Una voce che si riconosce, ogni giorno.",
        items: [
          "Strategia e piano editoriale",
          "Post, reel, caroselli e storie",
          "Gestione dei profili e della community",
          "Un report al mese: cosa ha funzionato, cosa cambiare",
        ],
      },
      {
        id: "format",
        t: "Format che si condividono",
        d: "Serie, trend letti in tempo, collaborazioni con creator: idee fatte per essere riprese. La viralità non si promette: si prova, si misura, si tiene quello che va.",
        items: ["Format e serie ricorrenti", "Trend con il tuo tono, non quello di tutti", "Collaborazioni con creator", "Test continui sui contenuti"],
      },
    ],
  },
  {
    id: "ricordare",
    verb: "Farsi ricordare.",
    lede: "Un'identità che si riconosce al primo sguardo, e resta la stessa ovunque: dal profilo al biglietto da visita.",
    accent: "#ff6b1a",
    services: [
      {
        id: "brand",
        t: "Brand e identità",
        d: "Logo, colori, caratteri e tono di voce: le regole che rendono riconoscibile tutto quello che pubblichi.",
        items: ["Logo e varianti", "Palette, caratteri e tono di voce", "Linee guida d'uso", "Template per i social"],
      },
      {
        id: "posizionamento",
        t: "Posizionamento",
        d: "Per chi sei la scelta giusta, e perché: la frase che ti distingue, prima ancora del logo.",
        items: ["Analisi dei concorrenti", "Il tuo pubblico, in concreto", "La promessa e i messaggi chiave"],
      },
    ],
  },
  {
    id: "scegliere",
    verb: "Farsi scegliere.",
    lede: "Dalla prima volta che ti vedono al momento in cui ti scrivono: il percorso del cliente, disegnato e misurato.",
    accent: "#2ee6c5",
    services: [
      {
        id: "ux",
        t: "UX e user journey",
        d: "Il percorso del cliente, passo per passo: da dove arriva, cosa cerca, dove si ferma. Poi le pagine, ridisegnate per portarlo fino al contatto.",
        items: ["La mappa del percorso del cliente", "Landing page e pagine che convertono", "Test e miglioramenti continui"],
      },
      {
        id: "campagne",
        t: "Campagne",
        d: "Annunci su Meta e Google con un obiettivo chiaro, il pubblico giusto e i numeri veri ogni mese.",
        items: ["Strategia e pubblico", "Annunci e creatività", "Tracciamento delle conversioni", "Ottimizzazione e report"],
      },
      {
        id: "seo",
        t: "SEO e Google",
        d: "Farsi trovare da chi ti sta già cercando: la scheda Google della tua attività, le parole giuste, i contenuti che rispondono.",
        items: ["Scheda Google Business", "SEO locale e tecnica", "Contenuti per la ricerca"],
      },
    ],
  },
];

export const STRATEGY = {
  title: "Prima, la strategia.",
  text: "Dove sei, dove vuoi arrivare, cosa fare per primo e con quale budget. Senza un piano, ogni euro di marketing è un tentativo; con un piano, è una scelta.",
};

export const STEPS = [
  { t: "Ci conosciamo", d: "Una call per capire la tua attività, i tuoi clienti e cosa hai già provato." },
  { t: "Il piano", d: "Una strategia scritta: obiettivi, canali, priorità, budget." },
  { t: "Al lavoro", d: "Contenuti, campagne, pagine: si parte da quello che porta risultati prima." },
  { t: "Si misura", d: "Ogni mese i numeri veri: si tiene quello che funziona, si cambia il resto." },
];

export const SERVICES_QA = [
  {
    q: "Lavorate anche fuori dal mondo IT?",
    a: "Sì, soprattutto. Attività locali, professionisti, negozi, creator: il marketing serve a chi vende qualcosa, qualunque cosa sia.",
  },
  {
    q: "Quanto costa?",
    a: "Dipende da cosa ti serve e da quanto spazio vuoi occupare. I pacchetti hanno un contenuto definito; per il resto ti diamo una proposta scritta dopo la prima call.",
  },
  {
    q: "Il budget per gli annunci è compreso?",
    a: "No: il budget pubblicitario lo paghi direttamente alle piattaforme (Meta, Google), e lo decidi tu. Noi lo spendiamo con un piano, e ogni mese ti diciamo com'è andata.",
  },
  {
    q: "E il sito?",
    a: "Se ti serve, lo costruisce Alpacode (alpacode.it): siti, e-commerce e software su misura, dentro lo stesso progetto.",
  },
];
