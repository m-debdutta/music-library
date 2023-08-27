const { createApp } = require('./src/app');
const Playlists = require('./src/models/playlists');

const main = () => {
  const port = 8000;
  const playlists = new Playlists();
  const app = createApp(playlists);

  app.listen(port, () => {
    console.log('Listening on port: ', port);
    console.log(new Date().toGMTString());
  });
};

main();
