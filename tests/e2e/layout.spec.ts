import { test, expect } from "@playwright/test";

const pages = ["/", "/test-composants/"];

test.describe("layout at 360px", () => {
  test.use({ viewport: { width: 360, height: 740 } });

  for (const path of pages) {
    test(`no horizontal scroll on ${path}`, async ({ page }) => {
      await page.goto(path);
      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(width).toBeLessThanOrEqual(360);
    });
  }
});

test("source chip opens the piece and Escape returns focus", async ({ page }) => {
  await page.goto("/test-composants/");
  const chip = page.getByRole("link", { name: /01_CONTRAT_CADRE_DISTRIBUTION_GENBIO_CDS_20180315/ });
  await chip.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Pièce de test");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(chip).toBeFocused();
});

test("header menu works without JavaScript on mobile", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 740 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.getByText("Menu").click();
  await expect(page.getByRole("link", { name: "Dossier de démonstration" }).first()).toBeVisible();
  await ctx.close();
});
