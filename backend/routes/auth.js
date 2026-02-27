import express from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const router = express.Router();

// SETU-only rule
function isSetuEmail(email) {
  return email.toLowerCase().trim().endsWith("@setu.ie");
}

// POST /api/auth/register
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, msg: "Full name, email and password are required." });
    }

    if (!isSetuEmail(email)) {
      return res.status(400).json({ success: false, msg: "SETU email required (@setu.ie)." });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, msg: "Password must be at least 6 characters." });
    }

    const existing = await User.findByEmail(email);
    if (existing) {
      return res.status(409).json({ success: false, msg: "User already exists." });
    }

    await User.create({ fullName, email, password });

    return res.status(201).json({ success: true, msg: "User successfully created." });
  })
);

// POST /api/auth/login
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Email and password are required." });
    }

    if (!isSetuEmail(email)) {
      return res.status(400).json({ success: false, msg: "SETU email required (@setu.ie)." });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, msg: "Authentication failed. User not found." });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Wrong password." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      success: true,
      token: "BEARER " + token,
      user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role }
    });
  })
);

export default router;
