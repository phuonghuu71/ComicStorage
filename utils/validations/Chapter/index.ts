import { z } from "zod";

export const pagesValidator = z.object({
  page_number: z.number(),
  page_img_url: z.string(),
});

export const chapterValidator = z.object({
  _id: z.string().optional(),
  chapter_name: z.string().min(1, "The chapter needs a name."),
  pages: z.array(pagesValidator).nonempty("At least add some pages."),
});

export type ChapterType = z.infer<typeof chapterValidator>;

export const totalChapterValidator = z.object({
  chapters: z.array(chapterValidator),
  numberOfPages: z.number(),
});

export type TotalChapterType = z.infer<typeof totalChapterValidator>;
