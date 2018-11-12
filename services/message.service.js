const { Message } = require('../models/Message');

/**
 * Create a new message and return it.
 * @param {Object} messageInfo - info of a message to be created.
 * 
 * @returns {Message} - newly created message.
 */
export function createMessage(messageInfo) {
    const message = new Message(messageInfo);
    message.save();
    return message;
}