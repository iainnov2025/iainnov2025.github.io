import { it, expect } from "vitest";
import { formatDateFr } from "../../src/lib/dates";

it("formats ISO dates in French, timezone-safe", () => {
  expect(formatDateFr("2018-03-15")).toBe("15 mars 2018");
  expect(formatDateFr("2023-08-01")).toBe("1er août 2023");
  expect(formatDateFr("2024-01-15")).toBe("15 janvier 2024");
});
