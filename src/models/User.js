import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  password: { type: String },
  avatarUrl: String,
  socialOnly: { type: Boolean, default: false },
  name: { type: String },
  location: String,
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
