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
  }) as Record<string, { default: any }>
).map((publication) => publicationVerifier.parse(publication.default));

export type DomesticCollection = {
  conference: Publication[];
  poster: Publication[];
  workshop: Publication[];
  magazine: Publication[];
  misc: Publication[];
};

export type InternationalCollection = {
  conference: Publication[];
  poster: Publication[];
};

export type YearCollection = {
  categorized: {
    journal: Publication[];
    domestic: DomesticCollection;
    international: InternationalCollection;
  };
  all: Publication[];
};

export const grouped: Map<number, YearCollection> = new Map();
for (const pub of publications) {
  if (grouped.get(pub.year) === undefined) {
    grouped.set(pub.year, {
      categorized: {
        journal: [],
        domestic: {
          conference: [],
          poster: [],
          workshop: [],
          magazine: [],
          misc: [],
        },
        international: {
          conference: [],
          poster: [],
        },
      },
      all: [],
    });
  }

  const target = grouped.get(pub.year);
  if (target === undefined) {
    throw new Error("unreachable");
  }
  target.all.push(pub);

  switch (pub.class.class) {
    case "journal":
      target.categorized.journal.push(pub);
      break;
    case "international":
      switch (pub.class.subclass) {
        case "conference":
          target.categorized.international.conference.push(pub);
          break;
        case "poster":
          target.categorized.international.poster.push(pub);
          break;
      }
      break;
    case "domestic":
      switch (pub.class.subclass) {
        case "conference":
          target.categorized.domestic.conference.push(pub);
          break;
        case "poster":
          target.categorized.domestic.poster.push(pub);
          break;
        case "magazine":
          target.categorized.domestic.magazine.push(pub);
          break;
        case "workshop":
          target.categorized.domestic.workshop.push(pub);
          break;
        case "misc":
          target.categorized.domestic.misc.push(pub);
          break;
      }
      break;
  }
}

export const years = [...grouped.keys()].sort((a, b) => a - b);
export const publicationCollection = new Map(
  publications.map((pub) => [pub.slug, pub])
);
