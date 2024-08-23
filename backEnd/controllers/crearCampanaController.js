const tbl_campanas = require('../models/tbl_campanas');
const tbl_reservaciones = require('../models/tbl_reservaciones');

const crearCampanaController = {
    getDisponibilidad: async function(req, res) {
      //console.log(req)
      const { fecha_inicio, fecha_fin, daysofweek, horas } = req.params;
      
      // Convertimos los Daysofweek y horas de un Comma Separated String a un Array de Integers
      const daysofweekArray = daysofweek.split(',').map(Number);
      const horasArray = horas.split(',').map(Number);

      console.log(typeof(daysofweekArray))

      try {
        const disponibilidad = await tbl_campanas.getDisponibilidadCampana(fecha_inicio, fecha_fin, daysofweekArray, horasArray);
        res.status(200).json({disponibilidad});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las campañas' });
      }
    },
    createCampaña: async function(req) {
      console.log(req)
      
      
      // Convertimos los Daysofweek y horas de un Comma Separated String a un Array de Integers
      //const daysofweekArray = daysofweek.split(',').map(Number);
      //const horasArray = horas.split(',').map(Number);

      //console.log(typeof(daysofweekArray))

      // try {
      //   const disponibilidad = await tbl_campanas.getDisponibilidadCampana(fecha_inicio, fecha_fin, daysofweekArray, horasArray);
      //   res.status(200).json({disponibilidad});
      // } catch (error) {
      //   console.error(error);
      //   res.status(500).json({ message: 'Error al obtener las campañas' });
      // }
    }
  };
  
  module.exports = crearCampanaController;