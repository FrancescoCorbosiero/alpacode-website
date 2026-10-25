import { business } from "@shared/data/business";

/** A form's failure line. "{email}" in the copy becomes a mailto link, so a
 *  visitor whose message didn't go through can still reach us from right
 *  there. Rendered client-side only, so Cloudflare never rewrites it. */
export default function FormError({ text }: { text: string }) {
  const [before, after] = text.split("{email}");
  return (
    <span className="contact-error">
      {before}
      {after !== undefined && <a href={`mailto:${business.email}`}>{business.email}</a>}
      {after}
    </span>
  );
}
