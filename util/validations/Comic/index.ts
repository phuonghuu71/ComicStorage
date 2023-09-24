import { z } from "zod";

export const comicValidator = z.object({
  uploader: z.string(),
  name: z.string().nonempty("The name is required."),
  description: z.string().nonempty("Please enter description."),
  status: z.string().nonempty("Please choose status."),
  cover: z.string().nonempty("Cover image is required."),
  tags: z.string().array().nonempty("Please select at least 1 tag."),
  views: z.number(),
  last_update: z.date(),
});

export type ComicType = z.infer<typeof comicValidator>;
