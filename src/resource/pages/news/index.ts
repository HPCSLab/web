import { z } from "astro/zod";

const frontmatterValidator = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
});

export type Frontmatter = {
  year: number;
  title: string;
  description: string;
  date: string;
  timestamp: number;
  slug: string;
};

const rawNews: Frontmatter[] = await Promise.all(
  Object.entries(import.meta.glob("./**/*.mdx")).map(
    async ([path, imported]) => {
      const matched = /(\d{4})\/(.+)\.mdx/.exec(path);
      const year = matched?.[1];
      const slug = matched?.[2];
      if (year && slug) {
        const frontmatter = z
          .object({ frontmatter: frontmatterValidator })
          .parse(await imported()).frontmatter;
        return {
          ...frontmatter,
          year: parseInt(year, 10),
          slug,
          timestamp: Date.parse(frontmatter.date),
        };
      } else {
        throw new Error(`invalid path ${path}`);
      }
    }
  )
);
export const news = rawNews.sort((a, b) => b.timestamp - a.timestamp);
