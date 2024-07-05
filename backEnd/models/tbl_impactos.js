const db = require('../config/db');

const tbl_impactos = {
  // La columna fechayhora es de tipo DATETIME y los datos están en formato UTC.
  getImpactosFrom: async function(idPantalla, beginDate, endDate, startHour, endHour) {
    const query = `
      SELECT fechayhora, total_impactos 
      FROM tbl_impactos 
      WHERE id_pantalla = ? 
        AND fechayhora >= ? 
        AND fechayhora <= ? 
        AND TIME(fechayhora) >= TIME(?) 
        AND TIME(fechayhora) <= TIME(?)
    `;

    const [rows] = await db.query(query, [idPantalla, beginDate, endDate, startHour, endHour]);
    
    return rows;
  }
};

module.exports = tbl_impactos;
