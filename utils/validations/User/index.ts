import { z } from "zod";

export const userValidator = z.object({
  _id: z.string(),
  email: z.string().min(1, "Email is required."),
  name: z.string(),
  image: z.string(),
});

export type UserType = z.infer<typeof userValidator>;
