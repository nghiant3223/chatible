const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const { roomSchema } = require('./Room');

const userSchema = new Schema({
    username: String,
    fullname: String,
    password: String,
    avatarUrl: {
        type: String,
        default: '< default avatar url >'
    },
    lastLogin: {
        type: Date,
        default: () => new Date().toISOString()
    },
    lastLogout: {
        type: Date,
        default: () => new Date().toISOString()
    },
    rooms: [String],
    lastActiveContact: {
        type: String,
        default: null
    }
});

const User = mongoose.model('user', userSchema);

module.exports = { userSchema, User };