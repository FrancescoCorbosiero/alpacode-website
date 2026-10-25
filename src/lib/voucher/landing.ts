/* ============================================================
   Referral landing behaviour (/voucher/, /voucher/nuova-attivita/)
   — vanilla TS, no dependencies beyond the QR encoder. In order:
   1. the sticker counts up to its amount (motion-safe only);
   2. paired choices stay in sync across the page (the payout picker
      and the forms; the kit board and the direct form's "what did
      they open");
   3. tabs (ARIA pattern, arrow keys);
   4. the live chat-bubble preview follows what you type — and, on the
      new-business door, what kind of business you picked;
   5. both forms post to /api/referral and end on the share panel;
   6. the share panel: copy, WhatsApp, Telegram, email, native share,
      a QR of the invite (also swapped into the QR band) — a fresh link
      arrives decoding itself, its QR prints and the page celebrates
      (the moves are alpacode-motion entries, in engine/effects);
   7. a generated code is remembered in this browser only, and turned
      back into the link of whichever door you're on.

   Runs once as a module; set up again on every astro:page-load (the
   ClientRouter swaps pages without reloading), once per page.
   ============================================================ */
import { qrSvg } from "./qr";
import { codePrefix, firstName } from "./referral-code";
import { scrollToTarget } from "../../engine/core/scroll";
import { celebrate } from "../../engine/effects/celebrate";
import { nudge } from "../../engine/effects/nudge";
import { panelEnter } from "../../engine/effects/panel-enter";
import { printQr } from "../../engine/effects/print";
import { revealPanel } from "../../engine/effects/reveal-panel";
import { scramble } from "../../engine/effects/scramble";
import {
  checked,
  errorText,
  postReferral,
  setBusy,
  setStatus,
  validate,
  value,
  wireLiveClear,
  isEmail,
  markInvalid,
  type FormErrors,
} from "./forms";

interface StudioI18n {
  lang: "it" | "en";
  program: "sito" | "nuova-attivita";
  /** Origin + door path up to the code: "https://alpacode.it/voucher/". */
  inviteBase: string;
  /** The same without the scheme, for the preview: "alpacode.it/voucher/". */
  invitePrefix: string;
  message: string;
  emailSubject: string;
  resultTitle: string;
  welcomeBack: string;
  copied: string;
  copy: string;
  cardTitle: string;
  cardTitleAnon: string;
  directBody: string;
  sending: string;
  errors: FormErrors;
  qrLabel: string;
  qrTitle: string;
  qrBody: string;
  /** What goes after "hai aperto…", per business type (new-business door). */
  things: Record<string, string>;
  thing: string;
}

interface Stored {
  name: string;
  code: string;
  t: number;
}

const STORE_KEY = "alpacode_referral_v1";
const CONTACT_EMAIL = "info@alpacode.it";
const reduced = (): boolean => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) => root.querySelector<T>(sel);
const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

/* ---------- 1. Sticker counter ---------- */
function countUp(root: ParentNode): void {
  const live = $("[data-count-to]", root);
  if (!live || reduced()) return;
  const to = Number(live.dataset.countTo) || 0;
  const tpl = live.dataset.countTemplate ?? "{n}";
  if (!to) return;
  const delay = 520;
  const dur = 1100;
  const start = performance.now() + delay;
  live.textContent = tpl.replace("{n}", "0");
  const ease = (t: number) => 1 - Math.pow(2, -10 * t);
  const frame = (now: number) => {
    const t = Math.min(1, Math.max(0, (now - start) / dur));
    live.textContent = tpl.replace("{n}", String(Math.round(ease(t) * to)));
    if (t < 1 && live.isConnected) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

/* ---------- 2. Paired choices ---------- */
/** Radios that mean the same thing in different places: ticking one ticks
 *  its twins. `onChange` hears every change of the group. */
function pairRadios(root: HTMLElement, names: string[], onChange?: (value: string) => void): void {
  root.addEventListener("change", (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement) || !t.checked || !names.includes(t.name)) return;
    $$<HTMLInputElement>(names.map((n) => `input[name="${n}"]`).join(","), root).forEach((r) => {
      if (r !== t) r.checked = r.value === t.value;
    });
    onChange?.(t.value);
  });
}

/* ---------- 3. Tabs ---------- */
function tabs(root: HTMLElement): void {
  const list = $$<HTMLButtonElement>("[role='tab']", root);
  const select = (tab: HTMLButtonElement, focus = false) => {
    const from = list.findIndex((t) => t.getAttribute("aria-selected") === "true");
    const to = list.indexOf(tab);
    list.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      const panel = document.getElementById(t.getAttribute("aria-controls") ?? "");
      if (panel) panel.hidden = !on;
      // The new panel slides in from the side of the tab it came from.
      if (panel && on && from !== to) panelEnter(panel, to > from ? 1 : -1);
    });
    if (focus) tab.focus();
  };
  list.forEach((tab, i) => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", (e) => {
      const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
      let next: number | null = null;
      if (e.key in keys) next = (i + (keys[e.key] ?? 0) + list.length) % list.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = list.length - 1;
      const target = next === null ? undefined : list[next];
      if (!target) return;
      e.preventDefault();
      select(target, true);
    });
  });
}

/** The message with its blanks filled: {thing} (what they opened) and {link}. */
const fillMessage = (tpl: string, thing: string, link: string): string =>
  tpl.replace("{thing}", thing).replace("{link}", link);

/* ---------- 4. Live preview ---------- */
function preview(root: HTMLElement, i18n: StudioI18n, state: { thing: string }) {
  const text = $("[data-preview-text]", root);
  const title = $("[data-preview-title]", root);
  const time = $("[data-preview-time]", root);
  if (time) {
    const d = new Date();
    time.textContent = `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
  }
  const input = $<HTMLInputElement>("[data-preview-name]", root);
  let name = "";
  let link: string | undefined;
  const render = (next?: { name?: string; link?: string }) => {
    if (next?.name !== undefined) name = next.name;
    if (next && "link" in next) link = next.link;
    const first = firstName(name);
    const placeholderLink = `${i18n.invitePrefix}${first ? codePrefix(name, i18n.lang) : "…"}${first ? "-•••••" : ""}`;
    if (text) text.textContent = fillMessage(i18n.message, state.thing, link ?? placeholderLink);
    if (title) title.textContent = first ? i18n.cardTitle.replace("{name}", first) : i18n.cardTitleAnon;
  };
  input?.addEventListener("input", () => render({ name: input.value }));
  return { render };
}

/* ---------- 6. Share panel ---------- */
function sharePanel(root: HTMLElement, i18n: StudioI18n, state: { thing: string }, onReset: () => void) {
  const forms = $("[data-forms]", root);
  const result = $("[data-result]", root);
  const titleEl = $("[data-result-title]", root);
  const linkEl = $<HTMLInputElement>("[data-result-link]", root);
  const codeEl = $("[data-result-code]", root);
  const msgEl = $<HTMLTextAreaElement>("[data-result-message]", root);
  const qrEl = $("[data-result-qr]", root);
  const notice = $("[data-result-notice]", root);
  const noticeBody = $("[data-result-notice-body]", root);
  const copyBtn = $<HTMLButtonElement>("[data-copy]", root);
  const copyLabel = $("[data-copy-label]", root);
  const native = $<HTMLButtonElement>("[data-share='native']", root);
  const band = $("[data-qr-band]");
  const bandTile = $("[data-qr-tile]");
  const bandTitle = $("[data-qr-title]");
  const bandBody = $("[data-qr-body]");
  const bandDefault = {
    // The QR alone: the print entry may have parked its scan bar in the tile.
    tile: bandTile?.querySelector("svg")?.outerHTML ?? bandTile?.innerHTML ?? "",
    title: bandTitle?.textContent ?? "",
    body: bandBody?.textContent ?? "",
  };
  let link = "";
  // The visitor's own words win: a business picked after editing the
  // message doesn't overwrite it.
  let edited = false;

  const stripLink = (msg: string) => msg.replace(link, "").replace(/\s+$/g, "").replace(/[:\s]+$/, "");
  const updateShares = () => {
    const msg = msgEl?.value.trim() || fillMessage(i18n.message, state.thing, link);
    const withLink = msg.includes(link) ? msg : `${msg} ${link}`;
    const wa = $<HTMLAnchorElement>("[data-share='whatsapp']", root);
    const tg = $<HTMLAnchorElement>("[data-share='telegram']", root);
    const em = $<HTMLAnchorElement>("[data-share='email']", root);
    if (wa) wa.href = `https://wa.me/?text=${encodeURIComponent(withLink)}`;
    if (tg) tg.href = `https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(stripLink(withLink))}`;
    if (em) em.href = `mailto:?subject=${encodeURIComponent(i18n.emailSubject)}&body=${encodeURIComponent(withLink)}`;
  };
  msgEl?.addEventListener("input", () => {
    edited = true;
    updateShares();
  });

  if (native && typeof navigator.share === "function") {
    native.hidden = false;
    native.addEventListener("click", () => {
      const msg = msgEl?.value.trim() || "";
      navigator.share({ title: i18n.emailSubject, text: stripLink(msg), url: link }).catch(() => undefined);
    });
  }

  copyBtn?.addEventListener("click", async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(link);
      ok = true;
    } catch {
      if (linkEl) {
        linkEl.select();
        ok = document.execCommand?.("copy") ?? false;
      }
    }
    if (ok && copyLabel && copyBtn) {
      copyLabel.textContent = i18n.copied;
      copyBtn.classList.add("is-copied");
      window.setTimeout(() => {
        copyLabel.textContent = i18n.copy;
        copyBtn.classList.remove("is-copied");
      }, 2200);
    }
  });
  linkEl?.addEventListener("focus", () => linkEl.select());

  $("[data-reset]", root)?.addEventListener("click", () => {
    try {
      localStorage.removeItem(STORE_KEY);
    } catch {
      /* storage unavailable */
    }
    if (result) result.hidden = true;
    if (forms) forms.hidden = false;
    if (bandTile) bandTile.innerHTML = bandDefault.tile;
    if (bandTitle) bandTitle.textContent = bandDefault.title;
    if (bandBody) bandBody.textContent = bandDefault.body;
    band?.classList.remove("is-personal");
    link = "";
    edited = false;
    onReset();
    $<HTMLInputElement>("#rl-name", root)?.focus();
  });

  return {
    /** The business picked changed: refresh the message if it's still ours. */
    retell(): void {
      if (!link || edited || !msgEl) return;
      msgEl.value = fillMessage(i18n.message, state.thing, link);
      updateShares();
    },
    show(data: Stored & { link: string }, opts: { welcome?: boolean; notice?: string; scroll?: boolean } = {}) {
      link = data.link;
      edited = false;
      const first = firstName(data.name);
      if (titleEl) titleEl.textContent = (opts.welcome ? i18n.welcomeBack : i18n.resultTitle).replace("{name}", first);
      if (linkEl) linkEl.value = data.link;
      if (codeEl) codeEl.textContent = data.code;
      if (msgEl) msgEl.value = fillMessage(i18n.message, state.thing, data.link);
      if (notice && noticeBody) {
        notice.hidden = !opts.notice;
        noticeBody.textContent = opts.notice ?? "";
      }
      const svg = qrSvg(data.link, { label: i18n.qrLabel });
      if (qrEl) qrEl.innerHTML = svg;
      if (bandTile) bandTile.innerHTML = svg;
      if (bandTitle) bandTitle.textContent = i18n.qrTitle;
      if (bandBody) bandBody.textContent = i18n.qrBody;
      band?.classList.add("is-personal");
      updateShares();
      if (forms) forms.hidden = true;
      if (result) result.hidden = false;
      // The band's personal QR prints itself when it next scrolls in.
      if (bandTile) printQr(bandTile, { trigger: true });
      if (opts.scroll && result) {
        // A fresh link: the panel drops in, link and code decode, the QR
        // prints, and the burst goes off once the page has landed on it.
        revealPanel(result);
        if (linkEl) scramble(linkEl, data.link, 1.25);
        if (codeEl) scramble(codeEl, data.code, 1);
        if (qrEl) printQr(qrEl, { delay: 0.55 });
        scrollToTarget(result, () => celebrate(titleEl ?? result));
        titleEl?.focus({ preventScroll: true });
      } else if (qrEl) {
        printQr(qrEl, { trigger: true });
      }
    },
  };
}

/* ---------- 7. Persistence ---------- */
function load(): Stored | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as Stored;
    return s && typeof s.code === "string" && typeof s.name === "string" ? s : null;
  } catch {
    return null;
  }
}
function save(s: Stored): void {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify(s));
  } catch {
    /* private mode / storage blocked: the panel still works this visit */
  }
}

/* The handwritten line's brush stroke draws in when it scrolls into view. */
let handObserver: IntersectionObserver | null = null;
function drawHandLines(root: ParentNode): void {
  const lines = $$(".rf-hand", root);
  if (!lines.length) return;
  handObserver ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add("is-drawn");
        handObserver?.unobserve(e.target);
      }),
    { threshold: 0.6 },
  );
  lines.forEach((l) => handObserver?.observe(l));
}
document.addEventListener("astro:before-swap", () => handObserver?.disconnect());

/* ---------- 5. Forms ---------- */
function init(): void {
  const page = $<HTMLElement>(".rf[data-page='landing']");
  if (!page || page.dataset.ready) return; // not this page, or already set up
  page.dataset.ready = "1";

  countUp(page);
  drawHandLines(page);

  const studio = $("[data-studio]", page);
  const i18nEl = $("[data-studio-i18n]", page);
  if (!studio || !i18nEl) return;
  const i18n = JSON.parse(i18nEl.textContent ?? "{}") as StudioI18n;
  const state = { thing: i18n.thing };

  tabs(studio);
  const pv = preview(studio, i18n, state);
  const panel = sharePanel(studio, i18n, state, () => pv.render({ name: $<HTMLInputElement>("#rl-name", studio)?.value ?? "", link: undefined }));
  const linkFor = (code: string) => `${i18n.inviteBase}${code}`;

  pairRadios(page, ["payout", "payout-pick"]);
  // The kit board and the direct form ask the same question.
  pairRadios(page, ["kit-type", "business"], (id) => {
    $("[data-kit]", page)?.setAttribute("data-kit-active", id);
    state.thing = i18n.things[id] ?? i18n.thing;
    pv.render();
    panel.retell();
  });

  const stored = load();
  if (stored) {
    const link = linkFor(stored.code);
    panel.show({ ...stored, link }, { welcome: true });
    pv.render({ name: stored.name, link });
  }

  const referrer = $<HTMLFormElement>("form[data-form='referrer']", studio);
  const direct = $<HTMLFormElement>("form[data-form='direct']", studio);

  const fail = (form: HTMLFormElement, status: number, error?: string) => {
    setStatus(form, errorText(i18n.errors, status, error, CONTACT_EMAIL));
  };

  // A fresh link comes from the API (it knows the deployed origin); a
  // remembered code is turned back into the link of this door.
  const succeed = (name: string, code: string, link: string, notice?: string) => {
    const data: Stored = { name, code, t: Date.now() };
    save(data);
    panel.show({ ...data, link }, { notice, scroll: true });
    pv.render({ name, link });
  };

  if (referrer) {
    wireLiveClear(referrer);
    referrer.addEventListener("submit", async (e) => {
      e.preventDefault();
      setStatus(referrer, "");
      const bad = validate(referrer);
      if (bad) {
        setStatus(referrer, i18n.errors[bad.key]);
        nudge(referrer.querySelectorAll(".is-invalid"));
        bad.el.focus();
        return;
      }
      setBusy(referrer, true, i18n.sending);
      const name = value(referrer, "name");
      const { status, data } = await postReferral({
        kind: "referrer",
        program: i18n.program,
        lang: i18n.lang,
        name,
        email: value(referrer, "email"),
        phone: value(referrer, "phone"),
        payout: value(referrer, "payout"),
        consent: checked(referrer, "consent"),
        website: value(referrer, "website"),
      });
      setBusy(referrer, false, i18n.sending);
      if (status !== 200 || !data.ok || !data.code || !data.link) return fail(referrer, status, data.error);
      referrer.reset();
      succeed(name, data.code, data.link);
    });
  }

  if (direct) {
    wireLiveClear(direct);
    direct.addEventListener("submit", async (e) => {
      e.preventDefault();
      setStatus(direct, "");
      const bad = validate(direct);
      const fEmail = value(direct, "friendEmail");
      const fPhone = value(direct, "friendPhone");
      const contacts = $$<HTMLInputElement>("[data-contact]", direct);
      if (bad) {
        setStatus(direct, i18n.errors[bad.key]);
        nudge(direct.querySelectorAll(".is-invalid"));
        bad.el.focus();
        return;
      }
      if (!fEmail && !fPhone) {
        contacts.forEach(markInvalid);
        setStatus(direct, i18n.errors.contactNeeded);
        nudge(direct.querySelectorAll(".is-invalid"));
        contacts[0]?.focus();
        return;
      }
      if (fEmail && !isEmail(fEmail)) {
        const el = contacts[0];
        if (el) markInvalid(el);
        setStatus(direct, i18n.errors.validation);
        nudge(direct.querySelectorAll(".is-invalid"));
        el?.focus();
        return;
      }
      setBusy(direct, true, i18n.sending);
      const name = value(direct, "name");
      const friendName = value(direct, "friendName");
      const { status, data } = await postReferral({
        kind: "direct",
        program: i18n.program,
        lang: i18n.lang,
        name,
        email: value(direct, "email"),
        phone: value(direct, "phone"),
        payout: value(direct, "payout"),
        friend: {
          name: friendName,
          email: fEmail,
          phone: fPhone,
          need: value(direct, "need") || undefined,
          business: value(direct, "business") || undefined,
          note: value(direct, "note"),
        },
        friendConsent: checked(direct, "friendConsent"),
        consent: checked(direct, "consent"),
        website: value(direct, "website"),
      });
      setBusy(direct, false, i18n.sending);
      if (status !== 200 || !data.ok || !data.code || !data.link) return fail(direct, status, data.error);
      direct.reset();
      const notice = i18n.directBody.replace("{name}", firstName(name)).replace("{friend}", firstName(friendName));
      succeed(name, data.code, data.link, notice);
    });
  }
}

document.addEventListener("astro:page-load", init);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
