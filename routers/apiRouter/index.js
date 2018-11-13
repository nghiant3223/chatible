const express = require('express');
const router = express.Router();


router.use('/room', require('./roomRouter'));

router.use('/message', require('./messageRouter'));

router.use('/user', require('./userRouter'));

router.use('/file', require('./fileRouter'));

router.use('/auth', require('./authRouter'));


module.exports = router;