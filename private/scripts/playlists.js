const sendDeleteRequest = (playlistTitle) => {
  return fetch('/playlists/playlist', {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ playlistTitle }),
  }).then((res) => res.status === 204);
};

const sendShowPlaylistRequest = (playlistTitle) => {
  window.location.assign('/playlists/' + playlistTitle);
};

const setUpPlaylistElementEvent = (playlistElement, playlistTitle) => {
  playlistElement.onclick = () => {
    sendShowPlaylistRequest(playlistTitle);
  };
};

const removeElement = (playlistElement) => {
  playlistElement.remove();
};

const setUpDeleteButtonEvent = (deleteButton, playlistElement, playlistTitle) => {
  deleteButton.onclick = (event) => {
    sendDeleteRequest(playlistTitle).then((isDeleted) => {
      if (isDeleted) removeElement(playlistElement);
    });

    event.stopPropagation();
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
  setUpPlaylistElementEvent(playlistElement, playlistTitle);

  playlistName.innerText = playlistTitle;
  playlistElement.classList.add('playlist');
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
  const playlistInputBox = document.querySelector('#playlist-title');
  const playlistTitle = playlistInputBox.value;
  fetch('/add-playlist', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ playlistTitle }),
  }).then((res) => {
    if (res.status === 201) {
      playlistInputBox.value = '';
      renderPlaylist(playlistTitle);
    }
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

const setUpLogoutButton = () => {
  const logoutButton = document.querySelector('#logout-button');
  logoutButton.onclick = () => {
    fetch('/logout', {
      method: 'POST',
    }).then((res) => window.location.assign(res.url));
  };
};

const setUpAddButton = () => {
  const addButton = document.querySelector('#add-button');
  const playlistInputBox = document.querySelector('#playlist-title');
  addButton.onclick = () => {
    playlistInputBox.focus();
  };
};

const setUpBannerEvent = () => {
  const banner = document.querySelector('#page-heading');
  banner.onclick = () => {
    window.location.assign('/');
  };
};

const main = () => {
  const playlistForm = document.querySelector('#playlist-form');

  setUpBannerEvent();
  renderAllPlaylist();
  setUpLogoutButton();
  setUpAddButton();

  playlistForm.onsubmit = (event) => {
    event.preventDefault();
    sendAddPlaylistRequest();
  };
};

window.onload = main;
