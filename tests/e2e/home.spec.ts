import { test, expect } from "@playwright/test";

test("dashboard is complete without JavaScript", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto("/");
  await expect(p.getByRole("heading", { level: 1 })).toHaveText(/Vos dossiers de contentieux, analysés avec les pièces à l'appui\./);
  const dash = p.locator("[data-dashboard]");
  await expect(dash.locator("[data-dash-panel='overview']")).toBeVisible();
  await expect(dash.getByText("Assistant du dossier")).toBeVisible();
  await expect(dash.locator("[data-dash-run-state]").first()).toHaveText("Vérifiée");
  await expect(p.getByText(/vérification automatique et l'assistant sont en cours de développement/)).toBeVisible();
  await ctx.close();
});

test("no running animations and a flat dashboard under reduced motion", async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  await p.goto("/");
  await p.waitForTimeout(800);
  expect(await p.evaluate(() => document.getAnimations().length)).toBe(0);
  expect(await p.locator("[data-dash-app]").evaluate((e) => getComputedStyle(e).transform)).toMatch(/^(none|matrix\(1, 0, 0, 1, 0, 0\))$/);
  expect(await p.locator("[data-pile]").getAttribute("data-state")).toBeNull();
  await ctx.close();
});

test("dashboard tabs switch panels", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const dash = page.locator("[data-dashboard]");
  await dash.locator(".side-nav [data-dash-tab='deadlines']").click();
  await expect(dash.locator("[data-dash-panel='deadlines']")).toBeVisible();
  await expect(dash.locator("[data-dash-panel='overview']")).toBeHidden();
  await expect(dash.locator("[data-dash-panel='deadlines']")).toContainText("Délai de réponse à la mise en demeure");
});

test("the assistant's action waits for validation", async ({ page }) => {
  await page.goto("/");
  const dash = page.locator("[data-dashboard]");
  await dash.locator("[data-dash-approve]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(3500); // the exchange plays once before the buttons settle
  await dash.locator("[data-dash-approve]").click();
  await expect(dash.locator("[data-dash-action-result]")).toHaveText(/Validée par vous/);
});

test("3D tilt flattens as the visitor scrolls", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const tilt = () => page.locator("[data-dashboard]").evaluate((e) => Number(getComputedStyle(e).getPropertyValue("--tilt") || 0));
  await expect.poll(tilt).toBeGreaterThan(0);
  const start = await tilt();
  await page.mouse.wheel(0, 900);
  await expect.poll(tilt).toBeLessThan(start);
});

test("pile scene follows the steps", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator("[data-pile]")).toHaveAttribute("data-state", "0");
  await page.locator("[data-pile-step='3']").evaluate((e) => e.scrollIntoView({ block: "center" }));
  await expect(page.locator("[data-pile]")).toHaveAttribute("data-state", "3");
});

test("primary CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "Explorer le dossier de démonstration" }).first()).toHaveAttribute("href", "/dossier-de-demonstration/");
  await expect(page.locator(".hero").getByRole("link", { name: "Nous contacter" })).toHaveAttribute("href", "/contact/");
});

test("a dashboard source chip opens its piece", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.locator("[data-dash-panel='overview'] a[data-piece-id='07_MISE_EN_DEMEURE_GENBIO_20230612']").first().click();
  await expect(page.getByRole("dialog")).toContainText("MISE EN DEMEURE");
});

test("home FAQ opens without JavaScript", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto("/");
  await p.getByText("LegalVec remplace-t-il le travail de l'avocat").click();
  await expect(p.getByText(/La stratégie, la qualification juridique et la décision restent les vôtres/)).toBeVisible();
  await ctx.close();
});
