const { Room } = require('../models/Room');

const saveRoomFile = async (req, res) => {
    const { roomId } = req.params;
    const { originalName, hashedName, username, fileExt } = req;
    try {
        if (['jpg', 'png', 'svg', 'jpeg', 'ico'].indexOf(fileExt) === -1) {
            console.log('is images', fileExt);
            await Room.updateOne({ _id: roomId }, { $addToSet: { files: { originalName, hashedName, uploader: username } } });
            return res.status(200).send('Save file successfully.');
        } else {
            console.log('is not images', fileExt);
            await Room.updateOne({ _id: roomId }, { $addToSet: { images: { originalName, hashedName, uploader: username } } });
            return res.status(200).send('Save image successfully.');
        }
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error.');
    }
}

const getRoomFiles = async (req, res) => {
    const { roomId } = req.params;
    const { count } = req.query;
    let room = await Room.findById(roomId);
    if (room) {
        if (room.files.length < count) return res.status(200).send(room.files);
        else return res.status(200).send(room.files.slice(room.files.length - count));
    } else return res.status(404).send('Room not found.');
}

const getRoomImages = async (req, res) => {
    const { roomId } = req.params;
    const { count } = req.query;
    let room = await Room.findById(roomId);
    if (room) {
        if (room.files.length < count) return res.status(200).send(room.images);
        else return res.status(200).send(room.images.slice(room.files.length - count));
    } else return res.status(404).send('Room not found');
}

module.exports = { saveRoomFile, getRoomFiles, getRoomImages };