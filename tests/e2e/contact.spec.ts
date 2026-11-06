import { test, expect } from "@playwright/test";

test("contact form validates and sends nothing while no endpoint is configured", async ({ page }) => {
  const sent: string[] = [];
  page.on("request", (r) => { if (r.method() !== "GET") sent.push(r.url()); });
  await page.goto("/contact/");
  await page.getByRole("button", { name: "Envoyer" }).click();
  await expect(page.locator("#nom-err")).toHaveText("Indiquez votre nom.");
  await expect(page.locator("#nom")).toBeFocused();

  await page.getByLabel("Nom et prénom").fill("Claire Martin");
  await page.getByLabel("Cabinet", { exact: true }).fill("Cabinet Martin");
  await page.getByLabel("Adresse électronique professionnelle").fill("c.martin@cabinet-martin.fr");
  await page.getByLabel("Message").fill("Je souhaite voir une démonstration sur un dossier de rupture brutale.");
  await page.getByLabel(/J'accepte que LegalVec/).check();
  await page.getByRole("button", { name: "Envoyer" }).click();

  await expect(page.locator("[data-contact-status]")).toContainText("rien n'a été transmis ni enregistré");
  expect(page.url()).not.toContain("Claire");
  expect(sent).toEqual([]);
});

test("subject is preselected from the link", async ({ page }) => {
  await page.goto("/contact/?objet=avis");
  await expect(page.getByLabel("Objet")).toHaveValue("avis");
});

test("submit stays disabled without JavaScript", async ({ browser }) => {
  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const p = await ctx.newPage();
  await p.goto("/contact/");
  await expect(p.getByRole("button", { name: "Envoyer" })).toBeDisabled();
  await ctx.close();
});

test("FAQ page lists every question with FAQPage JSON-LD", async ({ page }) => {
  await page.goto("/faq/");
  expect(await page.locator("details").count()).toBeGreaterThanOrEqual(10);
  const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(ld.some((t) => t.includes('"FAQPage"'))).toBe(true);
});
