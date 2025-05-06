// routes/route.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoute');
const categoryRoutes = require('./categoryRoute'); 


// Root API route
router.get('/', (req, res) => {
  res.json({ message: 'API is running 🛍️' });
});

// routes
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);

module.exports = router;
