const { createPaymentLink } = require('../config/phonepe');
const { CartItem, Product, Order, OrderItem } = require('../models/indexModel');

// POST /api/checkout
exports.initiateCheckout = async (req, res) => {
  const user_id = req.user.id;

  try {
    // 1. Get cart items
    const cartItems = await CartItem.findAll({
      where: { user_id },
      include: Product
    });

    if (!cartItems.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // 2. Calculate total
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.Product.price;
    }, 0);

    // 3. Generate PhonePe payment link (no crypto)
    const payment = await createPaymentLink(totalAmount, 'http://localhost:5000/api/checkout/confirm');
    console.log('Cart items found:', cartItems.length);
    console.log('Total amount:', totalAmount);


    res.status(200).json({
      paymentLink: payment.paymentUrl,
      transactionId: payment.data.merchantTransactionId
    });
  } catch (error) {
    console.error('Checkout error:', error.message);
    res.status(500).json({ error: 'Failed to initiate checkout' });
  }
};

// POST /api/checkout/confirm
exports.confirmOrder = async (req, res) => {
  const user_id = req.user.id;

  try {
    // 1. Get cart items again (simulate confirmation after payment)
    const cartItems = await CartItem.findAll({
      where: { user_id },
      include: Product
    });

    if (!cartItems.length) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // 2. Calculate total again
    const totalAmount = cartItems.reduce((sum, item) => {
      return sum + item.quantity * item.Product.price;
    }, 0);

    // 3. Create Order
    const order = await Order.create({
      user_id,
      total_amount: totalAmount,
      status: 'paid'
    });

    // 4. Create Order Items
    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.Product.price
    }));

    await OrderItem.bulkCreate(orderItems);

    // 5. Clear the cart
    await CartItem.destroy({ where: { user_id } });

    res.status(201).json({ message: 'Order confirmed', order_id: order.id });
  } catch (error) {
    console.error('Confirm order error:', error.message);
    res.status(500).json({ error: 'Failed to confirm order' });
  }
};

