import { z } from "zod";

export const comicValidator = z.object({
  uploader: z.string(),
  chapters: z
    .object({
      chapter_name: z.string(),
      pages: z
        .object({
          page_number: z.number(),
          page_img_url: z.string(),
        })
        .array(),
    })
    .array()
    .optional(),
  name: z.string().nonempty("The name is required."),
  description: z.string().nonempty("Please enter description."),
  status: z.string().nonempty("Please choose status."),
  cover: z.string().nonempty("Cover image is required."),
  tags: z.string().array().nonempty("Please select at least 1 tag."),
  views: z.number(),
  last_update: z.date(),
  _id: z.string().optional(),
});

export type ComicType = z.infer<typeof comicValidator>;

export const totalComicValidator = z.object({
  comics: z.array(comicValidator),
  numberOfPages: z.number(),
});

export type TotalComicType = z.infer<typeof totalComicValidator>;