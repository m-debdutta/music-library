const { createApp } = require('./src/app');

const main = () => {
  const port = 8000;
  const app = createApp();

  app.listen(port, () => {
    console.log('Listening on port: ', port);
    console.log(new Date().toGMTString());
  });
};

main();
