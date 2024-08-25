const db = require('../config/db');;

const tbl_reservaciones = {
  getReservacionesById: async function(id_campana) {
    const query = 'SELECT * FROM tbl_reservaciones WHERE id_campaña = ?';
    const [rows] = await db.query(query, [id_campana]);
    return rows;
  },
  createReservaciones: async function(id_campana, id_pantalla, disponibilidad){
    const query = `
      INSERT INTO tbl_reservaciones
      (id_campaña, id_pantalla, fecha, hora, estatus)
      VALUES
      (?, ?, ?, ?, ?);
    `;

  try {
    const results = await Promise.all(disponibilidad.map(async (item, index) => {
      // Ejecutar la consulta real
      const result = await db.query(query, [id_campana, id_pantalla, item.fecha, item.hora, item.estatus + 1]);
      
      return result;
    }));
    return results;
  } catch (error) {
    console.error('Error insertando disponibilidad:', error);
    throw error;
  }
  }
};

module.exports = tbl_reservaciones;