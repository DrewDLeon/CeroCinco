const db = require('../config/db');;

const tbl_usuarios = {
  // Encontrar un usuario por su nombre de usuario
  findUserByUsername: async function(username) {
    const query = 'SELECT * FROM tbl_usuarios WHERE usuario = ?';
    const [rows] = await db.query(query, [username]);
    return rows[0];
  },
  findUserById: async function(id) {  // Nueva función para encontrar un usuario por su ID
    const query = 'SELECT * FROM tbl_usuarios WHERE id_usuario = ?';
    const [rows] = await db.query(query, [id]);
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
  },
  updateUser: async function (id, usuario, contra, admin) {  // Nueva función para actualizar un usuario
    const query = `
      UPDATE tbl_usuarios
      SET usuario = ?, contra = ?, admin = ?
      WHERE id_usuario = ?
    `;
    const result = await db.query(query, [usuario, contra, admin, id]);
    return result;
  },
  deleteUser: async function (id) { // Nueva función para eliminar un usuario
    const query = 'DELETE FROM tbl_usuarios WHERE id_usuario = ?';
    const result = await db.query(query, [id]);
    return result;
  }
};

module.exports = tbl_usuarios;