export interface SiteConfig {
  /** Public URL of the site (no trailing slash). */
  siteUrl: string;
  /** false until the founder approves the launch → every page is noindex. */
  launch: boolean;
  /** Individual founder publishing the site (no company yet). Required before launch. */
  publisherName: string;
  /** Postal address required by the legal notice. Required before launch. */
  publisherAddress: string;
  /** Contact address. Required before launch. */
  contactEmail: string;
  /** Self-hosted booking page (Cal.com) once it exists; null → mailto fallback. */
  bookingUrl: string | null;
  /** v2 app demo case once it exists; null → static preview page. */
  demoAppUrl: string | null;
  /** Self-hosted analytics script (Plausible CE / Umami); null → no script at all. */
  analyticsScriptUrl: string | null;
  features: {
    /** Show relevance flags (pièces hors sujet) only once the v2 app ships them. */
    relevanceFlags: boolean;
  };
}

export const site: SiteConfig = {
  siteUrl: "https://iainnov2025.github.io",
  launch: false,
  publisherName: "",
  publisherAddress: "",
  contactEmail: "",
  bookingUrl: null,
  demoAppUrl: null,
  analyticsScriptUrl: null,
  features: { relevanceFlags: false },
};
