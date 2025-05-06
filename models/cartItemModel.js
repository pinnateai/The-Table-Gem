const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const CartItem  = sequelize.define('CartItem', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  }, {
    tableName: 'cart',
    timestamps: false 
  }
);

CartItem.associate = (models) => {
  CartItem.belongsTo(models.User, { foreignKey: 'user_id' });
  CartItem.belongsTo(models.Product, { foreignKey: 'product_id' });
};

module.exports = CartItem ;
