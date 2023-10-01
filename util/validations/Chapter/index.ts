import { z } from "zod";

export const pagesValidator = z.object({
  page_number: z.number(),
  page_img_url: z.string(),
});

export const chapterValidator = z.object({
  name: z.string().nonempty("The chapter needs a name."),
  pages: z.array(pagesValidator).nonempty("At least add some pages."),
});

export type ChapterType = z.infer<typeof chapterValidator>;
