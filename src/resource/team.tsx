import { z } from "zod";

const facultyFrontmatterValidator = z.object({
  name: z.string(),
  personal_page: z.string(),
});

export type FacultyFrontmatter = z.infer<typeof facultyFrontmatterValidator>;

const aboutFrontmatterValidator = z.object({
  faculties: z.array(z.string()),
});

export type AboutFrontmatter = z.infer<typeof aboutFrontmatterValidator>;

const forBachelorsFrontmatterValidator = z.object({
  number_of_positions: z
    .array(
      z.object({
        name: z.string(),
        number: z.number().int(),
      }),
    )
    .nullable(),
});

export type ForBachelorsFrontmatter = z.infer<
  typeof forBachelorsFrontmatterValidator
>;

const memberValidator = z.object({
  name: z.string(),
  role: z.string(),
  keywords: z.array(z.string()),
  message: z.string(),
});

export type Member = z.infer<typeof memberValidator>;

const membersValidator = z.array(memberValidator);

export type Members = z.infer<typeof membersValidator>;
