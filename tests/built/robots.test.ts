import { it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { site } from "../../src/config/site";

it("robots.txt follows the launch flag", () => {
  const robots = readFileSync("dist/robots.txt", "utf8");
  if (site.launch) {
    expect(robots).toMatch(/Allow: \//);
    expect(robots).toContain(`Sitemap: ${site.siteUrl}/sitemap-index.xml`);
  } else {
    expect(robots).toMatch(/Disallow: \//);
    expect(robots).not.toMatch(/Sitemap:/);
  }
});

it("generates a sitemap that excludes internal pages", () => {
  expect(existsSync("dist/sitemap-index.xml")).toBe(true);
  const sm = readFileSync("dist/sitemap-0.xml", "utf8");
  expect(sm).toContain(`${site.siteUrl}/dossier-de-demonstration/`);
  expect(sm).not.toContain("brand-preview");
});
