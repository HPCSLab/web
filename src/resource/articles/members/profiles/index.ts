import type { ResolvedAuditRule } from "astro/runtime/client/dev-overlay/plugins/audit/index.js";
import { z } from "zod";

const teamKindValidator = z.union([
  z.literal("Algorithm"),
  z.literal("System Software"),
  z.literal("Architecture"),
  z.literal("Performance"),
  z.literal("FPGA"),
  z.literal("PA"),
]);

export type TeamKind = z.infer<typeof teamKindValidator>;

const memeberCommonValidator = z.object({
  name: z.string().nullish(),
  eng_name: z.string(),
  img: z.string(),
  team: teamKindValidator,
  username: z.string(),
});

export type MemberCommon = z.infer<typeof memeberCommonValidator>;

const facultyGradeValidator = z.union([
  z.literal("Professor"),
  z.literal("Associate Professor"),
  z.literal("Assistant Professor"),
  z.literal("Professor (Cooperative Graduate School Program)"),
]);

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

export type FacultyGrade = z.infer<typeof facultyGradeValidator>;

const facultyValidator = z.object({
  occupation: z.literal("Faculty"),
  grade: facultyGradeValidator,
});

export type Faculty = z.infer<typeof facultyValidator>;

const researcherValidator = z.object({
  occupation: z.literal("Researcher"),
});

export type Researcher = z.infer<typeof researcherValidator>;

const studentGradeValidator = z.union([
  z.literal("D3"),
  z.literal("D2"),
  z.literal("D1"),
  z.literal("M2"),
  z.literal("M1"),
  z.literal("B4"),
]);

export type StudentGrade = z.infer<typeof studentGradeValidator>;

const studentValidator = z.object({
  occupation: z.literal("Student"),
  grade: studentGradeValidator,
});

export type Student = z.infer<typeof studentValidator>;

const researchStudentValidator = z.object({
  occupation: z.literal("Research Student"),
});

export type ResearchStudent = z.infer<typeof researchStudentValidator>;

const memberValidator = z.intersection(
  z.union([
    facultyValidator,
    researcherValidator,
    studentValidator,
    researchStudentValidator,
  ]),
  memeberCommonValidator,
);

export type Member = z.infer<typeof memberValidator>;

const isFaculty = (member: Member): member is Faculty & MemberCommon =>
  member.occupation === "Faculty";

const isStudent = (member: Member): member is Student & MemberCommon =>
  member.occupation === "Student";

const isResearcher = (member: Member): member is Researcher & MemberCommon =>
  member.occupation === "Researcher";

const isResearchStudent = (
  member: Member,
): member is ResearchStudent & MemberCommon =>
  member.occupation === "Research Student";

export const members: Member[] = await Promise.all(
  Object.values(import.meta.glob("./**/*.yml")).map(async (value) =>
    memberValidator.parse(((await value()) as { default: any }).default),
  ),
);

export const faculties: (Faculty & MemberCommon)[] = members.filter(isFaculty);
export const students: (Student & MemberCommon)[] = members.filter(isStudent);
export const researchers: (Researcher & MemberCommon)[] =
  members.filter(isResearcher);
export const researchStudents: (ResearchStudent & MemberCommon)[] =
  members.filter(isResearchStudent);
