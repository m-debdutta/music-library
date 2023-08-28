const Playlist = require('../models/playlist');
const { createPlaylist } = require('../template');

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

const servePlaylist = (req, res) => {
  const { playlists } = req.app;
  const { playlistTitle } = req.params;
  const targetedPlaylist = playlists.getPlaylist(playlistTitle);
  const playlist = createPlaylist(targetedPlaylist);
  res.send(playlist);
};

const addSong = (req, res) => {
  const { playlists, playlistStorage } = req.app;
  const { songName } = req.body;
  const { playlistTitle } = req.params;
  playlists.addSong(songName, playlistTitle);
  playlistStorage.store(playlists.toJson(), () => {
    res.status(200).send();
  });
};

module.exports = {
  addSong,
  servePlaylist,
  addNewPlaylist,
  servePlaylists,
  removePlaylist,
};
