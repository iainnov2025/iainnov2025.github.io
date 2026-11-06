import { it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { team } from "../../src/data/team";

it("the about page names only team members who consented", () => {
  const html = readFileSync("dist/a-propos/index.html", "utf8");
  for (const m of team) {
    if (m.consent) expect(html, m.name).toContain(m.name);
    else expect(html, m.name).not.toContain(m.name);
  }
});
