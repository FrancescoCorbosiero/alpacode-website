/* ============================================================
   The FAQ — one archive, by topic (/faq, /en/faq).

   The house's own answers are written here. The landings keep
   theirs (the site on a yearly fee, per chi fa siti, the partner
   program, the referral program) and the archive reads them from
   their data, so every question has one source: change it on the
   landing and the archive follows. Each topic ends on the page that
   tells the rest; marketing questions open the studio's door.

   Copy rules (CLAUDE.md): plain answers, no invented numbers, none
   of the price-reassurance tic.
   ============================================================ */
import type { Lang } from "../i18n/types";
import { localizePath } from "../i18n/utils";
import { doorTo } from "@shared/data/compartments";
import { FAQ as OFFER_FAQ, t } from "./campaigns";
import { smmLanding } from "./smm-landing";
import { hosting } from "./landing/hosting";
import { ai } from "./landing/ai";
import { partnerLanding } from "./partner-landing";
import { landing as referral } from "./voucher/landing";

export interface FaqEntry {
  q: string;
  a: string;
}

export interface FaqTopic {
  id: string;
  title: string;
  lede: string;
  items: FaqEntry[];
  /** The page that tells the rest. */
  link?: { href: string; label: string; external?: boolean };
}

export interface FaqPageData {
  crumb: string;
  h1Line1: string;
  h1Line2: string;
  lede: string;
  searchLabel: string;
  searchPh: string;
  indexLabel: string;
  /** "{n}" becomes the number of answers found. */
  found: string;
  empty: string;
  emptyCta: string;
  topics: FaqTopic[];
}

/** The same question asked on two landings appears once. */
const unique = (items: FaqEntry[]): FaqEntry[] => {
  const seen = new Set<string>();
  return items.filter((it) => {
    const k = it.q.toLowerCase().replace(/[^a-zà-ù0-9]/g, "");
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
};

const studio = (where: string) => doorTo("studio", "/servizi/", { site: "house", where });

const OWN: Record<Lang, Record<"costi" | "metodo" | "dopo" | "formazione" | "studio", Omit<FaqTopic, "id">>> = {
  it: {
    costi: {
      title: "Costi e pagamenti",
      lede: "Quanto costa, come si paga, cosa succede prima di firmare.",
      items: [
        {
          q: "Quanto costa un sito?",
          a: "Dipende da cosa ti serve. Per professionisti e piccole attività c'è il sito a canone: da 300 € l'anno, con dominio, hosting, email e la manutenzione del primo anno. Un sito su misura, un e-commerce o un software li preventiviamo dopo la prima call, con una proposta scritta.",
        },
        {
          q: "Come funziona il preventivo?",
          a: "Dopo una call di trenta minuti ti mandiamo una proposta scritta: cosa faremo, in che ordine, in quanto tempo e a che prezzo. Fino alla firma non c'è nessun impegno.",
        },
        {
          q: "Avete prezzi fissi?",
          a: "Per alcune cose sì: i pacchetti e i prodotti hanno un contenuto e un prezzo definiti. Il resto è su misura, perché dipende da quello che ti serve davvero.",
        },
        {
          q: "Posso pagare a rate?",
          a: "Per i progetti più grandi sì: dividiamo il pagamento in più rate, senza interessi, su 3, 6 o 12 mesi.",
        },
      ],
    },
    metodo: {
      title: "Come lavoriamo",
      lede: "Chi incontri, come si procede, dove lavoriamo.",
      items: [
        {
          q: "Come si parte?",
          a: "Con una call gratuita di trenta minuti per capire cosa ti serve. Poi la proposta scritta; se ti convince, costruiamo insieme, con aggiornamenti a ogni passo, fino al lancio.",
        },
        {
          q: "Con chi parlo durante il progetto?",
          a: "Con una persona sola, dall'inizio alla fine: chi segue il tuo progetto è anche chi lo costruisce. Sui progetti enterprise lavoriamo con un partner tecnologico, sui social con la nostra social media manager.",
        },
        {
          q: "Lavorate solo a Monza e Milano?",
          a: "No. La base è tra Monza, Milano e la Brianza, ma lavoriamo da remoto con clienti in tutta Italia. Per i progetti più grandi veniamo volentieri da te.",
        },
        {
          q: "Usate l'intelligenza artificiale?",
          a: "Sì, dove accelera il lavoro ripetitivo: strutture, varianti, controlli. Le scelte, i testi e la verifica finale restano nostri. E se vuoi l'AI dentro la tua attività, la integriamo nei processi che usi già.",
        },
      ],
    },
    dopo: {
      title: "Dopo il lancio",
      lede: "Il sito è online: chi lo segue, chi lo aggiorna, di chi è.",
      items: [
        {
          q: "Fate manutenzione?",
          a: "Sì, con un canone mensile calibrato sul progetto: aggiornamenti, sicurezza, backup e piccole modifiche. Si interrompe quando vuoi.",
        },
        {
          q: "Posso modificare il sito da solo?",
          a: "Sì. Ti lasciamo gli accessi e ti mostriamo come gestire i contenuti; le modifiche più tecniche le facciamo noi.",
        },
        {
          q: "Il sito è mio?",
          a: "Sì: il materiale realizzato su misura diventa tuo al saldo del compenso, come scritto nei termini.",
        },
      ],
    },
    formazione: {
      title: "Formazione",
      lede: "Corsi e percorsi per professionisti, formazione per i team.",
      items: [
        {
          q: "Fate formazione per le aziende?",
          a: "Sì: percorsi su misura per i team, da una giornata in su, in aula o da remoto, con esercizi sui vostri casi reali.",
        },
        {
          q: "Quanto costano i corsi?",
          a: "Dipende dal percorso e dal formato: ti mandiamo il programma e il prezzo su richiesta. Le guide e i crash course da fare da sé si comprano su Alpacode Studio.",
        },
      ],
    },
    studio: {
      title: "Marketing e social",
      lede: "Social, brand, campagne e SEO: il lavoro di Alpacode Studio.",
      items: [
        {
          q: "Fate anche branding, social e pubblicità?",
          a: "Sì: è il lavoro di Alpacode Studio, il nostro compartimento marketing, su studio.alpacode.it. Le stesse persone, lo stesso metodo, con i pacchetti pronti.",
        },
        {
          q: "Posso avere sito e marketing insieme?",
          a: "Sì, ed è il modo migliore: il sito lo costruisce Alpacode, il marketing lo segue lo studio, sullo stesso progetto.",
        },
      ],
    },
  },
  en: {
    costi: {
      title: "Costs and payments",
      lede: "What it costs, how you pay, what happens before you sign.",
      items: [
        {
          q: "How much does a website cost?",
          a: "It depends on what you need. For professionals and small businesses there's the site on a yearly fee: from €300 a year, with domain, hosting, email and the first year's maintenance. A bespoke site, an e-commerce or a piece of software we quote after the first call, with a written proposal.",
        },
        {
          q: "How does the quote work?",
          a: "After a thirty-minute call we send you a written proposal: what we'll do, in what order, how long it takes and what it costs. There's no commitment until you sign.",
        },
        {
          q: "Do you have fixed prices?",
          a: "For some things, yes: the packages and the products have a set scope and price. The rest is bespoke, because it depends on what you actually need.",
        },
        {
          q: "Can I pay in instalments?",
          a: "For larger projects, yes: we split the payment into instalments, interest-free, over 3, 6 or 12 months.",
        },
      ],
    },
    metodo: {
      title: "How we work",
      lede: "Who you meet, how it goes, where we work.",
      items: [
        {
          q: "How does it start?",
          a: "With a free thirty-minute call to understand what you need. Then the written proposal; if it convinces you, we build together, with updates at every step, until launch.",
        },
        {
          q: "Who do I talk to during the project?",
          a: "One person, from start to finish: whoever follows your project is also who builds it. On enterprise projects we work with a technology partner, on social with our social media manager.",
        },
        {
          q: "Do you only work in Monza and Milan?",
          a: "No. Our base is between Monza, Milan and the Brianza, but we work remotely with clients all over Italy. For bigger projects we're happy to come to you.",
        },
        {
          q: "Do you use artificial intelligence?",
          a: "Yes, where it speeds up the repetitive work: structures, variants, checks. The choices, the copy and the final check stay ours. And if you want AI inside your business, we integrate it into the processes you already use.",
        },
      ],
    },
    dopo: {
      title: "After launch",
      lede: "The site is live: who looks after it, who updates it, whose it is.",
      items: [
        {
          q: "Do you handle maintenance?",
          a: "Yes, with a monthly fee sized to the project: updates, security, backups and small changes. Cancel whenever you want.",
        },
        {
          q: "Can I edit the site myself?",
          a: "Yes. We hand over access and show you how to manage the content; the more technical changes we make for you.",
        },
        {
          q: "Is the site mine?",
          a: "Yes: what we make for you becomes yours once the fee is settled, as the terms say.",
        },
      ],
    },
    formazione: {
      title: "Training",
      lede: "Courses and tracks for professionals, training for teams.",
      items: [
        {
          q: "Do you train companies?",
          a: "Yes: bespoke tracks for teams, from one day up, in the classroom or remote, with exercises on your real cases.",
        },
        {
          q: "How much do the courses cost?",
          a: "It depends on the track and the format: we send you the programme and the price on request. The do-it-yourself guides and crash courses are sold on Alpacode Studio, in Italian.",
        },
      ],
    },
    studio: {
      title: "Marketing and social",
      lede: "Social, brand, campaigns and SEO: the work of Alpacode Studio.",
      items: [
        {
          q: "Do you also do branding, social and advertising?",
          a: "Yes: it's the work of Alpacode Studio, our marketing compartment, on studio.alpacode.it (in Italian). The same people, the same method, with ready-made packages.",
        },
        {
          q: "Can I have the site and the marketing together?",
          a: "Yes, and it's the best way: Alpacode builds the site, the studio runs the marketing, on the same project.",
        },
      ],
    },
  },
};

const UI: Record<Lang, Omit<FaqPageData, "topics">> = {
  it: {
    crumb: "FAQ",
    h1Line1: "Domande",
    h1Line2: "frequenti.",
    lede: "Le risposte alle domande che ci fanno più spesso, divise per argomento. Se la tua non c'è, scrivici.",
    searchLabel: "Cerca tra le risposte",
    searchPh: "Es. rate, manutenzione, partner",
    indexLabel: "Argomenti",
    found: "{n} risposte",
    empty: "Nessuna risposta per questa ricerca.",
    emptyCta: "Chiedicelo direttamente",
  },
  en: {
    crumb: "FAQ",
    h1Line1: "Frequently",
    h1Line2: "asked.",
    lede: "Answers to the questions we hear most, by topic. If yours isn't here, write to us.",
    searchLabel: "Search the answers",
    searchPh: "E.g. instalments, maintenance, partner",
    indexLabel: "Topics",
    found: "{n} answers",
    empty: "No answer for this search.",
    emptyCta: "Ask us directly",
  },
};

export function faqPage(lang: Lang): FaqPageData {
  const own = OWN[lang];
  const it = lang === "it";
  const topics: FaqTopic[] = [
    { id: "costi", ...own.costi, link: { href: localizePath("prodotti", lang), label: it ? "Pacchetti e prodotti" : "Packages and products" } },
    { id: "metodo", ...own.metodo, link: { href: localizePath("chi-siamo", lang), label: it ? "Chi siamo" : "About us" } },
    { id: "dopo", ...own.dopo, link: { href: localizePath("servizi", lang), label: it ? "I servizi" : "Services" } },
    {
      id: "siti",
      title: it ? "Siti a canone" : "Sites on a yearly fee",
      lede: it
        ? "Il sito completo con dominio, hosting ed email, a un canone annuale: per professionisti e piccole attività."
        : "The complete site with domain, hosting and email, for a yearly fee: for professionals and small businesses.",
      // The SMM page's own three (Linktree, time, Instagram); its other
      // three ask what the offer's FAQ already answers.
      items: unique([...OFFER_FAQ.map((f) => ({ q: t(f.q, lang), a: t(f.a, lang) })), ...smmLanding[lang].qa.items.slice(0, 3)]),
      link: { href: localizePath("offerta/liberi-professionisti", lang), label: it ? "Il sito per professionisti" : "The site for professionals" },
    },
    {
      id: "chi-fa-siti",
      title: it ? "Per chi fa siti" : "For people who build sites",
      lede: it
        ? "Codebase, hosting e formazione per sviluppatori e web designer."
        : "Codebase, hosting and training for developers and web designers.",
      items: unique([...hosting[lang].qa.items, ...ai[lang].qa.items]),
      link: { href: localizePath("per-chi-fa-siti", lang), label: it ? "Per chi fa siti" : "For people who build sites" },
    },
    {
      id: "partner",
      title: it ? "Programma partner" : "Partner programme",
      lede: it
        ? "Per chi ha un portafoglio clienti: segnala, rivendi o scambia."
        : "For people with a client portfolio: refer, resell or swap.",
      items: partnerLanding[lang].qa.items,
      link: { href: localizePath("partner", lang), label: it ? "Il programma partner" : "The partner programme" },
    },
    {
      id: "segnala",
      title: it ? "Segnala un amico" : "Refer a friend",
      lede: it
        ? "Fino a 100 € per ogni persona che ci presenti e diventa cliente."
        : "Up to €100 for every person you introduce who becomes a client.",
      items: referral.sito[lang].faq.items,
      link: { href: localizePath("voucher", lang), label: it ? "Segnala un amico" : "Refer a friend" },
    },
    { id: "formazione", ...own.formazione, link: { href: localizePath("learning", lang), label: it ? "I corsi" : "The courses" } },
    { id: "studio", ...own.studio, link: { href: studio("faq"), label: it ? "Alpacode Studio" : "Alpacode Studio", external: true } },
  ];
  return { ...UI[lang], topics };
}

/** Every answer, for the page's FAQPage structured data. */
export const faqEntries = (lang: Lang): FaqEntry[] => faqPage(lang).topics.flatMap((tp) => tp.items);
