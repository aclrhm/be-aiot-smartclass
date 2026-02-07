const router = require('express').Router();
const roomController = require('../controllers/roomController');

// Endpoint: /api/rooms/...
router.get('/get/:roomId', roomController.getRoomDetail);

module.exports = router;