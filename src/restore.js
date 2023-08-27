const Playlist = require('./models/playlist');

const restorePlaylists = (playlists, playlistStorage) => {
  const playlistData = playlistStorage.getPlaylists();
  playlistData.forEach(({ title }) => {
    const playlist = new Playlist(title);
    playlists.add(playlist);
  });
};

module.exports = { restorePlaylists };
