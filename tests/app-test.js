const request = require('supertest');
const { describe, it } = require('node:test');
const assert = require('assert');

const { createApp } = require('../src/app');
const Playlists = require('../src/models/playlists');
const { Storage } = require('../src/storage');
const Playlist = require('../src/models/playlist');

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

  describe('GET /playlists', () => {
    it('should serve empty list, when playlists is empty', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      request(app)
        .get('/playlists')
        .set('cookie', ['username=debu;password=12345'])
        .expect(200)
        .expect([])
        .end(done);
    });

    it('should serve all playlists when playlists is not empty', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      const hindi = new Playlist('hindi');
      playlists.add(hindi);

      request(app)
        .get('/playlists')
        .set('cookie', ['username=debu;password=12345'])
        .expect(200)
        .expect([{ title: 'hindi', songs: [] }])
        .end(done);
    });
  });

  describe('POST /playlists/:playlistTitle', () => {
    it('should add song to an empty playlist', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      const expected = [{ title: 'English', songs: ['cheque'] }];
      const playlist = new Playlist('English');
      playlists.add(playlist);

      request(app)
        .post('/playlists/English/song')
        .set('cookie', ['username=debu;password=12345'])
        .type('application/json')
        .send({ songName: 'cheque' })
        .expect(200)
        .end((err) => {
          assert.deepStrictEqual(playlists.toJson(), expected);
          done(err);
        });
    });

    it('should add song to a playlist containing songs', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const expected = [{ title: 'English', songs: ['Killer queen', 'cheque'] }];
      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      const playlist = new Playlist('English');
      playlists.add(playlist);
      playlists.addSong('Killer queen', 'English');

      request(app)
        .post('/playlists/English/song')
        .set('cookie', ['username=debu;password=12345'])
        .type('application/json')
        .send({ songName: 'cheque' })
        .expect(200)
        .end((err) => {
          assert.deepStrictEqual(playlists.toJson(), expected);
          done(err);
        });
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

      const expected = [{ title: 'English', songs: [] }];

      request(app)
        .post('/add-playlist')
        .set('cookie', ['username=debu;password=12345'])
        .send({ playlistTitle: 'English' })
        .expect(201)
        .end((err) => {
          assert.deepStrictEqual(playlists.toJson(), expected);
          done(err);
        });
    });
  });

  describe('GET /playlists/:playlistTitle', () => {
    it('should get the songs of a playlist', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      const playlist = new Playlist('English');
      playlists.add(playlist);

      request(app)
        .get('/playlists/English')
        .set('cookie', ['username=debu;password=12345'])
        .expect(200)
        .expect('content-type', /text\/html/)
        .end(done);
    });
  });

  describe('DELETE /playlists/playlist', () => {
    it('should delete a playlist', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      const playlist = new Playlist('English');
      playlists.add(playlist);

      request(app)
        .delete('/playlists/playlist')
        .set('cookie', ['username=debu;password=12345'])
        .send({ playlistTitle: 'English' })
        .expect(204)
        .end((err) => {
          assert.deepStrictEqual(playlists.toJson(), []);
          done(err);
        });
    });
  });
});
