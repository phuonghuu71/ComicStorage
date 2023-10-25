import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  user: {},
  chapter: {},
  timestamp: "",
  message: {},
});

// If the model is existed, it's re-assign the existed model
// Else it creates a new one
const Comment = models?.Comment || model("Comment", CommentSchema);

export { Comment };
