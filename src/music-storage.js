class Storage {
  #fs;
  #storageFilePath;

  constructor(fs, storageFilePath) {
    this.#fs = fs;
    this.#storageFilePath = storageFilePath;
  }

  store(playlists, onWrite) {
    onWrite = !onWrite ? () => {} : onWrite;
    this.#fs.writeFile(this.#storageFilePath, JSON.stringify(playlists, null, 2), onWrite);
  }

  getPlaylists() {
    const data = this.#fs.readFileSync(this.#storageFilePath, 'utf-8');
    return JSON.parse(data || '[]');
  }
}

module.exports = { Storage };
