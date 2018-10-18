const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/roomController');
const { verifyToken, checkUserInRoom } = require('../../middleware/index');


router.get('/', verifyToken, roomController.getRecentRooms);

router.get('/info/:roomId', verifyToken, checkUserInRoom, roomController.getRoomInfo);

router.post('/', verifyToken, roomController.createRoom);

router.post('/color/:roomId', verifyToken, checkUserInRoom, roomController.changeColorTheme);

router.delete('/:roomId', verifyToken, checkUserInRoom, roomController.deleteRoom);

router.get('/check/:roomId', verifyToken, checkUserInRoom, (req, res) => {
    res.status(200).send('User in this room.');
});

module.exports = router;