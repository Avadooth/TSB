import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true }
}, { timestamps: true });

userSchema.methods.verifyPassword = async function (password) {
  const match = await bcrypt.compare(password, this.passwordHash);
  return match;
};

export default mongoose.model("User", userSchema);
