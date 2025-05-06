const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartItemController');
const auth = require('../middleware/auth')

router.post('/', auth, cartController.addToCart);
router.get('/', auth, cartController.getCartItems);
router.put('/:id', auth, cartController.updateCartItem);
router.delete('/:id', auth, cartController.removeCartItem);

module.exports = router;