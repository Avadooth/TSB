import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/db/connect.js";
import authRoutes from "./src/routes/auth.routes.js";
import imageRoutes from "./src/routes/images.routes.js";

dotenv.config();

const app = express();


app.use(
  cors({
    origin: [
      "https://tsb-sepia.vercel.app",
      "https://tsb-avadooths-projects.vercel.app",
    ],
    credentials: true,
  })
);




connectDB();


app.use(cookieParser());

app.use("/api/auth", express.json(), authRoutes);
app.use("/api/images", imageRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log(
    `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});