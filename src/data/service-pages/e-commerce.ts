/* /servizi/e-commerce — E-commerce (03).
   Its machine: a product goes into the cart, the order goes through
   cart, payment and shipping, the label prints; the next order. */
import type { Lang } from "../../i18n/types";
import type { ServiceCopy } from "./types";

export const ecommerce: Record<Lang, ServiceCopy> = {
  it: {
    meta: {
      title: "E-commerce su WooCommerce e Shopify — Alpacode",
      description:
        "Negozi online che vendono davvero: catalogo, pagamenti, spedizioni e gestione ordini, collegati a magazzino e gestionale. Su WooCommerce o Shopify.",
      ogAlt: "E-commerce: un negozio aperto anche di notte, che vende davvero.",
    },
    name: "E-commerce",
    portal: "Un negozio che vende anche di notte.",
    hero: {
      kicker: "e-commerce",
      lines: ["Un negozio aperto", "anche di notte."],
      accent: { before: "Che ", mark: "vende davvero", after: "." },
      lede: "Negozi online che vendono davvero: catalogo, pagamenti, spedizioni e gestione ordini, senza grattacapi. Su WooCommerce o Shopify, collegati a come lavori già.",
      cta: "Raccontaci cosa vendi",
      alt: "Quando serve",
    },
    machine: {
      kind: "checkout",
      product: "Il tuo prodotto",
      add: "Aggiungi al carrello",
      steps: ["Carrello", "Pagamento", "Spedizione"],
      order: "Ordine",
      first: 1041,
      shipped: "Spedito",
      note: "e intanto dormivi",
    },
    facts: [
      { k: "Base", v: "WooCommerce · Shopify" },
      { k: "Tempi", v: "da 4 a 10 settimane" },
      { k: "Formula", v: "Pacchetto o su misura" },
    ],
    when: {
      title: "Quando serve.",
      items: [
        {
          t: "Vendi",
          strike: "solo in negozio",
          fix: "in tutta Italia",
          d: "Chi ti conosce compra; chi non passa dalla tua via, no. Il negozio online ti porta dove i clienti sono già.",
        },
        {
          t: "Vendi online,",
          strike: "a fatica",
          fix: "in ordine",
          d: "Ordini su WhatsApp, pagamenti a mano, un magazzino che non torna mai: funziona finché gli ordini sono pochi.",
        },
        {
          t: "Il negozio c'è,",
          strike: "ma non vende",
          fix: "e ora vende",
          d: "Poche visite, carrelli abbandonati, un pagamento che fa scappare: ogni passaggio in più è un cliente perso.",
        },
      ],
    },
    includes: {
      title: "Cosa comprende.",
      lede: "Il negozio e tutto quello che gli sta intorno: dal primo prodotto caricato al pacco che parte.",
      items: [
        { t: "Catalogo ordinato", d: "Categorie, varianti, filtri: il prodotto giusto in pochi tocchi." },
        { t: "Pagamenti", d: "Carte, PayPal e i metodi che usano i tuoi clienti, collegati e provati." },
        { t: "Spedizioni e resi", d: "Tariffe, corrieri ed etichette, senza ricopiare indirizzi a mano." },
        { t: "Gestione ordini", d: "Ogni ordine in un posto solo, con il suo stato, dal pagamento alla consegna." },
        { t: "Collegato al resto", d: "Magazzino, fatture, gestionale: dove serve, parlano tra loro." },
        { t: "Pronto a crescere", d: "Quando vuoi spingere le vendite, le campagne le fa Alpacode Studio." },
      ],
    },
    steps: {
      title: "Come lavoriamo.",
      items: [
        { t: "Call gratuita", d: "Cosa vendi, a chi, come lavori oggi. Trenta minuti, senza impegno." },
        { t: "Proposta scritta", d: "Piattaforma, funzioni, collegamenti, tempi e costo." },
        { t: "Negozio e catalogo", d: "Carichiamo i prodotti, colleghiamo pagamenti e spedizioni, proviamo tutto." },
        { t: "Il primo ordine", d: "Apri quando lo approvi. Ti mostriamo come gestire gli ordini, e restiamo." },
      ],
    },
    works: {
      title: "Negozi\nche abbiamo fatto.",
      lede: "Dal negozio di quartiere a chi vende in tutta Italia.",
    },
    qa: {
      title: "Le domande\ngiuste.",
      items: [
        {
          q: "WooCommerce o Shopify?",
          a: "Dipende da quanti prodotti hai, da come lavori e da quanto vuoi personalizzare. Te lo diciamo dopo la prima call, con i motivi.",
        },
        {
          q: "Posso caricare i prodotti da solo?",
          a: "Sì. Ti lasciamo il negozio pronto e ti mostriamo come aggiungere prodotti, cambiare prezzi e gestire gli ordini.",
        },
        {
          q: "Si collega al mio gestionale?",
          a: "Spesso sì: magazzino, fatture e ordini possono parlarsi. Lo verifichiamo prima e lo scriviamo nella proposta.",
        },
        {
          q: "Quanto tempo ci vuole?",
          a: "Da quattro a dieci settimane, a seconda del catalogo e dei collegamenti. I tempi esatti sono nella proposta scritta.",
        },
        {
          q: "Ho già un negozio online: lo rifate?",
          a: "Non per forza. Partiamo da quello che funziona e sistemiamo il resto: catalogo, pagamento, velocità.",
        },
      ],
    },
    lead: {
      title: "Raccontaci\ncosa vendi.",
      lede: "Cosa vendi, dove lo vendi oggi e cosa vorresti dal negozio online. Ti rispondiamo per fissare la prima call.",
      topic: "Servizio · E-commerce",
      legend: "Cosa ti serve",
      choices: [
        { id: "nuovo", name: "Un negozio online nuovo" },
        { id: "migliorare", name: "Migliorare quello che ho" },
        { id: "collegare", name: "Collegarlo a magazzino e gestionale" },
      ],
      message: { label: "Due righe su cosa vendi (facoltativo)", ph: "Che prodotti, quanti, come li vendi oggi." },
    },
    portals: "Gli altri servizi",
  },
  en: {
    meta: {
      title: "E-commerce on WooCommerce and Shopify — Alpacode",
      description:
        "Online shops that actually sell: catalogue, payments, shipping and order management, connected to your stock and management system. On WooCommerce or Shopify.",
      ogAlt: "E-commerce: a shop that's open at night, and actually sells.",
    },
    name: "E-commerce",
    portal: "A shop that sells at night too.",
    hero: {
      kicker: "e-commerce",
      lines: ["A shop that's open", "at night too."],
      accent: { before: "And ", mark: "actually sells", after: "." },
      lede: "Online shops that actually sell: catalogue, payments, shipping and order management, without the headaches. On WooCommerce or Shopify, connected to how you already work.",
      cta: "Tell us what you sell",
      alt: "When it's needed",
    },
    machine: {
      kind: "checkout",
      product: "Your product",
      add: "Add to cart",
      steps: ["Cart", "Payment", "Shipping"],
      order: "Order",
      first: 1041,
      shipped: "Shipped",
      note: "while you were asleep",
    },
    facts: [
      { k: "Built on", v: "WooCommerce · Shopify" },
      { k: "Timing", v: "4 to 10 weeks" },
      { k: "Formula", v: "Package or custom" },
    ],
    when: {
      title: "When it's needed.",
      items: [
        {
          t: "You sell",
          strike: "only in the shop",
          fix: "all over Italy",
          d: "People who know you buy; people who don't walk down your street don't. An online shop takes you where the clients already are.",
        },
        {
          t: "You sell online,",
          strike: "the hard way",
          fix: "in order",
          d: "Orders on WhatsApp, payments by hand, a stock count that never adds up: it works while the orders are few.",
        },
        {
          t: "The shop is there,",
          strike: "but doesn't sell",
          fix: "and now it sells",
          d: "Few visits, abandoned carts, a payment step that scares people off: every extra step is a lost client.",
        },
      ],
    },
    includes: {
      title: "What it covers.",
      lede: "The shop and everything around it: from the first product uploaded to the parcel that leaves.",
      items: [
        { t: "A tidy catalogue", d: "Categories, variants, filters: the right product in a few taps." },
        { t: "Payments", d: "Cards, PayPal and the methods your clients use, connected and tested." },
        { t: "Shipping and returns", d: "Rates, couriers and labels, without copying addresses by hand." },
        { t: "Order management", d: "Every order in one place, with its status, from payment to delivery." },
        { t: "Connected to the rest", d: "Stock, invoices, management system: where needed, they talk to each other." },
        { t: "Ready to grow", d: "When you want to push sales, Alpacode Studio runs the campaigns." },
      ],
    },
    steps: {
      title: "How we work.",
      items: [
        { t: "Free call", d: "What you sell, to whom, how you work today. Thirty minutes, no commitment." },
        { t: "Written proposal", d: "Platform, features, connections, timing and cost." },
        { t: "Shop and catalogue", d: "We upload the products, connect payments and shipping, test everything." },
        { t: "The first order", d: "You open when you approve it. We show you how to run the orders, and we stay." },
      ],
    },
    works: {
      title: "Shops\nwe've built.",
      lede: "From the neighbourhood shop to selling across Italy.",
    },
    qa: {
      title: "The right\nquestions.",
      items: [
        {
          q: "WooCommerce or Shopify?",
          a: "It depends on how many products you have, how you work and how much you want to customise. We tell you after the first call, with the reasons.",
        },
        {
          q: "Can I upload products myself?",
          a: "Yes. We hand over the shop ready and show you how to add products, change prices and run the orders.",
        },
        {
          q: "Does it connect to my management system?",
          a: "Often yes: stock, invoices and orders can talk to each other. We check first and put it in the proposal.",
        },
        {
          q: "How long does it take?",
          a: "Four to ten weeks, depending on the catalogue and the connections. The exact timing is in the written proposal.",
        },
        {
          q: "I already have an online shop: do you redo it?",
          a: "Not necessarily. We start from what works and fix the rest: catalogue, checkout, speed.",
        },
      ],
    },
    lead: {
      title: "Tell us\nwhat you sell.",
      lede: "What you sell, where you sell it today and what you'd like from an online shop. We'll reply to set up the first call.",
      topic: "Service · E-commerce",
      legend: "What you need",
      choices: [
        { id: "nuovo", name: "A new online shop" },
        { id: "migliorare", name: "Improve the one I have" },
        { id: "collegare", name: "Connect it to stock and systems" },
      ],
      message: { label: "A couple of lines on what you sell (optional)", ph: "Which products, how many, how you sell them today." },
    },
    portals: "The other services",
  },
};
