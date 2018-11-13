const express = require('express');
const router = express.Router();
const { roomController } = require('../../controllers/index');
const { verifyToken, checkUserInRoom } = require('../../middleware/index');


router.get('/', verifyToken, roomController.getRecentRooms);

router.get('/:roomId/info', verifyToken, checkUserInRoom, roomController.getRoomInfo);

router.post('/', verifyToken, roomController.createRoom);

router.patch('/:roomId', verifyToken, checkUserInRoom, roomController.updateRoom);

router.delete('/:roomId', verifyToken, checkUserInRoom, roomController.deleteRoom);


module.exports = router;