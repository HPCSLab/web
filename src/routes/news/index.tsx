import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import NewsHeadline from "~/components/news/news-headline";
import * as News from "~/resource/news";
import { news} from "~/resource";

export const useNewsHeadlines = routeLoader$(async () => {
  return await news({});
});

export default component$(() => {
  const newsHeadlines = useNewsHeadlines();
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
              <NewsHeadline news={newsHeadlines.value} />
            </section>
          </li>
        ))}
      </ol>
    </main>
  );
});
