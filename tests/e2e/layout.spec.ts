import { test, expect } from "@playwright/test";

const pages = ["/"];

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

test("header menu works without JavaScript on mobile", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 360, height: 740 } });
  const page = await ctx.newPage();
  await page.goto("/");
  await page.getByText("Menu").click();
  await expect(page.getByRole("link", { name: "Dossier de démonstration" }).first()).toBeVisible();
  await ctx.close();
});
