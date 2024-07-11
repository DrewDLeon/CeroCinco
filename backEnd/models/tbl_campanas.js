const db = require('../config/db');

const tbl_campanas = {
  getCampanas: async function(userId) {
    const query = `
      SELECT * 
      FROM tbl_campanas
      WHERE id_usuario = ?
    `;

    const [rows] = await db.query(query, [userId]);

    return rows;
  },
  getCampanasWithPantallaData: async function(userId) {
    const query = `
      select
          tbl_campanas.id_pantalla,
          tbl_campanas.id_campaña,
          tbl_campanas.fecha_inicio,
          tbl_campanas.fecha_fin,
          tbl_campanas.weekdays,
          tbl_campanas.estatus,
          tbl_pantallas.nombre_pantalla,
          tbl_pantallas.direccion_pantalla
      from tbl_campanas
      join tbl_pantallas on tbl_pantallas.id_pantalla = tbl_campanas.id_pantalla
      where id_usuario = ?;
    `;

    const [rows] = await db.query(query, [userId]);

    return rows;
  }
};

module.exports = tbl_campanas;