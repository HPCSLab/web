import { z } from "zod";

const commonValidator = z.object({
  name: z.string().nullish(),
});
