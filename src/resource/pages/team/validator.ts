import { z } from "zod";

export const member = z.object({
  name: z.string(),
  icon: z.string(),
  role: z.string(),
  message: z.string(),
  keywords: z.array(z.string()).nullish(),
});

export const recentWork = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  url: z.string().nullish(),
  description: z.array(z.string()),
});
