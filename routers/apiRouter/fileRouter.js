const express = require('express');
const router = express.Router();

const { verifyToken, checkUserInRoom } = require('../../middleware');
const { uploadFile } = require('../../middleware/index');
const { fileController } = require('../../controllers');

router.post('/:roomId', verifyToken, checkUserInRoom, uploadFile.single('file'), fileController.saveFile);

router.get('/:roomId/file', verifyToken, checkUserInRoom, fileController.getRoomFiles);

router.get('/:roomId/image', verifyToken, checkUserInRoom, fileController.getRoomImages);

router.delete('/:roomId/file', verifyToken, checkUserInRoom, fileController.deleteRoomFiles);

router.delete('/:roomId/image', verifyToken, checkUserInRoom, fileController.deleteRoomImages);

module.exports = router;