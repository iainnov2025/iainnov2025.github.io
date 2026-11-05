import type { SiteConfig } from "../config/site";

const REQUIRED_FOR_LAUNCH = ["publisherName", "publisherAddress", "contactEmail"] as const;

/** Throws when the site is marked for launch while legal-notice fields are still empty. */
export function assertPublishable(c: SiteConfig): void {
  if (!c.launch) return;
  const missing = REQUIRED_FOR_LAUNCH.filter((k) => !c[k].trim());
  if (missing.length > 0) {
    throw new Error(`Launch refused: fill ${missing.join(", ")} in src/config/site.ts first.`);
  }
}

export function robotsMeta(c: SiteConfig): "index, follow" | "noindex, nofollow" {
  return c.launch ? "index, follow" : "noindex, nofollow";
}
