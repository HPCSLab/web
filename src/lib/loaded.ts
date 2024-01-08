import { z } from "astro/zod";
import { load } from "./loader";
import type { StringLiteral } from "typescript";

const newsFrontmatterValidator = z.object({
  date: z.string(),
  title: z.string(),
  description: z.string(),
  published: z.boolean(),
});

export type NewsFrontmatter = {
  date: string;
  title: string;
  description: string;
  published: string;
  slug: string;
  year: string;
};

export const news = (
  await load<z.infer<typeof newsFrontmatterValidator>>(
    import.meta.glob("./news/**/*.mdx"),
    (md: any) => newsFrontmatterValidator.parse(md.frontmatter),
  )
).entries();
