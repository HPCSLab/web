import{ z } from "zod";

const publicationClassVerifier = z.union([
  z.object({
    class: z.literal("journal"),
  }),
  z.object({
    class: z.literal("international"),
    subclass: z.union([
      z.literal("conference"),
      z.literal("poster"),
    ])
  }),
  z.object({
    class: z.literal("domestic"),
    subclass: z.union([
      z.literal("conference"),
      z.literal("poster"),
      z.literal("workshop"),
      z.literal("magazine"),
      z.literal("misc"),
    ])
  })
])

export type PublicationClass = z.infer<typeof publicationClassVerifier>;

const publicationVerifier = z.object({
  title: z.string(),
  booktitle: z.string().nullish(),
  year: z.number(),
  authors: z.array(z.string()),
  bibtex: z.string(),
  slug: z.string(),
  reference: z.string(),
  class: publicationClassVerifier,
})

export type Publication = z.infer<typeof publicationVerifier>;

const publicationsSrc = import.meta.glob("../../publications/**/*.yml", {
    eager: true,
  }) as Record<string, {default: any}>;


const publicationsWorkspace: Map<number, Map<string, Publication[]>> = new Map();
export const publicationsBySlug: Map<string, Publication> = new Map();

for (const rawPublication of Object.values(publicationsSrc)) {
  if (!publicationVerifier.safeParse(rawPublication).success) {
    console.log(rawPublication);
  }
  const publication = publicationVerifier.parse(rawPublication.default);
  if (publicationsWorkspace.get(publication.year) === undefined) {
    const inAnYear = new Map();
    inAnYear.set(JSON.stringify(publication.class), [publication]);
    publicationsWorkspace.set(publication.year, inAnYear);
  }
  else if (publicationsWorkspace.get(publication.year)?.get(JSON.stringify(publication.class)) === undefined){
    publicationsWorkspace.get(publication.year)?.set(JSON.stringify(publication.class), [publication]);
  }
  else {
    publicationsWorkspace.get(publication.year)?.get(JSON.stringify(publication.class))?.push(publication);
  }
  publicationsBySlug.set(publication.slug, publication);
}

export const publications: Map<number, Map<PublicationClass, Publication[]>> = new Map([...publicationsWorkspace.entries()].map(([year, classified]) => [year, new Map([...classified.entries()].map(([cls, publications]) => [publicationClassVerifier.parse(JSON.parse(cls)), publications]))]));
