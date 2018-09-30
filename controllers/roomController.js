const { User } = require('../models/User');
const { Message } = require('../models/Message');
const { Room } = require('../models/Room');

const getRoom = async (req, res) => {
    const { username } = req;

    let user = await User.findOne({ username }, { rooms: 1 });
    let ret = [];
    
    for (roomId of user.rooms) {
        try {
            const room = await Room.findById(roomId);
            const roomMessages = room.messages;
            const lastMessage = roomMessages[roomMessages.length - 1];
            if (room.type === 'GROUP') {
                if (lastMessage) ret.push({
                    roomId: roomId,
                    lastMessage,
                    users: room.users,
                    seen: lastMessage.peopleSeen.indexOf(username) !== -1,
                    colorTheme: room.colorTheme,
                    type: room.type
                });
                else ret.push({
                    roomId: roomId,
                    users: room.users,
                    seen: false,
                    colorTheme: room.colorTheme,
                    type: room.type
                });
            } else {
                const counterpart = await User.findOne({ username: room.users[0] !== username ? room.users[0] : room.users[1] }, { password: 0, _id: 0, __v: 0 });
                if (lastMessage) ret.push({
                    roomId: roomId,
                    lastMessage,
                    counterpart,
                    seen: lastMessage.peopleSeen.indexOf(username) !== -1,
                    colorTheme: room.colorTheme,
                    type: room.type
                });
                else ret.push({
                    roomId: roomId,
                    counterpart,
                    seen: false,
                    colorTheme: room.colorTheme,
                    type: room.type
                });
            }
        } catch (e) {
            console.log(e);
            return res.status(500).send('Internal server error.');
        }
    }
    
    return res.status(200).send(ret);
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
        const fromUser = await User.findOne({ username: from });
        const toUser = await User.findOne({ username: to });
        if (fromUser === null || toUser === null) return res.status(404).send('User not found.');

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
        User.findOneAndUpdate({ username: creator }, { $push: { rooms: newRoom._id } }, function () {
            return res.status(200).send(newRoom);
        });
    } else {
        return res.status(422).send('Invalid request data.');
    }
}

const changeColorTheme = async (req, res) => {
    const { roomId } = req.params;
    const { colorTheme } = req.body;
    await Room.findByIdAndUpdate(roomId, { colorTheme });
    res.status(200).send("Change room's color theme successfully.");
}

module.exports = { getRoom, createRoom, getRoomInfo, changeColorTheme };