import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import NewsHeadline from "~/components/news/news-headline";
import { news } from "~/resource";

export const useNewsHeadlines = routeLoader$(async () => {
  return await news({});
});

export default component$(() => {
  const newsHeadlines = useNewsHeadlines();
  return (
    <main>
      <h1>News</h1>
      <ol>
        {newsHeadlines.value.map((entry) => (
          <li key={entry.slug}>
            <section>
              <h2>
                <a href={`/news/details/${entry.slug}`}>
                  {entry.frontmatter.title}
                </a>
              </h2>
              <NewsHeadline news={newsHeadlines.value} />
            </section>
          </li>
        ))}
      </ol>
    </main>
  );
});
