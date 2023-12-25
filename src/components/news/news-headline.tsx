import type * as News from "~/resource/news";
import { css } from "~/styled-system/css";

export type NewsHeadlineProps = {
  news: News.News[];
};

export default (props: NewsHeadlineProps) => {
  return (
    <ul>
      {props.news.map((md) => (
        <li key={md.markdown.frontmatter.date}>
          <section class={css({ p: "2" })}>
            <span>{md.markdown.frontmatter.date}</span>
            <h3>
              <a href={`/news/details/${md.slug}`}>
                {md.markdown.frontmatter.title}
              </a>
            </h3>
          </section>
        </li>
      ))}
    </ul>
  );
};
