import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import multer from "multer";
import { getMyImages, uploadImage } from "../controllers/images.controller.js";

const router = Router();
router.get("/", requireAuth, getMyImages);
// const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", requireAuth, upload.single("images"), uploadImage);

export default router;
