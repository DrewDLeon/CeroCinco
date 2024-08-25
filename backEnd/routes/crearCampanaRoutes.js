const express = require('express');
const multer = require('multer')
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const crearCampanaController = require('../controllers/crearCampanaController');

const storage = multer.memoryStorage();
const upload = multer({storage : storage});

router.get('/getDisponibilidad/:fecha_inicio/:fecha_fin/:daysofweek/:horas/:id_pantalla', crearCampanaController.getDisponibilidad);

router.post('/crearCampana', authMiddleware, upload.single('image'), crearCampanaController.createCampana);

router.post('/testImage', upload.single('image'), crearCampanaController.testImage);

module.exports = router;