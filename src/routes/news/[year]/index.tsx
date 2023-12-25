import { component$ } from "@builder.io/qwik";
import { useLocation, type StaticGenerateHandler } from "@builder.io/qwik-city";
import NewsHeadline from "~/components/news/news-headline";
import * as News from "~/resource/news";

export default component$(() => {
  const loc = useLocation();
  const news = News.news.get(parseInt(loc.params.year, 10));
  return (
    <main>
      <h1>News - {loc.params.year}</h1>
      {news ? <NewsHeadline news={news} /> : null}
    </main>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // example of loading params for this use case
  // every implementation will be different

  return {
    params: [...News.news.keys()].map((year) => ({
      id: `${year}`,
    })),
  };
};
