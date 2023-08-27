const fs = require('fs');

const { createApp } = require('./src/app');
const Playlists = require('./src/models/playlists');
const { Storage } = require('./src/storage');

const setUpStorageDir = () => {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
};

const main = () => {
  const port = 8000;
  const playlistDataFilePath = './data/playlist-data.json';
  const playlists = new Playlists();
  const playlistStorage = new Storage(fs, playlistDataFilePath);
  const app = createApp(playlists, playlistStorage);

  setUpStorageDir();
  app.listen(port, () => {
    console.log('Listening on port: ', port);
    console.log(new Date().toGMTString());
  });
};

main();
