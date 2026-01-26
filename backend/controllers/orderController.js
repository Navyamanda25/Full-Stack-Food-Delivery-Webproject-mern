import Order from "../models/Order.js";
import "../models/userModel.js";

// =======================
//  PLACE ORDER (USER)
// =======================
export const placeOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      status: "Placed",
    });

    res.json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Order failed",
    });
  }
};

// =======================
//  GET MY ORDERS (USER)
// =======================
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// =======================
//  LIST ALL ORDERS (ADMIN)  
// =======================
export const listOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    console.log("ORDERS IN DB:", orders.length);

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

// =======================
//  MARK ORDER DELIVERED
// =======================
export const markOrderDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = "Delivered";
    await order.save();

    res.json({
      success: true,
      message: "Order marked as delivered",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};