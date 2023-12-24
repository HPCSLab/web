import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";
import NewsHeadline from "~/components/news/news-headline";
import * as News from "~/lib/news";

export default component$(() => {
  const loc = useLocation();
  console.log(useLocation().params);
  const news = News.newsBySlug.get(loc.params.slug);
  return (
    <main>
      <h1>{news?.markdown.frontmatter.title}</h1>
      {news?.markdown.default()}
    </main>
  );
});
