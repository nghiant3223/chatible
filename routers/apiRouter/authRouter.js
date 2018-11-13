const express = require('express');
const router = express.Router();

const { verifyToken } = require('../../middleware');
const { authController } = require('../../controllers');
const { uploadAvatar } = require('../../middleware/index');

router.patch('/login', authController.loginUser);

router.post('/signup', uploadAvatar.single('avatar'), authController.createUser);

router.patch('/logout', verifyToken, authController.logoutUser);


module.exports = router;