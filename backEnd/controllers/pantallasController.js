const tbl_pantallas = require('../models/tbl_pantallas');

const pantallasController = {
  getAll: async (req, res) => {
    try{
      const pantallas = await tbl_pantallas.getAllPantallas();
      res.json(pantallas);
    } catch (error){
      console.error('Error en getAll:', error);
      res.status(500).json({ message: 'Error del servidor' });
    }
  },
}

module.exports = pantallasController;