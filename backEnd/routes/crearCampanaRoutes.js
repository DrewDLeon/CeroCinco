const express = require('express');
const router = express.Router();
const crearCampanaController = require('../controllers/crearCampanaController');

router.get('/getDisponibilidad/:fecha_inicio/:fecha_fin/:daysofweek/:horas', crearCampanaController.getDisponibilidad);

module.exports = router;