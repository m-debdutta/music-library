const createSongElement = (song) => {
  return `<div class="song">${song}</div>`;
};

const createSongsElements = (songs) => {
  const songElements = songs.map(createSongElement);
  return songElements.join('');
};

const createPlaylist = ({ title, songs }) => {
  return `
  <html>
<head>
  <title>${title}</title>
  <link rel="stylesheet" href="../styles/playlist-style.css">
</head>
<body>
  <section id="page">
    <header id="page-header">
      <h1 id="page-heading">Music library</h1>
      <div id="authentication">
        <a id="login" href="/login">login</a>
      </div>
    </header>
    <main id="container">
      <h2 id="playlist-heading">Playlist: ${title}</h2>
      <section id="songs">
        <div class="song"></div>
        ${createSongsElements(songs)}
      </section>
    </main>
    <footer></footer>
  </section>
</body>
</html>
  `;
};

module.exports = { createPlaylist };
