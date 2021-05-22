const { verifyToken } = require('./tokenManagment');

const checkAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth && auth.startsWith('Bearer')) {
    try {
      const tokenFromReq = auth.substring(7);
      const decodedToken = verifyToken(tokenFromReq);
      req.user = decodedToken.user;
      next();
    } catch (err) {
      res.status(400).json({ error: 'invalid/expired token' });
    }
  } else res.status(400).json({ error: 'token must be provided' });
};

module.exports = checkAuth;
