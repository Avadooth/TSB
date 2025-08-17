import { Router } from "express";
import { signup, login, logout ,getUser} from "../controllers/auth.controller.js";

const router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check", getUser);

export default router;
