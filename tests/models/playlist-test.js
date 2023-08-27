const { describe, it } = require('node:test');
const assert = require('assert');
const Playlist = require('../../src/models/playlist');

describe('Playlist', () => {
  it('should create a playlist with the given title.', () => {
    const playlist = new Playlist('English');

    assert.deepStrictEqual(playlist.toJson(), { title: 'English' });
  });
});