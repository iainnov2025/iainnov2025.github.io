import type { SiteConfig } from "../config/site";

/** Absolute canonical URL for a site path ("/produit/" → "https://…/produit/"). */
export function canonical(c: SiteConfig, path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  const withSlash = p.endsWith("/") || p.includes(".") ? p : `${p}/`;
  return `${c.siteUrl}${withSlash}`;
}

export function organizationJsonLd(c: SiteConfig): object {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LegalVec",
    url: `${c.siteUrl}/`,
    logo: `${c.siteUrl}/apple-touch-icon.png`,
  };
}
