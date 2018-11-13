const fs = require('fs');

/**
 * Create file.
 * @param {String} roomId id of room for file/image to be updated into.
 * @param {String} fileExt file extension.
 * @param {Object} fileInfo information of file/image to be created.
 * 
 * @returns {File | Image } Image or File instance if its extension matches image/file extension.
 */

async function createFile(roomId, fileExt, fileInfo) {
    const isImage = ['jpg', 'png', 'svg', 'jpeg', 'ico', 'gif', 'bmp', 'tif'].indexOf(fileExt.toLowerCase()) === -1;
    const field = isImage ? 'images' : 'files';
    const pushedObject = {};
    pushedObject[field] = {
        $each: [image],
        $sort: { time: -1 }
    };

    const instance = isImage ? new Image(fileInfo) : new File(fileInfo);
    await Room.updateOne({ _id: roomId }, {
        $push: pushedObject
    });
    return instance;
}

/**
 * Delete file.
 * @param {String} hashedName file's hashed name.
 */
function deleteFile(hashedName) {
    fs.unlinkSync(path.resolve(global.rootDirName + '/public/uploads/' + hashedName));
}


module.exports = {
    createFile,
    deleteFile
};