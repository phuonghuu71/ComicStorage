import { z } from "zod";

export const commentValidator = z.object({
  _id: z.string().optional(),
  user: z.object({
    _id: z.string(),
    name: z.string().optional(),
    image: z.string().optional(),
  }),
  message: z.string().min(5, "Please add somethings."),
  chapter: z.object({
    _id: z.string(),
    chapter_name: z.string().optional(),
  }),
  timestamp: z.string().optional(),
});

export type CommentType = z.infer<typeof commentValidator>;

export const totalCommentsValidator = z.object({
  comic: z.object({
    _id: z.string(),
    name: z.string(),
  }),
  comments: z.array(commentValidator),
});

export type TotalCommentsType = z.infer<typeof totalCommentsValidator>;
