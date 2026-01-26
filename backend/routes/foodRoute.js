import express from "express";
import multer from "multer";
import {
  addFood,
  listFood,
  removeFood
} from "../controllers/foodController.js";

const foodRouter = express.Router();

// ================= IMAGE STORAGE =================
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// ================= ROUTES =================

// Add food
foodRouter.post("/add", upload.single("image"), addFood);

// Get all foods   VERY IMPORTANT
foodRouter.get("/list", listFood);

// Remove food
foodRouter.post("/remove", removeFood);

export default foodRouter;
