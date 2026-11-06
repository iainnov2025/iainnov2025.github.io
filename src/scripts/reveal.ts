/**
 * Scroll-triggered reveal. Content is fully visible by default (no JS, reduced motion).
 * Base.astro sets <html data-motion="ok"> in <head> only when motion is allowed; CSS hides
 * [data-reveal] content under that marker until this script sets data-revealed="true".
 */
export function initReveal(root: ParentNode = document): void {
  const els = [...root.querySelectorAll<HTMLElement>("[data-reveal]")];
  if (els.length === 0) return;
  if (document.documentElement.dataset.motion !== "ok") {
    els.forEach((el) => (el.dataset.revealed = "true"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.revealed = "true";
        io.unobserve(entry.target);
      }
    },
    { threshold: 0, rootMargin: "0px 0px -8% 0px" },
  );
  els.forEach((el) => io.observe(el));
}
