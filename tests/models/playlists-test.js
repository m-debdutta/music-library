const { describe, it } = require('node:test');
const assert = require('assert');
const Playlist = require('../../src/models/playlist');
const Playlists = require('../../src/models/playlists');

describe('Playlists', () => {
  describe('add', () => {
    it('should add a playlist.', () => {
      const hindiSongs = new Playlist('Hindi');
      const playlists = new Playlists();

      playlists.add(hindiSongs);

      assert.deepStrictEqual(playlists.toJson(), [{ title: 'Hindi', songs: [] }]);
    });
  });

  describe('addSong', () => {
    it('should add a song to a empty playlist.', () => {
      const hindiSongs = new Playlist('Hindi');
      const playlists = new Playlists();

      playlists.add(hindiSongs);
      playlists.addSong('Tum paas aye', 'Hindi');

      assert.deepStrictEqual(playlists.toJson(), [
        { title: 'Hindi', songs: ['Tum paas aye'] },
      ]);
    });

    it('should add a song to a playlist that already have some songs.', () => {
      const hindiSongs = new Playlist('Hindi', ['DJ wale babu']);
      const playlists = new Playlists();

      playlists.add(hindiSongs);
      playlists.addSong('Tum paas aye', 'Hindi');

      assert.deepStrictEqual(playlists.toJson(), [
        { title: 'Hindi', songs: ['DJ wale babu', 'Tum paas aye'] },
      ]);
    });
  });
});
