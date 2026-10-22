/* ============================================================
   «Segnala un amico» — copy shared by both doors of the program
   (/voucher/ and /voucher/nuova-attivita/) and by their invite
   pages: payout methods, the four steps, the link studio's UI,
   form labels and errors, the QR band, the promises, the values
   and the terms block.

   Source of truth for the wording: the printed flyer «Conosci
   qualcuno a cui potrebbe servire un sito web?». Everything on the
   flyer is here, word for word where it worked and tightened where
   it didn't (noted inline). House rules: docs/landing-factory.md —
   direct, concrete, zero hype, no invented numbers. The friend-facing
   promises are the ones alpacode.it already makes (free first call,
   price agreed up front, no hidden costs, payments in instalments).
   ============================================================ */
import type { Lang } from "../../i18n/types";

export type IconName =
  | "bank"
  | "wallet"
  | "gift"
  | "link"
  | "user"
  | "check"
  | "euro"
  | "shield"
  | "team"
  | "heart"
  | "chat"
  | "tag"
  | "layers"
  | "split"
  | "whatsapp"
  | "telegram"
  | "mail"
  | "share"
  | "copy"
  | "qr"
  | "arrow"
  // The new-business door: what someone who just opened needs…
  | "compass"
  | "pen"
  | "browser"
  | "search"
  | "calendar"
  | "quote"
  | "cart"
  | "megaphone"
  | "grid"
  | "cap"
  // …and what they opened.
  | "store"
  | "cup"
  | "briefcase"
  | "sparkle"
  | "hammer"
  | "bag"
  | "dots";

export type PayoutId = "bonifico" | "paypal" | "buono";
/** What a referred person needs (forms, emails, ledger). */
export type NeedId = "sito" | "ecommerce" | "software" | "formazione" | "brand" | "pubblicita" | "altro";
/** What kind of business they just opened (the new-business door). */
export type BusinessId = "negozio" | "locale" | "studio" | "benessere" | "artigiano" | "ecommerce" | "altro";

export interface PayoutOption {
  id: PayoutId;
  icon: IconName;
  title: string;
  body: string;
  /** Small print under the body (the flyer's "Alternativa al contante"). */
  note?: string;
  /** Short name, used in the forms and in emails. */
  short: string;
}

export interface Step {
  icon: IconName;
  t: string;
  d: string;
}

export interface Pledge {
  icon: IconName;
  t: string;
  d: string;
}

export interface SharedCopy {
  /** The handwritten campaign line (laptop lid + QR band on the flyer). */
  campaignLine: string[];
  /** The flyer's photo (HeroPhoto.astro), on the website door and its invites. */
  photoAlt: string;
  payouts: PayoutOption[];
  payout: { kicker: string; title: string; lede: string; chosen: string; choose: string };
  steps: { kicker: string; title: string; lede: string; items: Step[]; here: string };
  /** The link studio's UI — the program-specific lines are in landing.ts. */
  studio: {
    tabs: { link: string; linkBadge: string; direct: string };
    link: { title: string; intro: string; submit: string };
    result: {
      title: string;
      welcomeBack: string;
      codeLabel: string;
      linkLabel: string;
      copy: string;
      copied: string;
      shareLabel: string;
      whatsapp: string;
      telegram: string;
      email: string;
      more: string;
      messageLabel: string;
      qrTitle: string;
      qrBody: string;
      keep: string;
      reset: string;
    };
    preview: { label: string; cardTitle: string; cardTitleAnon: string };
    direct: {
      title: string;
      intro: string;
      yourLegend: string;
      friendLegend: string;
      friendName: string;
      friendNamePh: string;
      friendEmail: string;
      friendPhone: string;
      contactHint: string;
      note: string;
      friendConsent: string;
      submit: string;
      successTitle: string;
      successBody: string;
      successLink: string;
    };
  };
  qr: {
    title: string;
    body: string;
    hint: string;
    visit: string;
    personalTitle: string;
    personalBody: string;
    qrAlt: string;
    personalQrAlt: string;
  };
  why: {
    landing: { kicker: string; title: string; lede: string };
    invite: { kicker: string; title: string; lede: string };
    items: Pledge[];
  };
  /** The invite form's UI — the program-specific lines are in invite.ts. */
  inviteForm: {
    kicker: string;
    invitedBy: string;
    invitedByAnon: string;
    phoneLabel: string;
    message: string;
    consent: string;
    submit: string;
    successTitle: string;
    successBody: string;
    referTitle: string;
    referCta: string;
  };
  /** The flyer's footer: the studio's three values and «Note e condizioni». */
  terms: {
    values: { icon: IconName; text: string }[];
    title: string;
    programPrivacy: string;
  };
  forms: {
    name: string;
    namePh: string;
    email: string;
    emailPh: string;
    phone: string;
    phoneOptional: string;
    phonePh: string;
    payoutLegend: string;
    /** {privacy} and {terms} become links. */
    consent: string;
    privacyLink: string;
    termsLink: string;
    sending: string;
    errors: {
      generic: string;
      rate: string;
      validation: string;
      consent: string;
      contactNeeded: string;
      network: string;
    };
  };
}

export const shared: Record<Lang, SharedCopy> = {
  it: {
    campaignLine: ["Più persone", "nel mondo digitale.", "Insieme."],
    photoAlt:
      "Due amici sorridono davanti a un portatile. Sul coperchio è scritto: «Più persone nel mondo digitale. Insieme.»",
    payouts: [
      {
        id: "bonifico",
        icon: "bank",
        title: "Bonifico bancario / SEPA",
        body: "Il modo più classico, semplice e sicuro.",
        short: "Bonifico",
      },
      {
        id: "paypal",
        icon: "wallet",
        title: "PayPal / Wallet digitale",
        body: "Ricevi il tuo cashback in modo rapido e digitale.",
        short: "PayPal",
      },
      {
        id: "buono",
        icon: "gift",
        title: "Buono acquisto / Gift card",
        body: "Scegli il premio che preferisci tra i nostri partner.",
        note: "Alternativa al contante",
        short: "Buono acquisto",
      },
    ],
    payout: {
      kicker: "Il tuo premio",
      title: "Scegli come riceverlo.",
      lede: "Stesso premio, tre modi per incassarlo. Indica ora il tuo preferito: lo ritrovi già scelto nel modulo qui sotto.",
      chosen: "Scelto",
      choose: "Scegli",
    },
    steps: {
      kicker: "In quattro passi",
      title: "Come funziona?",
      lede: "Tu fai una cosa sola: ci presenti una persona. Al resto pensiamo noi, e ti teniamo aggiornato.",
      items: [
        {
          icon: "link",
          t: "Invia il tuo link unico",
          d: "Puoi condividere il tuo link di invito o farci avere i contatti della persona interessata.",
        },
        {
          icon: "user",
          t: "Il tuo amico si iscrive",
          d: "Compila il form sul nostro sito in autonomia, inserendo i propri dati e prestando il consenso privacy.",
        },
        {
          icon: "check",
          // Flyer: "Il cliente diventa tale" — said plainly.
          t: "Diventa nostro cliente",
          d: "Quando il nuovo cliente completa l'acquisto, verifichiamo la validità della segnalazione.",
        },
        {
          icon: "euro",
          t: "Ricevi il tuo cashback",
          d: "Ti accreditiamo il premio scelto, fino a 100 €, con le modalità che preferisci.",
        },
      ],
      here: "Sei qui",
    },
    studio: {
      tabs: { link: "Condividi il tuo link", linkBadge: "Consigliato", direct: "Mandaci tu i contatti" },
      link: {
        title: "Genera il tuo link personale",
        intro: "Ti basta un'email: è lì che ti scriviamo quando il tuo amico diventa cliente.",
        submit: "Genera il mio link",
      },
      result: {
        title: "Ecco il tuo link, {name}.",
        welcomeBack: "Bentornato, {name}: il tuo link è qui.",
        codeLabel: "Il tuo codice",
        linkLabel: "Il tuo link",
        copy: "Copia link",
        copied: "Copiato",
        shareLabel: "Condividi con",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        email: "Email",
        more: "Altre app",
        messageLabel: "Il messaggio (puoi modificarlo)",
        qrTitle: "Oppure fallo inquadrare",
        qrBody: "Il tuo amico punta la fotocamera qui e si apre la pagina col tuo invito.",
        keep: "Il link resta sempre lo stesso: se lo perdi, rigeneralo con la stessa email.",
        reset: "Genera un altro link",
      },
      preview: {
        label: "Così arriva al tuo amico",
        cardTitle: "{name} ti ha consigliato Alpacode",
        cardTitleAnon: "Ti hanno consigliato Alpacode",
      },
      direct: {
        title: "Mandaci tu i contatti",
        intro: "La contattiamo noi, dicendo che ci ha presentati tu. Fallo solo dopo averle chiesto il permesso.",
        yourLegend: "I tuoi dati",
        friendLegend: "La persona che segnali",
        friendName: "Nome e cognome",
        friendNamePh: "Luca Bianchi",
        friendEmail: "Email",
        friendPhone: "Telefono",
        contactHint: "Basta uno dei due: email o telefono.",
        note: "Due righe sul progetto (facoltativo)",
        friendConsent: "Ho informato questa persona e mi ha dato il consenso a essere contattata da Alpacode.",
        submit: "Invia la segnalazione",
        successTitle: "Segnalazione ricevuta.",
        successBody: "Grazie, {name}! Contatteremo {friend} a nome tuo e ti aggiorneremo via email sull'esito.",
        successLink: "Questo è il tuo link personale, per le prossime segnalazioni:",
      },
    },
    qr: {
      title: "Scansiona il QR code",
      body: "per accedere al modulo di contatto e inviarci la tua segnalazione.",
      hint: "Sei al computer? Inquadralo col telefono e continua da lì, o mostralo a chi vuoi segnalare.",
      visit: "oppure visita",
      personalTitle: "Fai inquadrare il tuo QR",
      personalBody:
        "Questo QR contiene il tuo invito: chi lo inquadra arriva sulla pagina con il tuo nome, e la segnalazione resta tua.",
      qrAlt: "QR code che apre questa pagina",
      personalQrAlt: "QR code del tuo link di invito personale",
    },
    why: {
      landing: {
        kicker: "Perché consigliarci",
        title: "Il tuo amico è in buone mani.",
        lede: "Quando consigli qualcuno ci metti la faccia. Ecco cosa trova il tuo amico, dalla prima telefonata in poi.",
      },
      invite: {
        kicker: "Perché Alpacode",
        title: "Cosa ti aspetta.",
        lede: "Chi ti ha mandato qui ci ha già visti lavorare. Ecco come funziona, dalla prima telefonata in poi.",
      },
      items: [
        {
          icon: "chat",
          t: "Prima call gratuita",
          d: "Trenta minuti per capire cosa serve. Niente vendite, niente impegno.",
        },
        {
          icon: "tag",
          t: "Prezzo deciso prima",
          d: "Scope, tempi e prezzo nero su bianco, prima di firmare qualsiasi cosa. Niente costi nascosti.",
        },
        {
          icon: "layers",
          t: "Tutto il digitale, un solo team",
          d: "Siti web, e-commerce, branding, pubblicità, software e formazione. Un unico interlocutore, che resta anche dopo il lancio.",
        },
        {
          icon: "split",
          t: "Pagamenti rateizzabili",
          d: "Il costo si può dividere in rate, concordate prima di partire.",
        },
      ],
    },
    inviteForm: {
      kicker: "Il tuo progetto",
      invitedBy: "Su invito di {name} · codice {code}",
      invitedByAnon: "Richiesta diretta",
      phoneLabel: "Telefono (consigliato, per richiamarti)",
      message: "Il tuo progetto in due righe (facoltativo)",
      consent: "Ho letto l'{privacy} e acconsento a essere ricontattato/a da Alpacode.",
      submit: "Invia la richiesta",
      successTitle: "Richiesta inviata.",
      successBody: "Grazie, {name}! Ti ricontattiamo presto per fissare la prima call, gratuita e senza impegno.",
      referTitle: "Anche tu conosci qualcuno?",
      referCta: "Scopri come funziona",
    },
    terms: {
      values: [
        { icon: "shield", text: "Esperienza e affidabilità" },
        { icon: "team", text: "Un team sempre al tuo fianco" },
        { icon: "heart", text: "La crescita dei nostri clienti è la nostra priorità" },
      ],
      title: "Note e condizioni",
      programPrivacy: "Informativa privacy del programma",
    },
    forms: {
      name: "Nome e cognome",
      namePh: "Mario Rossi",
      email: "Email",
      emailPh: "nome@email.it",
      phone: "Telefono",
      phoneOptional: "Telefono (facoltativo)",
      phonePh: "+39 …",
      payoutLegend: "Come vuoi ricevere il cashback?",
      consent: "Ho letto l'{privacy} e accetto le {terms} del programma.",
      privacyLink: "informativa privacy",
      termsLink: "note e condizioni",
      sending: "Un attimo…",
      errors: {
        generic: "Qualcosa è andato storto: riprova tra poco o scrivici a {email}.",
        rate: "Troppe richieste di fila: riprova tra qualche minuto.",
        validation: "Controlla i campi evidenziati: manca qualcosa.",
        consent: "Per continuare serve la spunta sull'informativa e sulle condizioni.",
        contactNeeded: "Inserisci almeno un'email o un telefono della persona che segnali.",
        network: "Connessione assente: controlla la rete e riprova.",
      },
    },
  },

  en: {
    campaignLine: ["More people", "in the digital world.", "Together."],
    photoAlt:
      "Two friends smiling at a laptop. The lid reads: “Più persone nel mondo digitale. Insieme.” (More people in the digital world. Together.)",
    payouts: [
      {
        id: "bonifico",
        icon: "bank",
        title: "Bank transfer / SEPA",
        body: "The classic way: simple and secure.",
        short: "Bank transfer",
      },
      {
        id: "paypal",
        icon: "wallet",
        title: "PayPal / Digital wallet",
        body: "Get your cashback quickly, fully digital.",
        short: "PayPal",
      },
      {
        id: "buono",
        icon: "gift",
        title: "Voucher / Gift card",
        body: "Pick the reward you like from our partners.",
        note: "An alternative to cash",
        short: "Voucher",
      },
    ],
    payout: {
      kicker: "Your reward",
      title: "Choose how you get it.",
      lede: "Same reward, three ways to cash it. Pick your favourite now: you'll find it already selected in the form below.",
      chosen: "Selected",
      choose: "Choose",
    },
    steps: {
      kicker: "Four steps",
      title: "How does it work?",
      lede: "You do one thing: introduce someone. We handle the rest, and keep you posted.",
      items: [
        {
          icon: "link",
          t: "Send your personal link",
          d: "Share your invite link, or send us the contact details of the person who's interested.",
        },
        {
          icon: "user",
          t: "Your friend signs up",
          d: "They fill in the form on our site on their own, with their details and their privacy consent.",
        },
        {
          icon: "check",
          t: "They become a client",
          d: "When the new client completes the purchase, we check that the referral is valid.",
        },
        {
          icon: "euro",
          t: "You get your cashback",
          d: "We send you the reward you picked, up to €100, the way you prefer.",
        },
      ],
      here: "You are here",
    },
    studio: {
      tabs: { link: "Share your link", linkBadge: "Recommended", direct: "Send us their details" },
      link: {
        title: "Get your personal link",
        intro: "All it takes is an email: that's where we write when your friend becomes a client.",
        submit: "Get my link",
      },
      result: {
        title: "Here's your link, {name}.",
        welcomeBack: "Welcome back, {name}: your link is right here.",
        codeLabel: "Your code",
        linkLabel: "Your link",
        copy: "Copy link",
        copied: "Copied",
        shareLabel: "Share via",
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        email: "Email",
        more: "More apps",
        messageLabel: "The message (you can edit it)",
        qrTitle: "Or let them scan it",
        qrBody: "Your friend points their camera here and lands on the page with your invite.",
        keep: "The link never changes: if you lose it, generate it again with the same email.",
        reset: "Get another link",
      },
      preview: {
        label: "What your friend receives",
        cardTitle: "{name} recommended Alpacode to you",
        cardTitleAnon: "Someone recommended Alpacode to you",
      },
      direct: {
        title: "Send us their details",
        intro: "We reach out to them, saying you introduced us. Only do this after asking their permission.",
        yourLegend: "Your details",
        friendLegend: "The person you're referring",
        friendName: "Full name",
        friendNamePh: "Luke White",
        friendEmail: "Email",
        friendPhone: "Phone",
        contactHint: "One of the two is enough: email or phone.",
        note: "A couple of lines about the project (optional)",
        friendConsent: "I have told this person and they agreed to be contacted by Alpacode.",
        submit: "Send the referral",
        successTitle: "Referral received.",
        successBody: "Thanks, {name}! We'll get in touch with {friend} on your behalf and update you by email.",
        successLink: "And this is your personal link, for your next referrals:",
      },
    },
    qr: {
      title: "Scan the QR code",
      body: "to open the contact form and send us your referral.",
      hint: "On a computer? Scan it with your phone and carry on from there, or show it to the person you're referring.",
      visit: "or visit",
      personalTitle: "Let them scan your QR",
      personalBody:
        "This QR carries your invite: whoever scans it lands on the page with your name, and the referral stays yours.",
      qrAlt: "QR code that opens this page",
      personalQrAlt: "QR code of your personal invite link",
    },
    why: {
      landing: {
        kicker: "Why recommend us",
        title: "Your friend is in good hands.",
        lede: "When you recommend someone, your name is on it. Here's what your friend gets, from the first call on.",
      },
      invite: {
        kicker: "Why Alpacode",
        title: "What to expect.",
        lede: "Whoever sent you here has seen us at work. This is how it goes, from the first call on.",
      },
      items: [
        {
          icon: "chat",
          t: "Free first call",
          d: "Thirty minutes to understand what's needed. No sales pitch, no commitment.",
        },
        {
          icon: "tag",
          t: "Price agreed up front",
          d: "Scope, timing and price in writing before signing anything. No hidden costs.",
        },
        {
          icon: "layers",
          t: "Everything digital, one team",
          d: "Websites, online stores, branding, advertising, software and training. One point of contact who stays after launch.",
        },
        {
          icon: "split",
          t: "Pay in instalments",
          d: "The cost can be split into instalments, agreed before we start.",
        },
      ],
    },
    inviteForm: {
      kicker: "Your project",
      invitedBy: "Invited by {name} · code {code}",
      invitedByAnon: "Direct request",
      phoneLabel: "Phone (recommended, so we can call you back)",
      message: "Your project in a couple of lines (optional)",
      consent: "I have read the {privacy} and agree to be contacted by Alpacode.",
      submit: "Send request",
      successTitle: "Request sent.",
      successBody: "Thanks, {name}! We'll get back to you soon to book your first call, free and with no commitment.",
      referTitle: "Know someone too?",
      referCta: "See how it works",
    },
    terms: {
      values: [
        { icon: "shield", text: "Experience and reliability" },
        { icon: "team", text: "A team always by your side" },
        { icon: "heart", text: "Our clients' growth is our priority" },
      ],
      title: "Terms and conditions",
      programPrivacy: "Program privacy notice",
    },
    forms: {
      name: "Full name",
      namePh: "Jane Doe",
      email: "Email",
      emailPh: "name@email.com",
      phone: "Phone",
      phoneOptional: "Phone (optional)",
      phonePh: "+39 …",
      payoutLegend: "How would you like your cashback?",
      consent: "I have read the {privacy} and accept the program {terms}.",
      privacyLink: "privacy notice",
      termsLink: "terms and conditions",
      sending: "One moment…",
      errors: {
        generic: "Something went wrong: try again shortly or email us at {email}.",
        rate: "Too many requests in a row: try again in a few minutes.",
        validation: "Check the highlighted fields: something's missing.",
        consent: "To continue, please tick the privacy and terms box.",
        contactNeeded: "Add at least an email or a phone number for the person you're referring.",
        network: "You seem to be offline: check your connection and try again.",
      },
    },
  },
};
