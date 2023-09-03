const setUpAddSongRequest = () => {
  const songAddForm = document.querySelector('#song-add-form');
  const pathname = window.location.pathname;
  songAddForm.onsubmit = (event) => {
    const songName = document.querySelector('#song-input-box').value;
    event.preventDefault();
    fetch(pathname + '/song', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ songName }),
    }).then(() => window.location.assign(pathname));
  };
};

const setUpBannerEvent = () => {
  const banner = document.querySelector('#page-heading');
  banner.onclick = () => {
    window.location.assign('/');
  };
};

const setUpLogoutButton = () => {
  const logoutButton = document.querySelector('#logout-button');
  logoutButton.onclick = () => {
    fetch('/logout', {
      method: 'POST',
    }).then((res) => window.location.assign(res.url));
  };
};

const main = () => {
  setUpBannerEvent();
  setUpLogoutButton();
  setUpAddSongRequest();
};
window.onload = main;
