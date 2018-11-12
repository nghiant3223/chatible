const { roomService, messageService, userService } = require('../services/index');

const saveMessage = async (req, res) => {
    const { roomId } = req.params;
    const { content, type } = req.body;
    const { username } = req;
    
    try {
        let room = await roomService.getRoomById(roomId);
        if (!room) return res.status(404).json({ message: 'Room not found.' });
        else await roomService.appendMessage(roomId, messageService.createMessage({ content, type, author: username }));

        await Promise.all(room.users.reduce((promiseArray, username) =>
            promiseArray.concat(userService.updateRecentRoom(username, roomId))), []);
        res.status(200).json({ message: 'Save message successfully.' });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const getMessages = async (req, res) => {
    const { roomId } = req.params;
    const { count } = req.query;

    try {
        const roomFilesServiceRes = await roomService.getFiles(roomId, count);
        if (roomFilesServiceRes === false) res.status(404).json({ message: 'Room not found.' });
        else res.status(200).json({ data: roomFilesServiceRes });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const deleteMessages = async (req, res) => {
    const { roomId } = req.params;
    try {
        await roomService.deleteRoomMessages(roomId);
        return res.status(200).json({ message: 'Delete room messages successfully.' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
module.exports = { getMessages, saveMessage, deleteMessages };