// cal.com booking config.
//
// CAL_LINK is the public event link, in the form "<username>/<event>" — e.g.
// "alpacode/30min". Replace the default with your real link (edit here or set
// PUBLIC_CALCOM_LINK at build time), then rebuild.
export const CAL_LINK = import.meta.env.PUBLIC_CALCOM_LINK || "alpacode/call";

/** Single embed namespace reused by popups and the inline embed. */
export const CAL_NAMESPACE = "call";
export const CAL_ORIGIN = "https://cal.com";

/** Layout passed to every embed (square, editorial — matches the design). */
export const CAL_CONFIG = '{"layout":"month_view"}';

/**
 * True once a real booking link is set. While it's still the placeholder,
 * booking CTAs fall back to the contact form instead of opening a 404.
 */
export const CAL_CONFIGURED = CAL_LINK.trim() !== "" && CAL_LINK !== "alpacode/call";
