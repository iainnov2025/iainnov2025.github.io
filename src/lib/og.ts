import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync } from "node:fs";
import { fixFrenchTypography } from "./french-typo";

const fontData = (p: string) => readFileSync(p);
const serif = fontData("node_modules/@fontsource/newsreader/files/newsreader-latin-500-normal.woff");
const sans = fontData("node_modules/@fontsource/geist-sans/files/geist-sans-latin-500-normal.woff");
const logo = readFileSync("src/brand/logo-dark.svg", "utf8");
const [, , vbW, vbH] = (logo.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 300 84").split(/\s+/).map(Number);
const LOGO_H = 52;
const LOGO_W = Math.round((vbW / vbH) * LOGO_H);

/** French typography + keep article references together ("L. 442-1", "art. 66-5"). */
export function ogTitle(t: string): string {
  return fixFrenchTypography(t).replace(/\b(L|R|art)\. (?=\d)/g, "$1.\u00A0");
}

/** 1200×630 Open Graph card (satori is content-box: root size excludes its 80/72px padding) in the brand: ink background, serif title, small kicker, logo. */
export async function renderOg(title: string, kicker: string): Promise<Uint8Array> {
  const svg = await satori(
    {
      type: "div",
      props: {
        style: { width: 1200 - 160, height: 630 - 144, display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#12161D", color: "#F6F4EF", padding: "72px 80px", fontFamily: "Geist" },
        children: [
          { type: "div", props: { style: { fontSize: 26, letterSpacing: 3, textTransform: "uppercase", color: "#8FBFB0" }, children: kicker } },
          { type: "div", props: { style: { fontFamily: "Newsreader", fontSize: title.length > 70 ? 56 : 68, lineHeight: 1.12, maxWidth: 1000 }, children: ogTitle(title) } },
          {
            type: "div",
            props: {
              style: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" },
              children: [
                { type: "img", props: { src: `data:image/svg+xml;base64,${Buffer.from(logo).toString("base64")}`, width: LOGO_W, height: LOGO_H, style: { width: LOGO_W, height: LOGO_H } } },
                { type: "div", props: { style: { width: 220, height: 2, background: "#8FBFB0" } } },
              ],
            },
          },
        ],
      },
    } as any,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Newsreader", data: serif, weight: 500, style: "normal" },
        { name: "Geist", data: sans, weight: 500, style: "normal" },
      ],
    },
  );
  return new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
}
