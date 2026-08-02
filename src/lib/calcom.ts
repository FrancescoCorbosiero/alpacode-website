// cal.com booking config.
//
// PUBLIC_CALCOM_LINK accepts EITHER a full URL (https://cal.eu/alpacode/30min)
// or a bare "username/event" path. A full URL also sets the instance origin,
// so self-hosted / regional instances (cal.eu, …) work, not just cal.com.
// Build-time only (PUBLIC_ = inlined into the prerendered pages).
const RAW = (import.meta.env.PUBLIC_CALCOM_LINK ?? "https://cal.eu/alpacode/30min").trim();

function parseCal(raw: string): { link: string; origin: string } {
  if (/^https?:\/\//i.test(raw)) {
    try {
      const u = new URL(raw);
      return { link: u.pathname.replace(/^\/+/, ""), origin: u.origin };
    } catch {
      /* fall through to path form */
    }
  }
  return { link: raw, origin: import.meta.env.PUBLIC_CALCOM_ORIGIN || "https://cal.com" };
}

const parsed = parseCal(RAW);

/** "username/event" path used by data-cal-link and the inline embed. */
export const CAL_LINK = parsed.link;
/** Origin of the cal instance (cloud = https://cal.com). */
export const CAL_ORIGIN = parsed.origin;
/**
 * embed.js loader URL. cal.com cloud serves it from app.cal.com; self-hosted /
 * regional instances serve it from <origin>/embed/embed.js. Override with
 * PUBLIC_CALCOM_EMBED_JS if your instance differs.
 */
export const CAL_EMBED_JS =
  import.meta.env.PUBLIC_CALCOM_EMBED_JS ||
  (CAL_ORIGIN === "https://cal.com"
    ? "https://app.cal.com/embed/embed.js"
    : `${CAL_ORIGIN}/embed/embed.js`);

export const CAL_NAMESPACE = "call";

/** Layout passed to every embed (square, editorial — matches the design). */
export const CAL_CONFIG = '{"layout":"month_view"}';

/**
 * True when a booking link is available (the env var, or the default above).
 * Setting PUBLIC_CALCOM_LINK to an empty string disables booking: CTAs fall
 * back to the contact form instead of opening a dead embed.
 * (An old sentinel compared against "alpacode/call" — a value the default
 * could never produce, so the fallback was unreachable.)
 */
export const CAL_CONFIGURED = CAL_LINK !== "";
