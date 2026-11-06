import { test, expect } from "@playwright/test";
import { site } from "../../src/config/site";

test("legal notice names the individual publisher and the host", async ({ page }) => {
  await page.goto("/mentions-legales/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Mentions légales");
  await expect(page.getByText(/personne physique/i).first()).toBeVisible();
  await expect(page.getByText("GitHub, Inc.").first()).toBeVisible();
  if (site.publisherName) await expect(page.getByText(site.publisherName).first()).toBeVisible();
  else await expect(page.getByText(/à compléter/i).first()).toBeVisible();
});

test("privacy page states no cookies or trackers while no analytics is configured", async ({ page }) => {
  test.skip(site.analyticsScriptUrl !== null, "analytics configured");
  await page.goto("/confidentialite/");
  await expect(page.getByText(/aucun cookie/i).first()).toBeVisible();
  await expect(page.getByText(/aucun traceur/i).first()).toBeVisible();
  await page.goto("/cookies/");
  await expect(page.getByText(/aucun cookie/i).first()).toBeVisible();
});

test("terms say demo data is fictitious and no legal advice is given", async ({ page }) => {
  await page.goto("/cgu/");
  await expect(page.getByText(/fictif/i).first()).toBeVisible();
  await expect(page.getByText(/ne constitue(nt)? pas une consultation juridique/i).first()).toBeVisible();
});
