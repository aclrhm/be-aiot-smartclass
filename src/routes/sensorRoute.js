const router = require('express').Router();
const sensorController = require('../controllers/sensorController');

// Endpoint: /api/sensor/...
router.post('/update', sensorController.updateSensorData);
module.exports = router;