import cloudinary from "../config/cloudinary.js";
import Image from "../models/Image.js";
import User from "../models/User.js";
import User from "../models/User.js";

export const getMyImages = async (req, res) => {
  const images = await Image.find({ userId: req.user.id }).sort({ createdAt: -1 });
  const User= await User.findById(req.user.id).select("name email");


  res.json(images, {
    user: {
      id: User._id,
      name: User.name,
      email: User.email
    }
  });
};

export const uploadImage = async (req, res) => {


  if (!req.file || !req.file.buffer || req.file.buffer.length === 0) {
    return res.status(400).json({ message: "No file uploaded or file is empty" });
  }

  cloudinary.uploader.upload_stream(
    { folder: `images/${req.user.id}` },
    async (err, result) => {
      if (err) {
        console.error("Cloudinary upload error:", err);
        return res.status(500).json({ message: "Upload failed" });
      }

      const img = await Image.create({
        userId: req.user.id,
        publicId: result.public_id,
        url: result.secure_url,
        originalFilename: req.file.originalname
      });

      res.status(201).json(img);
    }
  ).end(req.file.buffer);
};
