const tbl_usuarios = require('../models/tbl_usuarios');
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const config = require('../config/config');

const authController = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await tbl_usuarios.findUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      //const isMatch = await bcrypt.compare(password, user.password);
      const isMatch = password === user.contra;
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }

      const token = jwt.sign({ userId: user.id_usuario, admin: user.admin }, config.JWT_SECRET, { expiresIn: '1h' });

      res.json({ token, admin: user.admin });
    } catch (error) {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  }
};

module.exports = authController;