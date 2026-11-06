import type { SiteConfig } from "../config/site";

/** Booking tool if configured, else a mailto with an optional subject, else null (nothing configured yet). */
export function contactHref(c: SiteConfig, subject?: string): string | null {
  if (c.bookingUrl) return c.bookingUrl;
  if (c.contactEmail.trim()) {
    return `mailto:${c.contactEmail.trim()}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
  }
  return null;
}
