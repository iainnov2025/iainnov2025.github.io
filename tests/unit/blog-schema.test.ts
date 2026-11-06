import { describe, it, expect } from "vitest";
import { blogSchema } from "../../src/lib/blog";

const good = {
  title: "Un titre suffisamment long",
  description: "Une description de l'article pour les moteurs de recherche.",
  date: new Date("2026-11-06"),
  author: "LegalVec",
  tags: ["prescription"],
  sources: [{ label: "Code de commerce, art. L. 110-4", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000027725867" }],
  draft: false,
};

describe("blog schema", () => {
  it("accepts a sourced post", () => expect(blogSchema.safeParse(good).success).toBe(true));
  it("requires at least one source", () => expect(blogSchema.safeParse({ ...good, sources: [] }).success).toBe(false));
  it("only accepts official source hosts", () => {
    const bad = { ...good, sources: [{ label: "Blog", url: "https://example.com/article" }] };
    expect(blogSchema.safeParse(bad).success).toBe(false);
  });
  it("accepts EUR-Lex and the Cour de cassation", () => {
    for (const url of ["https://eur-lex.europa.eu/eli/reg/2016/679/oj", "https://www.courdecassation.fr/decision/x"]) {
      expect(blogSchema.safeParse({ ...good, sources: [{ label: "x", url }] }).success, url).toBe(true);
    }
  });
});
