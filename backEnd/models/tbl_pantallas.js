const db = require('../config/db');

const tbl_pantallas = {
  getAllPantallas: async function() {
    const query = 'SELECT * FROM tbl_pantallas';
    const [rows] = await db.query(query);
    return rows; 
  },
  updatePantalla: async function(nombre_pantalla, direccion_pantalla, costoHora, duracion_pantalla, hora_inicio, hora_fin, pantallaId) {
    const query = `
      UPDATE tbl_pantallas 
      SET 
        nombre_pantalla = ?, 
        direccion_pantalla = ?, 
        costoHora = ?, 
        duracion_pantalla = ?, 
        hora_inicio = ?, 
        hora_fin = ?
      WHERE id_pantalla = ?
    `;

    const [result] = await db.query(query, [ 
      nombre_pantalla, 
      direccion_pantalla, 
      costoHora, 
      duracion_pantalla, 
      hora_inicio, 
      hora_fin,
      pantallaId
    ]);

    return result;
  }
};

module.exports = tbl_pantallas;