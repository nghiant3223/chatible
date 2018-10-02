const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    originalName: String,
    hashedName: String,
    time: {
        type: Date,
        default: () => new Date().toISOString()
    },
    uploader: String
});

const Image = mongoose.model('image', imageSchema);

module.exports = {
    imageSchema,
    Image
};