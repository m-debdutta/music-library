class Playlists {
  #playlists;

  constructor() {
    this.#playlists = {};
  }

  add(playlist) {
    this.#playlists[playlist.title] = playlist;
  }

  addSong(song, playlist) {
    this.#playlists[playlist].add(song);
  }

  remove(playlist) {
    delete this.#playlists[playlist];
  }

  getPlaylist(playlistTitle) {
    return this.#playlists[playlistTitle].toJson();
  }

  toJson() {
    return Object.values(this.#playlists).map((playlist) => playlist.toJson());
  }
}

module.exports = Playlists;
