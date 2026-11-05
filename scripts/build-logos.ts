/**
 * Generates the three LegalVec logo directions as outlined SVGs (no <text>, no fonts needed).
 * Run: npx tsx scripts/build-logos.ts
 *
 * A « Renvoi »  — serif wordmark + a raised accent square, like a footnote/source marker:
 *                 every claim points to its source.
 * B « Minuscule » — lowercase precise sans wordmark, "vec" in accent; lv monogram tile.
 * C « Marge »   — a margin rule (the line lawyers draw beside a key passage) + serif
 *                 wordmark with "Vec" in italic.
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import opentype from "opentype.js";

const INK = "#12161D";
const PAPER = "#F6F4EF";
const ACCENT = "#1E4D43";
const ACCENT_ON_DARK = "#8FBFB0";

function load(path: string): opentype.Font {
  const buf = readFileSync(path);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

const serif = load("node_modules/@fontsource/newsreader/files/newsreader-latin-500-normal.woff");
const serifItalic = load("node_modules/@fontsource/newsreader/files/newsreader-latin-500-italic.woff");
const sans = load("node_modules/@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff");

interface Run { font: opentype.Font; text: string; color: string; tracking?: number }

/** Lays out runs on one baseline; returns path elements and total width. */
function layout(runs: Run[], size: number, x0: number, baseline: number) {
  let x = x0;
  let inkRight = x0; // italic glyphs can overshoot their advance width
  const parts: string[] = [];
  for (const r of runs) {
    for (const ch of r.text) {
      // Draw at x=0 and translate: opentype.js emits NaN for some glyphs at large x offsets.
      const p = r.font.getPath(ch, 0, baseline, size);
      const d = p.toPathData(2);
      if (d.includes("NaN")) throw new Error(`NaN in glyph path for "${ch}"`);
      parts.push(`<path transform="translate(${x.toFixed(2)} 0)" d="${d}" fill="${r.color}"/>`);
      inkRight = Math.max(inkRight, x + p.getBoundingBox().x2);
      x += r.font.getAdvanceWidth(ch, size) + (r.tracking ?? 0) * size;
    }
  }
  return { parts, width: Math.max(x, inkRight) - x0 };
}

function svg(w: number, h: number, body: string, bg?: string): string {
  const rect = bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w.toFixed(1)} ${h}" role="img" aria-label="LegalVec">${rect}${body}</svg>\n`;
}

type Palette = { ink: string; accent: string; bg?: string };
const palettes: Record<"logo" | "logo-mono" | "logo-dark", Palette> = {
  logo: { ink: INK, accent: ACCENT },
  "logo-mono": { ink: INK, accent: INK },
  "logo-dark": { ink: PAPER, accent: ACCENT_ON_DARK, bg: INK },
};

const SIZE = 64;
const H = 84;
const BASE = 62;

function directionA(p: Palette): string {
  const { parts, width } = layout([{ font: serif, text: "LegalVec", color: p.ink, tracking: -0.01 }], SIZE, 0, BASE);
  const sq = 11; // raised square at cap height, like a footnote marker
  const x = width + 6;
  parts.push(`<rect x="${x.toFixed(1)}" y="${BASE - 44}" width="${sq}" height="${sq}" fill="${p.accent}"/>`);
  return svg(x + sq + 2, H, parts.join(""), p.bg);
}

function directionB(p: Palette): string {
  const { parts, width } = layout(
    [
      { font: sans, text: "legal", color: p.ink, tracking: -0.035 },
      { font: sans, text: "vec", color: p.accent, tracking: -0.035 },
    ],
    SIZE, 0, BASE,
  );
  return svg(width + 2, H, parts.join(""), p.bg);
}

function directionC(p: Palette): string {
  const ruleW = 6;
  const gap = 14;
  const rule = `<rect x="0" y="10" width="${ruleW}" height="${H - 20}" fill="${p.accent}"/>`;
  const { parts, width } = layout(
    [
      { font: serif, text: "Legal", color: p.ink, tracking: -0.01 },
      { font: serifItalic, text: "Vec", color: p.ink, tracking: -0.01 },
    ],
    SIZE, ruleW + gap, BASE,
  );
  return svg(ruleW + gap + width + 2, H, rule + parts.join(""), p.bg);
}

/** Square marks for favicon / app icon (64×64). */
function markA(): string {
  const { parts } = layout([{ font: serif, text: "L", color: PAPER }], 46, 17, 47);
  return svg(64, 64, `<rect width="64" height="64" rx="10" fill="${INK}"/>${parts.join("")}<rect x="43" y="13" width="8" height="8" fill="${ACCENT_ON_DARK}"/>`);
}
function markB(): string {
  const { parts } = layout([{ font: sans, text: "lv", color: PAPER, tracking: -0.04 }], 40, 13, 44);
  return svg(64, 64, `<rect width="64" height="64" rx="10" fill="${ACCENT}"/>${parts.join("")}`);
}
function markC(): string {
  const { parts } = layout([{ font: serif, text: "L", color: PAPER }], 46, 22, 47);
  return svg(64, 64, `<rect width="64" height="64" rx="10" fill="${INK}"/><rect x="11" y="12" width="5" height="40" fill="${ACCENT_ON_DARK}"/>${parts.join("")}`);
}

const builders = { a: [directionA, markA], b: [directionB, markB], c: [directionC, markC] } as const;

for (const [dir, [word, mark]] of Object.entries(builders)) {
  const out = `src/brand/directions/${dir}`;
  mkdirSync(out, { recursive: true });
  for (const [name, pal] of Object.entries(palettes)) writeFileSync(`${out}/${name}.svg`, word(pal));
  writeFileSync(`${out}/mark.svg`, mark());
}
console.log("Logos written to src/brand/directions/{a,b,c}");

// --pick <a|b|c>: install a direction as the brand logo and generate favicons.
const pickIdx = process.argv.indexOf("--pick");
if (pickIdx > -1) {
  const pick = process.argv[pickIdx + 1];
  if (!["a", "b", "c"].includes(pick)) throw new Error("--pick must be a, b or c");
  const { Resvg } = await import("@resvg/resvg-js");
  const from = `src/brand/directions/${pick}`;
  for (const f of ["logo.svg", "logo-dark.svg", "logo-mono.svg", "mark.svg"]) {
    writeFileSync(`src/brand/${f}`, readFileSync(`${from}/${f}`));
  }
  const mark = readFileSync(`${from}/mark.svg`, "utf8");
  mkdirSync("public", { recursive: true });
  writeFileSync("public/favicon.svg", mark);
  writeFileSync("public/apple-touch-icon.png", new Resvg(mark, { fitTo: { mode: "width", value: 180 } }).render().asPng());
  writeFileSync("public/favicon-32.png", new Resvg(mark, { fitTo: { mode: "width", value: 32 } }).render().asPng());
  writeFileSync("src/brand/PICK", `${pick}\n`);
  console.log(`Direction ${pick.toUpperCase()} installed as brand logo + favicons.`);
}
