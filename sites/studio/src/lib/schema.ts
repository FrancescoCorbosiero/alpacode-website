/* Structured data for the studio's pages (schema.org, JSON-LD). */
import { business } from "@shared/data/business";
import { COMPARTMENTS } from "@shared/data/compartments";
import type { Qa } from "../data/products";

const studio = COMPARTMENTS.studio;
const house = COMPARTMENTS.house;

/** Who the studio is: a service of the house's company. */
export const organization = (): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${studio.origin}/#studio`,
  name: studio.name,
  url: `${studio.origin}/`,
  description: studio.line.it,
  email: business.email,
  areaServed: "IT",
  address: { "@type": "PostalAddress", addressLocality: "Monza", addressRegion: "MB", addressCountry: "IT" },
  parentOrganization: {
    "@type": "Organization",
    "@id": `${house.origin}/#organization`,
    name: business.name,
    url: `${house.origin}/`,
    vatID: `IT${business.vat}`,
    sameAs: [business.social.linkedin],
  },
});

export const breadcrumbs = (crumbs: { name: string; path: string }[]): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: new URL(c.path, `${studio.origin}/`).href,
  })),
});

export const faqPage = (items: Qa[]): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((it) => ({ "@type": "Question", name: it.q, acceptedAnswer: { "@type": "Answer", text: it.a } })),
});

/** A product sold from the site; offers only with a price. */
export const product = (p: { name: string; description: string; path: string; prices: number[] }): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  url: new URL(p.path, `${studio.origin}/`).href,
  brand: { "@type": "Brand", name: "Alpacode" },
  ...(p.prices.length
    ? {
        offers: p.prices.map((price) => ({
          "@type": "Offer",
          price: price.toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
          url: new URL(p.path, `${studio.origin}/`).href,
        })),
      }
    : {}),
});
