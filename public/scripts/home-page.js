const setUpLoginEvent = () => {
  const login = document.querySelector('#authentication-button');
  login.onclick = () => {
    window.location.assign('/playlists.html');
  };
};

const main = () => {
  setUpLoginEvent();
};

window.onload = main;
