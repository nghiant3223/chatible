const jwt = require('jsonwebtoken');
const fs = require('fs');

const { userService, messageService, roomService } = require('../services/index');

const { jwtSecret } = require('../configs/keys');


const getAllUsers = async (req, res) => {
    const users = await userService.getUserByUsername(null, '-password');
    res.status(200).json({ data: users });
}

const getMe = async (req, res) => {
    const { username } = req; 
    const user = await userService.getUserByUsername(username);
    if (user) return res.status(200).json({ data: user });
    else return res.status(404).json({ message: 'User not found.' });
}

const getSpecificUser = async (req, res) => {
    const { username } = req.params;
    const user = await userService.getUserByUsername(username, '-password');
    if (user) return res.status(200).json({ data: user });
    else return res.status(404).json({ message: 'User not found.' });
}

const updateUser = async (req, res) => {
    const { username } = req;
    const { roomId } = req.params;

    // Update last active contact.
    if (roomId) {
        try {
            const updatedUser = await userService.updateUser(username, { lastActiveContact: roomId });
            res.status(200).json({ data: updatedUser });
        } catch (e) {
            console.log(e);
            res.status(404).json({ message: 'User not found.' });
        }
    }
}


module.exports = {
    getMe,
    getAllUsers,
    updateUser,
    getSpecificUser
};