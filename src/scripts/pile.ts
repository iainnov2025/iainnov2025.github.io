/**
 * Drives the PileToCase scene: the step nearest the middle of the viewport sets data-state.
 * Without motion the scene stays in its final state (no data-state = verified case).
 */
export function initPile(root: ParentNode = document): void {
  root.querySelectorAll<HTMLElement>("[data-pile]").forEach((pile) => {
    const steps = [...pile.querySelectorAll<HTMLElement>("[data-pile-step]")];
    const activate = (i: number) => {
      steps.forEach((s, k) => (s.dataset.active = String(k === i)));
      if (document.documentElement.dataset.motion === "ok") pile.dataset.state = String(i);
    };
    if (document.documentElement.dataset.motion !== "ok") {
      activate(steps.length - 1);
      return;
    }
    activate(0);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) activate(Number((e.target as HTMLElement).dataset.pileStep));
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    steps.forEach((s) => io.observe(s));
  });
}
