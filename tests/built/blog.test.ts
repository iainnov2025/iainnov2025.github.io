import { describe, it, expect } from "vitest";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { parse } from "node-html-parser";
import { DISCLAIMER } from "../../src/lib/blog";

const blogDir = "dist/blog";
const posts = existsSync(blogDir) ? readdirSync(blogDir).filter((d) => existsSync(join(blogDir, d, "index.html"))) : [];

describe("blog", () => {
  it("publishes three posts", () => expect(posts.length).toBe(3));

  describe.each(posts)("post %s", (slug) => {
    const html = readFileSync(join(blogDir, slug, "index.html"), "utf8");
    const root = parse(html);
    it("has Article JSON-LD with datePublished", () => {
      const lds = root.querySelectorAll('script[type="application/ld+json"]').map((s) => JSON.parse(s.textContent));
      const article = lds.find((o) => o["@type"] === "Article");
      expect(article?.datePublished).toMatch(/^\d{4}-\d{2}-\d{2}/);
    });
    it("has an og:image that exists in dist", () => {
      const url = root.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "";
      expect(url).toMatch(/\/og\/.+\.png$/);
      expect(existsSync(join("dist", new URL(url).pathname))).toBe(true);
    });
    it("ends with the informational disclaimer", () => {
      expect(root.textContent.replace(/\s+/g, " ")).toContain(DISCLAIMER.replace(/\s+/g, " ").slice(0, 40));
    });
  });

  it("lists three items in the RSS feed", () => {
    const rss = readFileSync("dist/rss.xml", "utf8");
    expect(rss.match(/<item>/g)?.length).toBe(3);
  });
});
