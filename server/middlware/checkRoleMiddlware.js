const jwt = require('jsonwebtoken');

module.exports = (role) => (req, res, next) => {
  if (req.method === 'OPTIONS') next();
  try {
    const token = req.headers.authorization.split(' ')[1]; // Bearer enonewr89ewn9
    if (!token) res.status(401).json({ message: 'Unautorized' });

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.role !== role) res.status(403).json({ message: 'No access' });
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Unautorized' });
  }
};
