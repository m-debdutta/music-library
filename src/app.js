const express = require('express');
const { logger } = require('./middleware/logger');
const { addNewPlaylist } = require('./handlers/handlers');

const createApp = (playlists) => {
  const app = express();
  app.playlists = playlists;

  app.use(logger);
  app.use(express.json());
  app.use(express.urlencoded());

  app.post('/add-playlist', addNewPlaylist);

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
