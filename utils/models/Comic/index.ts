import { Schema, model, models } from "mongoose";

const ComicSchema = new Schema({
  uploader: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    require: [true, "The name is required!"],
  },
  description: {
    type: String,
  },
  chapters: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chapter",
    },
  ],
  status: {
    type: String,
  },
  tags: [
    {
      type: String,
      require: [true, "This tag is required!"],
    },
  ],
  cover: {
    type: String,
    require: [true, "This requires cover!"],
  },
  views: {
    type: Number,
  },
  last_update: {
    type: String,
  },
});

const Comic = models?.Comic || model("Comic", ComicSchema);

export { Comic };
