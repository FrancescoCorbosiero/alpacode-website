import { business } from "../data/business";
import type { Lang } from "../i18n/types";

const locale = (lang: Lang) => (lang === "it" ? "it-IT" : "en-US");

/** The studio as an Organization. Referenced by @id from other schemas. */
export function organizationSchema(siteUrl: string) {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}#org`,
    name: business.name,
    alternateName: "Alpacode",
    url: siteUrl,
    email: business.email,
    vatID: `IT${business.vat}`,
    foundingDate: business.founded,
    logo: `${siteUrl}logo.png`,
    image: `${siteUrl}logo.png`,
    areaServed: ["Monza", "Milano", "Italia"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Monza",
      addressRegion: "MB",
      addressCountry: "IT",
    },
    sameAs: [business.social.linkedin, business.social.github],
  };
}

export function websiteSchema(siteUrl: string, lang: Lang) {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: "Alpacode · Soluzioni Digitali",
    inLanguage: locale(lang),
    publisher: { "@id": `${siteUrl}#org` },
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  datePublished?: string;
  url: string;
  lang: Lang;
  siteUrl: string;
}) {
  return {
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    inLanguage: locale(opts.lang),
    url: opts.url,
    mainEntityOfPage: opts.url,
    image: `${opts.siteUrl}logo.png`,
    author: { "@id": `${opts.siteUrl}#org` },
    publisher: { "@id": `${opts.siteUrl}#org` },
    ...(opts.datePublished ? { datePublished: opts.datePublished } : {}),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  };
}

/** Parse the design's display date ("05 — 2026") into an ISO date. */
export function isoFromDisplayDate(display: string): string | undefined {
  const m = display.match(/(\d{2}).*?(\d{4})/);
  return m ? `${m[2]}-${m[1]}-01` : undefined;
}
