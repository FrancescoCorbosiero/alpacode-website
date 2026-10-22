/* ============================================================
   The new-business door's signature element (KitPicker.astro):
   "Che attività ha aperto?" — pick the kind of business and the
   board shows the four things we'd usually start from for it; the
   message for the friend follows ("Ho saputo che hai aperto il
   locale…").

   Every item is a service alpacode.it already sells (data/services.ts,
   the home's "Il percorso"): no invented packages, prices or delivery
   times. The board says plainly that the real plan is made together,
   in the first call.
   ============================================================ */
import type { Lang } from "../../i18n/types";
import type { BusinessId, IconName } from "./shared";

export type KitItemId =
  | "piano"
  | "brand"
  | "sito"
  | "sito-menu"
  | "google"
  | "prenotazioni"
  | "preventivi"
  | "ecommerce"
  | "vendere-anche-online"
  | "campagne"
  | "gestionale"
  | "formazione";

export interface KitItem {
  icon: IconName;
  t: string;
  d: string;
}

export interface BusinessType {
  id: BusinessId;
  icon: IconName;
  /** The chip: "Bar o ristorante". */
  label: string;
  /** What goes after "hai aperto…" in the message: "il locale". */
  thing: string;
  kit: [KitItemId, KitItemId, KitItemId, KitItemId];
}

export interface KitCopy {
  items: Record<KitItemId, KitItem>;
  types: BusinessType[];
}

const KITS: Record<BusinessId, BusinessType["kit"]> = {
  negozio: ["sito", "google", "vendere-anche-online", "campagne"],
  locale: ["sito-menu", "prenotazioni", "google", "campagne"],
  studio: ["brand", "sito", "google", "gestionale"],
  benessere: ["brand", "sito", "prenotazioni", "campagne"],
  artigiano: ["sito", "preventivi", "google", "gestionale"],
  ecommerce: ["brand", "ecommerce", "campagne", "gestionale"],
  altro: ["piano", "brand", "sito", "formazione"],
};

export const kit: Record<Lang, KitCopy> = {
  it: {
    items: {
      piano: {
        icon: "compass",
        t: "Un piano per partire",
        d: "Cosa serve davvero, in che ordine e con che budget: lo mettiamo in fila insieme, nella prima call.",
      },
      brand: {
        icon: "pen",
        t: "Logo e immagine coordinata",
        d: "Logo, palette e tono di voce in un brand kit pronto, da usare dall'insegna ai social.",
      },
      sito: {
        icon: "browser",
        t: "Un sito che fa bella figura",
        d: "Chi sei, cosa offri, dove trovarti: curato, veloce e semplice da aggiornare.",
      },
      "sito-menu": {
        icon: "browser",
        t: "Un sito con menu e orari",
        d: "Menu, orari, foto e come arrivare: sempre aggiornati e belli da vedere dal telefono.",
      },
      google: {
        icon: "search",
        t: "Farsi trovare su Google",
        d: "Contenuti e posizionamento, perché chi cerca in zona trovi l'attività al primo colpo.",
      },
      prenotazioni: {
        icon: "calendar",
        t: "Prenotazioni online",
        d: "Richieste e prenotazioni dal sito, a qualsiasi ora, senza telefonate perse.",
      },
      preventivi: {
        icon: "quote",
        t: "Richieste di preventivo",
        d: "I lavori in vetrina e il preventivo a un clic, con i contatti sempre a portata di mano.",
      },
      ecommerce: {
        icon: "cart",
        t: "Il negozio online",
        d: "Catalogo, pagamenti, spedizioni e ordini in un e-commerce che si gestisce in autonomia.",
      },
      "vendere-anche-online": {
        icon: "cart",
        t: "Vendere anche online",
        d: "Catalogo, pagamenti e spedizioni: il negozio resta aperto anche fuori orario.",
      },
      campagne: {
        icon: "megaphone",
        t: "Le prime campagne",
        d: "Pubblicità su Google e Meta per farsi conoscere, con il budget sotto controllo e i risultati misurati.",
      },
      gestionale: {
        icon: "grid",
        t: "Un gestionale su misura",
        d: "Clienti, ordini e appuntamenti in un unico posto: niente più fogli Excel sparsi.",
      },
      formazione: {
        icon: "cap",
        t: "Imparare a gestire tutto",
        d: "Corsi pratici per aggiornare sito e canali in autonomia, al proprio ritmo.",
      },
    },
    types: [
      { id: "negozio", icon: "store", label: "Un negozio", thing: "il negozio", kit: KITS.negozio },
      { id: "locale", icon: "cup", label: "Bar o ristorante", thing: "il locale", kit: KITS.locale },
      { id: "studio", icon: "briefcase", label: "Uno studio professionale", thing: "lo studio", kit: KITS.studio },
      { id: "benessere", icon: "sparkle", label: "Bellezza e benessere", thing: "il centro", kit: KITS.benessere },
      { id: "artigiano", icon: "hammer", label: "Artigiano o impresa", thing: "la tua impresa", kit: KITS.artigiano },
      { id: "ecommerce", icon: "bag", label: "Un e-commerce", thing: "il tuo e-commerce", kit: KITS.ecommerce },
      { id: "altro", icon: "dots", label: "Altro", thing: "la tua nuova attività", kit: KITS.altro },
    ],
  },
  en: {
    items: {
      piano: {
        icon: "compass",
        t: "A plan to start from",
        d: "What's really needed, in what order and on what budget: we line it up together, in the first call.",
      },
      brand: {
        icon: "pen",
        t: "Logo and visual identity",
        d: "Logo, palette and tone of voice in a ready brand kit, for everything from the shop sign to social media.",
      },
      sito: {
        icon: "browser",
        t: "A site that makes a good impression",
        d: "Who you are, what you offer, where to find you: polished, fast and easy to update.",
      },
      "sito-menu": {
        icon: "browser",
        t: "A site with the menu and hours",
        d: "Menu, opening hours, photos and directions: always up to date and great on a phone.",
      },
      google: {
        icon: "search",
        t: "Being found on Google",
        d: "Content and ranking, so people searching nearby find the business first time.",
      },
      prenotazioni: {
        icon: "calendar",
        t: "Online bookings",
        d: "Requests and bookings from the site, at any hour, with no missed calls.",
      },
      preventivi: {
        icon: "quote",
        t: "Quote requests",
        d: "The work on show and a quote one click away, with contact details always at hand.",
      },
      ecommerce: {
        icon: "cart",
        t: "The online store",
        d: "Catalogue, payments, shipping and orders in a store that's easy to run on your own.",
      },
      "vendere-anche-online": {
        icon: "cart",
        t: "Selling online too",
        d: "Catalogue, payments and shipping: the shop stays open after hours.",
      },
      campagne: {
        icon: "megaphone",
        t: "The first campaigns",
        d: "Google and Meta ads to get known, with the budget under control and the results measured.",
      },
      gestionale: {
        icon: "grid",
        t: "A custom management tool",
        d: "Clients, orders and appointments in one place: no more scattered spreadsheets.",
      },
      formazione: {
        icon: "cap",
        t: "Learning to run it all",
        d: "Practical courses to update the site and channels on your own, at your own pace.",
      },
    },
    types: [
      { id: "negozio", icon: "store", label: "A shop", thing: "your shop", kit: KITS.negozio },
      { id: "locale", icon: "cup", label: "Bar or restaurant", thing: "your place", kit: KITS.locale },
      { id: "studio", icon: "briefcase", label: "A professional practice", thing: "your practice", kit: KITS.studio },
      { id: "benessere", icon: "sparkle", label: "Beauty and wellness", thing: "your salon", kit: KITS.benessere },
      { id: "artigiano", icon: "hammer", label: "Trade or small firm", thing: "your business", kit: KITS.artigiano },
      { id: "ecommerce", icon: "bag", label: "An online store", thing: "your online store", kit: KITS.ecommerce },
      { id: "altro", icon: "dots", label: "Something else", thing: "your new business", kit: KITS.altro },
    ],
  },
};
