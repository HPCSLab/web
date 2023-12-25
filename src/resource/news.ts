import type { JSXChildren } from "@builder.io/qwik";

export type Markdown = {
  frontmatter: {
    title: string;
    description: string;
    date: string;
    published: boolean;
  };
  default: () => JSXChildren;
};

export type News = {
  markdown: Markdown;
  slug: string;
  year: number;
};

function notNull<T>(item: T | null | undefined): item is T {
  return item !== null && item !== undefined;
}

const newsSrc: { year: number; slug: string; markdown: Markdown }[] =
  Object.entries(
    import.meta.glob("../../news/**/*.mdx", {
      eager: true,
    }) as Record<string, Markdown>
  )
    .sort(
      (a, b) =>
        Date.parse(b[1].frontmatter.date) - Date.parse(a[1].frontmatter.date)
    )
    .map((entry) => {
      const matched = /(\d{4})\/(.+)\.md/.exec(entry[0]);
      if (matched) {
        return {
          year: parseInt(matched[1], 10),
          slug: matched[2],
          markdown: entry[1],
        };
      }
    })
    .filter(notNull);

export const news: Map<number, News[]> = new Map();

for (const article of newsSrc) {
  news.get(article.year)?.push(article);
  if (news.get(article.year) === undefined) {
    news.set(article.year, [article]);
  }
}

export const newsBySlug: Map<string, News> = new Map();

for (const article of newsSrc) {
  newsBySlug.set(article.slug, article);
}
