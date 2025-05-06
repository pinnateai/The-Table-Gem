require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.The_Table_Gem_DB_NAME,
  process.env.The_Table_Gem_USER,
  process.env.The_Table_Gem_PASSWORD,
  {
    host: process.env.The_Table_Gem_HOST,
    dialect: 'mysql',
    port: 3306,
  }
);


module.exports = sequelize;

