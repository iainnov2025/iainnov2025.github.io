import { parse, NodeType, type Node, type HTMLElement, type TextNode } from "node-html-parser";

const NBSP = " ";
const NNBSP = " ";
const SPACES = "[ \\u00A0\\u202F]*";

/** French typography on plain text: no-break spaces before ; : ! ? » and after «. */
export function fixFrenchTypography(text: string): string {
  return text
    .replace(new RegExp(`(\\S)${SPACES}([;!?])(?=\\s|$|[»)\\]])`, "g"), (_, a, p) => `${a}${NNBSP}${p}`)
    .replace(new RegExp(`(\\S)${SPACES}:(?=\\s|$)`, "g"), (_, a) => `${a}${NBSP}:`)
    .replace(new RegExp(`«${SPACES}`, "g"), `«${NBSP}`)
    .replace(new RegExp(`${SPACES}»`, "g"), `${NBSP}»`);
}

const SKIP_TAGS = new Set(["code", "pre", "script", "style", "svg", "textarea", "kbd", "samp"]);

function skipped(el: HTMLElement | null): boolean {
  for (let n = el; n; n = n.parentNode as HTMLElement | null) {
    const tag = n.rawTagName?.toLowerCase();
    if (tag && SKIP_TAGS.has(tag)) return true;
    if (n.classList?.contains("mono")) return true;
  }
  return false;
}

/** Applies fixFrenchTypography to visible text nodes; leaves attributes, code, scripts and entities intact. */
export function fixHtmlTypography(html: string): string {
  const doctype = html.match(/^\s*<!doctype[^>]*>/i)?.[0] ?? "";
  const root = parse(html.slice(doctype.length), {
    comment: true,
    blockTextElements: { script: true, style: true, pre: true, noscript: true },
  });
  const visit = (node: Node) => {
    if (node.nodeType === NodeType.TEXT_NODE) {
      const t = node as TextNode;
      if (!skipped(t.parentNode as HTMLElement)) {
        // keep HTML entities (&amp; …) untouched: their ';' is not punctuation
        const fixed = t.rawText
          .split(/(&#?\w+;)/)
          .map((seg) => (/^&#?\w+;$/.test(seg) ? seg : fixFrenchTypography(seg)))
          .join("");
        if (fixed !== t.rawText) t.rawText = fixed;
      }
      return;
    }
    node.childNodes.forEach(visit);
  };
  visit(root);
  return doctype + root.toString();
}
