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
  console.log("Iniciando createDisponibilidad");
  console.log("Datos recibidos:", { id_campana, id_pantalla, disponibilidad });

  try {
    const results = await Promise.all(disponibilidad.map(async (item, index) => {
      // Crear la consulta con los valores reales para depuración
      // const debugQuery = query.replace(/\?/g, (match) => {
      //   if (match === '?') return JSON.stringify([id_campana, id_pantalla, item.fecha, item.hora, item.estatus].shift());
      // });
      
      // console.log(`Consulta ${index + 1}:`, debugQuery);
      
      // Ejecutar la consulta real
      const result = await db.query(query, [id_campana, id_pantalla, item.fecha, item.hora, item.estatus]);
      
      // console.log(`Resultado de la consulta ${index + 1}:`, result);
      
      return result;
    }));
    
    console.log("Todas las consultas completadas. Resultados:", results);
    return results;
  } catch (error) {
    console.error('Error insertando disponibilidad:', error);
    throw error;
  }
  }
};

module.exports = tbl_reservaciones;