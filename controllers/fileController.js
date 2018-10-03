const { Room } = require('../models/Room');

const saveRoomFile = async (req, res) => {
    const { roomId } = req.params;
    const { originalName, hashedName, username, fileExt } = req;
    try {
        if (['jpg', 'png', 'svg', 'jpeg', 'ico'].indexOf(fileExt) === -1) {
            await Room.updateOne({ _id: roomId }, {
                $push: {
                    files: {
                        $each: [{
                            originalName,
                            hashedName,
                            uploader: username
                        }],
                        $sort: { time: -1 }
                    }
                }
            });
            return res.status(200).send('Save file successfully.');
        } else {
            await Room.updateOne({ _id: roomId }, {
                $push: {
                    images: {
                        $each: [{
                            originalName,
                            hashedName,
                            uploader: username
                        }],
                        $sort: { time: -1 }
                    }
                }
            });
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