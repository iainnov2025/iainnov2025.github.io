import { z } from "astro/zod";

/** Official sources only: every legal statement in a post links to the official text. */
export const ALLOWED_SOURCE_HOSTS = ["www.legifrance.gouv.fr", "www.courdecassation.fr", "eur-lex.europa.eu"];

export const DISCLAIMER = "Article à visée informative ; il ne constitue pas une consultation juridique.";

const officialUrl = z
  .string()
  .url()
  .refine((u) => ALLOWED_SOURCE_HOSTS.includes(new URL(u).host), { message: "source must be an official host" });

export const blogSchema = z.object({
  title: z.string().min(10),
  description: z.string().min(30),
  date: z.coerce.date(),
  updated: z.coerce.date().optional(),
  author: z.string(),
  tags: z.array(z.string()),
  sources: z.array(z.object({ label: z.string(), url: officialUrl })).min(1),
  draft: z.boolean().default(false),
});

export type BlogFrontmatter = z.infer<typeof blogSchema>;
