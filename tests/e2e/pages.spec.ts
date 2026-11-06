import { test, expect } from "@playwright/test";

test("security page labels every planned statement", async ({ page }) => {
  await page.goto("/securite/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const labels = page.getByText("En cours de mise en place", { exact: true });
  expect(await labels.count()).toBeGreaterThanOrEqual(11);
  await expect(page.getByText(/aucune donnée client réelle/i).first()).toBeVisible();
});

test("feedback page asks for advice, not a purchase, and offers a contact path", async ({ page }) => {
  await page.goto("/donnez-votre-avis/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("avec des avocats");
  await expect(page.getByText(/dossier fictif ou entièrement anonymisé/i).first()).toBeVisible();
  await expect(page.locator("[data-contact]").first()).toBeVisible(); // link when configured, notice otherwise
});

test("booking page falls back to a contact link while no booking tool exists", async ({ page }) => {
  await page.goto("/rendez-vous/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-contact]").first()).toBeVisible(); // link when configured, notice otherwise
});

test("product page describes the dashboard and labels unshipped checks", async ({ page }) => {
  await page.goto("/produit/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByText("Pièces hors sujet")).toBeVisible();
  await expect(page.getByText("Bientôt").first()).toBeVisible();
  await expect(page.getByText(/Légifrance/).first()).toBeVisible();
});

test("home shows hosting commitments with their status", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("En cours de mise en place").first()).toBeVisible();
});
