const express = require('express');
const { logger } = require('./middleware/logger');

const createApp = () => {
  const app = express();

  app.use(logger);

  app.use(express.static('public'));
  return app;
};

module.exports = { createApp };
