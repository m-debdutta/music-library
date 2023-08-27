class Playlist {
  #title;

  constructor(title) {
    this.#title = title;
  }

  get title() {
    return this.#title;
  }

  toJson() {
    return {
      title: this.#title,
    };
  }
}

module.exports = Playlist;
