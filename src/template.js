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
    <link rel="stylesheet" href="/styles/playlist-style.css" />
    <script src="/scripts/playlist.js"></script>
  </head>
  <body>
    <section id="page">
      <header id="page-header">
        <h1 id="page-heading">Music library</h1>
        <div id="authentication">
          <input type="button" value="logout" id="logout-button"/>
        </div>
      </header>
      <main id="container">
        <div id="playlist-heading">
          <h2>Playlist: ${title}</h2>
        </div>
        <form id="song-add-form">
          <input
            type="text"
            name="songName"
            id="song-input-box"
            placeholder="Enter a song"
            required
            />
          <input type="submit" value="+" id="song-submit-button" />
        </form>
        <section id="songs">
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
