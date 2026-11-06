import { it, expect } from "vitest";
import { ogTitle } from "../../src/lib/og";

it("keeps article references together and applies French spacing", () => {
  const t = ogTitle("Rupture : ce que prévoit l'article L. 442-1 II et l'art. 66-5");
  expect(t).toContain("L.\u00A0442-1");
  expect(t).toContain("art.\u00A066-5");
  expect(t).toContain("Rupture\u00A0:");
});
