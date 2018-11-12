const { Room } = require('../models/Room');

/**
 * Append message to a room.
 * @param {ObjectId} roomId - id of the room.
 * @param {Message} message - message to be appended.
 * 
 * @returns {Promise} - promise for later handling.
 */
export function appendMessage(roomId, message) {
    return Room.updateOne({ _id: roomId }, { $push: { messages: message } });
}

/**
 * Get room information by room id.
 * @param {ObjectId} roomId - id of the room.
 * 
 * @returns {Promise} - promise for later handling.
 */
export function getRoomById(roomId) {
    return Room.findById(roomId);
}

/**
 * Delete room's messages.
 * @param {ObjectId} roomId - id of the room
 * 
 * @returns {Promise} - promise for later handling.
 */
export function deleteRoomMessages(roomId) {
    return getRoomById(roomId).then(room => room.save());
}