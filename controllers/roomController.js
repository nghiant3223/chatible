const { roomService, messageService, userService } = require('../services/index');


const getRecentRooms = async (req, res) => {
    const { username } = req;

    let user = await userService.getUserByUsername(username);
    let rooms = [];
    
    for (roomId of user.rooms) {
        try {
            const room = roomService.getRoomById(roomId);
            const roomMessages = room.messages;
            const lastMessage = roomMessages[roomMessages.length - 1];
            const partner = await userService.getUserByUsername({ username: room.users[0] !== username ? room.users[0] : room.users[1] }, '-password -id');

            rooms.push({
                roomId,
                lastMessage,
                type: room.type,
                files: room.files,
                users: room.users,  
                images: room.images,
                colorTheme: room.colorTheme,
                sharedEditorContent: room.sharedEditorContent,
                partner: room.type === 'GROUP' ? null : partner
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    }
    
    return res.status(200).json({ data: rooms });
}

const getRoomInfo = async (req, res) => {
    const { roomId } = req.params;
    let room = await roomService.getRoomById(roomId, '-messages -files -images');

    if (!room) return res.status(404).json({ message: 'Room not found.' });

    data = room.toObject(); 
    data.lastMessage = data.messages[room.messages.length - 1];

    return res.status(200).json({ data });
}

const createRoom = async (req, res) => {
    const { users } = req.body; 

    try {
        const createRoomServiceRes = await roomService.createRoom(users);
        if (!createRoomServiceRes) {
            res.status(422).json({ message: 'Room already exists.' });
        } else {
            res.status(200).json({ message: 'Create room successfully.', data: createRoomServiceRes });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const updateRoom = async (req, res) => {
    const { roomId } = req.params;
    const { colorTheme } = req.body;

    // Update color theme.
    if (colorTheme) {
        try {
            await roomService.updateRoom(roomId, { colorTheme });
            res.status(200).json({ message: "Change room's color theme successfully." });
        } catch (e) {
            res.status(404).json({ message: 'Room not found.' });
        }
    }
}


const deleteRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        const deleletRoomServiceRes = roomService.deleteRoom(roomId);
        if (deleletRoomServiceRes) {
            res.status(200).json({ message: 'Delete room successfully.' });
        } else {
            res.status(404).json({ message: 'Room not found.' });
        }
    } catch (e) {
        res.status(500).json({ message: 'Internal server error.' });
    }

}


module.exports = {
    getRecentRooms,
    createRoom,
    getRoomInfo,
    updateRoom,
    deleteRoom
};