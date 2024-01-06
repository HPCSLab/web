import { Link } from "@builder.io/qwik-city";
import type * as News from "~/resource/news";

export type NewsHeadlineProps = {
  news: News.News[];
};

export default (props: NewsHeadlineProps) => {
  return (
    <ul>
      {props.news.map((md) => {
        const date = new Date(md.frontmatter.timestamp);
        return (
          <li key={md.slug}>
            <section>
              <span>{`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getDay()}`}</span>
              <h3>
                <Link href={`/news/details/${md.slug}`}>
                  {md.frontmatter.title}
                </Link>
              </h3>
            </section>
          </li>
        );
      })}
    </ul>
  );
};
