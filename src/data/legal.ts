import type { Lang } from "../i18n/types";

export interface LegalSection {
  h: string;
  /** Rendered with `set:html`, so HTML markup is allowed. */
  body: string;
}
export interface LegalDoc {
  crumb: string;
  h1Line1: string;
  h1Line2?: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
}
export type LegalKind = "privacy" | "cookie" | "termini";

export const legal: Record<LegalKind, Record<Lang, LegalDoc>> = {
  privacy: {
    it: {
      crumb: "LEGALE · PRIVACY",
      h1Line1: "Privacy",
      h1Line2: "policy.",
      lede: "Come trattiamo i tuoi dati personali. Linguaggio semplice, niente sorprese.",
      updated: "Ultimo aggiornamento · 05.2026",
      sections: [
        { h: "Titolare del trattamento", body: "<p>Soluzioni Digitali Alpacode (di seguito “Alpacode”).<br>Sede operativa: Monza · Milano · IT.<br>P. IVA: 14463350968.<br>Email: <a href=\"mailto:info@alpacode.it\">info@alpacode.it</a>.</p>" },
        { h: "Quali dati raccogliamo", body: "<p>Raccogliamo solo i dati che ci fornisci direttamente attraverso il modulo di contatto (nome, email, azienda, argomento, budget, messaggio) o la prenotazione di una call. Non utilizziamo profilazione né tracciamenti cross-site.</p>" },
        { h: "Base giuridica", body: "<ul><li>Consenso (art. 6.1.a GDPR) per il modulo di contatto.</li><li>Esecuzione del contratto (art. 6.1.b GDPR) per i nostri clienti.</li><li>Legittimo interesse (art. 6.1.f GDPR) per la sicurezza del sito e gli analytics anonimi e aggregati.</li></ul>" },
        { h: "Conservazione", body: "<p>I dati vengono conservati per il tempo necessario a rispondere alla tua richiesta e a gestire l'eventuale rapporto contrattuale, e comunque non oltre i termini previsti dalle norme civilistiche e fiscali applicabili.</p>" },
        { h: "Servizi di terze parti", body: "<p>Per consegnare le email utilizziamo <strong>Amazon Web Services (SES)</strong>. Per la prenotazione delle call utilizziamo <strong>Cal.com</strong>. Per analytics anonimi (su tuo consenso) utilizziamo <strong>Umami</strong> in self-hosting. Ognuno è autonomo titolare del trattamento per i dati che gestisce direttamente.</p>" },
        { h: "Cookie", body: "<p>Maggiori dettagli sui cookie e su come gestirli nella <a href=\"/cookie\">Cookie Policy</a>.</p>" },
        { h: "I tuoi diritti", body: "<p>In qualsiasi momento puoi esercitare i diritti riconosciuti dal GDPR — accesso, rettifica, cancellazione, limitazione, portabilità, opposizione — scrivendo a <a href=\"mailto:info@alpacode.it\">info@alpacode.it</a>. Hai inoltre il diritto di proporre reclamo al Garante per la protezione dei dati personali.</p>" },
        { h: "Aggiornamenti", body: "<p>Questa policy può essere aggiornata. La versione corrente è sempre quella pubblicata su questa pagina.</p>" },
      ],
    },
    en: {
      crumb: "LEGAL · PRIVACY",
      h1Line1: "Privacy",
      h1Line2: "policy.",
      lede: "How we handle your personal data. Plain language, no surprises.",
      updated: "Last updated · 05.2026",
      sections: [
        { h: "Data controller", body: "<p>Soluzioni Digitali Alpacode (“Alpacode”).<br>Studio: Monza · Milan · IT.<br>VAT: 14463350968.<br>Email: <a href=\"mailto:info@alpacode.it\">info@alpacode.it</a>.</p>" },
        { h: "What we collect", body: "<p>We only collect the data you provide us directly through the contact form (name, email, company, topic, budget, message) or when you book a call. No profiling, no cross-site tracking.</p>" },
        { h: "Legal basis", body: "<ul><li>Consent (Art. 6.1.a GDPR) for the contact form.</li><li>Performance of the contract (Art. 6.1.b GDPR) for clients.</li><li>Legitimate interest (Art. 6.1.f GDPR) for site security and aggregated, anonymous analytics.</li></ul>" },
        { h: "Retention", body: "<p>Data is kept for the time needed to reply to your request and manage any contractual relationship, and in any case no longer than required by applicable civil and tax laws.</p>" },
        { h: "Third-party services", body: "<p>To deliver email we use <strong>Amazon Web Services (SES)</strong>. For call booking we use <strong>Cal.com</strong>. For anonymous analytics (with your consent) we use <strong>Umami</strong>, self-hosted. Each is an independent data controller for the data it directly processes.</p>" },
        { h: "Cookies", body: "<p>More details on cookies and how to manage them in the <a href=\"/en/cookie\">Cookie Policy</a>.</p>" },
        { h: "Your rights", body: "<p>At any time you can exercise the rights granted by the GDPR — access, rectification, erasure, restriction, portability, objection — by writing to <a href=\"mailto:info@alpacode.it\">info@alpacode.it</a>. You also have the right to lodge a complaint with the Italian Data Protection Authority.</p>" },
        { h: "Updates", body: "<p>This policy may be updated. The current version is always the one published on this page.</p>" },
      ],
    },
  },
  cookie: {
    it: {
      crumb: "LEGALE · COOKIE",
      h1Line1: "Cookie",
      h1Line2: "policy.",
      lede: "Cosa salviamo sul tuo dispositivo, e come gestirlo in due clic.",
      updated: "Ultimo aggiornamento · 05.2026",
      sections: [
        { h: "Cosa sono i cookie", body: "<p>I cookie sono piccoli file di testo che il sito archivia sul tuo dispositivo per ricordare preferenze o raccogliere statistiche d'uso.</p>" },
        { h: "Cookie tecnici (sempre attivi)", body: "<p>Necessari al funzionamento del sito — preferenza di lingua, gestione del consenso, sicurezza. Non richiedono il tuo consenso e non possono essere disattivati.</p>" },
        { h: "Cookie di analytics (opzionali)", body: "<p>Conteggi anonimi delle visite tramite <strong>Umami</strong> self-hosted. Si attivano solo se li accetti dal banner. Non profilano gli utenti né condividono dati con terze parti.</p>" },
        { h: "Servizi di terze parti", body: "<p>Quando avvii la prenotazione di una call, <strong>Cal.com</strong> imposta cookie tecnici sul suo dominio per gestire la sessione di booking.</p>" },
        { h: "Gestione del consenso", body: "<p>Puoi rivedere le tue preferenze in qualsiasi momento <button type=\"button\" class=\"cookie-link\" data-cookie-prefs>aprendo le impostazioni dei cookie</button>.</p>" },
        { h: "Contatti", body: "<p>Per qualsiasi domanda: <a href=\"mailto:info@alpacode.it\">info@alpacode.it</a>.</p>" },
      ],
    },
    en: {
      crumb: "LEGAL · COOKIES",
      h1Line1: "Cookie",
      h1Line2: "policy.",
      lede: "What we save on your device, and how to manage it in two clicks.",
      updated: "Last updated · 05.2026",
      sections: [
        { h: "What cookies are", body: "<p>Cookies are small text files the site stores on your device to remember preferences or collect usage statistics.</p>" },
        { h: "Strictly necessary (always on)", body: "<p>Required for the site to work — language preference, consent management, security. They don't need your consent and can't be disabled.</p>" },
        { h: "Analytics (optional)", body: "<p>Anonymous visit counts via self-hosted <strong>Umami</strong>. Activated only if you accept from the banner. No user profiling, no data shared with third parties.</p>" },
        { h: "Third-party services", body: "<p>When you start booking a call, <strong>Cal.com</strong> sets technical cookies on its own domain to manage the booking session.</p>" },
        { h: "Managing consent", body: "<p>You can review your preferences any time by <button type=\"button\" class=\"cookie-link\" data-cookie-prefs>opening cookie settings</button>.</p>" },
        { h: "Contact", body: "<p>For any question: <a href=\"mailto:info@alpacode.it\">info@alpacode.it</a>.</p>" },
      ],
    },
  },
  termini: {
    it: {
      crumb: "LEGALE · TERMINI",
      h1Line1: "Termini",
      h1Line2: "e condizioni.",
      lede: "Le regole d'ingaggio tra te e Alpacode, dette in modo semplice.",
      updated: "Ultimo aggiornamento · 05.2026",
      sections: [
        { h: "Generale", body: "<p>Questi Termini regolano l'utilizzo del sito alpacode.it e dei servizi offerti da Soluzioni Digitali Alpacode (P. IVA 14463350968).</p>" },
        { h: "Servizi", body: "<p>Alpacode offre sviluppo siti web, software, consulenza, branding, advertising, SEO, formazione e prodotti digitali. Ogni progetto è regolato da una proposta scritta separata, sottoscritta dalle parti, che prevale su questi Termini in caso di conflitto.</p>" },
        { h: "Pagamenti", body: "<p>Le condizioni di pagamento sono indicate nella proposta sottoscritta. Per i prodotti digitali e i pacchetti pronti il pagamento avviene prima della consegna o secondo i piani di rateizzazione concordati. Per i progetti più importanti è possibile suddividere il pagamento in rate senza interessi.</p>" },
        { h: "Proprietà intellettuale", body: "<p>Il materiale realizzato su misura per il cliente diventa di sua proprietà al saldo del compenso pattuito. I prodotti standard di Alpacode (es. <em>Hive Commerce</em>, <em>Alpacode Pro Kit</em>) sono concessi in licenza secondo le condizioni specifiche del singolo prodotto.</p>" },
        { h: "Garanzie e responsabilità", body: "<p>I servizi sono forniti con la diligenza professionale richiesta. Salvo dolo o colpa grave e fatte salve le norme inderogabili a tutela del consumatore, Alpacode non risponde di danni indiretti o di mancato lucro derivanti dall'uso del sito o dei servizi.</p>" },
        { h: "Diritto di recesso (consumatori)", body: "<p>Per i consumatori si applicano i diritti di recesso previsti dalla normativa vigente, salvo nei casi di servizi avviati con il loro consenso espresso prima dello scadere del termine di recesso.</p>" },
        { h: "Foro competente", body: "<p>Per le controversie il foro competente è quello di Monza, salvo diversa indicazione obbligatoria di legge per i consumatori.</p>" },
        { h: "Contatti", body: "<p>Per qualsiasi domanda: <a href=\"mailto:info@alpacode.it\">info@alpacode.it</a>.</p>" },
      ],
    },
    en: {
      crumb: "LEGAL · TERMS",
      h1Line1: "Terms",
      h1Line2: "and conditions.",
      lede: "The rules of engagement between you and Alpacode, in plain language.",
      updated: "Last updated · 05.2026",
      sections: [
        { h: "General", body: "<p>These Terms govern the use of alpacode.it and the services offered by Soluzioni Digitali Alpacode (VAT 14463350968).</p>" },
        { h: "Services", body: "<p>Alpacode offers website development, software, consulting, branding, advertising, SEO, training and digital products. Each project is governed by a separate written proposal, signed by the parties, which prevails over these Terms in case of conflict.</p>" },
        { h: "Payments", body: "<p>Payment terms are stated in the signed proposal. For digital products and ready-made packages, payment is made before delivery or according to the agreed installment plans. For larger projects, interest-free installments can be arranged.</p>" },
        { h: "Intellectual property", body: "<p>Material produced bespoke for the client becomes their property upon full payment. Alpacode's standard products (e.g. <em>Hive Commerce</em>, <em>Alpacode Pro Kit</em>) are licensed under the specific terms of each product.</p>" },
        { h: "Warranties and liability", body: "<p>Services are provided with the required professional care. Except for willful misconduct or gross negligence, and without prejudice to mandatory consumer-protection rules, Alpacode is not liable for indirect damages or loss of profit arising from the use of the site or the services.</p>" },
        { h: "Right of withdrawal (consumers)", body: "<p>Consumer withdrawal rights apply as set out by applicable law, except where services begin with the consumer's express consent before the withdrawal period expires.</p>" },
        { h: "Jurisdiction", body: "<p>For any dispute, the competent court is Monza, except where mandatory consumer-protection rules apply.</p>" },
        { h: "Contact", body: "<p>For any question: <a href=\"mailto:info@alpacode.it\">info@alpacode.it</a>.</p>" },
      ],
    },
  },
};
