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
        tc.id_campaña,
        tc.nombre_campaña,
        tp.direccion_pantalla,
        tp.nombre_pantalla,
        tc.fecha_inicio, 
        tc.fecha_fin, 
        tc.weekdays, 
        tc.estatus,
        tp.hora_inicio,
        tp.hora_fin
      from tbl_campanas tc
      join tbl_pantallas tp on tp.id_pantalla = tc.id_pantalla
      where id_usuario = ?;
    `;

    const [rows] = await db.query(query, [userId]);

    return rows;
  },
  getDisponibilidadCampana: async function(fecha_inicio, fecha_fin, daysofweekArray, horasArray, id_pantalla) {
    const query = `
    SELECT fecha, hora,
      CASE 
        WHEN SUM(estatus) >= 2 THEN 1  -- Full
          ELSE 0  -- Available
        END AS estatus
    FROM tbl_reservaciones
    WHERE (fecha >= ? AND fecha <= ?)
    AND DAYOFWEEK(fecha) IN (?)
    AND hora IN (?)
    AND id_pantalla = ?
    GROUP BY fecha, hora;
    `;

    const params = [fecha_inicio, fecha_fin, [...daysofweekArray], [...horasArray], id_pantalla]

    const [rows] = await db.query(query, params)
    return rows;
  },
  createCampana: async function(id_usuario, id_pantalla, fecha_inicio, fecha_fin, weekdays, estatus, nombre_campana, ruta_arte, costo) {

    const query = `
      INSERT INTO tbl_campanas 
      (id_usuario, id_pantalla, fecha_inicio, fecha_fin, weekdays, estatus, nombre_campaña, ruta_arte, costo)
      VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;

    try {
      const answer = await db.query(query, [id_usuario, id_pantalla, fecha_inicio, fecha_fin, weekdays, estatus, nombre_campana, ruta_arte, costo]);
      return answer
    } catch (error) {
      console.error('Error insertando campañas:', error);
      throw error;
    }

  },
  getCampana: async function(id_usuario, id_pantalla, nombre_campana) {

    const query = `
      SELECT id_campaña FROM tbl_campanas WHERE id_usuario = ? AND id_pantalla = ? AND nombre_campaña = ?;
    `;
    const [rows] = await db.query(query, [id_usuario, id_pantalla, nombre_campana]);
    return rows[0];

  },

  // ADMIN FUNCTIONS
  getCampanasAdmin: async function() {
    const query = `
      SELECT tc.id_campaña,
            tc.nombre_campaña,
            tc.id_usuario,
            tp.direccion_pantalla,
            tp.nombre_pantalla,
            tc.fecha_inicio, 
            tc.fecha_fin, 
            tc.weekdays, 
            tc.estatus,
            tu.usuario,
            tp.hora_inicio,
            tp.hora_fin
      FROM tbl_campanas tc
      INNER JOIN tbl_pantallas tp ON tc.id_pantalla = tp.id_pantalla
      INNER JOIN tbl_usuarios tu ON tc.id_usuario = tu.id_usuario
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
  },
  cambiarEstatusCampana: async function(newStatus, campanaId) {
    const query = `
      UPDATE tbl_campanas as tc
      SET  tc.estatus = ?
      WHERE tc.id_campaña = ?;
    `;

    const answer = await db.query(query, [newStatus, campanaId])
    return answer
  }
};

module.exports = tbl_campanas;