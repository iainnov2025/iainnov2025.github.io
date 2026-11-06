import type { APIRoute } from "astro";
import { site } from "../config/site";

/** Disallow everything until the founder flips `launch` in src/config/site.ts. */
export const GET: APIRoute = () => {
  const body = site.launch
    ? `User-agent: *\nAllow: /\nDisallow: /brand-preview/\n\nSitemap: ${site.siteUrl}/sitemap-index.xml\n`
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
