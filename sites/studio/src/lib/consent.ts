/* ============================================================
   Consent for the ad pixels (Meta Pixel, Google Ads). They exist only
   when the build sets them (PUBLIC_META_PIXEL_ID, PUBLIC_GADS_ID →
   body[data-pixels]); without them the site sets no marketing cookie
   and shows no banner. With them, the banner asks once, and the tags
   load only after a yes. Umami is cookieless and never asks.
   `track()` sends a conversion to whatever was allowed.
   ============================================================ */
type Pixels = { meta: string; gads: string };

const raw = document.body.dataset.pixels;
const pixels: Pixels | null = raw ? (JSON.parse(raw) as Pixels) : null;

type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
interface AdWindow {
  fbq?: Fbq;
  _fbq?: Fbq;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  umami?: { track: (event: string, data?: Record<string, string>) => void };
}
const w = window as unknown as AdWindow;

let allowed = false;

function script(src: string): void {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

function loadPixels(p: Pixels): void {
  if (allowed) return;
  allowed = true;
  if (p.meta) {
    const fbq: Fbq = (...args: unknown[]) => {
      fbq.queue?.push(args);
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.push = fbq;
    w.fbq = w._fbq = fbq;
    script("https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", p.meta);
    fbq("track", "PageView");
  }
  if (p.gads) {
    w.dataLayer = w.dataLayer ?? [];
    w.gtag = (...args: unknown[]) => {
      w.dataLayer?.push(args);
    };
    w.gtag("js", new Date());
    w.gtag("config", p.gads);
    script(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(p.gads)}`);
  }
}

/** A conversion: Umami always (cookieless), the ad tags if allowed. */
export function track(event: "lead" | "checkout", data: Record<string, string> = {}): void {
  w.umami?.track(event, data);
  if (!allowed) return;
  if (event === "lead") {
    w.fbq?.("track", "Lead");
    w.gtag?.("event", "generate_lead");
  } else {
    w.fbq?.("track", "InitiateCheckout");
    w.gtag?.("event", "begin_checkout");
  }
}

if (pixels) {
  void Promise.all([import("vanilla-cookieconsent"), import("vanilla-cookieconsent/dist/cookieconsent.css")]).then(
    ([cc]) => {
      const apply = () => {
        if (cc.acceptedCategory("marketing")) loadPixels(pixels);
      };
      void cc.run({
        guiOptions: { consentModal: { layout: "box", position: "bottom left" }, preferencesModal: { layout: "box" } },
        categories: { necessary: { enabled: true, readOnly: true }, marketing: {} },
        onConsent: apply,
        onChange: () => (cc.acceptedCategory("marketing") ? loadPixels(pixels) : location.reload()),
        language: {
          default: "it",
          translations: {
            it: {
              consentModal: {
                title: "Cookie, solo se vuoi",
                description:
                  "Contiamo le visite senza cookie. Con il tuo sì, i pixel di Meta e Google ci dicono quali annunci funzionano. Scegli tu.",
                acceptAllBtn: "Accetta",
                acceptNecessaryBtn: "Rifiuta",
                showPreferencesBtn: "Preferenze",
              },
              preferencesModal: {
                title: "Preferenze",
                acceptAllBtn: "Accetta tutto",
                acceptNecessaryBtn: "Rifiuta tutto",
                savePreferencesBtn: "Salva",
                closeIconLabel: "Chiudi",
                sections: [
                  { title: "Necessari", description: "Servono al sito e a ricordare questa scelta.", linkedCategory: "necessary" },
                  {
                    title: "Marketing",
                    description: "Meta Pixel e Google Ads: misurano chi arriva dagli annunci e cosa fa sul sito.",
                    linkedCategory: "marketing",
                  },
                  { title: "Più dettagli", description: 'Nella <a href="/cookie/">Cookie policy</a>.' },
                ],
              },
            },
          },
        },
      });
      document.querySelectorAll<HTMLElement>("[data-cookie-prefs]").forEach((b) =>
        b.addEventListener("click", () => cc.showPreferences()),
      );
    },
  );
} else {
  document.querySelectorAll<HTMLElement>("[data-cookie-prefs]").forEach((b) =>
    b.addEventListener("click", () => {
      b.replaceWith("oggi il sito non usa cookie di marketing: non c'è niente da scegliere");
    }),
  );
}
