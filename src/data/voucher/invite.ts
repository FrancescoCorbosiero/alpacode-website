/* ============================================================
   The invite pages — where a shared link lands, the friend's side
   of the flyer's step 2 ("Il tuo amico si iscrive"):
     sito            /voucher/<CODE>                (/en/voucher/<CODE>)
     nuova-attivita  /voucher/nuova-attivita/<CODE> (/en/…)
   Rendered on demand so the referrer's first name is in the HTML
   and in the link preview WhatsApp shows ("Mario ti ha consigliato
   Alpacode").

   {name} is the referrer's first name, taken from the code. When the
   code is missing or anonymous the *Anon variants are used. The form's
   shared UI is in shared.ts (inviteForm).
   ============================================================ */
import type { Lang } from "../../i18n/types";
import type { ProgramId } from "../../lib/voucher/program";
import type { NeedId } from "./shared";

export interface InviteCopy {
  meta: {
    title: string;
    titleAnon: string;
    description: string;
    ogImage: string;
    ogAlt: string;
  };
  headerCta: string;
  hero: {
    kicker: string;
    kickerAnon: string;
    lines: string[];
    linesAnon: string[];
    accent: string;
    lede: string;
    sticker: { pre: string; amount: string; post: string; aria: string };
    chips: string[];
    ctaPrimary: string;
    ctaSecondary: string;
  };
  ticker: string[];
  /** The new-business invite shows the kit too, addressed to the owner. */
  kit?: { kicker: string; title: string; lede: string; legend: string; board: string; note: string; cta: string };
  form: {
    title: string;
    lede: string;
    /** What they need: one choice (sito), or several (nuova-attivita). */
    needs: { legend: string; multiple: boolean; options: { id: NeedId; label: string }[] };
    /** The new-business invite also asks what they opened (the kit's types). */
    business?: { legend: string };
    messagePh: string;
    referBody: string;
  };
  cross: { tag: string; title: string; body: string; cta: string };
  sticky: string;
}

const STICKER_IT = { pre: "Prima call", amount: "0€", post: "senza impegno", aria: "Prima call gratuita, senza impegno" };
const STICKER_EN = { pre: "First call", amount: "€0", post: "no commitment", aria: "Free first call, no commitment" };
const CHIPS_IT = ["Proposta scritta in pochi giorni", "Un solo referente", "Pagamenti rateizzabili"];
const CHIPS_EN = ["Written proposal within days", "One point of contact", "Pay in instalments"];

export const invite: Record<ProgramId, Record<Lang, InviteCopy>> = {
  sito: {
    it: {
      meta: {
        title: "{name} ti ha consigliato Alpacode · Siti web ed e-commerce",
        titleAnon: "Ti hanno consigliato Alpacode · Siti web ed e-commerce",
        description:
          "Siti web, e-commerce, software e formazione. Prima call gratuita e proposta scritta in pochi giorni. Raccontaci il tuo progetto.",
        ogImage: "/og-voucher-invito.jpg",
        ogAlt: "Ti hanno consigliato Alpacode — siti web ed e-commerce, prima call gratuita",
      },
      headerCta: "Parliamone",
      hero: {
        kicker: "Un invito da parte di {name}",
        kickerAnon: "Un invito per te",
        lines: ["{name} ti ha", "consigliato"],
        linesAnon: ["Qualcuno ti ha", "consigliato"],
        accent: "Alpacode.",
        lede: "Realizziamo siti web ed e-commerce per privati e imprese in Italia. Raccontaci cosa ti serve: ti richiamiamo noi per una prima call gratuita, senza impegno.",
        sticker: STICKER_IT,
        chips: CHIPS_IT,
        ctaPrimary: "Raccontaci il tuo progetto",
        ctaSecondary: "Chi siamo",
      },
      ticker: [
        "SITI WEB",
        "E-COMMERCE",
        "SOFTWARE",
        "FORMAZIONE",
        "SEO",
        "MANUTENZIONE",
        "PRIMA CALL GRATUITA",
        "PAGAMENTI RATEIZZABILI",
      ],
      form: {
        title: "Raccontaci cosa ti serve.",
        lede: "Due righe bastano. Ti ricontattiamo per fissare la call gratuita e capire insieme come procedere.",
        needs: {
          legend: "Cosa ti serve?",
          multiple: false,
          options: [
            { id: "sito", label: "Un sito web" },
            { id: "ecommerce", label: "Un e-commerce" },
            { id: "software", label: "Software o gestionale" },
            { id: "formazione", label: "Formazione" },
            { id: "altro", label: "Non lo so ancora" },
          ],
        },
        messagePh: "Es. ho un negozio e vorrei vendere anche online.",
        referBody: "Se a un tuo amico serve un sito web o un e-commerce, segnalacelo: se diventa cliente ricevi fino a 100 €.",
      },
      cross: {
        tag: "Anche tu puoi segnalare",
        title: "Fino a 100 € per ogni amico che diventa cliente.",
        body: "Il programma è aperto a tutti: generi il tuo link personale, lo condividi e ricevi il cashback con bonifico, PayPal o buono acquisto.",
        cta: "Genera il tuo link",
      },
      sticky: "Raccontaci il tuo progetto",
    },
    en: {
      meta: {
        title: "{name} recommended Alpacode to you · Websites and online stores",
        titleAnon: "Alpacode was recommended to you · Websites and online stores",
        description:
          "Websites, online stores, software and training. Free first call and a written proposal within days. Tell us about your project.",
        ogImage: "/og-voucher-invito-en.jpg",
        ogAlt: "Alpacode was recommended to you — websites and online stores, free first call",
      },
      headerCta: "Let's talk",
      hero: {
        kicker: "An invitation from {name}",
        kickerAnon: "An invitation for you",
        lines: ["{name}", "recommended"],
        linesAnon: ["Someone", "recommended"],
        accent: "Alpacode.",
        lede: "We build websites and online stores for individuals and businesses across Italy. Tell us what you need: we'll call you back for a free first call, no commitment.",
        sticker: STICKER_EN,
        chips: CHIPS_EN,
        ctaPrimary: "Tell us about your project",
        ctaSecondary: "About us",
      },
      ticker: [
        "WEBSITES",
        "ONLINE STORES",
        "SOFTWARE",
        "TRAINING",
        "SEO",
        "MAINTENANCE",
        "FREE FIRST CALL",
        "PAY IN INSTALMENTS",
      ],
      form: {
        title: "Tell us what you need.",
        lede: "A couple of lines will do. We'll get back to you to book the free call and work out the next steps together.",
        needs: {
          legend: "What do you need?",
          multiple: false,
          options: [
            { id: "sito", label: "A website" },
            { id: "ecommerce", label: "An online store" },
            { id: "software", label: "Software or a management tool" },
            { id: "formazione", label: "Training" },
            { id: "altro", label: "Not sure yet" },
          ],
        },
        messagePh: "E.g. I have a shop and I'd like to sell online too.",
        referBody: "If a friend of yours needs a website or an online store, refer them: if they become a client you get up to €100.",
      },
      cross: {
        tag: "You can refer too",
        title: "Up to €100 for every friend who becomes a client.",
        body: "The program is open to everyone: get your personal link, share it and receive the cashback by bank transfer, PayPal or voucher.",
        cta: "Get your link",
      },
      sticky: "Tell us about your project",
    },
  },

  "nuova-attivita": {
    it: {
      meta: {
        title: "{name} ti ha consigliato Alpacode · Tutto il digitale per la tua nuova attività",
        titleAnon: "Ti hanno consigliato Alpacode · Tutto il digitale per la tua nuova attività",
        description:
          "Logo, sito, Google, e-commerce, pubblicità e gestionali per chi ha appena aperto, con un unico interlocutore. Prima call gratuita.",
        ogImage: "/og-voucher-nuova-attivita-invito.png",
        ogAlt: "Ti hanno consigliato Alpacode — tutto il digitale per la tua nuova attività, prima call gratuita",
      },
      headerCta: "Parliamone",
      hero: {
        kicker: "Un invito da parte di {name}",
        kickerAnon: "Un invito per te",
        lines: ["{name} ti ha", "consigliato"],
        linesAnon: ["Qualcuno ti ha", "consigliato"],
        accent: "Alpacode.",
        lede: "Hai appena aperto? Al digitale pensiamo noi: logo, sito, Google, pubblicità e gestionale, con un unico interlocutore. Raccontaci la tua attività: ti richiamiamo per una prima call gratuita, senza impegno.",
        sticker: STICKER_IT,
        chips: CHIPS_IT,
        ctaPrimary: "Raccontaci la tua attività",
        ctaSecondary: "Chi siamo",
      },
      ticker: [
        "LOGO E BRAND",
        "SITO WEB",
        "VISIBILITÀ SU GOOGLE",
        "E-COMMERCE",
        "PRENOTAZIONI ONLINE",
        "CAMPAGNE GOOGLE E META",
        "GESTIONALI",
        "FORMAZIONE",
        "PRIMA CALL GRATUITA",
        "UN UNICO INTERLOCUTORE",
      ],
      kit: {
        kicker: "Il kit di partenza",
        title: "Da dove si parte.",
        lede: "Scegli che attività hai aperto: ecco le quattro cose da cui partiremmo. Il resto lo decidiamo insieme.",
        legend: "Che attività hai aperto?",
        board: "Da dove partiremmo",
        note: "Ogni attività è diversa: nella prima call, gratuita, capiamo insieme cosa serve davvero, in che ordine e con che budget.",
        cta: "Raccontaci la tua attività",
      },
      form: {
        title: "Raccontaci la tua attività.",
        lede: "Due righe bastano. Ti ricontattiamo per fissare la call gratuita e capire insieme da dove partire.",
        business: { legend: "Che attività hai aperto?" },
        needs: {
          legend: "Cosa ti serve? (anche più di una cosa)",
          multiple: true,
          options: [
            { id: "brand", label: "Logo e brand" },
            { id: "sito", label: "Un sito web" },
            { id: "ecommerce", label: "Un e-commerce" },
            { id: "pubblicita", label: "Pubblicità" },
            { id: "software", label: "Un gestionale" },
            { id: "formazione", label: "Formazione" },
            { id: "altro", label: "Non lo so ancora" },
          ],
        },
        messagePh: "Es. ho aperto una pasticceria a settembre: mi servono il logo e il sito.",
        referBody: "Conosci qualcuno che ha appena aperto? Segnalacelo: se diventa cliente ricevi fino a 100 €.",
      },
      cross: {
        tag: "Anche tu puoi segnalare",
        title: "Fino a 100 € per ogni attività che diventa cliente.",
        body: "Il programma è aperto a tutti: generi il tuo link personale, lo condividi e ricevi il cashback con bonifico, PayPal o buono acquisto.",
        cta: "Genera il tuo link",
      },
      sticky: "Raccontaci la tua attività",
    },
    en: {
      meta: {
        title: "{name} recommended Alpacode to you · All things digital for your new business",
        titleAnon: "Alpacode was recommended to you · All things digital for your new business",
        description:
          "Logo, website, Google, online store, advertising and management tools for new businesses, with one point of contact. Free first call.",
        ogImage: "/og-voucher-nuova-attivita-invito-en.png",
        ogAlt: "Alpacode was recommended to you — all things digital for your new business, free first call",
      },
      headerCta: "Let's talk",
      hero: {
        kicker: "An invitation from {name}",
        kickerAnon: "An invitation for you",
        lines: ["{name}", "recommended"],
        linesAnon: ["Someone", "recommended"],
        accent: "Alpacode.",
        lede: "Just opened? Leave the digital side to us: logo, website, Google, advertising and management tools, with one point of contact. Tell us about your business: we'll call you back for a free first call, no commitment.",
        sticker: STICKER_EN,
        chips: CHIPS_EN,
        ctaPrimary: "Tell us about your business",
        ctaSecondary: "About us",
      },
      ticker: [
        "LOGO & BRAND",
        "WEBSITES",
        "VISIBILITY ON GOOGLE",
        "ONLINE STORES",
        "ONLINE BOOKINGS",
        "GOOGLE & META ADS",
        "MANAGEMENT TOOLS",
        "TRAINING",
        "FREE FIRST CALL",
        "ONE POINT OF CONTACT",
      ],
      kit: {
        kicker: "The starter kit",
        title: "Where it starts.",
        lede: "Pick what you opened: here are the four things we'd start from. We decide the rest together.",
        legend: "What did you open?",
        board: "Where we'd start",
        note: "Every business is different: in the first call, free, we work out together what's really needed, in what order and on what budget.",
        cta: "Tell us about your business",
      },
      form: {
        title: "Tell us about your business.",
        lede: "A couple of lines will do. We'll get back to you to book the free call and work out together where to start.",
        business: { legend: "What did you open?" },
        needs: {
          legend: "What do you need? (pick as many as you like)",
          multiple: true,
          options: [
            { id: "brand", label: "Logo and brand" },
            { id: "sito", label: "A website" },
            { id: "ecommerce", label: "An online store" },
            { id: "pubblicita", label: "Advertising" },
            { id: "software", label: "A management tool" },
            { id: "formazione", label: "Training" },
            { id: "altro", label: "Not sure yet" },
          ],
        },
        messagePh: "E.g. I opened a bakery in September: I need a logo and a website.",
        referBody: "Know someone who just opened? Refer them: if they become a client you get up to €100.",
      },
      cross: {
        tag: "You can refer too",
        title: "Up to €100 for every business that becomes a client.",
        body: "The program is open to everyone: get your personal link, share it and receive the cashback by bank transfer, PayPal or voucher.",
        cta: "Get your link",
      },
      sticky: "Tell us about your business",
    },
  },
};
