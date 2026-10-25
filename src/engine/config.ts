/* ============================================================
   alpacode.it's half of the core: its own selectors (alpacode-motion's
   contract: core/ and effects/ are copied as they are; this file and
   registry.ts are the site's). The site's classes live here, never in
   an effect: the section titles dealt their entrance, the blocks that
   fade up, the struts, the kickers, the photos that open.
   ============================================================ */

export const config = {
  /** The page header: `.scrolled` past 8px, `.is-hidden` while reading
   *  downwards (core-header). */
  header: ".site-header",
  /** While this matches, the header stays shown: the mobile menu is open. */
  navOpen: ".mnav-backdrop",
  /** Panes that keep native scrolling under the pointer: Lenis stands
   *  down over them (the ⌘K list, the mobile menu, the cookie panel). */
  scrollPanes: ".cmdk-backdrop, .mnav, .mnav-backdrop, #cc-main, [aria-modal='true']",
  /** What the CSS intro moves on first paint, the heroes included:
   *  effects leave everything inside alone (core-guards). */
  intro: ".intro-lines, [data-intro], [data-hero]",
  /** The site's own selectors for a hook (kit.query finds them too). */
  selectors: {
    /* Section titles: every one takes its turn in the deal (split-cycle). */
    "[data-split]": [
      ".section-head h2",
      ".pitch-lead",
      ".cta-final .display",
      ".sus-limits-title",
      ".rep-boundary-title",
      ".clb-pact-head h2",
      ".svc-group-verb",
      ".pp-h2",
      ".pp-pitch-lead",
    ],
    /* Blocks that fade up as they enter. */
    "[data-reveal]": [
      ".section-head .lede",
      ".band-cta",
      ".pitch-intro",
      ".pitch-turn",
      ".pitch-foot",
      ".pitch-cta",
      ".verbs .verb",
      ".value-group",
      ".scale-foot",
      ".product",
      ".products-teaser-foot",
      ".svc-group-head",
      ".svc-cross",
      ".svc-row",
      ".pillars .pillar",
      ".manifesto-sig",
      ".cta-final .sub",
      ".cta-grid",
      ".cta-final-actions",
      ".course",
      ".cmp-faq-item",
      ".sus-saving",
      ".sus-how-row",
      ".sus-limits-list li",
      ".sus-pledge",
      ".sus-cross",
      ".rep-kpi",
      ".rep-plot",
      ".rep-q",
      ".rep-pledge",
      ".rep-formula",
      ".rep-boundary-list li",
      ".soc-pillar",
      ".soc-meter",
      ".soc-facet",
      ".soc-def",
      ".clb-col",
      ".clb-craft",
      ".clb-form-card",
      ".clb-pact-list li",
      ".clb-cross",
      ".clb-form",
      ".pp-feature",
      ".rf-steps-lede",
      ".rf-payout-option",
      ".rf-step",
      ".rf-studio-lede",
      ".rf-studio-points li",
      ".rf-invited",
      ".rf-studio-box",
      ".rf-kit-picker",
      ".rf-kit-stage",
      ".rf-qr-band",
      ".rf-why-item",
      ".rf-faq-item",
      ".rf-cross",
      ".rf-final-sub",
      ".rf-final-actions",
      ".rf-value",
      ".rf-terms-body",
      ".foot-brand",
      ".foot-col",
      ".coverage-head",
      ".coverage-sheet",
      ".works-filter",
      ".case-story-grid",
      ".case-next-link",
    ],
    /* Bars that draw themselves in from the left. */
    "[data-strut]": [
      ".strut-short",
      ".v-strut",
      ".p-strut",
      ".value-strut",
      ".manifesto-sig-bar",
      ".pp-feature-strut",
    ],
    /* Kickers over the section titles: the strut draws, the label fades. */
    "[data-kicker]": [
      ".section-head .sec-num",
      ".pitch .sec-num",
      ".clb-pact-head .sec-num",
      ".rf-steps-head .sec-num",
      ".rf-studio-intro .sec-num",
      ".rf-final .sec-num",
      ".coverage-head .sec-num",
    ],
    /* Photos that open from a clip. */
    "[data-clip]": [".img-slot.is-filled", ".post-cover"],
    /* What follows a referral form's tab in (panel-enter): its title,
       its fields, its button. */
    "[data-panel-field]": [
      ".rf-form-title",
      ".rf-form-intro",
      ".rf-form > .field",
      ".rf-group > legend",
      ".rf-group > .field",
      ".rf-field-pair",
      ".rf-choice",
      ".rf-consent",
      ".rf-submit",
    ],
  } as Record<string, string[]>,
};
