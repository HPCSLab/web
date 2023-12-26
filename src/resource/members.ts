import { z } from "zod";

const studentVerifier = z.object({
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

const fucultyVerifier = z.object({
  occupation: z.literal("Faculty"),
  grade: z.union([
    z.literal("Professor"),
    z.literal("Associate Professor"),
    z.literal("Assistant Professor"),
    z.literal("Professor (Cooperative Graduate School Program)"),
  ]),
});

const researcherVerifier = z.object({
  occupation: z.literal("Researcher"),
});

const researchStudentVerifier = z.object({
  occupation: z.literal("Research Student"),
});

const teamVerifier = z.union([
  z.literal("Algorithm"),
  z.literal("Performance"),
  z.literal("FPGA"),
  z.literal("Architecture"),
  z.literal("System Software"),
  z.literal("PA"),
]);

const memberVerifier = z.intersection(
  z.object({
    name: z.string().nullish(),
    eng_name: z.string(),
    team: teamVerifier,
    img: z.string(),
    username: z.string(),
  }),
  z.union([
    studentVerifier,
    fucultyVerifier,
    researcherVerifier,
    researchStudentVerifier,
  ])
);

export type Member = z.infer<typeof memberVerifier>;

const membersSrc = import.meta.glob("../../members/profiles/*.yml", {
  eager: true,
}) as Record<string, { default: any }>;

export const members = Object.values(membersSrc).map((member) =>
  memberVerifier.parse(member.default)
);
