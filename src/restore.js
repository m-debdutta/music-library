const Playlist = require('./models/playlist');

const restorePlaylists = (playlists, playlistStorage) => {
  const playlistData = playlistStorage.getPlaylists();
  playlistData.forEach(({ title, songs }) => {
    const playlist = new Playlist(title, songs);
    playlists.add(playlist);
  });
};

module.exports = { restorePlaylists };
