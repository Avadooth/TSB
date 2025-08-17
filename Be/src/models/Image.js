import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  publicId: String,
  url: String,
  originalFilename: String
}, { timestamps: true });

export default mongoose.model("Image", imageSchema);
