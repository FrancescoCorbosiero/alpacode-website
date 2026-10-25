/* ============================================================
   The program's two doors — the referrer's pages:
     sito            /voucher/                (/en/voucher/)
     nuova-attivita  /voucher/nuova-attivita/ (/en/voucher/nuova-attivita/)
   Same program, same rules, same codes and ledger; each door speaks
   to whoever the referred person is. "sito" is the printed flyer,
   section by section («Conosci qualcuno a cui potrebbe servire un
   sito web?»), plus what a flyer can't do: a real personal link, a
   share panel, a QR that carries the invite, answers to the obvious
   questions. "nuova-attivita" goes to the root: someone who just
   opened a business needs all of the digital side, not only a site
   (the kit, data/voucher/kit.ts).

   UI strings both doors share are in shared.ts; this file holds what
   changes from one door to the other. House rules: no invented
   numbers — the only figure is the flyer's own ("fino a 100 €").
   ============================================================ */
import type { Lang } from "../../i18n/types";
import type { ProgramId } from "../../lib/voucher/program";
import type { NeedId } from "./shared";

export interface CrossLink {
  /** Where it goes: the partner program or the program's other door. */
  to: "partner" | ProgramId;
  tag: string;
  title: string;
  body: string;
  cta: string;
}

export interface LandingCopy {
  meta: { title: string; description: string; ogImage: string; ogAlt: string };
  /** This door's name in the breadcrumb (BreadcrumbList JSON-LD). */
  crumb: string;
  headerCta: string;
  hero: {
    kicker: string;
    /** Headline lines; the last line ends with `accent`, set in blue. */
    lines: string[];
    accent: string;
    lede: string;
    ledeStrong: string;
    sticker: { pre: string; amount: string; post: string; aria: string };
    /** "Il cashback … tramite {methods} …" — methods are set in bold blue. */
    payoutBefore: string;
    payoutMethods: string[];
    payoutJoin: { comma: string; or: string };
    payoutAfter: string;
    ctaPrimary: string;
    ctaSecondary: { label: string; href: string };
  };
  ticker: string[];
  /** The new-business door's kit board (KitPicker.astro). */
  kit?: {
    kicker: string;
    title: string;
    lede: string;
    legend: string;
    board: string;
    note: string;
    cta: string;
  };
  studio: {
    kicker: string;
    title: string;
    lede: string;
    points: string[];
    /** The share message; {link} is the invite, {thing} what they opened. */
    message: string;
    emailSubject: string;
    resultLede: string;
    /** The link preview's second line in the chat bubble. */
    cardDesc: string;
    /** The direct referral's question: what they need (sito), or what
     *  they opened (nuova-attivita — the options are the kit's types). */
    ask: { legend: string; needs?: { id: NeedId; label: string }[] };
    notePh: string;
  };
  faq: { kicker: string; title: string; items: { q: string; a: string }[] };
  cross: CrossLink[];
  final: { kicker: string; line1: string; line2: string; sub: string; cta: string; alt: string; altSubject: string };
}

const STICKER_IT = { pre: "Fino a", amount: "100€", post: "di cashback", aria: "Fino a 100 euro di cashback" };
const STICKER_EN = { pre: "Up to", amount: "€100", post: "cashback", aria: "Up to 100 euros cashback" };

const PAYLINE_IT = {
  payoutBefore: "Il cashback fino a 100 € viene erogato tramite ",
  payoutMethods: ["bonifico", "PayPal", "buono acquisto"],
  payoutJoin: { comma: ", ", or: " o " },
  payoutAfter: ", non appena il nuovo cliente avrà completato l'acquisto del servizio.",
};
const PAYLINE_EN = {
  payoutBefore: "The cashback of up to €100 is paid by ",
  payoutMethods: ["bank transfer", "PayPal", "voucher"],
  payoutJoin: { comma: ", ", or: " or " },
  payoutAfter: ", as soon as the new client has completed the purchase of the service.",
};

const POINTS_IT = [
  "Il link è tuo per sempre: stessa email, stesso link.",
  "Chi segnali ci scrive quando vuole, senza pressioni.",
  "Ti aggiorniamo via email a ogni passo.",
];
const POINTS_EN = [
  "The link is yours for good: same email, same link.",
  "Whoever you refer writes to us when they like, no pressure.",
  "We keep you posted by email at every step.",
];

/* FAQ answers both doors give word for word. */
const FAQ_IT = {
  when: {
    q: "Quando arriva il cashback?",
    a: "Quando il nuovo cliente ha firmato il contratto e pagato regolarmente il primo acconto. A quel punto ti scriviamo, raccogliamo i dati per l'accredito e ti mandiamo il premio con il metodo che hai scelto: bonifico, PayPal o buono acquisto.",
  },
  client: {
    q: "E se la persona è già nostra cliente?",
    a: "Il cashback premia chi ci fa conoscere un nuovo cliente: se la persona lavora già con noi, la segnalazione non è valida.",
  },
  combine: {
    q: "Il cashback si somma ad altre promozioni?",
    a: "No: non è cumulabile con altre promozioni o iniziative in corso, salvo diverse comunicazioni da parte nostra.",
  },
  data: {
    q: "Cosa fate con i dati che inserisco?",
    a: "Li usiamo solo per gestire la segnalazione e l'accredito del premio, come spiegato nell'informativa privacy del programma. Puoi chiederne la cancellazione in qualsiasi momento scrivendo a info@alpacode.it.",
  },
};
const FAQ_EN = {
  when: {
    q: "When does the cashback arrive?",
    a: "Once the new client has signed the contract and duly paid the first deposit. Then we write to you, collect the payout details and send the reward with the method you chose: bank transfer, PayPal or voucher.",
  },
  client: {
    q: "What if the person is already our client?",
    a: "The cashback rewards introducing a new client: if the person already works with us, the referral isn't valid.",
  },
  combine: {
    q: "Can it be combined with other promotions?",
    a: "No: it can't be combined with other promotions or initiatives in progress, unless we state otherwise.",
  },
  data: {
    q: "What do you do with the data I enter?",
    a: "We use it only to manage the referral and pay out the reward, as explained in the program privacy notice. You can ask us to delete it at any time by writing to info@alpacode.it.",
  },
};

const PARTNER_IT = {
  to: "partner",
  cta: "Scopri il programma partner",
  title: "Diventa partner Alpacode.",
} as const;
const PARTNER_EN = {
  to: "partner",
  cta: "Discover the partner program",
  title: "Become an Alpacode partner.",
} as const;

const FINAL_IT = {
  kicker: "Ultima cosa",
  line2: "Fino a 100 € per te.",
  sub: "Generi il tuo link in un minuto, lo mandi su WhatsApp e da lì continuiamo noi.",
  cta: "Genera il tuo link",
  alt: "Domande? Scrivici",
  altSubject: "Domanda sul programma Segnala un amico",
};
const FINAL_EN = {
  kicker: "One last thing",
  line2: "Up to €100 for you.",
  sub: "Get your link in a minute, send it on WhatsApp and we take it from there.",
  cta: "Get your link",
  alt: "Questions? Write to us",
  altSubject: "Question about the refer-a-friend program",
};

export const landing: Record<ProgramId, Record<Lang, LandingCopy>> = {
  /* ---------------- sito — the printed flyer ---------------- */
  sito: {
    it: {
      meta: {
        title: "Segnala un amico · Fino a 100 € di cashback — Alpacode",
        description:
          "Conosci qualcuno a cui serve un sito web o un e-commerce? Segnalalo ad Alpacode: se diventa nostro cliente ricevi fino a 100 € con bonifico, PayPal o buono acquisto.",
        ogImage: "/og-voucher.jpg",
        ogAlt: "Conosci qualcuno a cui potrebbe servire un sito web? Fino a 100 € di cashback — Alpacode",
      },
      crumb: "Segnala un amico",
      headerCta: "Segnala ora",
      hero: {
        kicker: "Segnala un amico · Programma cashback",
        lines: ["Conosci qualcuno", "a cui potrebbe", "servire un"],
        accent: "sito web?",
        lede: "Segnala un amico, un collega o un conoscente che sta pensando di creare un sito web o un e-commerce.",
        ledeStrong: "Se diventa nostro cliente, ricevi",
        sticker: STICKER_IT,
        ...PAYLINE_IT,
        ctaPrimary: "Genera il tuo link",
        ctaSecondary: { label: "Come funziona", href: "#come-funziona" },
      },
      ticker: [
        "SEGNALA UN AMICO",
        "FINO A 100 € DI CASHBACK",
        "BONIFICO",
        "PAYPAL",
        "BUONO ACQUISTO",
        "SITI WEB",
        "E-COMMERCE",
        "PIÙ PERSONE NEL MONDO DIGITALE",
      ],
      studio: {
        kicker: "Il tuo link unico",
        title: "Segnala in un minuto.",
        lede: "Due strade, stesso premio. Condividi il tuo link personale e lascia che sia il tuo amico a scriverci, oppure mandaci tu i suoi contatti, se è d'accordo.",
        points: POINTS_IT,
        message:
          "Ciao! Se ti serve un sito web o un e-commerce, ti consiglio Alpacode: la prima call è gratuita e ti dicono subito se e come possono aiutarti. Puoi scrivergli da qui: {link}",
        emailSubject: "Ti consiglio Alpacode per il tuo sito",
        resultLede:
          "Mandalo a chi pensi possa servire un sito web o un e-commerce. Quando ci scrive da lì, la segnalazione è tua.",
        cardDesc: "Siti web ed e-commerce · prima call gratuita",
        ask: {
          legend: "Cosa le serve?",
          needs: [
            { id: "sito", label: "Un sito web" },
            { id: "ecommerce", label: "Un e-commerce" },
            { id: "altro", label: "Non lo sa ancora" },
          ],
        },
        notePh: "Es. ha un ristorante e vorrebbe le prenotazioni online.",
      },
      faq: {
        kicker: "Domande frequenti",
        title: "Le domande giuste, le risposte dritte.",
        items: [
          {
            q: "Quanto ricevo, esattamente?",
            a: "Fino a 100 € per ogni persona che segnali e che diventa nostra cliente. L'importo dipende dal progetto che sceglie: te lo confermiamo per iscritto quando verifichiamo la segnalazione, prima dell'accredito.",
          },
          FAQ_IT.when,
          {
            q: "Il mio amico deve sapere che l'ho segnalato?",
            a: "Sì. La strada più semplice è il tuo link: è lui a scriverci, quando vuole, e presta da solo il consenso privacy. Se preferisci mandarci tu i suoi contatti, fallo solo dopo avergli chiesto il permesso: lo contatteremo dicendo che ci ha presentati tu.",
          },
          {
            q: "Posso segnalare più persone?",
            a: "Sì: ogni persona diversa che diventa cliente vale il suo cashback. La stessa persona, però, si può segnalare una volta sola: se ci arriva da più parti, vale la prima segnalazione valida.",
          },
          {
            q: "Chi può partecipare?",
            a: "Chiunque conosca qualcuno a cui serve un sito web o un e-commerce: clienti, amici, colleghi. Ti basta un indirizzo email per ricevere il tuo link.",
          },
          FAQ_IT.client,
          FAQ_IT.combine,
          FAQ_IT.data,
        ],
      },
      cross: [
        {
          to: "nuova-attivita",
          tag: "Conosci qualcuno che ha appena aperto?",
          title: "Segnala una nuova attività.",
          body: "Chi apre ha bisogno di tutto il digitale, non solo del sito: logo, Google, pubblicità, gestionale. Stesso programma, stesso premio, una pagina pensata per loro.",
          cta: "Vai alle nuove attività",
        },
        {
          ...PARTNER_IT,
          tag: "Lavori ogni giorno con dei clienti?",
          body: "Social media manager, commercialisti, agenti, fotografi: se i siti te li chiedono di continuo, c'è un programma pensato per te. Segnali, rivendi in white-label o scambi lead, con condizioni scritte.",
        },
      ],
      final: { ...FINAL_IT, line1: "Un messaggio a un amico." },
    },
    en: {
      meta: {
        title: "Refer a friend · Up to €100 cashback — Alpacode",
        description:
          "Know someone who needs a website or an online store? Refer them to Alpacode: if they become our client you get up to €100 by bank transfer, PayPal or voucher.",
        ogImage: "/og-voucher-en.jpg",
        ogAlt: "Know someone who could use a website? Up to €100 cashback — Alpacode",
      },
      crumb: "Refer a friend",
      headerCta: "Refer now",
      hero: {
        kicker: "Refer a friend · Cashback program",
        lines: ["Know someone", "who could use", "a"],
        accent: "website?",
        lede: "Refer a friend, a colleague or someone you know who is thinking about building a website or an online store.",
        ledeStrong: "If they become our client, you get",
        sticker: STICKER_EN,
        ...PAYLINE_EN,
        ctaPrimary: "Get your link",
        ctaSecondary: { label: "How it works", href: "#come-funziona" },
      },
      ticker: [
        "REFER A FRIEND",
        "UP TO €100 CASHBACK",
        "BANK TRANSFER",
        "PAYPAL",
        "VOUCHER",
        "WEBSITES",
        "ONLINE STORES",
        "MORE PEOPLE IN THE DIGITAL WORLD",
      ],
      studio: {
        kicker: "Your personal link",
        title: "Refer in a minute.",
        lede: "Two ways, same reward. Share your personal link and let your friend reach out, or send us their contact details yourself, if they agree.",
        points: POINTS_EN,
        message:
          "Hi! If you need a website or an online store, I recommend Alpacode: the first call is free and they tell you straight away whether and how they can help. You can reach them here: {link}",
        emailSubject: "I recommend Alpacode for your website",
        resultLede:
          "Send it to anyone who might need a website or an online store. When they reach out through it, the referral is yours.",
        cardDesc: "Websites and online stores · free first call",
        ask: {
          legend: "What do they need?",
          needs: [
            { id: "sito", label: "A website" },
            { id: "ecommerce", label: "An online store" },
            { id: "altro", label: "Not sure yet" },
          ],
        },
        notePh: "E.g. they run a restaurant and want online bookings.",
      },
      faq: {
        kicker: "FAQ",
        title: "Straight questions, straight answers.",
        items: [
          {
            q: "How much do I get, exactly?",
            a: "Up to €100 for every person you refer who becomes our client. The amount depends on the project they choose: we confirm it in writing when we validate the referral, before paying out.",
          },
          FAQ_EN.when,
          {
            q: "Does my friend need to know I referred them?",
            a: "Yes. The easiest way is your link: they write to us when they like and give their own privacy consent. If you'd rather send us their details, do it only after asking: we'll contact them saying you introduced us.",
          },
          {
            q: "Can I refer more than one person?",
            a: "Yes: every different person who becomes a client earns its own cashback. The same person can only be referred once, though: if they reach us from more than one side, the first valid referral counts.",
          },
          {
            q: "Who can take part?",
            a: "Anyone who knows someone in need of a website or an online store: clients, friends, colleagues. An email address is all you need to get your link.",
          },
          FAQ_EN.client,
          FAQ_EN.combine,
          FAQ_EN.data,
        ],
      },
      cross: [
        {
          to: "nuova-attivita",
          tag: "Know someone who just opened?",
          title: "Refer a new business.",
          body: "Opening means needing all things digital, not just a website: logo, Google, ads, management tools. Same program, same reward, a page made for them.",
          cta: "Go to new businesses",
        },
        {
          ...PARTNER_EN,
          tag: "Working with clients every day?",
          body: "Social media managers, accountants, sales agents, photographers: if clients keep asking you for websites, there's a program built for you. Refer, resell white-label or swap leads, with terms in writing.",
        },
      ],
      final: { ...FINAL_EN, line1: "One message to a friend." },
    },
  },

  /* ---------------- nuova-attivita — the root of it ---------------- */
  "nuova-attivita": {
    it: {
      meta: {
        title: "Segnala una nuova attività · Fino a 100 € di cashback — Alpacode",
        description:
          "Conosci qualcuno che ha appena aperto un negozio, un locale, uno studio o un e-commerce? Segnalalo ad Alpacode: se diventa nostro cliente ricevi fino a 100 € con bonifico, PayPal o buono acquisto.",
        ogImage: "/og-voucher-nuova-attivita.png",
        ogAlt: "Conosci qualcuno che ha appena aperto un'attività? Fino a 100 € di cashback — Alpacode",
      },
      crumb: "Nuove attività",
      headerCta: "Segnala ora",
      hero: {
        kicker: "Segnala un amico · Nuove attività",
        lines: ["Conosci qualcuno", "che ha appena", "aperto"],
        accent: "un'attività?",
        lede: "Chi ha appena aperto un negozio, un locale, uno studio o un e-commerce ha bisogno di tutto il digitale, e subito: logo, sito, Google, pubblicità, gestionale.",
        ledeStrong: "Se diventa nostro cliente, ricevi",
        sticker: STICKER_IT,
        ...PAYLINE_IT,
        ctaPrimary: "Genera il tuo link",
        ctaSecondary: { label: "Cosa possiamo fare", href: "#kit" },
      },
      ticker: [
        "NUOVE ATTIVITÀ",
        "FINO A 100 € DI CASHBACK",
        "LOGO E BRAND",
        "SITO WEB",
        "VISIBILITÀ SU GOOGLE",
        "E-COMMERCE",
        "CAMPAGNE GOOGLE E META",
        "GESTIONALI",
        "FORMAZIONE",
      ],
      kit: {
        kicker: "Il kit di partenza",
        title: "Chi apre ha bisogno di tutto.",
        lede: "Il sito è solo l'inizio. Scegli che attività ha aperto la persona che vuoi segnalare: ecco da dove partiremmo, e il messaggio da mandarle si adatta da solo.",
        legend: "Che attività ha aperto?",
        board: "Da dove partiremmo",
        note: "Ogni attività è diversa: nella prima call, gratuita, capiamo insieme cosa serve davvero, in che ordine e con che budget.",
        cta: "Genera il tuo link",
      },
      studio: {
        kicker: "Il tuo link unico",
        title: "Segnala in un minuto.",
        lede: "Due strade, stesso premio. Condividi il tuo link personale e lascia che sia chi ha aperto a scriverci, oppure mandaci tu i suoi contatti, se è d'accordo.",
        points: POINTS_IT,
        message:
          "Ciao! Ho saputo che hai aperto {thing}: complimenti! Per tutta la parte digitale, dal logo al sito alla pubblicità, ti consiglio Alpacode: la prima call è gratuita e ti dicono subito se e come possono aiutarti. Puoi scrivergli da qui: {link}",
        emailSubject: "Ti consiglio Alpacode per la tua nuova attività",
        resultLede: "Mandalo a chi ha appena aperto un'attività. Quando ci scrive da lì, la segnalazione è tua.",
        cardDesc: "Tutto il digitale per chi ha appena aperto · prima call gratuita",
        ask: { legend: "Che attività ha aperto?" },
        notePh: "Es. ha aperto una pasticceria a settembre e non ha ancora il sito.",
      },
      faq: {
        kicker: "Domande frequenti",
        title: "Le domande giuste, le risposte dritte.",
        items: [
          {
            q: "Cosa intendete per «nuova attività»?",
            a: "Qualsiasi attività aperta da poco o in apertura: un negozio, un locale, uno studio, un'impresa artigiana, un e-commerce. Conta che diventi nostra cliente, per uno qualsiasi dei nostri servizi: logo e brand, sito, e-commerce, pubblicità, software o formazione.",
          },
          {
            q: "Quanto ricevo, esattamente?",
            a: "Fino a 100 € per ogni attività che segnali e che diventa nostra cliente. L'importo dipende dal progetto che sceglie: te lo confermiamo per iscritto quando verifichiamo la segnalazione, prima dell'accredito.",
          },
          FAQ_IT.when,
          {
            q: "E se ha già un sito o un logo?",
            a: "Va bene lo stesso: a chi ha appena aperto resta quasi sempre qualcosa da fare, che sia farsi trovare su Google, vendere online o mettere ordine nella gestione. Nella prima call capiamo insieme cosa tenere e cosa serve davvero.",
          },
          {
            q: "La persona deve sapere che l'ho segnalata?",
            a: "Sì. La strada più semplice è il tuo link: è lei a scriverci, quando vuole, e presta da sola il consenso privacy. Se preferisci mandarci tu i suoi contatti, fallo solo dopo averle chiesto il permesso: la contatteremo dicendo che ci ha presentati tu.",
          },
          {
            q: "Posso segnalare più attività?",
            a: "Sì: ogni attività diversa che diventa cliente vale il suo cashback. La stessa persona, però, si può segnalare una volta sola: se ci arriva da più parti, vale la prima segnalazione valida.",
          },
          {
            q: "Chi può partecipare?",
            a: "Chiunque conosca qualcuno che ha appena aperto: amici, parenti, clienti, colleghi, fornitori. Ti basta un indirizzo email per ricevere il tuo link. Se segnalare attività fa parte del tuo lavoro, guarda anche il programma partner.",
          },
          FAQ_IT.client,
          FAQ_IT.combine,
          FAQ_IT.data,
        ],
      },
      cross: [
        {
          ...PARTNER_IT,
          tag: "Vedi aprire attività ogni settimana?",
          body: "Commercialisti, consulenti, agenti, fornitori: se chi apre si rivolge prima a te, c'è un programma pensato per il tuo lavoro. Segnali, rivendi in white-label o scambi lead, con condizioni scritte.",
        },
        {
          to: "sito",
          tag: "Serve solo un sito web?",
          title: "Segnala un amico.",
          body: "Per chi un'attività ce l'ha già e cerca un sito o un e-commerce nuovo: stesso programma, stesso premio.",
          cta: "Vai al programma",
        },
      ],
      final: { ...FINAL_IT, line1: "Un messaggio a chi apre." },
    },
    en: {
      meta: {
        title: "Refer a new business · Up to €100 cashback — Alpacode",
        description:
          "Know someone who just opened a shop, a bar, a practice or an online store? Refer them to Alpacode: if they become our client you get up to €100 by bank transfer, PayPal or voucher.",
        ogImage: "/og-voucher-nuova-attivita-en.png",
        ogAlt: "Know someone who just opened a business? Up to €100 cashback — Alpacode",
      },
      crumb: "New businesses",
      headerCta: "Refer now",
      hero: {
        kicker: "Refer a friend · New businesses",
        lines: ["Know someone", "who just", "opened"],
        accent: "a business?",
        lede: "Whoever just opened a shop, a bar, a practice or an online store needs all things digital, and fast: logo, website, Google, advertising, management tools.",
        ledeStrong: "If they become our client, you get",
        sticker: STICKER_EN,
        ...PAYLINE_EN,
        ctaPrimary: "Get your link",
        ctaSecondary: { label: "What we can do", href: "#kit" },
      },
      ticker: [
        "NEW BUSINESSES",
        "UP TO €100 CASHBACK",
        "LOGO & BRAND",
        "WEBSITES",
        "VISIBILITY ON GOOGLE",
        "ONLINE STORES",
        "GOOGLE & META ADS",
        "MANAGEMENT TOOLS",
        "TRAINING",
      ],
      kit: {
        kicker: "The starter kit",
        title: "Opening means needing it all.",
        lede: "The website is just the start. Pick what the person you want to refer has opened: here's where we'd begin, and the message to send them adapts on its own.",
        legend: "What did they open?",
        board: "Where we'd start",
        note: "Every business is different: in the first call, free, we work out together what's really needed, in what order and on what budget.",
        cta: "Get your link",
      },
      studio: {
        kicker: "Your personal link",
        title: "Refer in a minute.",
        lede: "Two ways, same reward. Share your personal link and let the new owner reach out, or send us their contact details yourself, if they agree.",
        points: POINTS_EN,
        message:
          "Hi! I heard you opened {thing}: congratulations! For all things digital, from the logo to the website to advertising, I recommend Alpacode: the first call is free and they tell you straight away whether and how they can help. You can reach them here: {link}",
        emailSubject: "I recommend Alpacode for your new business",
        resultLede: "Send it to someone who just opened a business. When they reach out through it, the referral is yours.",
        cardDesc: "All things digital for new businesses · free first call",
        ask: { legend: "What did they open?" },
        notePh: "E.g. they opened a bakery in September and don't have a website yet.",
      },
      faq: {
        kicker: "FAQ",
        title: "Straight questions, straight answers.",
        items: [
          {
            q: "What counts as a “new business”?",
            a: "Any business opened recently or about to open: a shop, a bar or restaurant, a practice, a trade, an online store. What matters is that it becomes our client, for any of our services: logo and brand, website, online store, advertising, software or training.",
          },
          {
            q: "How much do I get, exactly?",
            a: "Up to €100 for every business you refer that becomes our client. The amount depends on the project it chooses: we confirm it in writing when we validate the referral, before paying out.",
          },
          FAQ_EN.when,
          {
            q: "What if they already have a website or a logo?",
            a: "That's fine: someone who just opened almost always has something left to do, be it getting found on Google, selling online or getting the admin in order. In the first call we work out together what to keep and what's really needed.",
          },
          {
            q: "Do they need to know I referred them?",
            a: "Yes. The easiest way is your link: they write to us when they like and give their own privacy consent. If you'd rather send us their details, do it only after asking: we'll contact them saying you introduced us.",
          },
          {
            q: "Can I refer more than one business?",
            a: "Yes: every different business that becomes a client earns its own cashback. The same person can only be referred once, though: if they reach us from more than one side, the first valid referral counts.",
          },
          {
            q: "Who can take part?",
            a: "Anyone who knows someone who just opened: friends, family, clients, colleagues, suppliers. An email address is all you need to get your link. If referring businesses is part of your job, have a look at the partner program too.",
          },
          FAQ_EN.client,
          FAQ_EN.combine,
          FAQ_EN.data,
        ],
      },
      cross: [
        {
          ...PARTNER_EN,
          tag: "See businesses open every week?",
          body: "Accountants, consultants, agents, suppliers: if new owners come to you first, there's a program built for your job. Refer, resell white-label or swap leads, with terms in writing.",
        },
        {
          to: "sito",
          tag: "Just need a website?",
          title: "Refer a friend.",
          body: "For people who already run a business and want a new website or online store: same program, same reward.",
          cta: "Go to the program",
        },
      ],
      final: { ...FINAL_EN, line1: "One message to a new business." },
    },
  },
};
