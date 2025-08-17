import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const setToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "6h" });
  res.cookie(process.env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax"
  });
};



export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const existing = await User.findOne({ email });
  if (existing) return res.status(409).json({ message: "Email already exists" });

  const hash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash: hash, name });
  setToken(res, user._id);

  res.json({ email: user.email, name: user.name });
};

export const login = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials Email" });
  }

  const isMatch = await user.verifyPassword(password);
  console.log("Password match:", isMatch);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials password" });
  }

  setToken(res, user._id);
  res.json({ success: true, email: user.email, name: user.name, message: "Logged in" });
};


export const logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.json({ message: "Logged out" });
};


export const getUser = async (req, res) => {
  const token = req.cookies[process.env.COOKIE_NAME];

  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-passwordHash"); // exclude hash

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};