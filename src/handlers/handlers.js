const Playlist = require('../models/playlist');

const addNewPlaylist = (req, res) => {
  const { playlists, playlistStorage } = req.app;
  const { playlistTitle } = req.body;
  const playlist = new Playlist(playlistTitle);
  playlists.add(playlist);
  playlistStorage.store(playlists.toJson(), () => {
    res.status(201).send();
  });
};

const servePlaylists = (req, res) => {
  const { playlists } = req.app;
  res.json(playlists.toJson());
};

const removePlaylist = (req, res) => {
  const { playlists, playlistStorage } = req.app;
  const { playlistTitle } = req.body;
  playlists.remove(playlistTitle);
  playlistStorage.store(playlists.toJson(), () => {
    res.status(204).send();
  });
};

module.exports = { addNewPlaylist, servePlaylists, removePlaylist };
