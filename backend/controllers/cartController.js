const Cart = require('../models/Cart'); // Cart model
const Food = require('../models/Food'); // Food model
const User = require('../models/User'); // User model

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const { foodId, quantity } = req.body;

    // Check if food exists
    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ success: false, message: 'Food not found' });

    // Check if item already in cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const index = cart.items.findIndex(item => item.food.toString() === foodId);
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ food: foodId, quantity });
    }

    await cart.save();
    res.json({ success: true, message: 'Item added to cart', cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    cart.items = cart.items.filter(item => item.food.toString() !== foodId);
    await cart.save();

    res.json({ success: true, message: 'Item removed from cart', cart });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get cart items
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({ user: userId }).populate('items.food');

    if (!cart) return res.json({ success: true, data: [] });

    res.json({ success: true, data: cart.items });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
