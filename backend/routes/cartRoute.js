const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const auth = require('../middleware/auth');

// All routes require authentication
router.post('/add', auth, addToCart);
router.post('/remove', auth, removeFromCart);
router.get('/list', auth, getCart);

module.exports = router;
