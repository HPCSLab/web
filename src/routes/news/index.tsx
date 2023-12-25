import { component$ } from "@builder.io/qwik";
import NewsHeadline from "~/components/news/news-headline";
import * as News from "~/resource/news";

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
