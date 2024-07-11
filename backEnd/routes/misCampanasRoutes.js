const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const misCampanasController = require('../controllers/misCampanasController');

router.get('/', authMiddleware, misCampanasController.getCampanas);
router.get('/campanasWithPantalla', authMiddleware, misCampanasController.getCampanasWithPantallaData);
router.get('/getHorariosCampana/:id_campana', authMiddleware, misCampanasController.getHorariosCampana);

module.exports = router;