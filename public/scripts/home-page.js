const setUpLoginEvent = () => {
  const exploreButton = document.querySelector('#explore-button');
  exploreButton.onclick = () => {
    window.location.assign('/playlists.html');
  };
};

const main = () => {
  setUpLoginEvent();
};

window.onload = main;
