const { CartItem, Product } = require('../models/indexModel');


// POST /cart
exports.addToCart = async (req, res) => {
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

  const { product_id, quantity } = req.body || {};

  if (!product_id || !quantity) 
    return res.status(400).json({ 
        error: 'Product ID and quantity are required'
    });

  const user_id = req.user.id;
  try {
    let cartItem = await CartItem.findOne({ where: { 
        user_id,
        product_id 
    } 
});

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ 
        user_id,
        product_id,
        quantity
    });
    }

    res.json({ message: 'Product added to cart', cartItem });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};



// GET /cart
exports.getCartItems = async (req, res) => {
  const user_id = req.user.id;

  try {
    const items = await CartItem.findAll({
      where: { user_id },
      include: Product
    });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// PUT /cart/:id
exports.updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // cart item ID
    const { quantity } = req.body;

    const cartItem = await CartItem.findOne({ where: { id, user_id: req.user.id } });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while updating cart item' });
  }
};

// DELETE /cart/:id
exports.removeCartItem = async (req, res) => {
  const { id } = req.params;
  const user_id = req.user.id;

  try {
    const deleted = await CartItem.destroy({ where: { id, user_id } });

    if (!deleted) return res.status(404).json({ error: 'Cart item not found' });

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
