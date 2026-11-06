import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { parse } from "node-html-parser";
import { site } from "../../src/config/site";
import { robotsMeta } from "../../src/lib/site-config";
import { findBanned } from "./banned";
import { frenchTypoViolations } from "./french-typo";

function walk(dir: string, ext: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p, ext) : p.endsWith(ext) ? [p] : [];
  });
}

const htmlFiles = walk("dist", ".html");
const cssFiles = walk("dist", ".css");

/** Visible text: strip scripts, styles, inline SVG, code/mono spans (filenames) and <pre> (verbatim piece quotes). */
function visibleText(html: string): string {
  const root = parse(html);
  root.querySelectorAll("script, style, svg, code, pre, .mono").forEach((n) => n.remove());
  return root.querySelector("body")?.textContent ?? "";
}

describe("built site", () => {
  it("has pages to check", () => expect(htmlFiles.length).toBeGreaterThan(0));

  describe.each(htmlFiles)("%s", (file) => {
    const html = readFileSync(file, "utf8");
    const root = parse(html);
    const text = visibleText(html);

    it("is in French", () => expect(root.querySelector("html")?.getAttribute("lang")).toBe("fr"));
    it("has a real title", () => expect(root.querySelector("title")?.text.trim().length ?? 0).toBeGreaterThan(10));
    it("has a description", () => expect(root.querySelector('meta[name="description"]')).not.toBeNull());
    it("has a canonical URL on the site", () =>
      expect(root.querySelector('link[rel="canonical"]')?.getAttribute("href")).toMatch(/^https:\/\/iainnov2025\.github\.io\//));
    it("has the right robots meta", () => {
      const expected = /brand-preview/.test(file) ? "noindex, nofollow" : robotsMeta(site);
      expect(root.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(expected);
    });
    it("never skips a heading level", () => {
      const levels = root.querySelectorAll("h1, h2, h3, h4, h5, h6").map((h) => Number(h.tagName[1]));
      const skips = levels.filter((l, i) => i > 0 && l > levels[i - 1] + 1);
      expect(skips).toEqual([]);
    });
    it("contains no banned copy", () => expect(findBanned(text)).toEqual([]));
    it("follows French typography", () => expect(frenchTypoViolations(text)).toEqual([]));
  });

  it.each(cssFiles.length ? cssFiles : ["(no css)"])("css %s has no gradients or blur", (file) => {
    if (file === "(no css)") return;
    expect(readFileSync(file, "utf8")).not.toMatch(/linear-gradient|radial-gradient|backdrop-filter/);
  });
});
