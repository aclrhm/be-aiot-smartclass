const router = require('express').Router();
const deviceController = require('../controllers/deviceController');

// Endpoint: /api/devices/...
router.post('/toggle', deviceController.toggleDevice);

module.exports = router;