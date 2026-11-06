import { describe, it, expect } from "vitest";
import { securityStatements } from "../../src/data/security";

describe("security statements", () => {
  it("every verified statement has evidence", () => {
    for (const s of securityStatements.filter((x) => x.status === "verified")) expect(s.evidence, s.id).toBeTruthy();
  });
  it("starts with nothing marked verified (no vendor fact confirmed in writing yet)", () => {
    expect(securityStatements.filter((s) => s.status === "verified")).toHaveLength(0);
  });
  it("covers all 11 topics", () => {
    expect(new Set(securityStatements.map((s) => s.topic)).size).toBe(11);
  });
  it("never claims the website itself is hosted in France", () => {
    for (const s of securityStatements) expect(s.text, s.id).not.toMatch(/(ce |le )site (est )?hébergé en France/i);
  });
});
