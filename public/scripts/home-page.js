const renderLogoutButton = () => {
  const authenticationSection = document.querySelector('#authentication');
  const logoutButton = document.createElement('input');
  logoutButton.type = 'button';
  logoutButton.value = 'logout';
  logoutButton.id = 'logout-button';

  authenticationSection.appendChild(logoutButton);
};

const renderUserDetails = (username) => {
  const authenticationSection = document.querySelector('#authentication');
  const userDetails = document.createElement('p');
  userDetails.innerText = 'Welcome, ' + username;
  userDetails.id = 'user-details';

  authenticationSection.appendChild(userDetails);
};

const setUpExploreEvent = () => {
  const exploreButton = document.querySelector('#explore-button');
  exploreButton.onclick = () => {
    window.location.assign('/playlists.html');
  };
};

const removeLoginButton = () => {
  document.querySelector('#login-button').remove();
};

const verifyAndRenderUser = () => {
  fetch('/user-details')
    .then((res) => res.json())
    .then(({ isLoggedIn, username }) => {
      if (isLoggedIn) {
        removeLoginButton();
        renderUserDetails(username);
        renderLogoutButton();
        setUpLogoutEvent();
        return;
      }
    });
};

const setUpLogoutEvent = () => {
  const logoutButton = document.querySelector('#logout-button');
  logoutButton.onclick = () => {
    fetch('/logout', {
      method: 'POST',
    }).then((res) => window.location.assign(res.url));
  };
};

const setUpLoginEvent = () => {
  const loginButton = document.querySelector('#login-button');
  loginButton.onclick = () => {
    window.location.assign('/playlists.html');
  };
};

const main = () => {
  verifyAndRenderUser();
  setUpExploreEvent();
  setUpLoginEvent();
};

window.onload = main;
