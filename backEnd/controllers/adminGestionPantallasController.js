const tbl_pantallas = require("../models/tbl_pantallas");

const adminGestionPantallas =  {
    getAll: async (req, res) => {
        try{
          const pantallas = await tbl_pantallas.getAllPantallas();
          res.json(pantallas);
        } catch (error){
          console.error('Error en getAll:', error);
          res.status(500).json({ message: 'Error del servidor' });
        }
      },
      update: async (req, res) => {
        const pantallaId = req.params.pantallaId;
        const {
            nombre_pantalla,
            direccion_pantalla,
            costoHora,
            duracion_pantalla,
            hora_inicio,
            hora_fin
        } = req.body;

        try {
          const result = await tbl_pantallas.updatePantalla(nombre_pantalla, direccion_pantalla, costoHora, duracion_pantalla, hora_inicio, hora_fin, pantallaId);

          console.log(result);
          if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Pantalla actualizada exitosamente.' });

          } else {
            res.status(404).json({ message: 'Pantalla no encontrada.' });
          }

        } catch (error) {
          res.status(500).json({message: "Error haciendo update"});
        }
      }
}

module.exports = adminGestionPantallas;