import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { renderOg } from "../../lib/og";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  return [
    { params: { slug: "default" }, props: { title: "Vos dossiers de contentieux, analysés avec les pièces à l'appui.", kicker: "LegalVec" } },
    ...posts.map((p) => ({ params: { slug: p.id }, props: { title: p.data.title, kicker: "Blog LegalVec" } })),
  ];
};

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg(props.title as string, props.kicker as string);
  return new Response(png, { headers: { "Content-Type": "image/png" } });
};
