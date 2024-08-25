const express = require('express');
const router = express.Router();
const adminCrearUsuariosController = require('../controllers/adminCrearUsuariosController');

router.post('/', adminCrearUsuariosController.createUser);
router.get('/', adminCrearUsuariosController.getAll);
router.put('/:id', adminCrearUsuariosController.updateUser); 
router.delete('/:id', adminCrearUsuariosController.deleteUser);

module.exports = router;