const express = require('express');
const router = express.Router();

const roomRouter = require('./roomRouter');
const messageRouter = require('./messageRouter');
const userRouter = require('./userRouter');
const fileRouter = require('./fileRouter');

const userController = require('../../controllers/userController');

const { verifyToken } = require('../../middleware/index');

const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(global.rootDirName + '/public/avatars/'))
    },
    filename: function (req, file, cb) {
        const { username } = req.body;
        const extReg = /(.*)[.](.*)$/;
        const ext = extReg.exec(file.originalname)[2];

        const hashedFilename = crypto.createHash('sha256').update(username + (new Date().getTime())).digest('hex');
        const fullFileName = hashedFilename + '.' + ext;
        req.fullFileName = fullFileName;
        cb(null, fullFileName);
    }
});

const upload = multer({ storage: storage });


router.use('/room', roomRouter);

router.use('/message', messageRouter);

router.use('/user', userRouter);

router.use('/file', fileRouter)


router.post('/login', userController.loginUser);

router.post('/signup', upload.single('avatar'), userController.createUser);

router.post('/logout', verifyToken, userController.logoutUser);


module.exports = router;