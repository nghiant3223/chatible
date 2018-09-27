const express = require('express');
const router = express.Router();

const roomRouter = require('./roomRouter');
const messageRouter = require('./messageRouter');
const userRouter = require('./userRouter');
const fileRouter = require('./fileRouter');

const userController = require('../../controllers/userController');

router.use('/room', roomRouter);
router.use('/message', messageRouter);
router.use('/user', userRouter);
router.use('/file', fileRouter)

router.route('/login').post(userController.loginUser);
router.route('/signup').post(userController.createUser);

module.exports = router;