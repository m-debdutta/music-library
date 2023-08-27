const express = require('express');
const { logger } = require('./middleware/logger');
const { addNewPlaylist, servePlaylists, removePlaylist } = require('./handlers/handlers');
const { restorePlaylists } = require('./restore');

const createApp = (playlists, playlistStorage) => {
  const app = express();

  restorePlaylists(playlists, playlistStorage);
  app.playlists = playlists;
  app.playlistStorage = playlistStorage;

  app.use(logger);
  app.use(express.json());

  app.get('/playlists', servePlaylists);
  app.post('/add-playlist', addNewPlaylist);
  app.delete('/playlists/playlist', removePlaylist);

  app.use(express.static('public'));

  return app;
};

module.exports = { createApp };
