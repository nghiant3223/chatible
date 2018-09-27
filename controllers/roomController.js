const { User } = require('../models/User');
const { Message } = require('../models/Message');
const { Room } = require('../models/Room');

const getRoom = async (req, res) => {
    const { username } = req;

    let user = await User.findOne({ username }, { rooms: 1 });
    res.status(200).send(user.rooms);
}

const getRoomInfo = async (req, res) => {
    const { roomId } = req.params;
    let room = await Room.findById(roomId, { _id: 0, __v: 0 });

    if (!room) return res.status(404).send('Room not found.');

    room.messages = room.messages[room.messages.length - 1];
    return res.status(200).send(room);
}

const createRoom = async (req, res) => {
    const { type } = req.body;
    if (type === 'DUAL') {
        const { from, to } = req.body;
        let room = await Room.findOne({ users: { $all: [from, to] }, type });
        if (room) return res.status(409).send('Room already exists.');

        let newRoom = await Room.create({ users: [from, to], type });

        User.findOneAndUpdate({ username: from }, { $push: { rooms: newRoom._id } }, function () { 
            User.findOneAndUpdate({ username: to }, { $push: { rooms: newRoom._id } }, function () {
                return res.status(200).send(newRoom);
            });
        });
    } else if (type === 'GROUP') {
        const { creator } = req.body;

        let newRoom = await Room.create({ users: [creator], type });
        return res.status(200).send(newRoom);
    } else {
        return res.status(422).send('Invalid request data.');
    }
}

module.exports = { getRoom, createRoom, getRoomInfo };