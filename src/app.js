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
const { parseCookie } = require('./middleware/cookie-parser');
const { authenticate, setCookie } = require('./middleware/auth');

const setUpMiddleware = (app) => {
  app.use(logger);
  app.use(express.json());
  app.use(parseCookie);
  app.use(express.static('public'));
  app.post('/login', setCookie);
  app.use(authenticate);
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
  app.post('/playlists/:playlistTitle/song', addSong);
  app.delete('/playlists/playlist', removePlaylist);

  app.use(express.static('private'));

  return app;
};

module.exports = { createApp };
