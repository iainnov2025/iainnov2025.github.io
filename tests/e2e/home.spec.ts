import { test, expect } from "@playwright/test";

test("final state visible without JavaScript", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto("/");
  await expect(p.getByRole("heading", { level: 1 })).toHaveText(/Vos dossiers de contentieux, analysés avec les pièces à l'appui\./);
  for (const step of ["pieces", "timeline", "swot", "source"]) {
    await expect(p.locator(`[data-hero-step='${step}']`)).toBeVisible();
  }
  await ctx.close();
});

test("no running animations under reduced motion", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce" });
  const p = await ctx.newPage();
  await p.goto("/");
  await p.waitForTimeout(600);
  expect(await p.evaluate(() => document.getAnimations().length)).toBe(0);
  await expect(p.locator("[data-hero-step='source']")).toBeVisible();
  await ctx.close();
});

test("hero reveals its steps when motion is allowed", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-hero]")).toHaveAttribute("data-revealed", "true");
  await expect(page.locator("[data-hero-step='source']")).toBeVisible();
});

test("relevance-flag step hidden until the feature ships", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-hero-step='flag']")).toHaveCount(0);
});

test("primary CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Explorer le dossier de démonstration" }).first()).toHaveAttribute("href", "/dossier-de-demonstration/");
  await expect(page.getByRole("link", { name: "Donner votre avis (30 min)" }).first()).toHaveAttribute("href", "/donnez-votre-avis/");
});

test("the source proof opens its piece", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-hero-step='source']").getByRole("link", { name: /01_CONTRAT_CADRE/ }).click();
  await expect(page.getByRole("dialog")).toContainText("Fait à Lyon, le 15 mars 2018");
});
