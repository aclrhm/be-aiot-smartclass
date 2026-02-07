const router = require('express').Router();

router.use('/users', require('./userRoute'));
router.use('/rooms', require('./roomRoute'));
router.use('/devices', require('./deviceRoute'));
router.use('/sensors', require('./sensorRoute'));
router.use('/energy', require('./energyRoute'));

module.exports = router;