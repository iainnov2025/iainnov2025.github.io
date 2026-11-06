import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import type { DemoCase, DemoSourceRef } from "../../src/data/demo/types";
import { dateConflicts } from "../../scripts/export-demo";

const d: DemoCase = JSON.parse(readFileSync("src/data/demo/genbio.json", "utf8"));

function allSources(c: DemoCase): DemoSourceRef[] {
  return [
    ...c.timeline.flatMap((e) => e.sources),
    ...c.deadlines.flatMap((x) => x.sources),
    ...Object.values(c.swot).flatMap((items) => items.flatMap((i) => i.sources)),
  ];
}

describe("demo case data", () => {
  it("has correct accents (no mojibake)", () => {
    expect(JSON.stringify(d)).not.toMatch(/�|Ã©|Ã¨|Ã |Ã§/);
  });

  it("every source points to an exported piece", () => {
    const ids = new Set(d.pieces.map((p) => p.id));
    for (const s of allSources(d)) expect(ids.has(s.pieceId), s.pieceId).toBe(true);
  });

  it("every timeline event and deadline has at least one source", () => {
    for (const e of d.timeline) expect(e.sources.length, e.title).toBeGreaterThan(0);
    for (const x of d.deadlines) expect(x.sources.length, x.description).toBeGreaterThan(0);
  });

  it("no event contradicts the date in its source filename", () => {
    expect(dateConflicts(d)).toEqual([]);
  });

  it("dates the contract signature 2018-03-15 (piece 01, « Fait à Lyon, le 15 mars 2018 »)", () => {
    expect(d.timeline.find((e) => /contrat-cadre/i.test(e.title))?.date).toBe("2018-03-15");
  });

  it("does not claim an illicit export was discovered (piece 24 says the connections look legitimate)", () => {
    expect(JSON.stringify(d.timeline)).not.toMatch(/export illicite/i);
  });

  it("treats 2024-01-15 as the hearing set by the assignation, not a filing", () => {
    const e = d.timeline.find((x) => x.date === "2024-01-15");
    expect(e?.category).toBe("AUDIENCE");
    expect(e?.sources.map((s) => s.pieceId)).toContain("01_ASSIGNATION_EN_JUSTICE");
  });

  it("keeps no estimated or undated events", () => {
    expect(d.timeline.every((e) => /^\d{4}-\d{2}-\d{2}$/.test(e.date))).toBe(true);
    expect(d.timeline.some((e) => /estimation/i.test(e.title))).toBe(false);
  });

  it("is sorted chronologically", () => {
    const dates = d.timeline.map((e) => e.date);
    expect([...dates].sort()).toEqual(dates);
  });

  it("invoice due dates agree between timeline and deadlines", () => {
    let compared = 0;
    for (const e of d.timeline.filter((x) => /exigibilité de la facture/i.test(x.title))) {
      const n = e.title.match(/\d{4}-\d{4}/)?.[0];
      const dl = n ? d.deadlines.find((x) => x.description.includes(`n°${n}`)) : undefined;
      if (!dl) continue;
      compared++;
      expect(e.date, `invoice ${n}`).toBe(dl.dueDate);
    }
    expect(compared).toBeGreaterThanOrEqual(3);
  });

  it("dates invoice 2023-0389 as issued 22 April, due 22 May (piece 03)", () => {
    expect(d.timeline.find((e) => e.title === "Émission de la facture 2023-0389")?.date).toBe("2023-04-22");
    expect(d.timeline.find((e) => e.title === "Date d'exigibilité de la facture 2023-0389")?.date).toBe("2023-05-22");
  });

  it("dates the second repair request 20 March 2023 (piece 08, piece 17)", () => {
    const e = d.timeline.find((x) => /deuxième/i.test(x.title) && /réparation/i.test(x.title));
    expect(e?.date).toBe("2023-03-20");
  });

  it("keeps no unsupported « suspension des livraisons » event", () => {
    expect(d.timeline.some((e) => /suspension des livraisons/i.test(e.title))).toBe(false);
  });

  it("gives the mise-en-demeure deadline its real basis (15-day notice, not art. 12.2)", () => {
    const dl = d.deadlines.find((x) => x.dueDate === "2023-06-27");
    expect(dl?.basis).toMatch(/15 jours/);
  });

  it("sources the 127 450 € unpaid-invoices atout to the assignation and the June–August invoices", () => {
    const a = d.swot.atouts.find((x) => x.text.includes("127 450"));
    const ids = a?.sources.map((s) => s.pieceId) ?? [];
    expect(ids).toContain("01_ASSIGNATION_EN_JUSTICE");
    expect(ids.filter((i) => /^(11|12|13)_FACTURE/.test(i))).toHaveLength(3);
    expect(ids.some((i) => /^(02|03|04)_FACTURE/.test(i))).toBe(false);
  });

  it("sources the GEN-TRACE figure to the export logs (piece 09)", () => {
    const a = d.swot.atouts.find((x) => /GEN-TRACE/.test(x.text));
    expect(a?.sources.map((s) => s.pieceId)).toContain("09_LOGS_EXPORT_GENTRACE_2022_2023");
  });

  it("has no stray CJK characters in pieces", () => {
    for (const p of d.pieces) expect(p.text, p.id).not.toMatch(/[㐀-鿿]/);
  });

  it("has no numeric success probability or day counters", () => {
    expect(JSON.stringify(d)).not.toMatch(/score_chance_succes|confiance_score|jours_restants/);
  });
});
