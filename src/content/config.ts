import { z, defineCollection } from "astro:content";

const newsSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
});

const publicationSubClassInternationalSchema = z.union([
  z.literal("conference"),
  z.literal("poster"),
]);

const publicationSubClassDomesticSchema = z.union([
  z.literal("conference"),
  z.literal("poster"),
  z.literal("workshop"),
  z.literal("magazine"),
  z.literal("misc"),
]);

const publicationClassSchema = z.union([
  z.object({
    class: z.literal("journal"),
  }),
  z.object({
    class: z.literal("international"),
    subclass: publicationSubClassInternationalSchema,
  }),
  z.object({
    class: z.literal("domestic"),
    subclass: publicationSubClassDomesticSchema,
  }),
]);

const publicationSchema = z.object({
  title: z.string(),
  booktitle: z.string().nullish(),
  year: z.number(),
  authors: z.array(z.string()),
  bibtex: z.string(),
  slug: z.string(),
  reference: z.string(),
  class: publicationClassSchema,
});

const teamKindSchema = z.union([
  z.literal("Algorithm"),
  z.literal("System Software"),
  z.literal("Architecture"),
  z.literal("Performance"),
  z.literal("FPGA"),
  z.literal("PA"),
]);

const memeberCommonSchema = z.object({
  name: z.string().nullish(),
  eng_name: z.string(),
  img: z.string(),
  team: teamKindSchema,
  username: z.string(),
});

const facultyGradeSchema = z.union([
  z.literal("Professor"),
  z.literal("Associate Professor"),
  z.literal("Assistant Professor"),
  z.literal("Professor (Cooperative Graduate School Program)"),
]);

const facultySchema = z.object({
  occupation: z.literal("Faculty"),
  grade: facultyGradeSchema,
});

const researcherSchema = z.object({
  occupation: z.literal("Researcher"),
});

const studentGradeSchema = z.union([
  z.literal("D3"),
  z.literal("D2"),
  z.literal("D1"),
  z.literal("M2"),
  z.literal("M1"),
  z.literal("B4"),
]);

const studentSchema = z.object({
  occupation: z.literal("Student"),
  grade: studentGradeSchema,
});

const researchStudentSchema = z.object({
  occupation: z.literal("Research Student"),
});

const memberSchema = z.intersection(
  memeberCommonSchema,
  z.union([
    facultySchema,
    researcherSchema,
    studentSchema,
    researchStudentSchema,
  ])
);

const alumniSchema = z.union([
  z.object({
    name: z.string(),
    type: z.literal("faculty"),
  }),
  z.object({
    name: z.string(),
    type: z.union([
      z.literal("staff"),
      z.literal("doctor"),
      z.literal("master"),
      z.literal("undergraduate"),
    ]),
    year: z.number(),
    month: z.number(),
  }),
]);

export const collections = {
  news: defineCollection({
    type: "content",
    schema: newsSchema,
  }),
  publication: defineCollection({
    type: "data",
    schema: publicationSchema,
  }),
  member: defineCollection({
    type: "data",
    schema: memberSchema,
  }),
  alumni: defineCollection({
    type: "data",
    schema: alumniSchema,
  }),
};
