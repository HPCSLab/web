import { component$ } from "@builder.io/qwik";
import type { StaticGenerateHandler } from "@builder.io/qwik-city";
import NewsHeadline from "~/components/news/news-headline";
import * as News from "~/lib/news";

export default component$(() => {
  return (
    <main>
      <h1>News</h1>
      <ol>
        {[...News.news.entries()].map((entry) => (
          <li key={entry[0]}>
            <section>
              <h2>
                <a href={`/news/${entry[0]}`}>{entry[0]}</a>
              </h2>
              <NewsHeadline news={entry[1]} />
            </section>
          </li>
        ))}
      </ol>
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
