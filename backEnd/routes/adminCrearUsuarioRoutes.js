const express = require('express');
const router = express.Router();
const adminCrearUsuariosController = require('../controllers/adminCrearUsuariosController');

router.post('/', adminCrearUsuariosController.createUser);

module.exports = router;