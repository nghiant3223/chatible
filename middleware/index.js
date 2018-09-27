const verifyToken = (req, res, next) => {
    
    next();
}


const checkUserInRoom = (req, res, next) => {
    // roomId is passed by param.
    next();
}

module.exports = { verifyToken, checkUserInRoom };