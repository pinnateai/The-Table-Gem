const { Order, OrderItem, CartItem, Product } = require('../models/indexModel');


exports.placeOrder = async (req, res) => {
  const user_id = req.user.id;

  try {
    const cartItems = await CartItem.findAll({
      where: { user_id },
      include: Product
    });


    if (!cartItems.length) return res.status(400).json({ error: 'Cart is empty' });

    const total_amount = cartItems.reduce((sum, item) => sum + (item.quantity * item.Product.price), 0);

    const order = await Order.create({ user_id, total_amount });

    const orderItems = cartItems.map(item => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.Product.price
    }));

    await OrderItem.bulkCreate(orderItems);

    await CartItem.destroy({ where: { user_id } });

    res.status(201).json({ message: 'Order placed', order_id: order.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Order placement failed' });
  }
};

exports.getOrders = async (req, res) => {
    const user_id = req.user.id;
  
    try {
      const orders = await Order.findAll({
        where: { user_id },
        include: [
          {
            model: OrderItem,
            include: [
              {
                model: Product,
                attributes: ['id', 'name', 'price', 'image']
              }
            ]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
  
      res.json(orders);
    } catch (error) {
      console.error('Order fetch error:', error.message);
      res.status(500).json({ error: 'Failed to retrieve orders' });
    }
  };