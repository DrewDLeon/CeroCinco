const db = require('../config/db');

const tbl_pantallas = {
  getAllPantallas: async function() {
    const query = 'SELECT * FROM tbl_pantallas';
    const [rows] = await db.query(query);
    return rows; 
  }
};

module.exports = tbl_pantallas;