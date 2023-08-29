const parseCookie = (req, res, next) => {
  if (req.headers.cookie) {
    const cookieParams = req.headers.cookie;
    const cookies = cookieParams.split('; ').map((cookie) => cookie.split('='));
    req.cookies = Object.fromEntries(cookies);
  }

  next();
};

module.exports = { parseCookie };
