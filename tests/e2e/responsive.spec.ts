import { test, expect } from "@playwright/test";

const pages = [
  "/", "/produit/", "/dossier-de-demonstration/", "/securite/", "/donnez-votre-avis/", "/rendez-vous/",
  "/a-propos/", "/blog/", "/blog/rupture-brutale-article-l442-1-ii/", "/blog/prescription-commerciale-article-l110-4/",
  "/blog/ia-generative-secret-professionnel-questions/", "/mentions-legales/", "/cgu/", "/confidentialite/", "/cookies/",
];

test.use({ viewport: { width: 360, height: 740 } });

for (const path of pages) {
  test(`no horizontal scroll at 360px on ${path}`, async ({ page }) => {
    await page.goto(path);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  });
}
