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
    crumb: "§06 · FAQ",
    h1Line1: "Domande",
    h1Line2: "frequenti.",
    lede: "Quelle che ci fanno davvero, raccolte qui per chi vuole capire prima di chiamare.",
    faqs: [
      { q: "Quanto costa un sito?", a: "Dipende da cosa ti serve. Non lavoriamo a listino: partiamo dal tuo obiettivo e dal tuo budget, anche quando è contenuto, e cerchiamo la soluzione più adatta. Ti diamo una stima orientativa già nella prima call, gratuita e senza impegno." },
      { q: "Lavorate solo a Milano?", a: "No. Abbiamo sede a Monza e Milano ma lavoriamo con clienti in tutta Italia (e qualche progetto in Svizzera e Germania). Per progetti grandi veniamo volentieri in studio del cliente per i kickoff." },
      { q: "Usate WordPress o React?", a: "Tutti e due, quando hanno senso. WordPress è ottimo per siti editoriali ed e-commerce di taglia media. React/Next.js per prodotti più complessi. Non abbiamo una preferenza dogmatica." },
      { q: "Fate manutenzione dopo la consegna?", a: "Sì, è uno dei nostri servizi. Contratti mensili con monitoraggio, aggiornamenti, sicurezza e supporto, calibrati sul progetto. Si può chiudere quando si vuole." },
      { q: "I vostri corsi rilasciano un attestato?", a: "Sì, un attestato di frequenza Alpacode. Non siamo un ente accreditato MIUR ma i nostri attestati sono riconosciuti da aziende del settore e validi per la formazione professionale continua dei professionisti iscritti agli ordini." },
      { q: "Posso pagare a rate?", a: "Sì. Per corsi e progetti più importanti offriamo rateizzazioni senza interessi su 3, 6 o 12 mesi, anche tramite Klarna o bonifici programmati. L'obiettivo è non far diventare il budget un ostacolo." },
      { q: "Cosa succede dopo la prima call?", a: "Entro 5 giorni lavorati ricevi una proposta scritta con scope, tempi, costo e team. Niente ingaggio fino alla firma del preventivo. La prima call è gratuita e non vincolante." },
      { q: "Possiamo vedere il codice prima di firmare?", a: "Sì, su richiesta condividiamo esempi di codice di progetti precedenti (compatibilmente con gli NDA). Per progetti grandi facciamo volentieri una sessione di pair-programming dimostrativa." },
    ],
  },
  en: {
    crumb: "§06 · FAQ",
    h1Line1: "Frequently",
    h1Line2: "asked.",
    lede: "The questions people actually ask, gathered here for anyone who wants to understand before calling.",
    faqs: [
      { q: "How much does a website cost?", a: "It depends on what you need. We don't work from a price list: we start from your goal and your budget — even a small one — and find the right fit. You get an indicative estimate during the first call, free and no-strings." },
      { q: "Do you only work in Milan?", a: "No. We're based in Monza and Milan but work with clients across Italy (and a few in Switzerland and Germany). For large projects we happily visit the client's office for kickoffs." },
      { q: "Do you use WordPress or React?", a: "Both, when they fit. WordPress is great for editorial sites and mid-size e-commerce. React/Next.js for more complex products. We have no dogmatic preference." },
      { q: "Do you handle maintenance after delivery?", a: "Yes, it's one of our services. Monthly contracts with monitoring, updates, security and support, sized to the project. Cancel anytime." },
      { q: "Do your courses issue a certificate?", a: "Yes, an Alpacode attendance certificate. We are not a MIUR-accredited institution but our certificates are recognized by industry companies and valid for continuing professional training." },
      { q: "Can I pay in installments?", a: "Yes. For larger courses and projects we offer interest-free installments over 3, 6 or 12 months, also via Klarna or scheduled transfers. The goal is to keep budget from being a barrier." },
      { q: "What happens after the first call?", a: "Within 5 worked days you receive a written proposal with scope, timing, cost and team. No engagement until the quote is signed. The first call is free and non-binding." },
      { q: "Can we see the code before signing?", a: "Yes, on request we share code samples from past projects (subject to NDAs). For large projects we happily do a demonstrative pair-programming session." },
    ],
  },
};
