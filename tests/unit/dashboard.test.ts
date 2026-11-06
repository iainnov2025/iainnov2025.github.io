import { describe, it, expect } from "vitest";
import { pieceKind, pieceLabel, shortDate, sourced, citedPieceIds, dashboardModel } from "../../src/lib/dashboard";
import demo from "../../src/data/demo/genbio.json";
import type { DemoCase } from "../../src/data/demo/types";

const d = demo as DemoCase;

describe("dashboard helpers", () => {
  it("names a piece by its kind", () => {
    expect(pieceKind("07_MISE_EN_DEMEURE_GENBIO_20230612")).toBe("Mise en demeure");
    expect(pieceKind("24_NOTE_INTERNE_GENBIO_AUDIT_ESPAGNE_20230802")).toBe("Note interne");
    expect(pieceKind("99_INCONNU")).toBe("Pièce");
    expect(pieceKind("08_REPONSE_CDS_MISE_EN_DEMEURE_20230625")).toBe("Réponse");
  });
  it("builds a short chip label", () => {
    expect(pieceLabel("09_LOGS_EXPORT_GENTRACE_2022_2023")).toBe("P. 09 · Logs");
  });
  it("formats a short French date", () => expect(shortDate("2023-06-12")).toBe("12/06/2023"));
  it("keeps only sourced items", () => {
    expect(sourced([{ sources: [] }, { sources: [{ pieceId: "a" }] }])).toHaveLength(1);
  });
  it("de-duplicates cited pieces", () => {
    expect(citedPieceIds([[{ sources: [{ pieceId: "a" }, { pieceId: "b" }] }], [{ sources: [{ pieceId: "a" }] }]])).toEqual(["a", "b"]);
  });
});

describe("dashboardModel", () => {
  const m = dashboardModel(d);
  it("counts the demo case", () => {
    expect(m.counts).toMatchObject({ pieces: 17, events: 22, deadlines: 7 });
  });
  it("sorts events and deadlines by date", () => {
    const dates = m.events.map((e) => e.date);
    expect(dates).toEqual([...dates].sort());
    const due = m.deadlines.map((x) => x.dueDate);
    expect(due).toEqual([...due].sort());
  });
  it("shows no SWOT item without a source", () => {
    for (const list of Object.values(m.swot)) for (const i of list) expect(i.sources.length).toBeGreaterThan(0);
  });
  it("every cited piece exists in the case", () => {
    const ids = new Set(d.pieces.map((p) => p.id));
    for (const id of citedPieceIds([m.events, m.deadlines, ...Object.values(m.swot)])) expect(ids.has(id)).toBe(true);
  });
});
