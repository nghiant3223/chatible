const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const { verifyToken, checkUserInRoom } = require('../../middleware');
const { saveRoomFile, getRoomFiles } = require('../../controllers/fileController');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(global.rootDirName + '/public/uploads/'))
    },
    filename: function (req, file, cb) {
        const extReg = /(.*)[.](.*)$/;
        const ext = extReg.exec(file.originalname)[2];

        const { roomId } = req.params;
        const uploader = req.username;
        const hashedFilename = crypto.createHash('md5').update(uploader + roomId + (new Date().getTime())).digest('hex');
        req.originalName = file.originalname;
        req.hashedName = hashedFilename + '.' + ext;
        cb(null, hashedFilename + '.' + ext);
    }
});

const upload = multer({ storage: storage })

router.post('/:roomId', verifyToken, checkUserInRoom, upload.single('file'), saveRoomFile);

router.get('/:roomId', verifyToken, checkUserInRoom, getRoomFiles);

module.exports = router;