import type { Lang } from "../../i18n/types";
import { persistLang } from "../../lib/lang-store";

interface Props {
  lang: Lang;
  itHref: string;
  enHref: string;
  label: string;
}

export default function LangToggle({ lang, itHref, enHref, label }: Props) {
  return (
    <div className="lang-toggle" role="group" aria-label={label}>
      <a
        href={itHref}
        className={lang === "it" ? "is-on" : ""}
        aria-current={lang === "it" ? "true" : undefined}
        onClick={() => persistLang("it")}
      >
        IT
      </a>
      <a
        href={enHref}
        className={lang === "en" ? "is-on" : ""}
        aria-current={lang === "en" ? "true" : undefined}
        onClick={() => persistLang("en")}
      >
        EN
      </a>
    </div>
  );
}
