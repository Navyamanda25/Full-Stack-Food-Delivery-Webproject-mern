import foodModel from "../models/foodModel.js";
import fs from "fs";

// ================= ADD FOOD =================
const addFood = async (req, res) => {
  try {
    const image_filename = req.file.filename;

   const food = new foodModel({
  name: req.body.name,
  name_hi: req.body.name_hi,
  name_te: req.body.name_te,
  description: req.body.description,
  price: req.body.price,
  category: req.body.category,
  image: image_filename,

  
  restaurant: req.body.restaurant   
});

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// ================= LIST FOOD =================
const listFood = async (req, res) => {
  try {
    const lang = req.query.lang || "en"; // en | hi | te

    const foods = await foodModel.find({});

    const formattedFoods = foods.map((f) => ({
      _id: f._id,
      image: f.image,
      price: f.price,
      category: f.category,
      description: f.description,
      name:
        lang === "hi"
          ? f.name_hi
          : lang === "te"
          ? f.name_te
          : f.name,
    }));

    res.json({ success: true, data: formattedFoods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// ================= REMOVE FOOD =================
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };
