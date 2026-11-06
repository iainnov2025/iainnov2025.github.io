import { describe, it, expect } from "vitest";
import { fixFrenchTypography, fixHtmlTypography } from "../../src/lib/french-typo";

const NNBSP = " ";
const NBSP = " ";

describe("fixFrenchTypography", () => {
  it("puts a narrow no-break space before ; ! ?", () => {
    expect(fixFrenchTypography("Vraiment ? Oui ! Ensuite ; fin")).toBe(
      `Vraiment${NNBSP}? Oui${NNBSP}! Ensuite${NNBSP}; fin`,
    );
  });
  it("puts a no-break space before a colon", () => {
    expect(fixFrenchTypography("Contact : nous")).toBe(`Contact${NBSP}: nous`);
  });
  it("fixes guillemets on both sides", () => {
    expect(fixFrenchTypography("« Renvoi »")).toBe(`«${NBSP}Renvoi${NBSP}»`);
  });
  it("adds the space when it is missing", () => {
    expect(fixFrenchTypography("«Renvoi»")).toBe(`«${NBSP}Renvoi${NBSP}»`);
  });
  it("keeps article references together", () => {
    expect(fixFrenchTypography("l'article L. 442-1 et l'art. 2224, R. 123-1")).toBe(
      `l'article L.${NBSP}442-1 et l'art.${NBSP}2224, R.${NBSP}123-1`,
    );
  });
  it("leaves URLs and times alone", () => {
    expect(fixFrenchTypography("https://x.fr à 10:30")).toBe("https://x.fr à 10:30");
  });
});

describe("fixHtmlTypography", () => {
  it("fixes text nodes but not code, attributes or scripts", () => {
    const html = `<p title="a : b">Note : voir <code>a : b</code></p><script>var x = 1 ? 2 : 3;</script>`;
    const out = fixHtmlTypography(html);
    expect(out).toContain(`Note${NBSP}: voir`);
    expect(out).toContain(`title="a : b"`);
    expect(out).toContain("<code>a : b</code>");
    expect(out).toContain("var x = 1 ? 2 : 3;");
  });
  it("fixes punctuation that follows an inline element", () => {
    const out = fixHtmlTypography("<p><strong>confidentialité</strong> ; prend <em>note</em> : fin <b>oui</b> ?</p>");
    expect(out).toContain(`</strong>${NNBSP}; prend`);
    expect(out).toContain(`</em>${NBSP}: fin`);
    expect(out).toContain(`</b>${NNBSP}?`);
  });
});
