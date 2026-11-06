/**
 * Product dashboard behaviour.
 * - Tabs: always (plain UI, no motion involved).
 * - Supervised action: Valider / Refuser, always.
 * - Motion (only under <html data-motion="ok">): one-shot analysis sequence when in view,
 *   scroll-linked 3D tilt that flattens as the visitor scrolls, and a small pointer parallax.
 */
export function initDashboard(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-dashboard]").forEach(setup);
}

function setup(stage: HTMLElement): void {
  const tabs = [...stage.querySelectorAll<HTMLButtonElement>("[data-dash-tab]")];
  const panels = [...stage.querySelectorAll<HTMLElement>("[data-dash-panel]")];
  tabs.forEach((t) =>
    t.addEventListener("click", () => {
      const id = t.dataset.dashTab;
      tabs.forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.dashTab === id)));
      panels.forEach((p) => (p.hidden = p.dataset.dashPanel !== id));
    }),
  );

  const result = stage.querySelector<HTMLElement>("[data-dash-action-result]");
  const decide = (text: string) => {
    if (!result) return;
    result.textContent = text;
    result.hidden = false;
    stage.querySelector(".a-btns")?.setAttribute("hidden", "");
  };
  stage.querySelector("[data-dash-approve]")?.addEventListener("click", () => decide("Validée par vous. La tâche est ajoutée au dossier."));
  stage.querySelector("[data-dash-reject]")?.addEventListener("click", () => decide("Refusée. Rien n'a été modifié."));

  if (document.documentElement.dataset.motion !== "ok") {
    stage.dataset.played = "true";
    return;
  }

  // One-shot run: statuses read "En cours" while the bars fill, then "Vérifiée".
  const states = [...stage.querySelectorAll<HTMLElement>("[data-dash-run-state]")];
  const status = stage.querySelector<HTMLElement>("[data-dash-status-text]");
  const io = new IntersectionObserver(
    (entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      states.forEach((s) => (s.textContent = "En cours"));
      if (status) status.textContent = "Analyse en cours";
      requestAnimationFrame(() => (stage.dataset.played = "true"));
      states.forEach((s, i) => setTimeout(() => (s.textContent = "Vérifiée"), 900 + i * 260));
      setTimeout(() => status && (status.textContent = "Analyse vérifiée"), 900 + states.length * 260);
    },
    { threshold: 0.2 },
  );
  io.observe(stage);

  // 3D: tilted at first, flat once the dashboard reaches the upper part of the viewport.
  const wide = matchMedia("(min-width: 1000px)");
  let frame = 0;
  const update = () => {
    frame = 0;
    if (!wide.matches) return stage.style.setProperty("--tilt", "0");
    const r = stage.getBoundingClientRect();
    const vh = innerHeight;
    const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
    stage.style.setProperty("--tilt", (1 - p).toFixed(3));
  };
  const queue = () => (frame ||= requestAnimationFrame(update));
  addEventListener("scroll", queue, { passive: true });
  addEventListener("resize", queue);
  update();

  stage.addEventListener("pointermove", (e) => {
    if (!wide.matches || e.pointerType !== "mouse") return;
    const r = stage.getBoundingClientRect();
    stage.style.setProperty("--mx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    stage.style.setProperty("--my", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  });
  stage.addEventListener("pointerleave", () => {
    stage.style.setProperty("--mx", "0");
    stage.style.setProperty("--my", "0");
  });
}
