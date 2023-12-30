import type * as News from "~/resource/news";
import { css } from "~/styled-system/css";

export type NewsHeadlineProps = {
  news: News.News[];
};

export default (props: NewsHeadlineProps) => {
  return (
    <ul>
      {props.news.map((md) => {
        const date = new Date(md.frontmatter.timestamp);
        return <li key={md.slug}>
          <section class={css({ p: "2" })}>
            <span>{`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getDay()}`}</span>
            <h3>
              <a href={`/news/details/${md.slug}`}>
                {md.frontmatter.title}
              </a>
            </h3>
          </section>
        </li>
      })}
    </ul>
  );
};
