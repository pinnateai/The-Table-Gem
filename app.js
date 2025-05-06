//app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const routes = require('./routes/route');
const sequelize = require('./config/sequelize');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


app.use('/api', routes);


// Test database connection
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  })();

//   sequelize.sync({ alter: true }) // Or { force: true } for dev
//   .then(() => console.log('All models synced'))
//   .catch(err => console.error('Sync error:', err));

  module.exports = app;