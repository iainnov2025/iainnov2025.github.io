import { describe, it, expect } from "vitest";
import { blogSchema, readingMinutes, relatedPosts, PILLARS } from "../../src/lib/blog";

const good = {
  title: "Un titre suffisamment long",
  description: "Une description de l'article pour les moteurs de recherche.",
  date: new Date("2026-11-06"),
  author: "LegalVec",
  tags: ["prescription"],
  pillar: "contentieux-commercial",
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

describe("topic clusters", () => {
  it("requires a known pillar", () => {
    expect(blogSchema.safeParse({ ...good, pillar: "divers" }).success).toBe(false);
    const { pillar: _p, ...noPillar } = good;
    expect(blogSchema.safeParse(noPillar).success).toBe(false);
  });
  it("names every pillar in French", () => {
    for (const label of Object.values(PILLARS)) expect(label.length).toBeGreaterThan(5);
  });
  it("estimates reading time at 220 words per minute, at least one minute", () => {
    expect(readingMinutes("mot ".repeat(440))).toBe(2);
    expect(readingMinutes("court")).toBe(1);
  });
  it("relates posts of the same pillar first, never the post itself", () => {
    const posts = [
      { id: "a", pillar: "procedure", date: 3 },
      { id: "b", pillar: "procedure", date: 2 },
      { id: "c", pillar: "methode", date: 5 },
      { id: "d", pillar: "procedure", date: 1 },
    ];
    expect(relatedPosts(posts[0], posts, 2).map((p) => p.id)).toEqual(["b", "d"]);
    expect(relatedPosts(posts[2], posts, 2).map((p) => p.id)).toEqual(["a", "b"]);
  });
});
