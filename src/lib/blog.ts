import { z } from "astro/zod";

/** Official sources only: every legal statement in a post links to the official text. */
export const ALLOWED_SOURCE_HOSTS = ["www.legifrance.gouv.fr", "www.courdecassation.fr", "eur-lex.europa.eu"];

export const DISCLAIMER = "Article à visée informative ; il ne constitue pas une consultation juridique.";

const officialUrl = z
  .string()
  .url()
  .refine((u) => ALLOWED_SOURCE_HOSTS.includes(new URL(u).host), { message: "source must be an official host" });

/** Topic clusters: each post belongs to one pillar; the blog index and "related posts" follow them. */
export const PILLARS = {
  "contentieux-commercial": "Contentieux commercial : les textes",
  procedure: "Procédure et délais",
  "ia-et-cabinet": "IA, données et cabinet d'avocats",
  methode: "Méthode : préparer un dossier",
} as const;
export type Pillar = keyof typeof PILLARS;

export const blogSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(30),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  author: z.string(),
  tags: z.array(z.string()),
  pillar: z.enum(Object.keys(PILLARS) as [Pillar, ...Pillar[]]),
  sources: z.array(z.object({ label: z.string(), url: officialUrl })).min(1),
  draft: z.boolean().default(false),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;

/** Reading time in whole minutes (220 words per minute, minimum 1). */
export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Same-pillar posts first (newest first), then the newest others; never the post itself. */
export function relatedPosts<T extends { id: string; pillar: string; date: number }>(post: T, all: T[], n: number): T[] {
  const others = all.filter((p) => p.id !== post.id).sort((a, b) => b.date - a.date);
  return [...others.filter((p) => p.pillar === post.pillar), ...others.filter((p) => p.pillar !== post.pillar)].slice(0, n);
}
