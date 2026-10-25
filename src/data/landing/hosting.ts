/* ============================================================
   /per-chi-fa-siti/hosting — for developers and web designers who
   park every client's site on its own hosting plan.

   The pitch: one server of your own and a ready codebase host all
   your clients' sites; the hosting fee they pay you stops being a
   pass-through and becomes margin. Sold with the formula —
   codebase / course + codebase / 1:1 training.

   The calculator's starting values are an example (labelled as
   such on the page), never a claim. The codebase's contents
   (stack.layers) describe the product: keep them in step with
   what it actually ships.
   ============================================================ */
import type { Lang } from "../../i18n/types";
import type { FormulaCopy, Objection } from "./shared";

export interface CalcInput {
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  value: number;
}

export interface StackLayer {
  name: string;
  /** For the web designer: what it does for you. */
  plain: string;
  /** For the developer: what it is. */
  tech: string;
}

export interface HostingCopy {
  meta: { title: string; description: string; ogAlt: string };
  hero: {
    kicker: string;
    lines: string[];
    /** The accent line; `mark` is the part the pen highlights. */
    accent: { before: string; mark: string; after: string };
    lede: string;
    cta: string;
    alt: string;
    receipt: {
      head: string;
      sub: string;
      rows: string[];
      fee: string;
      total: string;
      note: string;
    };
  };
  pack: {
    beats: { title: string; body: string }[];
    clients: string[];
    fee: string;
    server: string;
    serverSub: string;
    before: string;
    after: string;
    note: string;
  };
  calc: {
    title: string;
    lede: string;
    sites: CalcInput;
    pay: CalcInput;
    charge: CalcInput;
    server: CalcInput;
    today: string;
    own: string;
    diff: string;
    perYear: string;
    note: string;
    fine: string;
  };
  stack: {
    title: string;
    lede: string;
    /** Bottom to top. */
    layers: StackLayer[];
    note: string;
  };
  formula: FormulaCopy;
  qa: { title: string; items: Objection[] };
  lead: { title: string; lede: string; topic: string; sites: string; sitesPh: string };
}

const CLIENTS_IT = [
  "Pizzeria",
  "Studio legale",
  "Palestra",
  "Fiorista",
  "Ottica",
  "Agriturismo",
  "Dentista",
  "Bottega",
  "Hotel",
  "Commercialista",
  "Parrucchiere",
  "Enoteca",
  "Architetto",
  "Libreria",
  "Centro yoga",
  "Officina",
  "Panificio",
  "Fotografo",
  "Veterinario",
  "Gelateria",
];
const CLIENTS_EN = [
  "Pizzeria",
  "Law firm",
  "Gym",
  "Florist",
  "Optician",
  "Farm stay",
  "Dentist",
  "Craft shop",
  "Hotel",
  "Accountant",
  "Hair salon",
  "Wine bar",
  "Architect",
  "Bookshop",
  "Yoga studio",
  "Garage",
  "Bakery",
  "Photographer",
  "Vet",
  "Ice-cream parlour",
];

export const hosting: Record<Lang, HostingCopy> = {
  it: {
    meta: {
      title: "Hosting per i siti dei tuoi clienti: un server tuo, il margine pure — Alpacode",
      description:
        "Paghi un hosting per ogni cliente? Con un server tuo e una codebase pronta ospiti tutti i loro siti in un posto solo. Codebase, corso o formazione 1:1.",
      ogAlt: "Paghi un hosting per ogni cliente? Stai perdendo soldi. — Alpacode",
    },
    hero: {
      kicker: "per chi fa siti ai clienti",
      lines: ["Paghi un hosting", "per ogni cliente?"],
      accent: { before: "Quel ", mark: "margine", after: " può restare a te." },
      lede: "Ogni sito che parcheggi su un hosting a canone è margine che lasci a qualcun altro. Con un server tuo e una codebase pronta, i siti dei tuoi clienti stanno tutti nello stesso posto — e l'hosting, da costo, diventa un'entrata.",
      cta: "Scegli come iniziare",
      alt: "Fai i conti",
      receipt: {
        head: "Canoni hosting",
        sub: "questo mese",
        rows: CLIENTS_IT.slice(0, 5),
        fee: "canone",
        total: "5 canoni",
        note: "e il mese prossimo, di nuovo",
      },
    },
    pack: {
      beats: [
        {
          title: "Venti clienti,\nventi canoni.",
          body: "Venti pannelli, venti scadenze, venti rinnovi da seguire. E su ognuno un margine che dipende dal listino di qualcun altro.",
        },
        {
          title: "Venti clienti,\nun server.",
          body: "Una macchina sola, tua, impostata una volta. Ogni sito gira nel suo spazio, e tutti si aggiornano, si proteggono e si salvano allo stesso modo.",
        },
        {
          title: "La differenza\nresta a te.",
          body: "I clienti continuano a pagarti l'hosting come oggi. Tu paghi un server: quello che avanza è margine, ogni mese.",
        },
      ],
      clients: CLIENTS_IT,
      fee: "canone",
      server: "Il tuo server",
      serverSub: "VPS · Linux",
      before: "20 canoni",
      after: "1 server",
      note: "tutti qui dentro",
    },
    calc: {
      title: "Fai i conti\ncon i tuoi numeri.",
      lede: "Sposta i cursori: quanti siti ospiti, quanto paghi oggi per ognuno, quanto lo fai pagare, quanto costa un server. I valori di partenza sono un esempio: metti i tuoi.",
      sites: { label: "Siti dei clienti", unit: "siti", min: 1, max: 80, step: 1, value: 20 },
      pay: { label: "Paghi oggi, per sito", unit: "€/mese", min: 0, max: 60, step: 1, value: 10 },
      charge: { label: "Fai pagare, per sito", unit: "€/mese", min: 0, max: 100, step: 1, value: 20 },
      server: { label: "Il tuo server", unit: "€/mese", min: 5, max: 200, step: 5, value: 30 },
      today: "Margine oggi",
      own: "Con un server tuo",
      diff: "In più, ogni anno",
      perYear: "€/anno",
      note: "e cresce con ogni cliente che aggiungi",
      fine: "Calcolo indicativo sui valori che scegli tu. Non conta il tempo che dedichi alla gestione: è quello che la codebase serve a ridurre.",
    },
    stack: {
      title: "Cosa c'è\nnella codebase.",
      lede: "Un server Linux qualsiasi, e sopra tutto quello che serve per ospitare i siti dei clienti senza fare il sistemista a tempo pieno.",
      layers: [
        {
          name: "Il server",
          plain: "Un VPS da un provider europeo, a tuo nome: lo scegli tu, lo cambi quando vuoi.",
          tech: "Ubuntu LTS, accesso SSH a chiave, firewall e aggiornamenti di sicurezza automatici.",
        },
        {
          name: "Un posto per sito",
          plain: "Ogni sito vive nel suo spazio: se uno ha un problema, gli altri non se ne accorgono.",
          tech: "Docker Compose, un servizio per sito, limiti di risorse per container.",
        },
        {
          name: "Domini e HTTPS",
          plain: "Aggiungi un dominio e il certificato si fa da solo. E si rinnova da solo.",
          tech: "Reverse proxy Caddy, certificati Let's Encrypt automatici, redirect e header di sicurezza.",
        },
        {
          name: "Pubblicazione",
          plain: "Metti online un sito nuovo, o un aggiornamento, con un comando.",
          tech: "Deploy da Git, build in container, ritorno alla versione precedente con un comando.",
        },
        {
          name: "Backup",
          plain: "Copie automatiche di siti e database, conservate fuori dal server.",
          tech: "Backup notturni cifrati su storage esterno, con procedura di ripristino provata.",
        },
        {
          name: "Sorveglianza",
          plain: "Se un sito si ferma, lo sai prima del tuo cliente.",
          tech: "Controlli di uptime per dominio, avvisi via email o Telegram, log in un posto solo.",
        },
      ],
      note: "tuo, non in affitto",
    },
    formula: {
      title: "Scegli quanto\nvuoi fare da solo.",
      lede: "La codebase c'è sempre. Cambia quanto ti accompagniamo: dal codice e basta a qualcuno che lo imposta insieme a te.",
      badge: "il più adatto a te",
      recommend: { dev: "codebase", designer: "corso" },
      tiers: [
        {
          id: "codebase",
          level: "Da solo",
          name: "Codebase",
          line: "Il codice, pronto.",
          forWho: "Per chi sa già muoversi su un server e vuole partire subito.",
          items: [
            "La codebase completa, da usare per tutti i tuoi clienti",
            "Documentazione passo passo, dal server vuoto al primo sito",
            "Gli aggiornamenti della codebase",
          ],
          cta: "Scelgo la codebase",
        },
        {
          id: "corso",
          level: "Con il metodo",
          name: "Corso + codebase",
          line: "Ogni pezzo, capito.",
          forWho: "Per chi vuole sapere cosa fa ogni pezzo prima di affidargli i clienti.",
          carry: "Tutto della Codebase",
          items: [
            "Il corso in video: dal server vuoto al primo cliente online",
            "Esercizi su un server di prova",
            "La migrazione di un sito che hai già, passo passo",
          ],
          cta: "Scelgo il corso",
        },
        {
          id: "uno-a-uno",
          level: "Con noi accanto",
          name: "Formazione 1:1",
          line: "Qualcuno al tuo fianco.",
          forWho: "Per chi vuole partire in fretta, sui propri progetti veri.",
          carry: "Tutto del Corso + codebase",
          items: [
            "Sessioni individuali con chi ha costruito la codebase",
            "Il tuo server impostato insieme, in diretta",
            "I tuoi siti spostati insieme a te",
          ],
          cta: "Scelgo l'1:1",
        },
      ],
      note: "Ogni percorso lo definiamo insieme, alla prima call, a partire da quanti siti porti.",
    },
    qa: {
      title: "Le domande\nche ci fanno.",
      items: [
        {
          q: "Non sono un sistemista.",
          a: "Non serve: le scelte da sistemista sono già prese nella codebase, e i comandi da usare sono pochi e documentati. Se non hai mai aperto un terminale, il corso parte proprio da lì.",
        },
        {
          q: "E se il server si ferma?",
          a: "Lo sai subito, perché la sorveglianza ti avvisa. I backup stanno fuori dal server, e rimettere tutto in piedi su una macchina nuova è una procedura scritta, da seguire passo passo.",
        },
        {
          q: "Funziona con WordPress?",
          a: "Sì: WordPress gira nel suo spazio con il suo database, accanto a siti statici, Astro, Next.js o Node.",
        },
        {
          q: "E la posta dei clienti?",
          a: "Le caselle email conviene lasciarle a un servizio dedicato: la codebase ospita i siti, non la posta. Ti mostriamo come collegare i domini a un provider email in modo pulito.",
        },
        {
          q: "Posso spostare i siti che ho già?",
          a: "Sì. Nel corso e nella formazione 1:1 la migrazione di un sito esistente si fa insieme; con la sola codebase hai la procedura scritta.",
        },
        {
          q: "Quanto costa?",
          a: "Dipende dal percorso che scegli. Scrivici quanti siti gestisci e come lavori oggi: ti rispondiamo con la proposta per il tuo caso.",
        },
      ],
    },
    lead: {
      title: "Parliamone.",
      lede: "Dicci quanti siti gestisci e da dove parti: ti rispondiamo con il percorso adatto, di persona.",
      topic: "Hosting per i clienti",
      sites: "Siti dei clienti che gestisci (facoltativo)",
      sitesPh: "es. 15",
    },
  },

  en: {
    meta: {
      title: "Hosting your clients' sites: your own server, your own margin — Alpacode",
      description:
        "Paying for a hosting plan per client? With your own server and a ready codebase, all their sites live in one place. Codebase, course or 1:1 training.",
      ogAlt: "Paying for a hosting plan per client? You're losing money. — Alpacode",
    },
    hero: {
      kicker: "for people who build client sites",
      lines: ["A hosting plan", "for every client?"],
      accent: { before: "That ", mark: "margin", after: " can stay yours." },
      lede: "Every site you park on a monthly hosting plan is margin you leave to someone else. With your own server and a ready codebase, your clients' sites all live in the same place — and hosting turns from a cost into income.",
      cta: "Choose how to start",
      alt: "Do the maths",
      receipt: {
        head: "Hosting fees",
        sub: "this month",
        rows: CLIENTS_EN.slice(0, 5),
        fee: "plan",
        total: "5 plans",
        note: "and again next month",
      },
    },
    pack: {
      beats: [
        {
          title: "Twenty clients,\ntwenty plans.",
          body: "Twenty control panels, twenty due dates, twenty renewals to chase. And on each one a margin that depends on someone else's price list.",
        },
        {
          title: "Twenty clients,\none server.",
          body: "A single machine, yours, set up once. Every site runs in its own space, and they're all updated, protected and backed up the same way.",
        },
        {
          title: "The difference\nstays with you.",
          body: "Your clients keep paying you for hosting as they do today. You pay for one server: what's left is margin, every month.",
        },
      ],
      clients: CLIENTS_EN,
      fee: "plan",
      server: "Your server",
      serverSub: "VPS · Linux",
      before: "20 plans",
      after: "1 server",
      note: "all in here",
    },
    calc: {
      title: "Do the maths\nwith your numbers.",
      lede: "Move the sliders: how many sites you host, what you pay today for each, what you charge for it, what a server costs. The starting values are an example: put in yours.",
      sites: { label: "Client sites", unit: "sites", min: 1, max: 80, step: 1, value: 20 },
      pay: { label: "You pay today, per site", unit: "€/month", min: 0, max: 60, step: 1, value: 10 },
      charge: { label: "You charge, per site", unit: "€/month", min: 0, max: 100, step: 1, value: 20 },
      server: { label: "Your server", unit: "€/month", min: 5, max: 200, step: 5, value: 30 },
      today: "Margin today",
      own: "With your own server",
      diff: "Extra, every year",
      perYear: "€/year",
      note: "and it grows with every client you add",
      fine: "A rough calculation on the values you choose. It doesn't count the time you spend running things: that's what the codebase is there to cut.",
    },
    stack: {
      title: "What's in\nthe codebase.",
      lede: "Any Linux server, and on top of it everything you need to host clients' sites without becoming a full-time sysadmin.",
      layers: [
        {
          name: "The server",
          plain: "A VPS from a European provider, in your name: you choose it, you change it whenever you like.",
          tech: "Ubuntu LTS, key-only SSH, firewall and automatic security updates.",
        },
        {
          name: "A space per site",
          plain: "Every site lives in its own space: if one has a problem, the others don't notice.",
          tech: "Docker Compose, one service per site, resource limits per container.",
        },
        {
          name: "Domains and HTTPS",
          plain: "Add a domain and the certificate sorts itself out. And renews itself.",
          tech: "Caddy reverse proxy, automatic Let's Encrypt certificates, redirects and security headers.",
        },
        {
          name: "Publishing",
          plain: "Put a new site, or an update, online with one command.",
          tech: "Deploys from Git, builds in containers, roll back to the previous version with one command.",
        },
        {
          name: "Backups",
          plain: "Automatic copies of sites and databases, kept off the server.",
          tech: "Encrypted nightly backups to external storage, with a tested restore procedure.",
        },
        {
          name: "Watch",
          plain: "If a site goes down, you know before your client does.",
          tech: "Uptime checks per domain, alerts by email or Telegram, logs in one place.",
        },
      ],
      note: "yours, not rented",
    },
    formula: {
      title: "Choose how much\nyou do on your own.",
      lede: "The codebase is always there. What changes is how far we walk with you: from the code alone to someone setting it up with you.",
      badge: "the best fit for you",
      recommend: { dev: "codebase", designer: "corso" },
      tiers: [
        {
          id: "codebase",
          level: "On your own",
          name: "Codebase",
          line: "The code, ready.",
          forWho: "For people who already find their way around a server and want to start now.",
          items: [
            "The complete codebase, to use for all your clients",
            "Step-by-step docs, from an empty server to the first site",
            "Updates to the codebase",
          ],
          cta: "I'll take the codebase",
        },
        {
          id: "corso",
          level: "With the method",
          name: "Course + codebase",
          line: "Every piece, understood.",
          forWho: "For people who want to know what each piece does before trusting it with clients.",
          carry: "Everything in Codebase",
          items: [
            "The video course: from an empty server to the first client online",
            "Exercises on a practice server",
            "Moving a site you already have, step by step",
          ],
          cta: "I'll take the course",
        },
        {
          id: "uno-a-uno",
          level: "With us beside you",
          name: "1:1 training",
          line: "Someone at your side.",
          forWho: "For people who want to move fast, on their own real projects.",
          carry: "Everything in Course + codebase",
          items: [
            "One-to-one sessions with the people who built the codebase",
            "Your server set up together, live",
            "Your sites moved over with you",
          ],
          cta: "I'll take the 1:1",
        },
      ],
      note: "We define each path together, on the first call, starting from how many sites you bring.",
    },
    qa: {
      title: "The questions\nwe get asked.",
      items: [
        {
          q: "I'm not a sysadmin.",
          a: "You don't need to be: the sysadmin decisions are already made in the codebase, and the commands you need are few and documented. If you've never opened a terminal, the course starts right there.",
        },
        {
          q: "What if the server goes down?",
          a: "You know straight away, because the watch alerts you. Backups live off the server, and bringing everything back up on a new machine is a written procedure, step by step.",
        },
        {
          q: "Does it work with WordPress?",
          a: "Yes: WordPress runs in its own space with its own database, next to static, Astro, Next.js or Node sites.",
        },
        {
          q: "What about the clients' email?",
          a: "Mailboxes are best left to a dedicated service: the codebase hosts sites, not mail. We show you how to connect the domains to an email provider cleanly.",
        },
        {
          q: "Can I move the sites I already have?",
          a: "Yes. In the course and in 1:1 training we move an existing site together; with the codebase alone you get the written procedure.",
        },
        {
          q: "How much is it?",
          a: "It depends on the path you choose. Tell us how many sites you run and how you work today: we'll reply with a proposal for your case.",
        },
      ],
    },
    lead: {
      title: "Let's talk.",
      lede: "Tell us how many sites you run and where you're starting from: we'll reply with the right path, in person.",
      topic: "Hosting for clients",
      sites: "Client sites you run (optional)",
      sitesPh: "e.g. 15",
    },
  },
};
