// routes/route.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoute');
const categoryRoutes = require('./categoryRoute'); 
const productRoutes = require('./productRoute');
const cartRoutes = require('./cartItemRoute');
const orderRoutes = require('./orderRoute');
const checkoutRoutes = require('./checkoutRoute')


// routes
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/uploads', express.static('public/uploads'));
router.use('/cart', cartRoutes);
router.use('/orders', orderRoutes);
router.use('/checkout', checkoutRoutes);

// Root API route
router.get('/', (req, res) => {
  res.json({ message: 'API is running 🛍️' });
});

module.exports = router;
