import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  chapter: {
    type: Schema.Types.ObjectId,
    ref: "Chapter",
  },
  timestamp: {
    type: String,
  },
  message: {
    type: String,
  },
});

const Comment = models?.Comment || model("Comment", CommentSchema);

export { Comment };
