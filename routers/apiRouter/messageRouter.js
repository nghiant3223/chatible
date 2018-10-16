const express = require('express');
const router = express.Router();
const messageController = require('../../controllers/messageController');
const { verifyToken, checkUserInRoom } = require('../../middleware/index');


router.get('/:roomId', verifyToken, checkUserInRoom, messageController.getMessages);

router.post('/:roomId', verifyToken, checkUserInRoom, messageController.saveMessage);

router.delete('/:roomId', verifyToken, checkUserInRoom, messageController.deleteMessages);


module.exports = router;