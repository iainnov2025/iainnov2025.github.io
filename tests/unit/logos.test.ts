import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";

const directions = ["a", "b", "c"];
const files = ["logo.svg", "logo-mono.svg", "logo-dark.svg", "mark.svg"];

describe.each(directions)("logo direction %s", (d) => {
  it.each(files)("ships %s as outlined SVG", (f) => {
    const path = `src/brand/directions/${d}/${f}`;
    expect(existsSync(path)).toBe(true);
    const svg = readFileSync(path, "utf8");
    expect(svg).toMatch(/^<svg[^>]+viewBox="[^"]+"/);
    expect(svg).not.toMatch(/<text|<image|gradient/i); // outlined, no raster, no gradients
  });

  it("mono version uses a single colour", () => {
    const svg = readFileSync(`src/brand/directions/${d}/logo-mono.svg`, "utf8");
    const colours = new Set(svg.match(/#[0-9a-fA-F]{6}/g) ?? []);
    expect(colours.size).toBe(1);
  });
});
