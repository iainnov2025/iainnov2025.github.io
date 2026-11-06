// Lighthouse CI: ≥ 0.95 on performance, accessibility, best practices (and SEO once launched).
const { readFileSync } = require("node:fs");
const launched = /launch:\s*true/.test(readFileSync("src/config/site.ts", "utf8"));
const min = (minScore) => ["error", { minScore }];

module.exports = {
  ci: {
    collect: {
      staticDistDir: "./dist",
      url: ["/", "/produit/", "/dossier-de-demonstration/", "/securite/", "/blog/"].map((p) => `http://localhost${p}`),
      numberOfRuns: 1,
      settings: { preset: "desktop" },
    },
    assert: {
      assertions: {
        "categories:performance": min(0.95),
        "categories:accessibility": min(0.95),
        "categories:best-practices": min(0.95),
        // noindex is intentional before launch, so SEO is enforced only after it.
        "categories:seo": launched ? min(0.95) : "off",
        "is-crawlable": launched ? "error" : "off",
      },
    },
    upload: { target: "filesystem", outputDir: ".lighthouseci" },
  },
};
