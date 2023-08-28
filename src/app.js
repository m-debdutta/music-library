const express = require('express');
const { logger } = require('./middleware/logger');
const {
  addNewPlaylist,
  servePlaylists,
  removePlaylist,
  addSong,
  servePlaylist,
} = require('./handlers/handlers');
const { restorePlaylists } = require('./restore');

const setUpMiddleware = (app) => {
  app.use(logger);
  app.use(express.json());
  app.use(express.static('public'));
};

const createApp = (playlists, playlistStorage) => {
  const app = express();

  restorePlaylists(playlists, playlistStorage);
  app.playlists = playlists;
  app.playlistStorage = playlistStorage;

  setUpMiddleware(app);

  app.get('/playlists', servePlaylists);
  app.get('/playlists/:playlistTitle', servePlaylist);
  app.post('/add-playlist', addNewPlaylist);
  app.delete('/playlists/playlist', removePlaylist);
  app.post('/playlists/:playlistTitle/song', addSong);

  app.use(express.static('private'));

  return app;
};

module.exports = { createApp };
