/* ============================================================
   Buying on the site (data/products.ts, Checkout). A [data-checkout]
   link works without this script: it opens the provider's own
   checkout page. With it, Lemon Squeezy opens as an overlay on the
   page: lemon.js is fetched the first time someone heads for one of
   its buttons (pointer over, focus, click), never before. Gumroad and
   Stripe open their own page, and bring the buyer back to /grazie/.
   ============================================================ */
import { track } from "./consent";

const LEMON_JS = "https://app.lemonsqueezy.com/js/lemon.js";

interface LemonWindow {
  createLemonSqueezy?: () => void;
  LemonSqueezy?: { Url: { Open: (url: string) => void } };
}
const w = window as unknown as LemonWindow;

let lemon: Promise<void> | null = null;
function loadLemon(): Promise<void> {
  lemon ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = LEMON_JS;
    s.defer = true;
    s.onload = () => {
      w.createLemonSqueezy?.();
      w.LemonSqueezy ? resolve() : reject(new Error("lemon.js loaded without LemonSqueezy"));
    };
    s.onerror = () => reject(new Error("lemon.js unavailable"));
    document.head.appendChild(s);
  }).catch((err) => {
    lemon = null; // try again on the next click; meanwhile links navigate
    throw err;
  });
  return lemon;
}

/** The overlay wants embed=1 on the checkout URL. */
const embedded = (href: string): string => {
  const url = new URL(href);
  url.searchParams.set("embed", "1");
  return url.href;
};

const lemonLink = (t: EventTarget | null) =>
  t instanceof Element ? t.closest<HTMLAnchorElement>('a[data-checkout="lemonsqueezy"]') : null;

const warm = (e: Event) => {
  if (lemonLink(e.target)) loadLemon().catch(() => {});
};
document.addEventListener("pointerover", warm, { passive: true });
document.addEventListener("focusin", warm);

document.addEventListener("click", (e) => {
  const any = e.target instanceof Element ? e.target.closest<HTMLAnchorElement>("a[data-checkout]") : null;
  if (!any) return;
  track("checkout", { provider: any.dataset.checkout ?? "" });
  const a = lemonLink(e.target);
  if (!a || e.metaKey || e.ctrlKey || e.shiftKey) return; // new tab: let the browser go
  e.preventDefault();
  loadLemon().then(
    () => w.LemonSqueezy?.Url.Open(embedded(a.href)),
    () => (location.href = a.href),
  );
});

export {};
