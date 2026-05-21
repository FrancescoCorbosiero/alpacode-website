import { run, showPreferences } from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "../styles/consent.css";

const lang = document.documentElement.lang === "en" ? "en" : "it";

run({
  root: "#cc-root",
  guiOptions: {
    consentModal: { layout: "box", position: "bottom left" },
    preferencesModal: { layout: "box" },
  },
  categories: {
    necessary: { enabled: true, readOnly: true },
    analytics: {},
  },
  language: {
    default: lang,
    translations: {
      it: {
        consentModal: {
          title: "Cookie e privacy",
          description:
            "Usiamo statistiche anonime e senza cookie per capire come va il sito. Nessun tracciamento pubblicitario — scegli tu.",
          acceptAllBtn: "Accetta",
          acceptNecessaryBtn: "Rifiuta",
          showPreferencesBtn: "Preferenze",
        },
        preferencesModal: {
          title: "Preferenze privacy",
          acceptAllBtn: "Accetta tutto",
          acceptNecessaryBtn: "Rifiuta tutto",
          savePreferencesBtn: "Salva preferenze",
          closeIconLabel: "Chiudi",
          sections: [
            {
              title: "Necessari",
              description:
                "Indispensabili al funzionamento del sito (es. la lingua scelta). Sempre attivi.",
              linkedCategory: "necessary",
            },
            {
              title: "Statistiche",
              description:
                "Statistiche anonime e senza cookie (Umami) per migliorare il sito. Nessun dato personale.",
              linkedCategory: "analytics",
            },
          ],
        },
      },
      en: {
        consentModal: {
          title: "Cookies & privacy",
          description:
            "We use anonymous, cookieless stats to see how the site is doing. No ad tracking — your choice.",
          acceptAllBtn: "Accept",
          acceptNecessaryBtn: "Reject",
          showPreferencesBtn: "Preferences",
        },
        preferencesModal: {
          title: "Privacy preferences",
          acceptAllBtn: "Accept all",
          acceptNecessaryBtn: "Reject all",
          savePreferencesBtn: "Save preferences",
          closeIconLabel: "Close",
          sections: [
            {
              title: "Strictly necessary",
              description:
                "Required for the site to work (e.g. your language). Always on.",
              linkedCategory: "necessary",
            },
            {
              title: "Analytics",
              description:
                "Anonymous, cookieless stats (Umami) to improve the site. No personal data.",
              linkedCategory: "analytics",
            },
          ],
        },
      },
    },
  },
});

// Footer "Cookie" link reopens preferences. Delegated on document so it keeps
// working after View Transitions navigations swap the footer.
document.addEventListener("click", (e) => {
  const target = e.target as HTMLElement | null;
  if (target?.closest("[data-cookie-prefs]")) {
    e.preventDefault();
    showPreferences();
  }
});
