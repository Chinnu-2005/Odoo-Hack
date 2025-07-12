const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ valid: false, message: 'No token found' });

  try {
    const data =jwt.verify(token, process.env.JWT_SECRET);
    req.email=data.email;
    next();
  } catch (err) {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
}

module.exports = authMiddleware;
