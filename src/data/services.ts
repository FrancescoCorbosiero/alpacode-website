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
export interface ServiceGroup {
  verb: string;
  tagline: string;
  rows: ServiceRow[];
}
export interface ServiziPageData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  groups: ServiceGroup[];
}

export const servizi: Record<Lang, ServiziPageData> = {
  it: {
    crumb: "02 · SERVIZI",
    h1Line1: "Costruire. Far crescere.",
    h1Line2: "Insegnare.",
    lede: "Tre aree, un solo metodo: capire cosa ti serve davvero e trovare la soluzione più adatta — anche al tuo budget. Compreso quello che di solito chiedi a un'agenzia.",
    groups: [
      {
        verb: "Costruire",
        tagline: "Dalla strategia alla messa online: la base digitale della tua attività.",
        rows: [
          {
            n: "01",
            t: "Consulenza & digitalizzazione",
            d: "Capiamo dove sei e dove vuoi arrivare, poi tracciamo la strada: cosa serve davvero, in che ordine, con che budget. A volte bastano pochi incontri.",
            meta: [
              { k: "Formato", v: "Remoto · in studio" },
              { k: "Tempi", v: "da 2 a 8 settimane" },
              { k: "Prezzo", v: "Su misura" },
            ],
          },
          {
            n: "02",
            t: "Siti & web app",
            d: "Siti vetrina, portali e aree riservate su misura. Curati, semplici da gestire e fatti per durare nel tempo.",
            meta: [
              { k: "Per chi", v: "Privati & imprese" },
              { k: "Tempi", v: "da 3 a 12 settimane" },
              { k: "Prezzo", v: "Pacchetto o su misura" },
            ],
          },
          {
            n: "03",
            t: "E-commerce",
            d: "Negozi online che vendono davvero: catalogo, pagamenti, spedizioni e gestione ordini, senza grattacapi.",
            meta: [
              { k: "Base", v: "WooCommerce · Shopify" },
              { k: "Tempi", v: "da 4 a 10 settimane" },
              { k: "Prezzo", v: "Pacchetto o su misura" },
            ],
          },
          {
            n: "04",
            t: "Software & automazioni",
            d: "Gestionali, integrazioni e automazioni che fanno il lavoro noioso al posto tuo. Trasformiamo fogli Excel in processi che si tengono in piedi.",
            meta: [
              { k: "Ambiti", v: "Gestione · ERP · CRM" },
              { k: "Tempi", v: "da 6 a 20 settimane" },
              { k: "Prezzo", v: "Su misura" },
            ],
          },
          {
            n: "05",
            t: "Manutenzione & supporto",
            d: "Dopo il lancio non spariamo. Aggiornamenti, sicurezza, backup e modifiche, con un canale dedicato e risposte rapide.",
            meta: [
              { k: "Formato", v: "Care Plan mensile" },
              { k: "Risposta", v: "< mezza giornata" },
              { k: "Disdetta", v: "Quando vuoi" },
            ],
          },
        ],
      },
      {
        verb: "Far crescere",
        tagline: "Quello che di solito chiedi a un'agenzia di comunicazione, qui sotto lo stesso tetto.",
        rows: [
          {
            n: "06",
            t: "Branding & identità visiva",
            d: "Logo, palette, tono di voce e linee guida. L'immagine coordinata che ti fa sembrare — ed essere — professionale.",
            meta: [
              { k: "Consegna", v: "Brand kit pronto" },
              { k: "Tempi", v: "da 2 a 4 settimane" },
              { k: "Prezzo", v: "Pacchetto Brand Kit" },
            ],
          },
          {
            n: "07",
            t: "Design UI/UX",
            d: "Interfacce belle e facili da usare. Studiamo come si muovono le persone e togliamo ogni attrito tra loro e l'obiettivo.",
            meta: [
              { k: "Ambiti", v: "Web · app · prodotto" },
              { k: "Output", v: "Prototipi navigabili" },
              { k: "Prezzo", v: "Su misura" },
            ],
          },
          {
            n: "08",
            t: "Pubblicità & campagne",
            d: "Campagne Google e Meta gestite con criterio: budget sotto controllo, risultati misurati, niente soldi buttati.",
            meta: [
              { k: "Canali", v: "Google · Meta" },
              { k: "Formato", v: "Setup + gestione" },
              { k: "Prezzo", v: "Canone + budget" },
            ],
          },
          {
            n: "09",
            t: "SEO & contenuti",
            d: "Ti facciamo trovare da chi ti cerca. Posizionamento, contenuti e velocità del sito, con numeri verificabili.",
            meta: [
              { k: "Strumenti", v: "Search Console · Analytics" },
              { k: "Tempi", v: "Continuativo" },
              { k: "Prezzo", v: "Progetto o canone" },
            ],
          },
        ],
      },
      {
        verb: "Insegnare",
        tagline: "Quello che impariamo, te lo lasciamo. Così diventi autonomo.",
        rows: [
          {
            n: "10",
            t: "Corsi & percorsi",
            d: "Percorsi pratici per chi vuole imparare a muoversi nel digitale, dai primi passi fino agli approfondimenti.",
            meta: [
              { k: "Formato", v: "In aula · remoto" },
              { k: "Durata", v: "8 — 32 ore" },
              { k: "Prezzo", v: "Su richiesta" },
            ],
          },
          {
            n: "11",
            t: "Kit & risorse pro",
            d: "Template, starter e snippet pronti all'uso, con documentazione in italiano e aggiornamenti nel tempo.",
            meta: [
              { k: "Formato", v: "Pacchetto digitale" },
              { k: "Licenza", v: "Commerciale" },
              { k: "Prezzo", v: "Su richiesta" },
            ],
          },
          {
            n: "12",
            t: "Formazione per team",
            d: "Formazione su misura per le aziende, calibrata sui tuoi strumenti e sui tuoi casi reali, con supporto anche dopo l'aula.",
            meta: [
              { k: "Formato", v: "In aula · remoto" },
              { k: "Durata", v: "Da 1 giornata" },
              { k: "Prezzo", v: "Su misura" },
            ],
          },
        ],
      },
    ],
  },
  en: {
    crumb: "02 · SERVICES",
    h1Line1: "Build. Grow.",
    h1Line2: "Teach.",
    lede: "Three areas, one method: understand what you actually need and find the right fit — for your budget too. Including the things you'd normally ask an agency for.",
    groups: [
      {
        verb: "Build",
        tagline: "From strategy to going live: the digital backbone of your business.",
        rows: [
          {
            n: "01",
            t: "Consulting & digitalization",
            d: "We figure out where you are and where you want to go, then map the road: what you really need, in what order, on what budget. Sometimes a few meetings are enough.",
            meta: [
              { k: "Format", v: "Remote · in studio" },
              { k: "Lead time", v: "2 to 8 weeks" },
              { k: "Price", v: "Tailored" },
            ],
          },
          {
            n: "02",
            t: "Websites & web apps",
            d: "Brochure sites, portals and private areas, custom-built. Crafted, easy to manage and made to last.",
            meta: [
              { k: "For", v: "People & businesses" },
              { k: "Lead time", v: "3 to 12 weeks" },
              { k: "Price", v: "Package or tailored" },
            ],
          },
          {
            n: "03",
            t: "E-commerce",
            d: "Online shops that actually sell: catalog, payments, shipping and order management, no headaches.",
            meta: [
              { k: "Base", v: "WooCommerce · Shopify" },
              { k: "Lead time", v: "4 to 10 weeks" },
              { k: "Price", v: "Package or tailored" },
            ],
          },
          {
            n: "04",
            t: "Software & automations",
            d: "Internal tools, integrations and automations that do the boring work for you. We turn spreadsheets into processes that stand on their own.",
            meta: [
              { k: "Areas", v: "Ops · ERP · CRM" },
              { k: "Lead time", v: "6 to 20 weeks" },
              { k: "Price", v: "Tailored" },
            ],
          },
          {
            n: "05",
            t: "Maintenance & support",
            d: "After launch we don't disappear. Updates, security, backups and changes, with a dedicated channel and quick replies.",
            meta: [
              { k: "Format", v: "Monthly Care Plan" },
              { k: "Reply", v: "< half a worked day" },
              { k: "Cancel", v: "Anytime" },
            ],
          },
        ],
      },
      {
        verb: "Grow",
        tagline: "What you'd normally ask a communication agency for, here under one roof.",
        rows: [
          {
            n: "06",
            t: "Branding & visual identity",
            d: "Logo, palette, tone of voice and guidelines. The coordinated image that makes you look — and be — professional.",
            meta: [
              { k: "Delivery", v: "Ready brand kit" },
              { k: "Lead time", v: "2 to 4 weeks" },
              { k: "Price", v: "Brand Kit package" },
            ],
          },
          {
            n: "07",
            t: "UI/UX design",
            d: "Interfaces that are beautiful and easy to use. We study how people move and remove every bit of friction between them and the goal.",
            meta: [
              { k: "Areas", v: "Web · app · product" },
              { k: "Output", v: "Clickable prototypes" },
              { k: "Price", v: "Tailored" },
            ],
          },
          {
            n: "08",
            t: "Advertising & campaigns",
            d: "Google and Meta campaigns run with judgment: budget under control, results measured, no money wasted.",
            meta: [
              { k: "Channels", v: "Google · Meta" },
              { k: "Format", v: "Setup + management" },
              { k: "Price", v: "Fee + ad budget" },
            ],
          },
          {
            n: "09",
            t: "SEO & content",
            d: "We get you found by the people looking for you. Ranking, content and site speed, with numbers you can verify.",
            meta: [
              { k: "Tools", v: "Search Console · Analytics" },
              { k: "Timing", v: "Ongoing" },
              { k: "Price", v: "Project or retainer" },
            ],
          },
        ],
      },
      {
        verb: "Teach",
        tagline: "What we learn, we hand over. So you become independent.",
        rows: [
          {
            n: "10",
            t: "Courses & paths",
            d: "Practical paths for anyone who wants to find their way in digital, from first steps to deeper dives.",
            meta: [
              { k: "Format", v: "In person · remote" },
              { k: "Duration", v: "8 — 32 hours" },
              { k: "Price", v: "On request" },
            ],
          },
          {
            n: "11",
            t: "Pro kits & resources",
            d: "Templates, starters and snippets ready to use, with documentation and updates over time.",
            meta: [
              { k: "Format", v: "Digital pack" },
              { k: "License", v: "Commercial" },
              { k: "Price", v: "On request" },
            ],
          },
          {
            n: "12",
            t: "Team training",
            d: "Bespoke training for companies, calibrated on your tools and your real cases, with support after class too.",
            meta: [
              { k: "Format", v: "In person · remote" },
              { k: "Duration", v: "From 1 day" },
              { k: "Price", v: "Tailored" },
            ],
          },
        ],
      },
    ],
  },
};
