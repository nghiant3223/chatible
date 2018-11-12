const { userService, fileService, roomService, messageService} = require('../services/index');

const saveFile = async (req, res) => {
    const { roomId } = req.params;
    const { originalName, hashedName, username, fileExt } = req;
    
    try {
        const instance = await fileService.createFile(roomId, fileExt, { originalName, hashedName, uploader: username });
        res.status(200).json({ message: 'Create file/image successfully.', data: instance });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const getRoomFiles = async (req, res) => {
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

const getRoomImages = async (req, res) => {
    const { roomId } = req.params;
    const { count } = req.query;

    try {
        const roomImagesServiceRes = await roomService.getImages(roomId, count);
        if (roomImagesServiceRes === false) res.status(404).json({ message: 'Room not found.' });
        else res.status(200).json({ data: roomImagesServiceRes });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const deleteRoomFiles = async (req, res) => {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);

    if (!room) res.status(404).json({message: 'Room not found.'})

    try {
        room.files.forEach(file => fileService.deleteFile(file.hashedName));
        room.set({files: []});
        room.save();
        res.status(200).json({ message: 'Delete room files successfully.' })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

const deleteRoomImages = async (req, res) => {
    const { roomId } = req.params;
    const room = await Room.findById(roomId);

    if (!room) res.status(404).json({message: 'Room not found.'})

    try {
        room.images.forEach(file => fileService.deleteFile(file.hashedName));
        room.set({images: []});
        room.save();
        res.status(200).json({ message: 'Delete room images successfully.' })
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports = {
    saveFile,
    getRoomFiles,
    getRoomImages,
    deleteRoomFiles,
    deleteRoomImages
};