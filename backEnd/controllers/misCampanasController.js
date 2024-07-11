const tbl_campanas = require('../models/tbl_campanas');
const tbl_reservaciones = require('../models/tbl_reservaciones');

const campanasController = {
  getCampanas: async function(req, res) {
    const { userId } = req.user;

    try {
      const campanas = await tbl_campanas.getCampanas(userId);
      res.status(200).json(campanas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las campañas' });
    }
  },
  getCampanasWithPantallaData: async function(req, res) {
    const { userId } = req.user;

    try {
      const campanas = await tbl_campanas.getCampanasWithPantallaData(userId);
      res.status(200).json(campanas);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las campañas' });
    }
  },
  getHorariosCampana: async function(req, res) {
    const { id_campana } = req.params;
  
    try {
      const reservaciones = await tbl_reservaciones.getReservacionesById(id_campana);
  
      const daysOfWeek = {};
      
      reservaciones.forEach(reservacion => {
        const date = new Date(reservacion.fecha);
        let dayOfWeek = date.getUTCDay(); // Sunday is 0, Monday is 1, etc.
        dayOfWeek = (dayOfWeek === 0) ? 7 : dayOfWeek; // Adjust Sunday to be 7
        const hour = reservacion.hora;
  
        if (!daysOfWeek[dayOfWeek]) {
          daysOfWeek[dayOfWeek] = new Set();
        }
  
        daysOfWeek[dayOfWeek].add(hour);
      });
  
      // Convert sets to arrays
      const result = Object.keys(daysOfWeek).map(day => ({
        day: parseInt(day),
        hours: Array.from(daysOfWeek[day])
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener las reservaciones' });
    }
  },
};

module.exports = campanasController;