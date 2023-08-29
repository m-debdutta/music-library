const isValidUser = (req) => req.cookies && 'username' in req.cookies;

const authenticate = (req, res, next) => {
  if (!isValidUser(req)) {
    res.redirect('/pages/login.html');
  }

  next();
};

const setCookie = (req, res, next) => {
  if (!isValidUser(req)) {
    res.cookie('username', req.body.username).redirect('/');
  }

  next();
};

module.exports = { authenticate, setCookie };
