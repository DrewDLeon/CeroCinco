const jwt = require('jsonwebtoken');
const config = require('../config/config');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token inválido' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user.admin) {
    return res.status(403).json({ message: 'Acceso denegado: Requiere rol de administrador' });
  }
  next();
};

module.exports = { authMiddleware, adminMiddleware };
