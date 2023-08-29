const isValidUser = (req) => req.cookies && 'username' in req.cookies;

const authenticate = (req, res, next) => {
  if (!isValidUser(req)) {
    res.redirect('/pages/login.html');
    return;
  }

  next();
};

const setCookie = (req, res) => {
  if (!isValidUser(req)) {
    res.cookie('username', req.body.username).redirect('/');
    return;
  }

  res.redirect('/');
};

module.exports = { authenticate, setCookie };
