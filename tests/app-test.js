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

  describe('GET /pages/login.html', () => {
    it('should serve the login page', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      request(app)
        .get('/pages/login.html')
        .expect(200)
        .expect('content-type', /text\/html/)
        .end(done);
    });
  });

  describe('POST /login', () => {
    it('should set cookie, when the user is not logged-in', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      request(app)
        .post('/login')
        .type('application/json')
        .send({ username: 'debu', password: 12345 })
        .expect(302)
        .expect('set-cookie', /username=debu; Path=\//)
        .expect('location', '/')
        .end(done);
    });

    it('should not set cookie, when the user is already logged-in', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      request(app)
        .post('/login')
        .type('application/json')
        .set('cookie', ['username=debu'])
        .expect(302)
        .expect('location', '/')
        .end(done);
    });

    it('should redirect to login page if user is not logged-in and ask for a private page', (context, done) => {
      const path = './data/playlistStorage.json';

      const writeFile = context.mock.fn((path, data, cb) => cb());
      const readFileSync = context.mock.fn();

      const playlists = new Playlists();
      const playlistStorage = new Storage({ readFileSync, writeFile }, path);
      const app = createApp(playlists, playlistStorage);

      request(app)
        .get('/playlists.html')
        .expect(302)
        .expect('location', '/pages/login.html')
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
        .set('cookie', ['username=debu'])
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
        .set('cookie', ['username=debu'])
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
        .set('cookie', ['username=debu'])
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
        .set('cookie', ['username=debu'])
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
        .set('cookie', ['username=debu'])
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
        .set('cookie', ['username=debu'])
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
        .set('cookie', ['username=debu'])
        .send({ playlistTitle: 'English' })
        .expect(204)
        .end((err) => {
          assert.deepStrictEqual(playlists.toJson(), []);
          done(err);
        });
    });
  });
});
