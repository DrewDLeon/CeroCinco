const db = require('../config/db');;

const tbl_reservaciones = {
  getReservacionesById: async function(id_campana) {
    const query = 'SELECT * FROM tbl_reservaciones WHERE id_campaña = ?';
    const [rows] = await db.query(query, [id_campana]);
    return rows;
  },
};

module.exports = tbl_reservaciones;