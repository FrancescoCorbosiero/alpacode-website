/* Cloudflare's Email Address Obfuscation (Scrape Shield, on by default)
   rewrites every mailto: link and visible address in the proxied HTML to
   /cdn-cgi/l/email-protection#… and a "[email protected]" placeholder, and
   appends a decoder script that restores them in the browser. Astro's
   ClientRouter runs each script src only once per visit, so after a soft
   navigation the incoming page's addresses stay encoded, and clicking one
   opens Cloudflare's "Email Protection" page. Flag the decoder in the
   incoming document so the router runs it again after the swap.

   A no-op when the feature is off in the Cloudflare dashboard, which is
   the better setting here: the address is public in the JSON-LD anyway. */
document.addEventListener("astro:before-swap", (e) => {
  e.newDocument
    .querySelectorAll('script[src*="/cdn-cgi/"][src*="email-decode"]')
    .forEach((s) => s.setAttribute("data-astro-rerun", ""));
});
