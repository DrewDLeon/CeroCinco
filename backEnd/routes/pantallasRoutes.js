const express = require('express');
const router = express.Router();
const pantallasController = require('../controllers/pantallasController');

router.get('/', pantallasController.getAll);

module.exports = router;