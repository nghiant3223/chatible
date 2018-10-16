const express = require('express');
const router = express.Router();

const roomRouter = require('./roomRouter');
const messageRouter = require('./messageRouter');
const userRouter = require('./userRouter');
const fileRouter = require('./fileRouter');

const userController = require('../../controllers/userController');

const { verifyToken } = require('../../middleware/index');

router.use('/room', roomRouter);

router.use('/message', messageRouter);

router.use('/user', userRouter);

router.use('/file', fileRouter)


router.post('/login', userController.loginUser);

router.post('/signup', userController.createUser);

router.post('/logout', verifyToken, userController.logoutUser);


module.exports = router;