import { Schema, model, models } from "mongoose";

const ChapterSchema = new Schema({
  chapter_name: {
    type: String,
    unique: [true, "The Chapter name exists!"],
    require: [true, "Chapter name is required!"],
  },
  pages: [
    {
      page_number: {
        type: Number,
      },
      page_img_url: {
        type: String,
      },
    },
  ],
});

const Chapter = models?.Chapter || model("Chapter", ChapterSchema);

export { Chapter };
