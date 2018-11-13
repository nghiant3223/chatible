const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    originalName: {
        type: String,
        required: true
    },
    hashedName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => new Date().toISOString()
    },
    uploader: {
        type: String,
        required: true
    }
});

const Image = mongoose.model('image', imageSchema);

module.exports = { imageSchema,  Image };