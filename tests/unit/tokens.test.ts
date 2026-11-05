import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";

const tokensCss = readFileSync("src/styles/tokens.css", "utf8");
const baseCss = readFileSync("src/styles/base.css", "utf8");

function tok(name: string): string {
  const m = tokensCss.match(new RegExp(`${name}\\s*:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token ${name} not found as #rrggbb`);
  return m[1];
}

function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

describe("design tokens", () => {
  it("ink on paper is at least 7:1", () => {
    expect(contrast(tok("--color-ink"), tok("--color-paper"))).toBeGreaterThanOrEqual(7);
  });
  it("muted on paper is at least 4.5:1", () => {
    expect(contrast(tok("--color-muted"), tok("--color-paper"))).toBeGreaterThanOrEqual(4.5);
  });
  it("accent-ink on accent is at least 4.5:1", () => {
    expect(contrast(tok("--color-accent-ink"), tok("--color-accent"))).toBeGreaterThanOrEqual(4.5);
  });
  it("uses no gradients or blur effects", () => {
    expect(tokensCss + baseCss).not.toMatch(/gradient\(|backdrop-filter/);
  });
});
