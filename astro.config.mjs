// @ts-check
import { defineConfig } from "astro/config";
import { site } from "./src/config/site.ts";
import { assertPublishable } from "./src/lib/site-config.ts";
import frenchTypography from "./src/integrations/french-typo.ts";
import sitemap from "@astrojs/sitemap";

// A launch with empty legal-notice fields must fail the build.
assertPublishable(site);

export default defineConfig({
  site: site.siteUrl,
  trailingSlash: "always",
  build: { format: "directory" },
  integrations: [sitemap({ filter: (page) => !page.includes("/brand-preview/") }), frenchTypography()],
});
