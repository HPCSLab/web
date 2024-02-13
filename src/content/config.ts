import {
  z,
  defineCollection,
  type SchemaContext,
  reference,
} from "astro:content";

const newsSchema = z.object({
  title: z.string(),
  date: z.string(),
  description: z.string(),
});

export type News = z.infer<typeof newsSchema>;

const publicationSubClassInternationalSchema = z.union([
  z.literal("conference"),
  z.literal("poster"),
]);

export type PublicationSubclassInternational = z.infer<
  typeof publicationSubClassInternationalSchema
>;

const publicationSubClassDomesticSchema = z.union([
  z.literal("conference"),
  z.literal("poster"),
  z.literal("workshop"),
  z.literal("magazine"),
  z.literal("misc"),
]);

export type PublicationSubclassDomestic = z.infer<
  typeof publicationSubClassDomesticSchema
>;

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

export type PublicationClass = z.infer<typeof publicationClassSchema>;

const publicationSchema = z.object({
  title: z.string(),
  booktitle: z.string().nullish(),
  year: z.number(),
  authors: z.array(z.string()),
  bibtex: z.string(),
  reference: z.string(),
  url: z.string().nullish(),
  class: publicationClassSchema,
});

export type Publication = z.infer<typeof publicationSchema>;

const memberCommonSchema = (ctx: SchemaContext) =>
  z.object({
    name: z.string().nullish(),
    eng_name: z.string(),
    icon: ctx.image(),
    team: reference("team"),
    username: z.string(),
    message: z.string().nullish(),
    keywords: z.array(z.string()).nullish(),
  });

export type MemberCommon = z.infer<ReturnType<typeof memberCommonSchema>>;

const facultyGradeSchema = z.union([
  z.literal("Professor"),
  z.literal("Associate Professor"),
  z.literal("Assistant Professor"),
  z.literal("Professor (Cooperative Graduate School Program)"),
]);

export type FacultyGrade = z.infer<typeof facultyGradeSchema>;

export function translateFacultyGrade(grade: FacultyGrade): string {
  switch (grade) {
    case "Assistant Professor":
      return "助教授";
    case "Associate Professor":
      return "准教授";
    case "Professor":
      return "教授";
    case "Professor (Cooperative Graduate School Program)":
      return "連携大学院教授";
  }
}

const facultySchema = z.object({
  occupation: z.literal("Faculty"),
  grade: facultyGradeSchema,
});

export type Faculty = z.infer<typeof facultyGradeSchema>;

const researcherSchema = z.object({
  occupation: z.literal("Researcher"),
});

export type Researcher = z.infer<typeof researcherSchema>;

const studentGradeSchema = z.union([
  z.literal("D3"),
  z.literal("D2"),
  z.literal("D1"),
  z.literal("M2"),
  z.literal("M1"),
  z.literal("B4"),
]);

export type studentGrade = z.infer<typeof studentGradeSchema>;

const studentSchema = z.object({
  occupation: z.literal("Student"),
  grade: studentGradeSchema,
});

export type Student = z.infer<typeof studentSchema>;

const researchStudentSchema = z.object({
  occupation: z.literal("Research Student"),
});

export type researchStudent = z.infer<typeof researchStudentSchema>;

const memberSchema = (ctx: SchemaContext) =>
  z.intersection(
    memberCommonSchema(ctx),
    z.union([
      facultySchema,
      researcherSchema,
      studentSchema,
      researchStudentSchema,
    ])
  );

export type Member = z.infer<ReturnType<typeof memberSchema>>;

export function memberRoleName(member: Member): string {
  switch (member.occupation) {
    case "Faculty":
      return translateFacultyGrade(member.grade);
    case "Researcher":
      return "研究者";
    case "Research Student":
      return "研究生";
    case "Student":
      return member.grade;
  }
}

export function viewRank(member: Member): number {
  switch (member.occupation) {
    case "Faculty":
      switch (member.grade) {
        case "Professor":
          return 4 * 100 + 4;
        case "Professor (Cooperative Graduate School Program)":
          return 4 * 100 + 3;
        case "Associate Professor":
          return 4 * 100 + 2;
        case "Assistant Professor":
          return 4 * 100 + 1;
      }
    case "Researcher":
      return 3 * 100;
    case "Research Student":
      return 2 * 100;
    case "Student":
      switch (member.grade) {
        case "D3":
          return 1 * 100 + 6;
        case "D2":
          return 1 * 100 + 5;
        case "D1":
          return 1 * 100 + 4;
        case "M2":
          return 1 * 100 + 3;
        case "M1":
          return 1 * 100 + 2;
        case "B4":
          return 1 * 100 + 1;
      }
  }
}

const facultyAlumnusSchema = z.object({
  name: z.string(),
  type: z.literal("faculty"),
});

export type FacultyAlumnus = z.infer<typeof facultyAlumnusSchema>;

const notFacultyAlumnusSchema = z.object({
  name: z.string(),
  type: z.union([
    z.literal("staff"),
    z.literal("doctor"),
    z.literal("master"),
    z.literal("undergraduate"),
  ]),
  year: z.number(),
  month: z.number(),
});

export type NotFacultyAlumnus = z.infer<typeof notFacultyAlumnusSchema>;

const alumnusSchema = z.union([facultyAlumnusSchema, notFacultyAlumnusSchema]);

export type Alumnus = z.infer<typeof alumnusSchema>;

export type CollectionDataEntry<T> = {
  id: string;
  collection: string;
  data: T;
};

export function isFacultyAlumnus(
  alumni: CollectionDataEntry<Alumnus>
): alumni is CollectionDataEntry<FacultyAlumnus> {
  return alumni.data.type === "faculty";
}

export function isNotFacultyAlumnus(
  alumni: CollectionDataEntry<Alumnus>
): alumni is CollectionDataEntry<NotFacultyAlumnus> {
  return alumni.data.type !== "faculty";
}

const bachelorCapacitySchema = z.object({
  faculties: z.array(reference("member")),
  capacity: z.number().int().positive(),
});

const bachelorInformationSessionSchema = z.object({
  day: z.date().nullish(),
  hour: z
    .object({
      begin: z.string().regex(/\d{2}:\d{2}/),
      end: z.string().regex(/\d{2}:\d{2}/),
    })
    .nullish(),
  place: z.object({
    display: z.string(),
    canonical: z.string(),
  }),
  note: z.string().nullish(),
});

export type InformationSession = z.infer<typeof bachelorInformationSessionSchema>;

const bachelorInfoSchema = z.object({
  capacities: z.array(bachelorCapacitySchema),
  informationSessions: z.array(bachelorInformationSessionSchema),
});

export type BachelorCapacity = z.infer<typeof bachelorCapacitySchema>;
export type BachelorInformationSession = z.infer<
  typeof bachelorInformationSessionSchema
>;
export type BachelorInfo = z.infer<typeof bachelorInfoSchema>;

const teamSchema = (ctx: SchemaContext) => {
  return z.object({
    description: z.string(),
    cover: z.object({
      src: ctx.image(),
      alt: z.string(),
    }),
    name: z.string(),
    recentWorks: z.array(reference("publication")),
    bachelorInfo: bachelorInfoSchema.nullish(),
    icon: z.string(),
    color: z.string(),
  });
}

export type Team = z.infer<ReturnType<typeof teamSchema>>;

const carouselSchema =(ctx: SchemaContext) => z.object({
  src: ctx.image(),
  name: z.string()
});

export type CarouselPicture = z.infer<ReturnType<typeof carouselSchema>>;

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
    schema: alumnusSchema,
  }),
  team: defineCollection({
    type: "content",
    schema: teamSchema,
  }),
  carousel: defineCollection({
    type: "data",
    schema: carouselSchema,
  })
};
