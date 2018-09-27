const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let messageSchema = new Schema({
    from: String,
    content: String,
    time: {
        type: Date,
        default: new Date()
    },
    peopleSeen: {
        type: [String],
        default: []
    }
});

let Message = mongoose.model('message', messageSchema);

module.exports = {  messageSchema, Message };