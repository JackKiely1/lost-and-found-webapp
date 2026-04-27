import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      msg: "Not authorised. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: "Not authorised. User not found.",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      msg: "Not authorised. Token failed.",
    });
  }
});