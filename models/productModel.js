const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Product = sequelize.define('Product', {
    name: { 
        type: DataTypes.STRING, 
        allowNull: false },

    description: { 
        type: DataTypes.TEXT },

    price: { 
        type: DataTypes.DECIMAL(10, 2), 
        allowNull: false },

    stock: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
        },

    image_url: { 
        type: DataTypes.TEXT },

    category_id: { 
        type: DataTypes.INTEGER },
},{
    tableName: 'Products',
    timestamps: true
});

  module.exports = Product;