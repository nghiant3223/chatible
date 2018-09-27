const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { messageSchema } = require('./Message');
const { fileSchema } = require('./File.js');

const roomSchema = new Schema({
    users: [String],
    messages: {
        type: [messageSchema],
        default: []
    },
    files: {
        type: [fileSchema],
        default: []
    },
    type: {
        type: String,
        enum: ['DUAL', 'GROUP']
    }, 
    color: {
        type: String,
        default: 'cyan'
    }
});

const Room = mongoose.model('room', roomSchema);

module.exports = { roomSchema, Room };