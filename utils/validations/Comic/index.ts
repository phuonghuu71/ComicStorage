import { z } from "zod";

export const comicValidator = z.object({
  _id: z.string().optional(),
  uploader: z.string(),
  chapters: z.string().array().optional(),
  name: z.string().min(1, "The name is required."),
  description: z.string().min(1, "Please enter description."),
  status: z.string().min(1, "Please choose status."),
  cover: z.string().min(1, "Cover image is required."),
  tags: z.string().array().nonempty("Please select at least 1 tag."),
  views: z.number(),
  last_update: z.date(),
});

export type ComicType = z.infer<typeof comicValidator>;

export const totalComicValidator = z.object({
  comics: z.array(comicValidator),
  numberOfPages: z.number(),
});

export type TotalComicType = z.infer<typeof totalComicValidator>;
