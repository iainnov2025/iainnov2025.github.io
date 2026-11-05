import { describe, it, expect } from "vitest";
import { assertPublishable, robotsMeta } from "../../src/lib/site-config";
import type { SiteConfig } from "../../src/config/site";

const base: SiteConfig = {
  siteUrl: "https://iainnov2025.github.io",
  launch: false,
  publisherName: "",
  publisherAddress: "",
  contactEmail: "",
  bookingUrl: null,
  demoAppUrl: null,
  analyticsScriptUrl: null,
  features: { relevanceFlags: false },
};

describe("site config", () => {
  it("allows empty publisher fields before launch", () => {
    expect(() => assertPublishable(base)).not.toThrow();
  });

  it("refuses launch with empty publisher fields", () => {
    expect(() => assertPublishable({ ...base, launch: true })).toThrow(
      /publisherName.*publisherAddress.*contactEmail/s,
    );
  });

  it("is noindex before launch", () => {
    expect(robotsMeta(base)).toBe("noindex, nofollow");
  });

  it("is indexable after launch", () => {
    expect(
      robotsMeta({ ...base, launch: true, publisherName: "X", publisherAddress: "Y", contactEmail: "a@b.c" }),
    ).toBe("index, follow");
  });
});
