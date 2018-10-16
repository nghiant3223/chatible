const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { verifyToken, checkUserInRoom } = require('../../middleware/index');


router.get('/', userController.getAllUsers);

router.get('/me', verifyToken, userController.getMe);

router.get('/:username', userController.getUserByUsername);

router.post('/activeroom/:roomId', verifyToken, checkUserInRoom, userController.updateLastActiveContact)

module.exports = router;