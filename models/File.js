const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileSchema = new Schema({
    originalName: String,
    hashedName: String,
    time: {
        type: Date,
        default: () => new Date().toISOString()
    },
    uploader: String
});

const File = mongoose.model('file', fileSchema);

module.exports = {  fileSchema, File };