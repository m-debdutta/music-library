const setUpLoginEvent = () => {
  const login = document.querySelector('#authentication-button');
  login.onclick = () => {
    window.location.assign('/playlist-page.html');
  };
};

const main = () => {
  setUpLoginEvent();
};

window.onload = main;
