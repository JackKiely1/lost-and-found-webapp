import express from "express";
import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

const router = express.Router();

/*
  POST /api/items
  Creates a new lost or found item report
*/
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { type, itemName, category, location, description, imageUrl } = req.body;

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

    const newItem = await Item.create({
      type,
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
  "/",
  asyncHandler(async (req, res) => {
    const items = await Item.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      items,
    });
  })
);

export default router;