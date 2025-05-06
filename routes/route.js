// routes/route.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoute');
const categoryRoutes = require('./categoryRoute'); 
const productRoutes = require('./productRoute');
const cartRoutes = require('./cartItemRoute');


// Root API route
router.get('/', (req, res) => {
  res.json({ message: 'API is running 🛍️' });
});

// routes
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/products', productRoutes);
router.use('/uploads', express.static('public/uploads'));
router.use('/cart', cartRoutes);

module.exports = router;
