import type { Lang } from "../i18n/types";

export interface FaqEntry {
  q: string;
  a: string;
}
export interface FaqPageData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  faqs: FaqEntry[];
}

export const faq: Record<Lang, FaqPageData> = {
  it: {
    crumb: "07 · FAQ",
    h1Line1: "Domande",
    h1Line2: "frequenti.",
    lede: "Quelle che ci fanno davvero, raccolte qui per chi vuole capire prima di chiamare.",
    faqs: [
      { q: "Quanto costa un sito?", a: "Dipende da cosa ti serve. Non lavoriamo a listino: partiamo dal tuo obiettivo e dal tuo budget, anche quando è contenuto, e cerchiamo la soluzione più adatta. Una stima orientativa te la diamo già nella prima call." },
      { q: "Avete pacchetti a prezzo fisso?", a: "Sì. Oltre ai lavori su misura abbiamo i nostri prodotti digitali — come Hive Commerce — e qualche pacchetto pronto, come Sito Pronto o Brand Kit. Prezzo deciso prima di partire." },
      { q: "Fate anche branding e pubblicità?", a: "Sì. Oltre a siti e software ci occupiamo anche di branding, design, campagne pubblicitarie su Google e Meta, SEO e contenuti. Cose che di solito si chiedono a un'agenzia, ma con una sola persona di riferimento." },
      { q: "Fate manutenzione dopo la consegna?", a: "Sì. Un canone mensile con aggiornamenti, sicurezza, backup e piccole modifiche, calibrato sul progetto. Si interrompe quando vuoi." },
      { q: "Posso pagare a rate?", a: "Sì. Per i progetti più importanti possiamo dividere il pagamento in più rate, senza interessi, su 3, 6 o 12 mesi. Non vogliamo che il budget diventi un ostacolo." },
      { q: "Cosa succede dopo la prima call?", a: "Entro pochi giorni ricevi una proposta scritta: cosa faremo, in quanto tempo e a che prezzo. Nessun impegno prima della firma." },
    ],
  },
  en: {
    crumb: "07 · FAQ",
    h1Line1: "Frequently",
    h1Line2: "asked.",
    lede: "The questions people actually ask, gathered here for anyone who wants to understand before calling.",
    faqs: [
      { q: "How much does a website cost?", a: "It depends on what you need. We don't work from a price list: we start from your goal and your budget — even a small one — and find the right fit. You get an indicative estimate during the first call." },
      { q: "Do you have fixed-price packages?", a: "Yes. Alongside bespoke work we have our own digital products — like Hive Commerce — and a few ready-made packages, such as Ready Site or Brand Kit. Price agreed before we start." },
      { q: "Do you also do branding and advertising?", a: "Yes. Besides websites and software, we also handle branding, design, Google and Meta ad campaigns, SEO and content. Things you'd usually ask an agency for — but with just one person to talk to." },
      { q: "Do you handle maintenance after delivery?", a: "Yes. A monthly fee for updates, security, backups and small changes, sized to the project. Cancel whenever you want." },
      { q: "Can I pay in installments?", a: "Yes. For larger projects we can split the payment into installments, interest-free, over 3, 6 or 12 months. We don't want budget to be the obstacle." },
      { q: "What happens after the first call?", a: "Within a few days you get a written proposal: what we'll do, how long it'll take and at what price. No commitment until you sign." },
    ],
  },
};
