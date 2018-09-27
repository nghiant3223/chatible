const { Room } = require('../models/Room');

const saveRoomFile = async (req, res) => {
    const { roomId } = req.params;
    const { originalName, hashedName, username } = req;
    try {
        await Room.updateOne({ _id: roomId }, { $addToSet: { files: { originalName, hashedName, uploader: username } } });
        return res.status(200).send('Save file successfully.');
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
    }
    else return res.status(404).send('Room not found.');
}

module.exports = { saveRoomFile, getRoomFiles };