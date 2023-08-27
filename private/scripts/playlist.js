const sendDeleteRequest = (playlistTitle) => {
  return fetch('/playlists/playlist', {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ playlistTitle }),
  }).then((res) => res.status === 204);
};

const removeElement = (playlistElement) => {
  playlistElement.remove();
};

const setUpDeleteButtonEvent = (deleteButton, playlistElement, playlistTitle) => {
  deleteButton.onclick = () => {
    sendDeleteRequest(playlistTitle).then((isDeleted) => {
      if (isDeleted) removeElement(playlistElement);
    });
  };
};

const createDeleteButton = () => {
  const deleteButton = document.createElement('input');
  deleteButton.value = 'X';
  deleteButton.type = 'button';

  return deleteButton;
};

const createPlaylistElement = (playlistTitle) => {
  const playlistElement = document.createElement('div');
  const playlistName = document.createElement('p');
  const deleteButton = createDeleteButton();

  setUpDeleteButtonEvent(deleteButton, playlistElement, playlistTitle);

  playlistName.innerText = playlistTitle;
  playlistElement.append(playlistName, deleteButton);

  return playlistElement;
};

const renderPlaylist = (playlistTitle) => {
  const playlistElement = createPlaylistElement(playlistTitle);
  const playlistSection = document.querySelector('#playlist-section');
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
