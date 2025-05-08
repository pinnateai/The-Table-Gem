const sequelize = require('../config/sequelize');

// Import all models
const Product = require('./productModel');
const Category = require('./categoryModel');
const CartItem = require('./cartItemModel');
const User = require('./usersModel');
const Order = require('./orderModel');
const OrderItem = require('./orderItemModel');


// Associations
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

Product.hasMany(CartItem, { foreignKey: 'product_id' });
CartItem.belongsTo(Product, { foreignKey: 'product_id' });

User.hasMany(CartItem, { foreignKey: 'user_id' }); 
CartItem.belongsTo(User, { foreignKey: 'user_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });

Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });


// User.hasMany(Order, { foreignKey: 'user_id' }); // Updated to PascalCase
// Order.belongsTo(User, { foreignKey: 'user_id' }); // Updated to PascalCase


// Export all models and sequelize instance
module.exports = {
  sequelize,
  Product,
  Category,
  CartItem,
  User,
  Order,
  OrderItem
};