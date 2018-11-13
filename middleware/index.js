const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const { jwtSecret } = require('../configs/keys');
const { User } = require('../models/User');


const verifyToken = (req, res, next) => {
    const token = req.headers['x-access-token'];

    if (token === undefined) return res.status(403).send('Unauthorized request.');

    jwt.verify(token, jwtSecret, (e, decoded) => {
        if (e) {
            if (e.name === 'TokenExpiredError') res.status(401).send('Token has expired.');
            if (e.name === 'JsonWebTokenError') res.status(401).send('Wrong token provided.');
        } else {
            req.username = decoded.data;
            next();
        }
    });
}

const checkUserInRoom = async (req, res, next) => {
    const { roomId } = req.params;
    try {
        const user = await User.findOne({ username: req.username });
        if (user.rooms.indexOf(roomId) === -1) return res.status(403).send('User is not in this room.');
        else next();
    } catch (e) {
        res.status(404).send('User not found.');
    }
}

const uploadAvatar = multer({
    storage: storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.resolve(global.rootDirName + '/public/avatars/'))
        },
        filename: function (req, file, cb) {
            const { username } = req.body;
            const fullFileName = username + '.png';
            req.fullFileName = fullFileName;
            cb(null, fullFileName);
        }
    })
});

const uploadFile = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'public/uploads/')
        },
        filename: function (req, file, cb) {
            const extReg = /(.*)[.](.*)$/;
            const ext = extReg.exec(file.originalname)[2];

            const { roomId } = req.params;
            const uploader = req.username;
            const hashedFilename = crypto.createHash('sha256').update(uploader + roomId + (new Date().getTime())).digest('hex');
            req.originalName = file.originalname;
            req.hashedName = hashedFilename + '.' + ext;
            req.fileExt = ext;
            cb(null, hashedFilename + '.' + ext);
        }
    })
})


module.exports = {
    verifyToken,
    checkUserInRoom,
    uploadAvatar,
    uploadFile
};