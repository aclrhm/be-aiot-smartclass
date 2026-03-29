const router = require('express').Router();
const userController = require('../controllers/userController');

// Endpoint: /api/users/...
router.post('/login', userController.loginUser);
router.post('/register', userController.registerUser);   
router.get('/getAllUser', userController.getAllUsers);            
router.put('/updateUser/:id', userController.updateUser);          
router.delete('/deleteUser/:id', userController.deleteUser);       

module.exports = router;