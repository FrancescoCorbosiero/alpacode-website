/* ============================================================
   The studio's legal pages. Drafts, written to match what the site
   does today (a contact form, cookieless statistics, purchases
   through a payment provider, ad pixels only if consented): check
   them with a professional before selling (docs/status.md). The
   site terms are the house's (alpacode.it/termini), same company.
   Bodies are rendered with set:html.
   ============================================================ */
import { business } from "@shared/data/business";

export interface LegalSection {
  h: string;
  body: string;
}

export interface LegalDoc {
  title: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
}

const mail = `<a href="mailto:${business.email}">${business.email}</a>`;
const controller = `<p>${business.name} (di seguito “Alpacode”), ditta individuale.<br>Sede operativa: Monza · Milano · IT.<br>P. IVA: ${business.vat}.<br>Email: ${mail}.</p><p>Alpacode Studio (studio.alpacode.it) è un compartimento di Alpacode: stesso titolare, stesse regole.</p>`;

export const LEGAL: Record<"privacy" | "cookie" | "vendita", LegalDoc> = {
  privacy: {
    title: "Privacy",
    lede: "Come trattiamo i tuoi dati su studio.alpacode.it. In parole semplici.",
    updated: "Bozza · 10.2026",
    sections: [
      { h: "Titolare del trattamento", body: controller },
      {
        h: "Quali dati raccogliamo",
        body: "<p>Quelli che ci dai tu: nel modulo di contatto (nome, email, telefono se vuoi, cosa ti serve, il messaggio) e quando prenoti una call. Quando compri un prodotto, i dati dell'acquisto li raccoglie il fornitore del pagamento (vedi sotto): a noi arrivano nome, email, prodotto e importo, per consegnarti quello che hai comprato e per la fatturazione.</p>",
      },
      {
        h: "Perché, e su che base",
        body: "<ul><li>Rispondere alla tua richiesta: il tuo consenso (art. 6.1.a GDPR).</li><li>Consegnare un prodotto o un servizio acquistato: l'esecuzione del contratto (art. 6.1.b) e gli obblighi di legge, anche fiscali (art. 6.1.c).</li><li>Statistiche aggregate e sicurezza del sito: il legittimo interesse (art. 6.1.f).</li><li>Misurare le campagne pubblicitarie: solo con il tuo consenso (art. 6.1.a), dal banner dei cookie.</li></ul>",
      },
      {
        h: "Per quanto tempo",
        body: "<p>Il tempo necessario a rispondere e a gestire il rapporto con te; i dati degli acquisti per i termini previsti dalle norme fiscali.</p>",
      },
      {
        h: "Chi ci aiuta",
        body: "<p><strong>Amazon Web Services (SES)</strong> consegna le email del modulo. <strong>Cal.com</strong> gestisce le prenotazioni delle call. <strong>Umami</strong>, sul nostro server, conta le visite senza cookie e senza dati personali. Per i pagamenti usiamo un fornitore che agisce come venditore o come processore dei pagamenti (<strong>Lemon Squeezy</strong>, <strong>Gumroad</strong> o <strong>Stripe</strong>): i dati della carta li tratta solo lui, secondo la sua informativa. Se accetti i cookie di marketing, <strong>Meta</strong> e <strong>Google</strong> misurano l'efficacia degli annunci.</p>",
      },
      { h: "Cookie", body: '<p>I dettagli, e come cambiare idea, nella <a href="/cookie/">Cookie policy</a>.</p>' },
      {
        h: "I tuoi diritti",
        body: `<p>Accesso, rettifica, cancellazione, limitazione, portabilità, opposizione, revoca del consenso: scrivi a ${mail}. Puoi anche rivolgerti al Garante per la protezione dei dati personali.</p>`,
      },
    ],
  },
  cookie: {
    title: "Cookie",
    lede: "Cosa salviamo sul tuo dispositivo, e come decidi tu.",
    updated: "Bozza · 10.2026",
    sections: [
      {
        h: "Tecnici, sempre attivi",
        body: "<p>Servono al sito per funzionare e per ricordare la tua scelta sui cookie. Non richiedono consenso.</p>",
      },
      {
        h: "Statistiche, senza cookie",
        body: "<p>Contiamo le visite con <strong>Umami</strong>, sul nostro server: nessun cookie, nessun dato personale, nessun incrocio con altri siti.</p>",
      },
      {
        h: "Marketing, solo se accetti",
        body: "<p>Se accetti dal banner, i pixel di <strong>Meta</strong> e di <strong>Google Ads</strong> misurano quante persone arrivano dagli annunci e cosa fanno sul sito. Senza il tuo sì non vengono caricati. Il banner compare solo quando il sito usa questi strumenti.</p>",
      },
      {
        h: "Pagamenti e prenotazioni",
        body: "<p>Quando apri il pagamento di un prodotto o prenoti una call, il fornitore (Lemon Squeezy, Gumroad, Stripe, Cal.com) imposta i cookie tecnici che gli servono, sul suo dominio, secondo la sua policy.</p>",
      },
      {
        h: "Cambiare idea",
        body: '<p>Puoi rivedere la tua scelta quando vuoi: <button type="button" class="fx-cookie-link" data-cookie-prefs>apri le preferenze</button>.</p>',
      },
    ],
  },
  vendita: {
    title: "Condizioni di vendita",
    lede: "Cosa succede quando compri un prodotto digitale su studio.alpacode.it.",
    updated: "Bozza · 10.2026",
    sections: [
      { h: "Chi vende", body: controller },
      {
        h: "Cosa compri",
        body: "<p>Prodotti digitali (guide, moduli, corsi) descritti nella loro pagina. Il prezzo indicato è il prezzo finale, IVA inclusa per i consumatori.</p>",
      },
      {
        h: "Il pagamento",
        body: "<p>Avviene sulla pagina del fornitore del pagamento (Lemon Squeezy, Gumroad o Stripe), che può agire come venditore registrato e occuparsi dell'IVA e della ricevuta. Non vediamo e non conserviamo i dati della tua carta.</p>",
      },
      {
        h: "La consegna",
        body: "<p>Subito dopo il pagamento ricevi via email il link per scaricare o accedere al prodotto. Se non arriva entro qualche minuto, controlla lo spam e poi scrivici.</p>",
      },
      {
        h: "Recesso",
        body: "<p>Per i contenuti digitali, il diritto di recesso non si applica una volta iniziato il download o l'accesso, se al momento dell'acquisto hai dato il tuo consenso e accettato di perderlo (art. 59, lett. o, Codice del Consumo). Se il prodotto non funziona o non corrisponde alla descrizione, scrivici: lo sistemiamo o ti rimborsiamo.</p>",
      },
      {
        h: "Corsi con un servizio incluso",
        body: "<p>Se un corso include un servizio (per esempio l'hosting del sito che costruisci), la pagina del corso dice cosa comprende, per quanto tempo e cosa succede dopo.</p>",
      },
      { h: "Domande", body: `<p>${mail}. Per le controversie con i consumatori vale il foro previsto dalla legge.</p>` },
    ],
  },
};
