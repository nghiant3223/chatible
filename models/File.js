const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
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

const File = mongoose.model('file', fileSchema);

module.exports = {  fileSchema, File };