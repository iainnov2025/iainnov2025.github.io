/**
 * French typography: a non-breaking space (U+00A0 or narrow U+202F) is required before
 * ; : ! ? and », and after «. Returns up to 20 context snippets of violations.
 * Ignores URLs/times like "https://" or "10:30" (no space before the colon there).
 */
export function frenchTypoViolations(text: string): string[] {
  const out: string[] = [];
  const patterns = [/ [;:!?»]/g, /« /g];
  for (const re of patterns) {
    for (const m of text.matchAll(re)) {
      const i = m.index ?? 0;
      out.push(text.slice(Math.max(0, i - 25), i + 10).replace(/\s+/g, " "));
      if (out.length >= 20) return out;
    }
  }
  return out;
}
