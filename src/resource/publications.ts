import { z } from "zod";

const internationalSubcategoryValidator = z.union([
  z.literal("conference"),
  z.literal("poster"),
]);

export type InternationalSubcategory = z.infer<
  typeof internationalSubcategoryValidator
>;

const domesticSubcategoryValidator = z.union([
  z.literal("conference"),
  z.literal("poster"),
  z.literal("workshop"),
  z.literal("magazine"),
  z.literal("misc"),
]);

export type DomesticSubcategory = z.infer<typeof domesticSubcategoryValidator>;

const publicationClassValidator = z.union([
  z.object({
    class: z.literal("journal"),
  }),
  z.object({
    class: z.literal("international"),
    subclass: internationalSubcategoryValidator,
  }),
  z.object({
    class: z.literal("domestic"),
    subclass: domesticSubcategoryValidator,
  }),
]);

export type PublicationClass = z.infer<typeof publicationClassValidator>;

const publicationVerifier = z.object({
  title: z.string(),
  booktitle: z.string().nullish(),
  year: z.number(),
  authors: z.array(z.string()),
  bibtex: z.string(),
  slug: z.string(),
  reference: z.string(),
  class: publicationClassValidator,
});

export type Publication = z.infer<typeof publicationVerifier>;

export const publications = Object.values(
  import.meta.glob("./articles/publications/**/*.yml", {
    eager: true,
  }) as Record<string, { default: any }>,
).map((publication) => publicationVerifier.parse(publication.default));
