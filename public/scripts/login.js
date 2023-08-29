const setUpLoginRequest = () => {
  const loginForm = document.querySelector('#login-form');
  loginForm.onsubmit = (event) => {
    event.preventDefault();
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    fetch('/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => window.location.assign(res.url));
  };
};

const main = () => {
  setUpLoginRequest();
};
window.onload = main;
