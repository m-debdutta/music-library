const fs = require('fs');

const { createApp } = require('./src/app');
const Playlists = require('./src/models/playlists');
const { Storage } = require('./src/storage');

const setUpStorageDir = (playlistDataFilePath) => {
  if (!fs.existsSync('./data')) fs.mkdirSync('./data');
  if (!fs.existsSync(playlistDataFilePath)) fs.writeFileSync(playlistDataFilePath, '[]');
};

const main = () => {
  const port = process.env.PORT || 8000;
  const playlistDataFilePath = './data/playlist-data.json';
  const playlists = new Playlists();
  const playlistStorage = new Storage(fs, playlistDataFilePath);

  setUpStorageDir(playlistDataFilePath);

  const app = createApp(playlists, playlistStorage);
  app.listen(port, () => {
    console.log('Listening on port: ', port);
    console.log(new Date().toGMTString());
  });
};

main();
