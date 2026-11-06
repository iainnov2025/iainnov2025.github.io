/**
 * Exports the curated GenBio demo case from real legalvec_agent v1 output.
 *
 * npx tsx scripts/export-demo.ts --v1 <…/output/GEN-2024-08471/demandeur> [--out src/data/demo/genbio.json]
 *
 * Prints a curation report (date conflicts, non-piece sources, dropped items) and applies
 * src/data/demo/curation.json, keyed by the ORIGINAL v1 title of each item.
 */
import { existsSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import type { DemoCase, DemoDeadline, DemoEvent, DemoPiece, DemoSourceRef, DemoSwotItem } from "../src/data/demo/types";

const DOC_SELF = /signature|émission|envoi|réception|mise en demeure|réponse|notification|résiliation|ticket|rapport|note interne/i;

/** Events describing a document itself must carry that document's filename date (YYYYMMDD). */
export function dateConflicts(d: DemoCase): { index: number; eventDate: string; fileDate: string; pieceId: string }[] {
  const out: { index: number; eventDate: string; fileDate: string; pieceId: string }[] = [];
  d.timeline.forEach((e, index) => {
    // due dates (ECHEANCE/DELAI) are legitimately later than the document that sets them
    if (e.category === "ECHEANCE" || e.category === "DELAI" || !DOC_SELF.test(e.title)) return;
    for (const s of e.sources) {
      const m = s.pieceId.match(/(\d{4})(\d{2})(\d{2})$/);
      if (!m) continue;
      const fileDate = `${m[1]}-${m[2]}-${m[3]}`;
      if (fileDate !== e.date) out.push({ index, eventDate: e.date, fileDate, pieceId: s.pieceId });
    }
  });
  return out;
}

/** "[[02_FACTURE_X]], [[03_Y.md]]" → ["02_FACTURE_X", "03_Y"] */
export function parseSources(raw: unknown): string[] {
  if (typeof raw !== "string") return [];
  return [...raw.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1].replace(/\.md$/, "").trim());
}

interface Override {
  date?: string;
  title?: string;
  category?: DemoEvent["category"];
  sources?: string[];
  basis?: string;
  exclude?: boolean;
  note: string;
}
interface PieceFix { replace: [string, string][]; note: string }
interface SwotFix { text?: string; sources?: string[]; exclude?: boolean; note: string }
interface TextFix { from: string; to: string; note: string }
interface Curation { timeline: Record<string, Override>; deadlines: Record<string, Override>; pieces?: Record<string, PieceFix>; swot?: Record<string, SwotFix>; position?: TextFix[]; claims?: TextFix[] }

function readUtf8(path: string): string {
  const buf = readFileSync(path);
  const s = buf.toString("utf8");
  if (s.includes("�")) {
    console.warn(`! ${path}: invalid UTF-8, decoding as cp1252`);
    return new TextDecoder("windows-1252").decode(buf);
  }
  return s;
}
const json = (p: string) => JSON.parse(readUtf8(p));

export function exportDemo(v1Dir: string, curation: Curation, report: string[] = []): DemoCase {
  const wiki = join(v1Dir, "wiki");
  const rawDir = join(v1Dir, "raw");
  const pieceFiles = new Map(
    readdirSync(rawDir).filter((f) => f.endsWith(".md")).map((f) => [f.replace(/\.md$/, ""), join(rawDir, f)]),
  );
  const meta = json(join(rawDir, "case_metadata.json"));
  const chrono = json(join(wiki, "Chronologie_Mermaid.json"));
  const cal = json(join(wiki, "Calendrier.json"));
  const swotRaw = json(join(wiki, "Analyse", "SWOT.json"));
  const pos = json(join(wiki, "Analyse", "PositionActuelle.json"));

  const used = new Set<string>(["01_ASSIGNATION_EN_JUSTICE", "02_CONCLUSIONS_EN_DEFENSE"]);
  const refs = (ids: string[], where: string): DemoSourceRef[] =>
    ids.flatMap((id) => {
      if (pieceFiles.has(id)) { used.add(id); return [{ pieceId: id }]; }
      report.push(`non-piece source dropped (${where}): ${id}`);
      return [];
    });

  const timeline: DemoEvent[] = [];
  for (const e of chrono.evenements as any[]) {
    const o = curation.timeline[e.titre];
    if (o?.exclude) { report.push(`excluded event: ${e.titre} — ${o.note}`); continue; }
    if (!o && /estimation/i.test(e.titre)) { report.push(`dropped estimated event: ${e.titre}`); continue; }
    const date = o?.date ?? e.date;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) { report.push(`dropped undated event: ${e.titre}`); continue; }
    const sources = refs(o?.sources ?? parseSources(e.source), `event "${e.titre}"`);
    if (sources.length === 0) { report.push(`dropped unsourced event: ${e.titre}`); continue; }
    timeline.push({ date, title: o?.title ?? e.titre, category: o?.category ?? e.categorie, importance: e.importance, sources });
  }
  timeline.sort((a, b) => a.date.localeCompare(b.date));

  const deadlines: DemoDeadline[] = [];
  for (const x of cal.deadlines as any[]) {
    const o = curation.deadlines[x.description];
    if (o?.exclude) { report.push(`excluded deadline: ${x.description} — ${o.note}`); continue; }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(o?.date ?? x.date_limite ?? "")) { report.push(`dropped undated deadline: ${x.description}`); continue; }
    const sources = refs(o?.sources ?? parseSources(x.source), `deadline "${x.description}"`);
    if (sources.length === 0) { report.push(`dropped unsourced deadline: ${x.description}`); continue; }
    deadlines.push({ description: o?.title ?? x.description, dueDate: o?.date ?? x.date_limite, basis: o?.basis ?? x.fondement ?? "", urgency: x.urgence, sources });
  }
  deadlines.sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const swotItems = (items: any[], where: string): DemoSwotItem[] =>
    items.flatMap((i) => {
      const o = curation.swot?.[i.element];
      if (o?.exclude) { report.push(`excluded swot (${where}): ${i.element.slice(0, 60)} — ${o.note}`); return []; }
      if (o) report.push(`swot fix (${where}): ${i.element.slice(0, 60)} — ${o.note}`);
      return [{
        text: o?.text ?? i.element,
        weight: i.poids,
        action: i.action_proposee ?? "",
        sources: refs(o?.sources ?? parseSources(i.source), `swot ${where}`),
      }];
    });

  const applyFixes = (text: string, fixes: TextFix[] | undefined, where: string) =>
    (fixes ?? []).reduce((t, f) => {
      if (!t.includes(f.from)) return t;
      report.push(`${where} fix: "${f.from.slice(0, 50)}" — ${f.note}`);
      return t.split(f.from).join(f.to);
    }, text);

  // SWOT before pieces: its sources must be registered in `used`
  const swot = {
    atouts: swotItems(swotRaw.swot.atouts, "atouts"),
    failles: swotItems(swotRaw.swot.failles, "failles"),
    menaces: swotItems(swotRaw.swot.menaces, "menaces"),
    opportunites: swotItems(swotRaw.swot.opportunites, "opportunites"),
  };

  const pieces: DemoPiece[] = [...used].sort().map((id) => {
    let text = readUtf8(pieceFiles.get(id)!);
    for (const [from, to] of curation.pieces?.[id]?.replace ?? []) {
      if (!text.includes(from)) throw new Error(`curation: "${from}" not found in piece ${id}`);
      text = text.split(from).join(to);
      report.push(`piece fix ${id}: "${from}" → "${to}"`);
    }
    const heading = text.match(/^#{1,3}\s+(.+)$/m)?.[1]?.replace(/\*\*/g, "").trim();
    const m = id.match(/(\d{4})(\d{2})(\d{2})$/);
    return { id, title: heading ?? id, date: m ? `${m[1]}-${m[2]}-${m[3]}` : null, text };
  });

  const d: DemoCase = {
    reference: "GEN-2024-08471",
    title: meta.affaire.intitule,
    jurisdiction: meta.procedure?.juridiction ?? "",
    perspective: "demandeur",
    parties: (meta.parties as any[]).map((p) => ({ name: p.display_name, role: p.role_procedure })),
    claims: (meta.pretentions?.client ?? []).map((c: string) => applyFixes(c, curation.claims, "claim")),
    position: {
      level: pos.position_qualitative,
      justification: applyFixes(pos.position_qualitative_justification, curation.position, "position"),
      summary: applyFixes(pos.resume_executive, curation.position, "position"),
    },
    swot,
    timeline,
    deadlines,
    pieces,
    generatedFrom: "legalvec_agent v1 (2026-05-09)",
  };
  for (const c of dateConflicts(d)) report.push(`DATE CONFLICT: "${d.timeline[c.index].title}" ${c.eventDate} vs ${c.pieceId} (${c.fileDate})`);
  return d;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const arg = (k: string, def?: string) => { const i = process.argv.indexOf(k); return i > -1 ? process.argv[i + 1] : def; };
  const v1 = arg("--v1");
  const out = arg("--out", "src/data/demo/genbio.json")!;
  if (!v1 || !existsSync(v1)) throw new Error("--v1 <path to v1 demandeur output dir> is required");
  const curationPath = "src/data/demo/curation.json";
  const curation: Curation = existsSync(curationPath) ? JSON.parse(readFileSync(curationPath, "utf8")) : { timeline: {}, deadlines: {} };
  const report: string[] = [];
  const d = exportDemo(v1, curation, report);
  writeFileSync(out, JSON.stringify(d, null, 2) + "\n");
  console.log(`Wrote ${out}: ${d.timeline.length} events, ${d.deadlines.length} deadlines, ${d.pieces.length} pieces`);
  console.log(report.length ? `Curation report:\n- ${report.join("\n- ")}` : "Curation report: clean");
}
