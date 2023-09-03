const renderLogoutButton = () => {
  const authenticationSection = document.querySelector('#authentication');
  const logoutButton = document.createElement('span');
  logoutButton.innerText = 'logout';
  logoutButton.id = 'logout';
  logoutButton.classList.add('clickable');

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

const removeLoginOption = () => {
  document.querySelector('#login').remove();
};

const verifyAndRenderUserDetails = () => {
  fetch('/user-details')
    .then((res) => res.json())
    .then(({ isLoggedIn, username }) => {
      if (isLoggedIn) {
        removeLoginOption();
        renderUserDetails(username);
        renderLogoutButton();
        setUpLogoutEvent();
        return;
      }
    });
};

const setUpLogoutEvent = () => {
  const logoutButton = document.querySelector('#logout');
  logoutButton.onclick = () => {
    fetch('/logout', {
      method: 'POST',
    }).then((res) => window.location.assign(res.url));
  };
};

const setUpBannerEvent = () => {
  const banner = document.querySelector('#page-heading');
  banner.onclick = () => {
    window.location.assign('/');
  };
};

const main = () => {
  setUpBannerEvent();
  verifyAndRenderUserDetails();
  setUpExploreEvent();
};

window.onload = main;
