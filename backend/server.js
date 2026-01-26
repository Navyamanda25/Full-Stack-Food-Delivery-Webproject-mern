import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import restaurantRouter from "./routes/restaurantRoute.js";
import orderRoute from "./routes/orderRoute.js";

// ✅ CREATE APP FIRST
const app = express();
const port = process.env.PORT || 4000;

// ✅ MIDDLEWARE
app.use(express.json());
app.use(cors());

// ✅ DB CONNECTION
connectDB();

// ✅ STATIC IMAGES
app.use("/images", express.static("uploads"));

// ✅ API ROUTES
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/restaurants", restaurantRouter);
app.use("/api/order", orderRoute);

//  TEST ROUTE
app.get("/", (req, res) => {
  res.send("API Working");
});

//  START SERVER
app.listen(port, () => {
  console.log(`Server Started on http://localhost:${port}`);
});
