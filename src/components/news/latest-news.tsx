import { component$ } from "@builder.io/qwik";
import * as News from "~/lib/news";
import NewsHeadline from "./news-headline";
interface LatestNewsProps {
  limit?: number;
}

export default component$((props: LatestNewsProps) => {
  const news = [...News.news.values()]
    .flatMap((a) => a)
    .sort(
      (a, b) =>
        Date.parse(b.markdown.frontmatter.date) -
        Date.parse(a.markdown.frontmatter.date),
    );
  return (
    <ul>
      <NewsHeadline
        news={news.slice(
          0,
          props.limit ? Math.min(props.limit, news.length) : news.length,
        )}
      />
    </ul>
  );
});
