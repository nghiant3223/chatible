const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const { verifyToken } = require('../../middleware/index');


router.get('/', userController.getAllUsers);
router.get('/me', verifyToken, userController.getMe);


module.exports = router;