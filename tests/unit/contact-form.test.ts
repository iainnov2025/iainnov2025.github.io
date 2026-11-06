import { describe, it, expect } from "vitest";
import { validateContact, contactSubmitMode, type ContactInput } from "../../src/lib/contact-form";

const ok: ContactInput = {
  nom: "Claire Martin",
  cabinet: "Cabinet Martin",
  email: "c.martin@cabinet-martin.fr",
  telephone: "",
  taille: "2-5",
  objet: "demonstration",
  message: "Je souhaite voir une démonstration sur un dossier de rupture brutale.",
  consentement: true,
};

describe("validateContact", () => {
  it("accepts a complete message", () => expect(validateContact(ok)).toEqual({}));
  it("requires name, firm, email, message and consent", () => {
    const e = validateContact({ ...ok, nom: " ", cabinet: "", email: "", message: "", consentement: false });
    expect(Object.keys(e).sort()).toEqual(["cabinet", "consentement", "email", "message", "nom"]);
  });
  it("rejects a malformed email", () => expect(validateContact({ ...ok, email: "claire@" })).toHaveProperty("email"));
  it("rejects a too-short message", () => expect(validateContact({ ...ok, message: "Bonjour" })).toHaveProperty("message"));
  it("rejects an unknown subject", () => expect(validateContact({ ...ok, objet: "autre-chose" as never })).toHaveProperty("objet"));
  it("accepts an optional French phone number and rejects letters", () => {
    expect(validateContact({ ...ok, telephone: "06 12 34 56 78" })).toEqual({});
    expect(validateContact({ ...ok, telephone: "appelez-moi" })).toHaveProperty("telephone");
  });
});

describe("contactSubmitMode", () => {
  it("never sends while no endpoint is configured", () => expect(contactSubmitMode(null)).toBe("disabled"));
  it("sends only to an https endpoint", () => {
    expect(contactSubmitMode("https://forms.example.fr/legalvec")).toBe("send");
    expect(contactSubmitMode("http://forms.example.fr")).toBe("disabled");
  });
});
