import { component$ } from "@builder.io/qwik";
import { type StaticGenerateHandler, routeLoader$ } from "@builder.io/qwik-city";
import {news} from "~/resource";
import Markdown from "~/components/markdown";

export const useNewsDetail = routeLoader$(async (req) => {
  return (await news({slug: req.params.slug}))[0]
});

export default component$(() => {
  const detail = useNewsDetail();
  return (
    <main>
      <h1>{detail.value.frontmatter.title}</h1>
      <Markdown root={detail.value.root}/>
    </main>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  return {
    params: (await news({})).map((news) => ({slug: news.slug })),
  };
};
