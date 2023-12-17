import { component$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";

type Markdown = {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    published: boolean;
  };
};

const news = (
  await Promise.all(
    Object.values(
      import.meta.glob("../../../news/**/*.md") as Record<
        string,
        () => Promise<Markdown>
      >,
    ).map(async (markdown) => markdown()),
  )
).sort(
  (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date),
);

interface LatestNewsProps {
  limit?: number;
}

export default component$((props: LatestNewsProps) => {
  const limitedNews = news.slice(
    0,
    props.limit ? Math.min(props.limit, news.length) : news.length,
  );
  return (
    <ul>
      {limitedNews.map((md) => (
        <li key={md.frontmatter.date}>
          <section class={css({ p: "2" })}>
            <span>{md.frontmatter.date}</span>
            <h3>{md.frontmatter.title}</h3>
          </section>
        </li>
      ))}
    </ul>
  );
});
