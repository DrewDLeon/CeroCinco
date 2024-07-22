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
          tbl_campanas.nombre_campaña,
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
  },
  // ADMIN FUNCTIONS
  getCampanasAdmin: async function() {
    const query = `
      SELECT tc.id_campaña,
            tp.nombre_pantalla,
            tc.fecha_inicio, 
            tc.fecha_fin, 
            tc.weekdays, 
            tc.estatus 
      FROM tbl_campanas tc
      INNER JOIN tbl_pantallas tp ON tc.id_pantalla = tp.id_pantalla
    `;

    const [rows] = await db.query(query)
    return rows;
  },
  adminAprobarCampana: async function(campanaId) {
    const query = `
      UPDATE tbl_campanas 
      SET  tc.estatus = 1
      WHERE id_campana = ?;
    `;

    const [rows] = await db.query(query, [campanaId])
  },
  adminRechazarCampana: async function(campanaId) {
    const query = `
      UPDATE tbl_campanas 
      SET  tc.estatus = 2
      WHERE id_campana = ?;
    `;

    const [rows] = await db.query(query, [campanaId])
  }
};

module.exports = tbl_campanas;