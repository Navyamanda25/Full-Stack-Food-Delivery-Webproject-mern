import express from "express";
import Restaurant from "../models/Restaurant.js";

const router = express.Router();

// GET all restaurants
router.get("/", async (req, res) => {
  try {
    const lang = req.query.lang || "en"; // en | hi | te

    const restaurants = await Restaurant.find();

    const formattedRestaurants = restaurants.map((r) => ({
      _id: r._id,
      image: r.image,
      name:
        lang === "hi"
          ? r.name_hi
          : lang === "te"
          ? r.name_te
          : r.name, // default English
    }));

    res.json(formattedRestaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export default router;
