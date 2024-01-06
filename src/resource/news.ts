import { z } from "zod";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMdx from "remark-mdx";
import { unified } from "unified";
import remarkFrontmatter from "remark-frontmatter";
import type { Root } from "remark-parse/lib";
import YAML from "yaml";
import { toSerialzable as toSerializable } from "~/lib";

const frontmatterValidator = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  published: z.boolean(),
});

export type Frontmatter = {
  title: string;
  description: string;
  timestamp: number;
  published: boolean;
};

export type News = {
  root: Root;
  frontmatter: Frontmatter;
  slug: string;
};

export const news: News[] = Object.entries(
  import.meta.glob("./articles/news/**/*.mdx", { eager: true, as: "raw" })
)
  .map(([path, src]) => {
    const root = unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkGfm)
      .use(remarkMdx)
      .use(remarkFrontmatter, ["yaml"])
      .parse(src);
    const slug = /\.\/articles\/news\/\d{4}\/(.+)\.mdx/.exec(path);
    if (slug && slug[1]) {
      if (root.children[0].type === "yaml") {
        const frontmatter = frontmatterValidator.parse(
          YAML.parse(root.children[0].value)
        );
        return {
          root: toSerializable({
            ...root,
            children: root.children.slice(1, root.children.length),
          }),
          frontmatter: {
            ...frontmatter,
            timestamp: Date.parse(frontmatter.date),
          },
          slug: slug[1],
        };
      } else {
        throw new Error(`frontmatter not found for ${path}`);
      }
    } else {
      throw new Error(`invalid path ${path}`);
    }
  })
  .sort((a, b) => b.frontmatter.timestamp - a.frontmatter.timestamp);
