const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/roomController');
const { verifyToken, checkUserInRoom } = require('../../middleware/index');


router.get('/', verifyToken, roomController.getRoom);

router.get('/info/:roomId', verifyToken, checkUserInRoom, roomController.getRoomInfo)

router.post('/', verifyToken, roomController.createRoom)


module.exports = router;