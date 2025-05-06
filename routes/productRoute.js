const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/uploads'); // Adjust the path as necessary
const multer = require('multer');
const path = require('path');


//product routes
router.post('/', upload.single('image'), productController.createProduct);
router.put('/:id', upload.single('image'), productController.updateProduct);
router.get('/', productController.getAllProducts);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
