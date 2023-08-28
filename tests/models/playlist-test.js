const { describe, it } = require('node:test');
const assert = require('assert');
const Playlist = require('../../src/models/playlist');

describe('Playlist', () => {
  it('should create a empty playlist with the given title.', () => {
    const playlist = new Playlist('English');

    assert.deepStrictEqual(playlist.toJson(), { title: 'English', songs: [] });
  });

  it('should create a playlist of given title, with some songs', () => {
    const playlist = new Playlist('English', ['Havana']);

    assert.deepStrictEqual(playlist.toJson(), { title: 'English', songs: ['Havana'] });
  });

  describe('add', () => {
    it('should add a song to an empty playlist', () => {
      const playlist = new Playlist('English');

      playlist.add('Havana');

      assert.deepStrictEqual(playlist.toJson(), { title: 'English', songs: ['Havana'] });
    });
  });
});
