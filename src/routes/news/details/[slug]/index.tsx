import { component$ } from "@builder.io/qwik";
import { type StaticGenerateHandler, useLocation } from "@builder.io/qwik-city";
import * as News from "~/resource/news";

export default component$(() => {
  const loc = useLocation();
  const news = News.newsBySlug.get(loc.params.slug);
  return (
    <main>
      <h1>{news?.markdown.frontmatter.title}</h1>
      {news?.markdown.default()}
    </main>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: [...News.newsBySlug.keys()].map((slug) => {
      return { slug: slug.toString() };
    }),
  };
};
