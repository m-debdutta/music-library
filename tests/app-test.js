const request = require('supertest');
const { describe, it } = require('node:test');
const assert = require('assert');

const { createApp } = require('../src/app');
const Playlists = require('../src/models/playlists');
const { Storage } = require('../src/storage');

describe('App', () => {
  describe('GET /', () => {
    it('should serve the home page', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      request(app)
        .get('/')
        .expect(200)
        .expect('content-type', /text\/html/)
        .end(done);
    });
  });

  describe('POST /add-playlist', () => {
    it('should add a playlist', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      const expected = [{ title: 'English' }];

      request(app)
        .post('/add-playlist')
        .send({ playlistTitle: 'English' })
        .expect(201)
        .end((err) => {
          assert.deepStrictEqual(playlists.toJson(), expected);
          done(err);
        });
    });
  });
});
