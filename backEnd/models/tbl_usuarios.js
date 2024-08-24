const db = require('../config/db');;

const tbl_usuarios = {
  // Encontrar un usuario por su nombre de usuario
  findUserByUsername: async function(username) {
    const query = 'SELECT * FROM tbl_usuarios WHERE usuario = ?';
    const [rows] = await db.query(query, [username]);
    return rows[0];
  },
  createUser: async function (username, password, rol) {
    const admin = rol === "admin" ? 1 : 0;

    const query = `
      INSERT INTO tbl_usuarios (usuario, contra, admin)
      VALUES (?, ?, ?)
    `;
    const answer = await db.query(query, [username, password, admin]);
    return answer;
  },
  getAll: async function () {
    const query = `SELECT * FROM tbl_usuarios`;
    const rows = await db.query(query, []);
    return rows;
  }
};

module.exports = tbl_usuarios;