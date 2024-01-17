import { z } from "zod";
import alumnus from "./alumni.yml";

const alumniValidator = z.object({
  name: z.string(),
  month: z.number(),
  year: z.number(),
});

const alumnusValidator = z.object({
  faculty: z.array(z.string()),
  staff: z.array(alumniValidator),
  doctor: z.array(alumniValidator),
  master: z.array(alumniValidator),
  undergraduate: z.array(alumniValidator),
});

export default alumnusValidator.parse(alumnus);
