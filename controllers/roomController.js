const { User } = require('../models/User');
const { Message } = require('../models/Message');
const { Room } = require('../models/Room');

/**
 * Get room's short information for recent contact list
 */
const getRecentRooms = async (req, res) => {
    const { username } = req;

    let user = await User.findOne({ username }, { rooms: 1 });
    let ret = [];
    
    for (roomId of user.rooms) {
        try {
            const room = await Room.findById(roomId);
            const roomMessages = room.messages;
            const lastMessage = roomMessages[roomMessages.length - 1];
            if (room.type === 'GROUP') {
                ret.push({
                    roomId: roomId,
                    lastMessage,
                    users: room.users,
                    colorTheme: room.colorTheme,
                    type: room.type,
                    files: room.files,
                    images: room.images,
                    sharedEditorContent: room.sharedEditorContent
                });
            } else {
                const counterpart = await User.findOne({ username: room.users[0] !== username ? room.users[0] : room.users[1] }, { password: 0, _id: 0, __v: 0 });
                ret.push({
                    roomId: roomId,
                    lastMessage,
                    counterpart,
                    colorTheme: room.colorTheme,
                    type: room.type,
                    files: room.files,
                    images: room.images,
                    sharedEditorContent: room.sharedEditorContent
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

    data = room.toObject(); 
    data.lastMessage = data.messages[room.messages.length - 1];
    
    delete data.messages;
    delete data.files;
    delete data.images;

    return res.status(200).send(data);
}

const createRoom = async (req, res) => {
    const { type, users} = req.body; 
    
    
    if (type === 'DUAL') {
        let room = await Room.findOne({ users: { $all: users }, type });
        if (room) return res.status(409).send('Room already exists.');
    }

    let newRoom = await Room.create({ users, type });
    Promise.all(users.reduce((promiseArray, username) => promiseArray = promiseArray.concat(User.findOneAndUpdate({ username }, { $push: { rooms: newRoom._id } })), []))
        .then(() => {
            res.status(200).send(newRoom._id);
        }).catch(e => {
            console.log(e);
            res.status(500).send('Internal server error');
        });
}

const changeColorTheme = async (req, res) => {
    const { roomId } = req.params;
    const { colorTheme } = req.body;
    try {
        await Room.findByIdAndUpdate(roomId, { colorTheme });
        res.status(200).send("Change room's color theme successfully.");
    } catch (e) {
        res.status(404).send('Room not found');
    }
}

const deleteRoom = async (req, res) => {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);
    
    if (!room) return res.status(404).send('Room not found');

    console.log('rôm');

    Promise.all(room.users.reduce((promiseArray, username) => promiseArray = promiseArray.concat(User.findOneAndUpdate({ username }, { $pull: { rooms: roomId } })), []))
        .then(() => {
            room.remove();
            res.status(200).send('Delete room succesfully');
        }).catch(e => {
            res.status(500).send(e);
        });
}

module.exports = { getRecentRooms, createRoom, getRoomInfo, changeColorTheme, deleteRoom};