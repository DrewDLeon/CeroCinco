const express = require('express');
const multer = require('multer')
const router = express.Router();
const crearCampanaController = require('../controllers/crearCampanaController');

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

router.get('/getDisponibilidad/:fecha_inicio/:fecha_fin/:daysofweek/:horas', crearCampanaController.getDisponibilidad);

router.post('/crearCampana', upload.single('image'), crearCampanaController.createCampana);

router.post('/testImage', upload.single('image'), crearCampanaController.testImage);

module.exports = router;