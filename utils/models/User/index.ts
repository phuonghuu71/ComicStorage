import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    require: [true, "Email is required!"],
  },
  name: {
    type: String,
  },
  image: {
    type: String,
  },
});

// If the model is existed, it's re-assign the existed model
// Else it creates a new one
const User = models?.User || model("User", UserSchema);

export { User };
