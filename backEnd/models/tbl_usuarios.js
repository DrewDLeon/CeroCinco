const db = require('../config/db');;

const tbl_usuarios = {
  // Encontrar un usuario por su nombre de usuario
  findUserByUsername: async function(username) {
    const query = 'SELECT * FROM tbl_usuarios WHERE usuario = ?';
    const [rows] = await db.query(query, [username]);
    return rows[0];
  },
};

module.exports = tbl_usuarios;