import express from "express";
import { placeOrder, getMyOrders } from "../controllers/orderController.js";
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.post("/place", authMiddleware, placeOrder);
router.get("/myorders", authMiddleware, getMyOrders);

export default router;
