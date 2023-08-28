class Playlist {
  #title;
  #songs;

  constructor(title, songs = []) {
    this.#title = title;
    this.#songs = songs;
  }

  get title() {
    return this.#title;
  }

  toJson() {
    return {
      title: this.#title,
      songs: [...this.#songs],
    };
  }
}

module.exports = Playlist;
