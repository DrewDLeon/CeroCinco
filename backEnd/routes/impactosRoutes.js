const express = require('express');
const router = express.Router();
const impactosController = require('../controllers/impactosController');

router.post('/kpiData', impactosController.getKpiData);
router.post('/hourlyData', impactosController.getHourlyData);
router.post('/dailyData', impactosController.getDailyData);

module.exports = router;