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

const teamKindSchema = z.union([
  z.literal("Algorithm"),
  z.literal("System Software"),
  z.literal("Architecture"),
  z.literal("Performance"),
  z.literal("FPGA"),
  z.literal("PA"),
]);

export type TeamKind = z.infer<typeof teamKindSchema>;

const memberCommonSchema = (ctx: SchemaContext) =>
  z.object({
    name: z.string().nullish(),
    eng_name: z.string(),
    icon: ctx.image(),
    team: teamKindSchema,
    username: z.string(),
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
    ]),
  );

export type Member = z.infer<ReturnType<typeof memberSchema>>;

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
  alumni: CollectionDataEntry<Alumnus>,
): alumni is CollectionDataEntry<FacultyAlumnus> {
  return alumni.data.type === "faculty";
}

export function isNotFacultyAlumnus(
  alumni: CollectionDataEntry<Alumnus>,
): alumni is CollectionDataEntry<NotFacultyAlumnus> {
  return alumni.data.type !== "faculty";
}

const teamMemberSchema = z.object({
  name: z.string(),
  profile: reference("member"),
  role: z.string(),
  message: z.string(),
  keywords: z.array(z.string()).nullish(),
});

export type TeamMember = z.infer<typeof teamMemberSchema>;

const teamRecentWorkSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  url: z.string().nullish(),
  description: z.array(z.string()),
});

export type TeamRecentWork = z.infer<typeof teamRecentWorkSchema>;

const bachelorCapacitySchema = z.object({
    faculties: z.array(reference('member')),
    capacity: z.number().int().positive()
  });

const bachelorInformationSessionSchema = z.object({
    begin: z.date(),
    end: z.date(),
    place: z.object({
      display: z.string(),
      canonical: z.string(),
    }),
    note: z.string().nullish()
  });

const bachelorInfoSchema = z.object({
  capacities: z.array(bachelorCapacitySchema),
  description: z.string(),
  informationSessions: z.array(bachelorInformationSessionSchema),
});

export type BachelorCapacity = z.infer<typeof bachelorCapacitySchema>;
export type BachelorInformationSession = z.infer<typeof bachelorInformationSessionSchema>;
export type BachelorInfo = z.infer<typeof bachelorInfoSchema>;

const teamSchema = (ctx: SchemaContext) =>
  z.object({
    cover: ctx.image(),
    recentWorks: z.array(reference("publication")),
    bachelorInfo: bachelorInfoSchema,
  });

export type Team = z.infer<ReturnType<typeof teamSchema>>;


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
    type: "data",
    schema: teamSchema,
  }),
  bachelor: defineCollection({
    type: "data",
    schema: bachelorInfoSchema,
  })
};
