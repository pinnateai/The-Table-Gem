// routes/route.js
const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoute'); // Adjust the path as necessary


// Root API route
router.get('/', (req, res) => {
  res.json({ message: 'API is running 🛍️' });
});

// Auth routes
router.use('/auth', authRoutes);

module.exports = router;
