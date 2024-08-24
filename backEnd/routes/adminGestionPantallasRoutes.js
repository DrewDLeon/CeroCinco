const express = require('express');
const router = express.Router();
const adminGestionPantallasController = require('../controllers/adminGestionPantallasController');

router.get('/', adminGestionPantallasController.getAll);

module.exports = router;