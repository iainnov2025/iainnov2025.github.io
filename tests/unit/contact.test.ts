import { it, expect } from "vitest";
import { contactHref } from "../../src/lib/contact";
import { site } from "../../src/config/site";

it("prefers the booking tool, then email, else null", () => {
  expect(contactHref({ ...site, bookingUrl: "https://rdv.legalvec.com/demo", contactEmail: "a@b.c" })).toBe("https://rdv.legalvec.com/demo");
  expect(contactHref({ ...site, bookingUrl: null, contactEmail: "contact@legalvec.com" }, "Avis")).toBe("mailto:contact@legalvec.com?subject=Avis");
  expect(contactHref({ ...site, bookingUrl: null, contactEmail: "" })).toBeNull();
});
