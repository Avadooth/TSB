import multer from "multer";
import dotenv from "dotenv";

dotenv.config();



export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: Number(process.env.MAX_FILE_BYTES) },
  fileFilter: (_req, file, cb) => {

    if (/^image\/(png|jpe?g|webp)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only image files allowed"));
  }
});
  