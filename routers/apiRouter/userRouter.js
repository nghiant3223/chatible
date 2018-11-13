const express = require('express');
const router = express.Router();
const { userController } = require('../../controllers/index');
const { verifyToken, checkUserInRoom } = require('../../middleware/index');


router.get('/', userController.getAllUsers);

router.get('/me', verifyToken, userController.getMe);

router.get('/:username', userController.getSpecificUser);

router.patch('/:roomId', verifyToken, checkUserInRoom, userController.updateUser);


module.exports = router;