import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  getMyOrders,
  markOrderDelivered,
  listOrders,
} from "../controllers/orderController.js";

const router = express.Router();

// USER
router.post("/place", authMiddleware, placeOrder);
router.get("/myorders", authMiddleware, getMyOrders);

// ADMIN
router.get("/list", listOrders);
router.put("/deliver/:id", authMiddleware, markOrderDelivered);

export default router;