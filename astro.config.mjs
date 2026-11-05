// @ts-check
import { defineConfig } from "astro/config";
import { site } from "./src/config/site.ts";
import { assertPublishable } from "./src/lib/site-config.ts";

// A launch with empty legal-notice fields must fail the build.
assertPublishable(site);

export default defineConfig({
  site: site.siteUrl,
  trailingSlash: "always",
  build: { format: "directory" },
});
