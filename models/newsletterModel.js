const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Newsletter = sequelize.define('Newsletter', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
}, {
  tableName: 'newsletter_subscribers',
  timestamps: true
});

module.exports = Newsletter;
