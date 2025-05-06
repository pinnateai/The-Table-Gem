const Product = require('../models/productModel');

 // POST /products
 exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category_id } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = await Product.create({ name, description, price, category_id, image });
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Product creation failed' });
  }
};

// GET /products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};
  
// PUT /products/:id
exports.updateProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.update(req.body);
    res.json(product);
  };
  
  // DELETE /products/:id
exports.deleteProduct = async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    await product.destroy();
    res.json({ message: 'Product deleted' });
  };