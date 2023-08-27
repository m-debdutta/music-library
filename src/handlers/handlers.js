const Playlist = require('../models/playlist');

const addNewPlaylist = (req, res) => {
  const { playlistTitle } = req.body;
  const playlist = new Playlist(playlistTitle);
  res.app.playlists.add(playlist);
  res.status(201).send();
};

module.exports = { addNewPlaylist };
