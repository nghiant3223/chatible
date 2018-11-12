const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { messageSchema } = require('./Message');
const { fileSchema } = require('./File');
const { imageSchema } = require('./Image');

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
    images: {
        type: [imageSchema],
        default: []
    },
    type: {
        type: String,
        enum: ['DUAL', 'GROUP']
    }, 
    colorTheme: {
        type: String,
        default: '#2196F3'
    }, 
    sharedEditorContent: String
});

const Room = mongoose.model('room', roomSchema);

module.exports = { roomSchema, Room };