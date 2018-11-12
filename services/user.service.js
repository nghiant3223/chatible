const { User } = require('../models/User');

/**
 * Update user's information.
 * @param {String} username username of user to update recent rooms.
 * @param {Object} updateInfo object that specifies modifications.
 * 
 * @returns {Promise} promise for later handling.
 */
function updateUser(username, updateInfo) {
    return User.findOneAndUpdate({ username }, { $set: updateInfo }, { new: true });
}

/**
 * Get username by username.
 * @param {String} username username of user.
 * @param {String} projection concatenation of fields to be retrieved, join by ' '.
 * 
 * @returns {Promise} promise for later handling.
 */
function getUserByUsername(username, projection) {
    return username ? User.findOne({ username }).select(projection) : User.find({}).select(projection);
}

/**
 * Create a new user.
 * @param {Object} userInfo information of user to be created.
 * 
 * @returns {User} newly created user.
 */
function createUser(userInfo) {
    const user = new User(userInfo);
    user.save();
    return user;
}

/**
 * 
 * @param {String} username username of user to update recent rooms.
 * @param {ObjectId} roomId most recent room's id.
 * 
 * @returns {Promise} promise for later handling.
 */
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