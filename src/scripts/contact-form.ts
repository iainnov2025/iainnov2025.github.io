import { validateContact, SUBJECTS, type ContactInput, type Subject } from "../lib/contact-form";

/**
 * Contact form: inline validation, then either posts to the configured endpoint (data-mode="send")
 * or, while no endpoint exists (data-mode="disabled"), sends nothing and says so.
 */
export function initContactForm(root: ParentNode = document): void {
  const form = root.querySelector<HTMLFormElement>("[data-contact-form]");
  if (!form) return;
  const submit = form.querySelector<HTMLButtonElement>("[data-contact-submit]");
  const status = form.querySelector<HTMLElement>("[data-contact-status]");
  if (submit) submit.disabled = false;

  const objet = new URLSearchParams(location.search).get("objet");
  const select = form.elements.namedItem("objet") as HTMLSelectElement | null;
  if (select && objet && objet in SUBJECTS) select.value = objet;

  const read = (): ContactInput => {
    const v = (n: string) => ((form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "");
    return {
      nom: v("nom"), cabinet: v("cabinet"), email: v("email"), telephone: v("telephone"), taille: v("taille"),
      objet: v("objet") as Subject, message: v("message"),
      consentement: (form.elements.namedItem("consentement") as HTMLInputElement | null)?.checked ?? false,
    };
  };

  form.addEventListener("submit", (ev) => {
    const errors = validateContact(read());
    form.querySelectorAll<HTMLElement>("[data-err]").forEach((p) => {
      const key = p.dataset.err as keyof ContactInput;
      p.textContent = errors[key] ?? "";
      form.querySelector(`#${key}`)?.setAttribute("aria-invalid", String(Boolean(errors[key])));
    });
    const first = Object.keys(errors)[0];
    if (first) {
      ev.preventDefault();
      (form.querySelector(`#${first}`) as HTMLElement | null)?.focus();
      return;
    }
    if (form.dataset.mode === "send") return; // native POST to the configured https endpoint
    ev.preventDefault();
    if (status) {
      status.hidden = false;
      status.replaceChildren();
      const p = document.createElement("p");
      p.textContent = "Votre message est prêt, mais l'envoi en ligne n'est pas encore activé : rien n'a été transmis ni enregistré. Conservez votre texte, nous ouvrons l'envoi très prochainement.";
      status.append(p);
    }
  });
}
