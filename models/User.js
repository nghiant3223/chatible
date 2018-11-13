const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { roomSchema } = require('./Room');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: '/avatars/default.png'
    },
    lastLogin: {
        type: Date,
        default: () => new Date().toISOString()
    },
    lastLogout: {
        type: Date,
        default: () => new Date().toISOString()
    },
    rooms: {
        type: [String],
        default: []
    },
    lastActiveContact: {
        type: String,
        default: null
    }
});

const User = mongoose.model('user', userSchema);

module.exports = { userSchema, User };