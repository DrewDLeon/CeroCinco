const express = require('express');
const router = express.Router();
const crearCampanaController = require('../controllers/crearCampanaController');

router.get('/getDisponibilidad/:fecha_inicio/:fecha_fin/:daysofweek/:horas', crearCampanaController.getDisponibilidad);

router.get('/crearCampana/:fecha_inicio/:fecha_fin/:daysofweek/:horas/:nombre_campaña/:ruta_arte/:costo', crearCampanaController.createCampaña);

module.exports = router;