const router = require('express').Router();
const energyController = require('../controllers/energyController');

// Endpoint: /api/energy/...
router.get('/update', energyController.getEnergyStats);

module.exports = router;