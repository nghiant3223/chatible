const { Room } = require('../models/Room');


/**
 * Append message to a room.
 * @param {ObjectId} roomId id of the room.
 * @param {Message} message message to be appended.
 * 
 * @returns {Promise} promise for later handling.
 */
function appendMessage(roomId, message) {
    return Room.updateOne({ _id: roomId }, { $push: { messages: message } });
}


/**
 * Get room information by room id.
 * @param {ObjectId} roomId id of the room.
 * @param {String} projection concatenation of fields to be retrieved, join by ' '.
 * 
 * @returns {Promise} promise for later handling.
 */
function getRoomById(roomId, projection) {
    return Room.findById(roomId).select(projection);
}


/**
 * Delete room's messages.
 * @param {ObjectId} roomId id of the room
 * 
 * @returns {Promise} promise for later handling.
 */
function deleteRoomMessages(roomId) {
    return getRoomById(roomId).then(room => {
        room.messages = [];
        room.save()
    });
}


/**
 * Create new room.
 * @param {Array} users list of users to create new room.
 * 
 * @returns {Room} newly created room. 
 */
async function createRoom(users) {
    let room = await Room.findOne({ users: { $all: users } });
    if (room) return false;

    let type = users.length === 2 ? 'DUAL' : 'GROUP';
    let newRoom = await Room.create({ users, type });

    await Promise.all(users.reduce((promiseArray, username) => promiseArray = promiseArray.concat(User.findOneAndUpdate({ username }, { $push: { rooms: newRoom._id } })), []));
    return newRoom;
}


/**
 * Update room's information.
 * @param {String} roomId id of room to be updated.
 * @param {Object} updateInfo object that specifies modifications.
 * 
 * @returns {Promise} promise for later handling.
 */
function updateRoom(roomId, updateInfo) {
    return Room.findByIdAndUpdate(roomId, { $set: updateInfo }, { new: true });
}


/**
 * Delete room.
 * @param {String} roomId id of room to be deleted.
 * 
 * @returns {Boolean} - `true` if delete room successfully, else `false`.
 */
async function deleteRoom(roomId) {
    const room = await Room.findById(roomId);

    if (!room) return false;

    await Promise.all(room.users.reduce((promiseArray, username) => promiseArray = promiseArray.concat(User.findOneAndUpdate({ username }, { $pull: { rooms: roomId } })), []))
    room.remove();
    return true;
}

/**
 * Get room's files.
 * Return all room's files if `count` is not specified.
 * Else return a number of messages equals to `count`.
 * @param {String} roomId id of room to retrieve files.
 * 
 * @return {Array | Boolean} return array of room's files if room exists, else `false`.
 */
async function getFiles(roomId, count) {
    const { roomId } = req.params;
    const { count } = req.query;
    let room = await Room.findById(roomId);
    if (room) {
        if (room.files.length < count) return room.files;
        else return room.files.slice(room.files.length - count);
    } else return false;
}

/**
 * Get room's images.
 * Return all room's images if `count` is not specified.
 * Else return a number of messages equals to `count`.
 * @param {String} roomId id of room to retrieve images.
 * 
 * @return {Array | Boolean} return array of room's images if room exists, else `false`.
 */
async function getImages(roomId, count) {
    const { roomId } = req.params;
    const { count } = req.query;
    let room = await Room.findById(roomId);
    if (room) {
        if (room.images.length < count) return room.images;
        else return room.images.slice(room.images.length - count);
    } else return false;
}

/**
 * Get room's messages.
 * Return all room's messages if `count` is not specified.
 * Else return a number of messages equals to `count`.
 * @param {String} roomId id of room to retrieve messages.
 * 
 * @return {Array | Boolean} return array of room's messages if room exists, else `false`.
 */
async function getMessages(roomId, count) {
    const { roomId } = req.params;
    const { count } = req.query;
    let room = await Room.findById(roomId);
    if (room) {
        if (room.messages.length < count) return room.messages;
        else return room.messages.slice(room.messages.length - count);
    } else return false;
}

module.exports = {
    appendMessage,
    getRoomById,
    deleteRoomMessages,
    createRoom,
    updateRoom,
    deleteRoom,
    getFiles,
    getImages,
    getMessages
};