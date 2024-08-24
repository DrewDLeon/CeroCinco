const tbl_campanas = require('../models/tbl_campanas');
const tbl_reservaciones = require('../models/tbl_reservaciones');
const fs = require('fs');
const path = require('path');


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

    testImage: async function(req, res) {
        try {
          console.log(req.file)
          const buffer = req.file.buffer;
          const filename = `${Date.now()}-${req.file.originalname}`;
          const filePath = path.join(__dirname, '../uploads', filename);

          fs.writeFile(filePath, buffer, (err) => {
            if (err) {
              res.status(500).send({
                message: 'no funciono'
              })
            }
          });
          

          res.status(200).send({
            message: 'Imagen subida y guardada exitosamente'
          });


        } catch (error){
            res.status(400).send({
              message: 'Error al procesar la imagen'
            });
        }

    },
    

    createCampana: async function(req, res) {
      console.log(req.body);
      console.log(req.file);
    }
  };
  
  module.exports = crearCampanaController;