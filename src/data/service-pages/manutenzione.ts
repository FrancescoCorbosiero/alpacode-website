/* /servizi/manutenzione — Manutenzione & supporto (06).
   Its machine: the site's pulse on a monitor, the backups filling day
   by day, the updates in the log, a request that comes in and is done. */
import type { Lang } from "../../i18n/types";
import type { ServiceCopy } from "./types";

export const manutenzione: Record<Lang, ServiceCopy> = {
  it: {
    meta: {
      title: "Manutenzione siti web e supporto — Alpacode",
      description:
        "Aggiornamenti, sicurezza, backup e modifiche, con un canale dedicato e risposte entro mezza giornata. Un canone mensile che disdici quando vuoi.",
      ogAlt: "Manutenzione e supporto: dopo il lancio non spariamo.",
    },
    name: "Manutenzione & supporto",
    portal: "Dopo il lancio, il sito resta in forma.",
    hero: {
      kicker: "manutenzione & supporto",
      lines: ["Dopo il lancio", "non spariamo."],
      accent: { before: "Il sito ", mark: "resta in forma", after: "." },
      lede: "Aggiornamenti, sicurezza, backup e modifiche, con un canale dedicato e risposte rapide. Una persona che conosce il tuo sito, non un centralino.",
      cta: "Raccontaci il tuo sito",
      alt: "Quando serve",
    },
    machine: {
      kind: "heartbeat",
      site: "latuaattivita.it",
      status: "Online",
      backups: "Backup",
      log: ["Plugin aggiornati", "Certificato rinnovato", "Backup completato"],
      ticket: "Cambiate l'orario del sabato?",
      done: "Fatto",
    },
    facts: [
      { k: "Formato", v: "Canone mensile" },
      { k: "Risposta", v: "< mezza giornata" },
      { k: "Disdetta", v: "Quando vuoi" },
    ],
    when: {
      title: "Quando serve.",
      items: [
        {
          t: "Nessuno",
          strike: "aggiorna il sito",
          fix: "ci pensiamo noi",
          d: "Plugin vecchi, versioni scadute: è così che un sito si rompe, o viene bucato, di solito il giorno peggiore.",
        },
        {
          t: "Ogni modifica è",
          strike: "un'attesa",
          fix: "mezza giornata",
          d: "Un orario da cambiare, una foto, una pagina: settimane per avere una risposta a una mail.",
        },
        {
          t: "Non sai",
          strike: "se ci sono i backup",
          fix: "ci sono, e funzionano",
          d: "Non ci pensa nessuno finché non servono. E quando servono, è tardi per farli.",
        },
      ],
    },
    includes: {
      title: "Cosa comprende.",
      lede: "Il lavoro che non si vede e tiene il sito in piedi, e quello che si vede: le modifiche che chiedi.",
      items: [
        { t: "Aggiornamenti", d: "Sistema, tema e plugin, provati prima di essere applicati." },
        { t: "Sicurezza", d: "Controlli, protezioni e certificato sempre in ordine." },
        { t: "Backup", d: "Copie regolari, fuori dal server, pronte da ripristinare." },
        { t: "Modifiche", d: "Testi, foto, orari, pagine: le chiedi, le facciamo." },
        { t: "Un canale dedicato", d: "Scrivi a una persona che conosce il tuo sito, e ti risponde entro mezza giornata." },
        { t: "Il sito sotto controllo", d: "Se si ferma, ce ne accorgiamo noi e lo rimettiamo in piedi." },
      ],
    },
    steps: {
      title: "Come lavoriamo.",
      items: [
        { t: "Un controllo iniziale", d: "Guardiamo come sta il sito: versioni, sicurezza, backup, velocità." },
        { t: "Messa in sicurezza", d: "Sistemiamo quello che serve, prima di tutto il resto." },
        { t: "Il canone", d: "Ogni mese: aggiornamenti, backup, controlli e le modifiche che chiedi." },
        { t: "Disdici quando vuoi", d: "Il canone non ti lega: resti finché ti serve." },
      ],
    },
    qa: {
      title: "Le domande\ngiuste.",
      items: [
        {
          q: "Quanto velocemente rispondete?",
          a: "Entro mezza giornata lavorativa, sul canale dedicato, da una persona che conosce il tuo sito.",
        },
        {
          q: "Seguite anche siti fatti da altri?",
          a: "Sì, dopo un controllo iniziale: ti diciamo in che stato è e cosa serve per tenerlo in forma.",
        },
        {
          q: "Quali modifiche posso chiedere?",
          a: "Testi, foto, orari, pagine: le cose che cambiano nella vita di un'attività. Cosa comprende il canone lo scriviamo nella proposta.",
        },
        {
          q: "E se il sito si rompe?",
          a: "Lo rimettiamo in piedi dall'ultimo backup e capiamo cosa è successo, così non si ripete.",
        },
        {
          q: "Posso disdire?",
          a: "Sì, quando vuoi. Il sito, il dominio e i contenuti restano tuoi.",
        },
      ],
    },
    lead: {
      title: "Raccontaci\nil tuo sito.",
      lede: "Dove si trova, chi l'ha fatto, cosa ti preoccupa. Ti rispondiamo con il controllo iniziale da cui partire.",
      topic: "Servizio · Manutenzione & supporto",
      legend: "Il tuo sito",
      choices: [
        { id: "nostro", name: "L'avete fatto voi" },
        { id: "altro", name: "L'ha fatto qualcun altro" },
      ],
      message: { label: "Cosa ti preoccupa (facoltativo)", ph: "Aggiornamenti, lentezza, modifiche in sospeso…" },
      extra: { name: "site", label: "L'indirizzo del sito", ph: "www.…" },
    },
    portals: "Gli altri servizi",
  },
  en: {
    meta: {
      title: "Website maintenance and support — Alpacode",
      description:
        "Updates, security, backups and changes, with a dedicated channel and replies within half a day. A monthly fee you can cancel whenever you like.",
      ogAlt: "Maintenance and support: we don't disappear after launch.",
    },
    name: "Maintenance & support",
    portal: "After launch, the site stays in shape.",
    hero: {
      kicker: "maintenance & support",
      lines: ["After launch", "we don't disappear."],
      accent: { before: "The site ", mark: "stays in shape", after: "." },
      lede: "Updates, security, backups and changes, with a dedicated channel and quick replies. A person who knows your site, not a call centre.",
      cta: "Tell us about your site",
      alt: "When it's needed",
    },
    machine: {
      kind: "heartbeat",
      site: "yourbusiness.com",
      status: "Live",
      backups: "Backups",
      log: ["Plugins updated", "Certificate renewed", "Backup complete"],
      ticket: "Can you change Saturday's hours?",
      done: "Done",
    },
    facts: [
      { k: "Format", v: "Monthly fee" },
      { k: "Reply", v: "< half a day" },
      { k: "Cancel", v: "Whenever you like" },
    ],
    when: {
      title: "When it's needed.",
      items: [
        {
          t: "Nobody",
          strike: "updates the site",
          fix: "we do",
          d: "Old plugins, expired versions: that's how a site breaks, or gets hacked, usually on the worst day.",
        },
        {
          t: "Every change is",
          strike: "a wait",
          fix: "half a day",
          d: "Opening hours to change, a photo, a page: weeks to get an answer to an email.",
        },
        {
          t: "You don't know",
          strike: "if there are backups",
          fix: "there are, and they work",
          d: "Nobody thinks of them until they're needed. And when they are, it's too late to make them.",
        },
      ],
    },
    includes: {
      title: "What it covers.",
      lede: "The work nobody sees that keeps the site standing, and the work you do see: the changes you ask for.",
      items: [
        { t: "Updates", d: "System, theme and plugins, tested before they're applied." },
        { t: "Security", d: "Checks, protections and the certificate always in order." },
        { t: "Backups", d: "Regular copies, off the server, ready to restore." },
        { t: "Changes", d: "Texts, photos, hours, pages: you ask, we do." },
        { t: "A dedicated channel", d: "Write to a person who knows your site, and get a reply within half a day." },
        { t: "The site, watched", d: "If it stops, we notice and get it back up." },
      ],
    },
    steps: {
      title: "How we work.",
      items: [
        { t: "A first check", d: "We look at how the site is doing: versions, security, backups, speed." },
        { t: "Making it safe", d: "We fix what's needed, before anything else." },
        { t: "The monthly fee", d: "Every month: updates, backups, checks and the changes you ask for." },
        { t: "Cancel whenever", d: "The fee doesn't tie you: you stay as long as you need." },
      ],
    },
    qa: {
      title: "The right\nquestions.",
      items: [
        {
          q: "How quickly do you reply?",
          a: "Within half a working day, on the dedicated channel, from a person who knows your site.",
        },
        {
          q: "Do you look after sites made by others?",
          a: "Yes, after a first check: we tell you what state it's in and what it needs to stay in shape.",
        },
        {
          q: "Which changes can I ask for?",
          a: "Texts, photos, hours, pages: the things that change in the life of a business. What the fee covers is written in the proposal.",
        },
        {
          q: "What if the site breaks?",
          a: "We bring it back from the latest backup and find out what happened, so it doesn't happen again.",
        },
        {
          q: "Can I cancel?",
          a: "Yes, whenever you like. The site, the domain and the content stay yours.",
        },
      ],
    },
    lead: {
      title: "Tell us\nabout your site.",
      lede: "Where it lives, who built it, what worries you. We'll reply with the first check to start from.",
      topic: "Service · Maintenance & support",
      legend: "Your site",
      choices: [
        { id: "nostro", name: "You built it" },
        { id: "altro", name: "Someone else built it" },
      ],
      message: { label: "What worries you (optional)", ph: "Updates, slowness, changes waiting…" },
      extra: { name: "site", label: "The site's address", ph: "www.…" },
    },
    portals: "The other services",
  },
};
