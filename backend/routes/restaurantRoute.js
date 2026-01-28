import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// GET all restaurants
router.get("/", async (req, res) => {
  try {
    const lang = req.query.lang || "en";

    const restaurants = await Restaurant.find();

    const formatted = restaurants.map((r) => ({
      _id: r._id,
      image: r.image,
      displayName:
        lang === "hi"
          ? r.name_hi
          : lang === "te"
          ? r.name_te
          : r.name,
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
