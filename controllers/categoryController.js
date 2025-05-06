// controllers/categoryController.js
const Category = require('../models/categoryModel');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.create({ name, description });
    res.status(201).json(category);
  } catch (error) {
    console.error('Create Category Error:', error);
    res.status(500).json({ error: 'Failed to create category' });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Get Categories Error:', error);
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    console.error('Get Category Error:', error);
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    category.name = name ?? category.name;
    category.description = description ?? category.description;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error('Update Category Error:', error);
    res.status(500).json({ error: 'Failed to update category' });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) return res.status(404).json({ error: 'Category not found' });

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete Category Error:', error);
    res.status(500).json({ error: 'Failed to delete category' });
  }
};
