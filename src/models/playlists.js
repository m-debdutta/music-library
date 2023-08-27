class Playlists {
  #playlists;

  constructor() {
    this.#playlists = {};
  }

  add(playlist) {
    this.#playlists[playlist.title] = playlist;
  }

  toJson() {
    return Object.values(this.#playlists).map((playlist) => playlist.toJson());
  }
}

module.exports = Playlists;
