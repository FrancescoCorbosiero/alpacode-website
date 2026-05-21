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
