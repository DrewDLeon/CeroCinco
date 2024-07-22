const express = require('express');
const router = express.Router();
const adminCampanasController = require('../controllers/adminCampanas');


router.get('/getAdminCampanas', adminCampanasController.getCampanasAdmin);
router.get('/updateAprobarCampana', adminCampanasController.aprobarCampana);
router.get('/updateRechazarCampana', adminCampanasController.rechazarCampana);

module.exports = router;