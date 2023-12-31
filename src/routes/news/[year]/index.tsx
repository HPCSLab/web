import { component$ } from "@builder.io/qwik";
import {
  type StaticGenerateHandler,
  routeLoader$,
} from "@builder.io/qwik-city";
import NewsHeadline from "~/components/news/news-headline";
import { news } from "~/resource";

export const useNewsPerYear = routeLoader$(async (req) => {
  const year = parseInt(req.params.year, 10);
  return { news: await news({ year }), year };
});

export default component$(() => {
  const newsPerYear = useNewsPerYear();
  return (
    <main>
      <h1>News - {newsPerYear.value.year}</h1>
      {newsPerYear.value.news.length > 0 ? (
        <NewsHeadline news={newsPerYear.value.news} />
      ) : null}
    </main>
  );
});

export const onStaticGenerate: StaticGenerateHandler = async () => {
  // example of loading params for this use case
  // every implementation will be different

  return {
    params: (await news({})).map((news) => ({ slug: news.slug })),
  };
};
