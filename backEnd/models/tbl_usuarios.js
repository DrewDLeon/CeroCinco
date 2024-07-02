const db = require('../config/db');
const bcrypt = require('bcrypt');

const tbl_usuarios = {
  // Encontrar un usuario por su nombre de usuario
  findUserByUsername: async function(username) {
    const query = 'SELECT * FROM tbl_usuarios WHERE usuario = ?';
    const [rows] = await db.query(query, [username]);
    return rows[0];
  },

  create: async function(usuario) {
    const query = 'INSERT INTO tbl_usuarios (usuario, contra, admin) VALUES ? ? FALSE';
    const [result] = await db.query(query, [usuario.user, usuario.password]);
    return result.id_usuario;
  },
};

module.exports = tbl_usuarios;