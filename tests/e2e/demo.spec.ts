import { test, expect } from "@playwright/test";

const URL = "/dossier-de-demonstration/";

test("demo case page shows the curated case with honest framing", async ({ page }) => {
  await page.goto(URL);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("GEN-BIO");
  await expect(page.getByText("Aperçu d'analyse générée par LegalVec")).toBeVisible();
  await expect(page.getByText(/vérifiée à la main/)).toBeVisible();
  await expect(page.getByText(/chance de succ[eè]s|probabilit[eé] de gain/i)).toHaveCount(0);
});

test("tabs switch panels and a source chip opens its piece", async ({ page }) => {
  await page.goto(URL);
  await page.getByRole("tab", { name: "Chronologie" }).click();
  const panel = page.getByRole("tabpanel", { name: "Chronologie" });
  await expect(panel).toContainText("15 mars 2018");
  const chip = panel.getByRole("link", { name: /01_CONTRAT_CADRE/ }).first();
  await chip.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Fait à Lyon, le 15 mars 2018");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(chip).toBeFocused();
});

test("without JavaScript every section is visible, stacked", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(URL);
  for (const h of ["Aperçu", "Chronologie", "Délais", "SWOT", "Pièces du dossier"]) {
    await expect(page.getByRole("heading", { name: h, exact: true })).toBeVisible();
  }
  await ctx.close();
});

test("no horizontal scroll at 360px with long piece names", async ({ browser }) => {
  const ctx = await browser.newContext({ viewport: { width: 360, height: 740 } });
  const page = await ctx.newPage();
  await page.goto(URL);
  for (const tab of ["Chronologie", "Délais", "SWOT", "Pièces"]) {
    await page.getByRole("tab", { name: tab }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);
  }
  await ctx.close();
});
