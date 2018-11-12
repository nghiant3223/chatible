const { User } = require('../models/User');

function updateUser(username, updateInfo) {
    return User.findOneAndUpdate({ username }, { $set: updateInfo }, { new: true });
}

/**
 * 
 * @param {String} username - username of user.
 * @param {String} projection - concatenation of fields to be retrieved, join by ' '.
 * 
 * @returns {Promise} - promise for later handling.
 */
function getUserByUsername(username, projection) {
    return username ? User.findOne({ username }).select(projection) : User.find({}).select(projection);
}

function createUser(userInfo) {
    const user = new User(userInfo);
    user.save();
    return user;
}

function updateRecentRoom(username, roomId) {
    return User.updateOne({ username }, { $pull: { rooms: roomId } })
        .then(_ => User.updateOne({ username }, { $addToSet: { rooms: roomId } }));
}

module.exports = {
    updateUser,
    getUserByUsername,
    createUser,
    updateRecentRoom
};