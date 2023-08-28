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

const main = () => {
  setUpAddSongRequest();
};
window.onload = main;
