const jwt = require('jsonwebtoken');
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
    const user = await User.findOne({ username: req.username });
    if (user.rooms.indexOf(roomId) === -1) return res.status(403).send('User is not in this room');
    else next();
}

module.exports = { verifyToken, checkUserInRoom };