const tbl_campanas = require('../models/tbl_campanas');
const tbl_reservaciones = require('../models/tbl_reservaciones');
const fs = require('fs');
const path = require('path');
const { Console } = require('console');


const crearCampanaController = {
    getDisponibilidad: async function(req, res) {
      //console.log(req)
      const { fecha_inicio, fecha_fin, daysofweek, horas, id_pantalla} = req.params;
      
      // Convertimos los Daysofweek y horas de un Comma Separated String a un Array de Integers
      const daysofweekArray = daysofweek.split(',').map(Number);
      const horasArray = horas.split(',').map(Number);

      console.log(typeof(daysofweekArray))

      try {
        const disponibilidad = await tbl_campanas.getDisponibilidadCampana(fecha_inicio, fecha_fin, daysofweekArray, horasArray, id_pantalla);
        res.status(200).json({disponibilidad});
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las campañas' });
      }
    },

    testImage: async function(req, res) {
        try {
          //IMAGEN PRIMERO    
          console.log(req.file)
          const buffer = req.file.buffer;
          const filename = `${Date.now()}-${req.file.originalname}`;
          const filePath = path.join(__dirname, '../uploads', filename);
          fs.writeFile(filePath, buffer, (err) => {
            if (err) {
              console.log('Error en guardar la imagen');
            }
          });
          console.log("Imagen procesada correctamente");

          //CREAR CAMPANA




        } catch (error){
            res.status(400).send({
              message: 'Error'
            });
        }
    },
    

    createCampana: async function(req, res) {
      try {
          console.log(req.body)
          //IMAGEN PRIMERO    
          console.log(req.file)
          const buffer = req.file.buffer;
          const filename = `${Date.now()}-${req.file.originalname}`;
          const filePath = path.join(__dirname, '../uploads', filename);
          fs.writeFile(filePath, buffer, (err) => {
            if (err) {
              console.log('Error en guardar la imagen');
            }
          });
          console.log("Imagen procesada correctamente");

          //Revisar si la campaña ya existe
          const {id_usuario, fecha_inicio, fecha_fin, weekdays, horas, estatus, nombre_campana, costo, id_pantalla} = req.body
          
          const campana = await tbl_campanas.getCampana(id_usuario, id_pantalla, nombre_campana);

          if (campana) {
            return res.status(401).json({ message: 'Campaña ya existente' });
          }
          
          // Crear Campaña
          const crearCampana = await tbl_campanas.createCampana(id_usuario, id_pantalla, fecha_inicio, fecha_fin, weekdays, estatus, nombre_campana, filename, costo)
          if (crearCampana) {
            console.log('Campana creada')
          }

          const daysofweekArray = weekdays.split(',').map(Number);
          const horasArray = horas.split(',').map(Number);

          // GET DISPONIBILIDAD fecha_inicio, fecha_fin, daysofweek, horas
          const disponibilidad = await tbl_campanas.getDisponibilidadCampana(fecha_inicio, fecha_fin, daysofweekArray, horasArray, id_pantalla);
          const disponibilidadChanged = disponibilidad.map(item => ({
            ...item,
            fecha: new Date(item.fecha).toISOString().split('T')[0]
          }));

          let id_campana = await tbl_campanas.getCampana(id_usuario, id_pantalla, nombre_campana);
          id_campana = id_campana.id_campaña

          console.log(id_campana)
          console.log(id_pantalla)
          console.log(disponibilidadChanged)

          // INSERTAR RESERVACIONES EN LA BASE DE DATOS
          try {
            console.log("Reservacion creada");
            const reservaciones = await tbl_reservaciones.createReservaciones(id_campana, id_pantalla, disponibilidadChanged);
            console.log("Reservacion creada")
            if (reservaciones) {
              console.log("Reservacion creada")
            }
            res.status(200);
          } catch (error) {
            res.status(405).send({
              message: 'Error en insertar las reservaciones'
            })
          }
          

          




        } catch (error){
            res.status(400).send({
              message: 'Error'
            });
        }

      
    }
  };
  
  module.exports = crearCampanaController;