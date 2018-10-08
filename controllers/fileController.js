const { Room } = require('../models/Room');
const { File } = require('../models/File');
const { Image } = require('../models/Image');

const saveRoomFile = async (req, res) => {
    const { roomId } = req.params;
    const { originalName, hashedName, username, fileExt } = req;
    try {
        const now = new Date();
        if (['jpg', 'png', 'svg', 'jpeg', 'ico'].indexOf(fileExt) === -1) {
            const file = new File({ originalName, hashedName, uploader: username });
            await Room.updateOne({ _id: roomId }, {
                $push: {
                    files: {
                        $each: [file],
                        $sort: { time: -1 }
                    }
                }
            });
            return res.status(200).send(file);
        } else {
            const image = new Image({ originalName, hashedName, uploader: username });
            await Room.updateOne({ _id: roomId }, {
                $push: {
                    images: {
                        $each: [image],
                        $sort: { time: -1 }
                    }
                }
            });
            return res.status(200).send(image);
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