import express from "express";
import asyncHandler from "express-async-handler";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import Item from "../models/itemModel.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
/*
  POST /api/items
  Creates a new lost or found item report
*/
router.post(
  "/",
  protect,
  upload.single("image"),
  asyncHandler(async (req, res) => {
    const { type, itemName, category, location, description } = req.body;

    if (!type || !["lost", "found"].includes(type)) {
      return res.status(400).json({
        success: false,
        msg: "Item type must be either lost or found.",
      });
    }

    if (!itemName || !category || !location) {
      return res.status(400).json({
        success: false,
        msg: "Item name, category, and location are required.",
      });
    }

        let imageUrl = "";

    if (req.file) {
      const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const uploadResult = await cloudinary.uploader.upload(base64Image, {
        folder: "findit-items",
      });

      imageUrl = uploadResult.secure_url;
    }

    const newItem = await Item.create({
      type,
      reportedBy: req.user._id,
      itemName,
      category,
      location,
      description: description || "",
      imageUrl: imageUrl || "",
    });

    return res.status(201).json({
      success: true,
      msg: "Item report created successfully.",
      item: newItem,
    });
  })
);

router.get(
  "/admin/pending",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const items = await Item.find({status: "pending"}).populate("reportedBy", "fullName email").sort({ createdAt: -1 });

    res.json({
      success: true,
      items,
    });
  })
);

router.patch(
  "/:id/status",
  protect,
  adminOnly,
  asyncHandler(async (req, res) => {
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        msg: "Invalid status",
      });
    }

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        msg: "Item not found",
      });
    }

    item.status = status;
    await item.save();

    res.json({
      success: true,
      msg: `Item ${status}`,
      item,
    });
  })
);

export default router;