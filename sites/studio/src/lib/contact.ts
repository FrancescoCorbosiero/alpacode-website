/* The contact form (components/ContactForm.astro): the offer a link
   chose (?pacchetto= / ?prodotto=), the checks, the post to
   /api/contact, the answer. */
const form = document.querySelector<HTMLFormElement>("[data-contact]");
if (form) {
  const done = document.querySelector<HTMLElement>("[data-done]");
  const status = form.querySelector<HTMLElement>("[data-status]");
  const submit = form.querySelector<HTMLButtonElement>("[data-submit]");
  const offers = JSON.parse(form.dataset.offers ?? "{}") as Record<string, { name: string; topic: string }>;

  // A link chose the offer: pick its topic and name it.
  const params = new URLSearchParams(location.search);
  const id = params.get("pacchetto") ?? params.get("prodotto");
  const offer = id ? offers[id] : undefined;
  if (offer) {
    const radio = form.querySelector<HTMLInputElement>(`input[name="topic"][value="${offer.topic}"]`);
    if (radio) radio.checked = true;
    (form.elements.namedItem("offer") as HTMLInputElement).value = offer.name;
    const line = form.querySelector<HTMLElement>("[data-offer-line]");
    const name = form.querySelector<HTMLElement>("[data-offer-name]");
    if (line && name) {
      name.textContent = offer.name;
      line.hidden = false;
    }
  }

  const say = (text: string, bad = false) => {
    if (!status) return;
    status.textContent = text;
    status.classList.toggle("is-bad", bad);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const invalid = [...form.querySelectorAll<HTMLInputElement>("input[required], textarea[required]")].find(
      (el) => !el.checkValidity(),
    );
    if (invalid) {
      say(invalid.type === "checkbox" ? "Serve il tuo ok sulla privacy." : "Controlla nome ed email.", true);
      invalid.focus();
      return;
    }
    const data = new FormData(form);
    const topic = String(data.get("topic") ?? "");
    const topicLabel = form.querySelector(`input[name="topic"][value="${topic}"] + span`)?.textContent ?? topic;
    const body = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      company: data.get("company"),
      topic: topicLabel,
      offer: data.get("offer"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
      website: data.get("website"),
      page: location.pathname + location.search,
    };
    if (submit) submit.disabled = true;
    say("Invio in corso…");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? String(res.status));
      form.hidden = true;
      if (done) {
        done.hidden = false;
        done.focus();
      }
      (window as unknown as { umami?: { track: (e: string, d?: object) => void } }).umami?.track("lead", { topic });
    } catch (err) {
      const rate = String(err).includes("rate_limited");
      say(
        rate ? "Troppi invii in poco tempo: riprova tra qualche minuto." : "Non è partito. Riprova, o scrivici a info@alpacode.it.",
        true,
      );
    } finally {
      if (submit) submit.disabled = false;
    }
  });
}

export {};
