const renderPlaylist = (playlistTitle) => {
  const playlistElement = document.createElement('p');
  const playlistSection = document.querySelector('#playlist-section');
  playlistElement.innerText = playlistTitle;
  playlistElement.classList.add('playlist');
  playlistSection.appendChild(playlistElement);
};

sendAddPlaylistRequest = () => {
  const playlistTitle = document.querySelector('#playlist-title').value;
  fetch('/add-playlist', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ playlistTitle }),
  }).then((res) => {
    if (res.status === 201) renderPlaylist(playlistTitle);
  });
};

const renderAllPlaylist = () => {
  fetch('/playlists')
    .then((res) => res.json())
    .then((playlists) =>
      playlists.forEach((playlist) => {
        renderPlaylist(playlist.title);
      })
    );
};

const main = () => {
  renderAllPlaylist();
  const playlistForm = document.querySelector('#playlist-form');
  playlistForm.onsubmit = (event) => {
    event.preventDefault();
    sendAddPlaylistRequest();
  };
};

window.onload = main;
