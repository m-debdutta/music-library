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

      assert.deepStrictEqual(playlists.toJson(), [{ title: 'Hindi' }]);
    });
  });
});
