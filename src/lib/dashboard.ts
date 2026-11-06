import type { DemoCase, DemoEvent, DemoSwotItem } from "../data/demo/types";

const TYPES: [RegExp, string][] = [
  [/ASSIGNATION/, "Assignation"],
  [/CONCLUSIONS/, "Conclusions"],
  [/CONTRAT/, "Contrat"],
  [/FACTURE/, "Facture"],
  [/REPONSE/, "Réponse"],
  [/MISE_EN_DEMEURE/, "Mise en demeure"],
  [/LOGS/, "Logs"],
  [/NOTIFICATION/, "Résiliation"],
  [/TICKET/, "Ticket"],
  [/REPARATION/, "Demande"],
  [/NOTE_INTERNE/, "Note interne"],
];

/** Kind of piece, from its file name ("07_MISE_EN_DEMEURE_…" → "Mise en demeure"). */
export function pieceKind(id: string): string {
  return TYPES.find(([re]) => re.test(id))?.[1] ?? "Pièce";
}

/** Short chip label for dense UI: "P. 07 · Mise en demeure". */
export function pieceLabel(id: string): string {
  const num = id.match(/^(\d+)_/)?.[1] ?? "";
  return num ? `P. ${num} · ${pieceKind(id)}` : pieceKind(id);
}

/** "2023-06-12" → "12/06/2023". */
export function shortDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/** Items that cite at least one piece: the only ones the dashboard shows. */
export function sourced<T extends { sources: { pieceId: string }[] }>(items: T[]): T[] {
  return items.filter((i) => i.sources.length > 0);
}

/** Every piece id cited by the given items, de-duplicated, in first-seen order. */
export function citedPieceIds(groups: { sources: { pieceId: string }[] }[][]): string[] {
  return [...new Set(groups.flat().flatMap((i) => i.sources.map((s) => s.pieceId)))];
}

export interface DashboardModel {
  critical: DemoEvent[];
  events: DemoEvent[];
  deadlines: DemoCase["deadlines"];
  swot: Record<keyof DemoCase["swot"], DemoSwotItem[]>;
  counts: { pieces: number; events: number; deadlines: number; swot: number };
}

/** What the product dashboard shows, derived from the curated demo case. */
export function dashboardModel(d: DemoCase): DashboardModel {
  const swot = {
    atouts: sourced(d.swot.atouts),
    failles: sourced(d.swot.failles),
    menaces: sourced(d.swot.menaces),
    opportunites: sourced(d.swot.opportunites),
  };
  const events = [...d.timeline].sort((a, b) => a.date.localeCompare(b.date));
  return {
    critical: events.filter((e) => e.importance === "CRITIQUE"),
    events,
    deadlines: [...d.deadlines].sort((a, b) => a.dueDate.localeCompare(b.dueDate)),
    swot,
    counts: {
      pieces: d.pieces.length,
      events: d.timeline.length,
      deadlines: d.deadlines.length,
      swot: Object.values(swot).reduce((n, l) => n + l.length, 0),
    },
  };
}
