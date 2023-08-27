const request = require('supertest');
const { describe, it } = require('node:test');
const assert = require('assert');

const { createApp } = require('../src/app');
const Playlists = require('../src/models/playlists');

describe('App', () => {
  describe('GET /', () => {
    it('should serve the home page', (_, done) => {
      const app = createApp();

      request(app)
        .get('/')
        .expect(200)
        .expect('content-type', /text\/html/)
        .end(done);
    });
  });

  describe('POST /add-playlist', () => {
    it('should add a playlist', (_, done) => {
      const playlists = new Playlists();
      const app = createApp(playlists);

      const expected = [{ title: 'English' }];

      request(app)
        .post('/add-playlist')
        .send('playlistTitle=English')
        .expect(201)
        .end((err) => {
          assert.deepStrictEqual(playlists.toJson(), expected);
          done(err);
        });
    });
  });
});
