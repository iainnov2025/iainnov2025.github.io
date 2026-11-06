import type { AstroIntegration } from "astro";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { fixHtmlTypography } from "../lib/french-typo";

function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? htmlFiles(p) : p.endsWith(".html") ? [p] : [];
  });
}

/** Post-build pass: French no-break spaces in every built page's visible text. */
export default function frenchTypography(): AstroIntegration {
  return {
    name: "legalvec-french-typography",
    hooks: {
      "astro:build:done": ({ dir }) => {
        for (const file of htmlFiles(fileURLToPath(dir))) {
          writeFileSync(file, fixHtmlTypography(readFileSync(file, "utf8")));
        }
      },
    },
  };
}
