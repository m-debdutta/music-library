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

const main = () => {
  const playlistForm = document.querySelector('#playlist-form');
  playlistForm.onsubmit = (event) => {
    event.preventDefault();
    sendAddPlaylistRequest();
  };
};

window.onload = main;
