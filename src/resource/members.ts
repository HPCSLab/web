import { z } from "zod";
import alumniSrc from "./articles/members/alumni.yml";

const studentValidator = z.object({
  occupation: z.literal("Student"),
  grade: z.union([
    z.literal("D3"),
    z.literal("D2"),
    z.literal("D1"),
    z.literal("M2"),
    z.literal("M1"),
    z.literal("B4"),
  ]),
});

export type Student = z.infer<typeof studentValidator>;

const facultyValidator = z.object({
  occupation: z.literal("Faculty"),
  grade: z.union([
    z.literal("Professor"),
    z.literal("Associate Professor"),
    z.literal("Assistant Professor"),
    z.literal("Professor (Cooperative Graduate School Program)"),
  ]),
});

export type Faculty = z.infer<typeof facultyValidator>;

const researcherValidator = z.object({
  occupation: z.literal("Researcher"),
});

export type Researcher = z.infer<typeof researcherValidator>;

const researchStudentValidator = z.object({
  occupation: z.literal("Research Student"),
});

export type ResearchStudent = z.infer<typeof researchStudentValidator>;

const teamValidator = z.union([
  z.literal("Algorithm"),
  z.literal("Performance"),
  z.literal("FPGA"),
  z.literal("Architecture"),
  z.literal("System Software"),
  z.literal("PA"),
]);

export type TeamKind = z.infer<typeof teamValidator>;

const memberVerifier = z.intersection(
  z.object({
    name: z.string().nullish(),
    eng_name: z.string(),
    team: teamValidator,
    img: z.string(),
    username: z.string(),
  }),
  z.union([
    studentValidator,
    facultyValidator,
    researcherValidator,
    researchStudentValidator,
  ])
);

export type Member = z.infer<typeof memberVerifier>;

export const members = Object.values(
  import.meta.glob("./articles/members/profiles/*.yml", {
    eager: true,
  }) as Record<string, { default: any }>
).map((member) => memberVerifier.parse(member.default));

const alumniProfile = z.object({
  name: z.string(),
  year: z.number(),
  month: z.number(),
});

export type AlumniProfile = z.infer<typeof alumniProfile>;

const alumniValidator = z.object({
  faculty: z.array(z.string()),
  staff: z.array(alumniProfile),
  doctor: z.array(alumniProfile),
  master: z.array(alumniProfile),
  undergraduate: z.array(alumniProfile),
});

export type Alumni = z.infer<typeof alumniValidator>;

export const alumni = alumniValidator.parse(alumniSrc);
