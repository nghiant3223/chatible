const jwt = require('jsonwebtoken');
const fs = require('fs');

const { userService, messageService, roomService } = require('../services/index');

const { jwtSecret } = require('../configs/keys');

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    let user = await userService.getUserByUsername(username);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user.password !== password) return res.status(409).json({ message: 'Incorrect password.' });
    
    const token = jwt.sign({
        data: username
    }, jwtSecret, { expiresIn: '240000h' });

    res.status(200).send(token);
}

const logoutUser = async (req, res) => {
    res.status(200).send('Logout user successfully.');
}

const createUser = async (req, res) => {
    const { username, password, fullname } = req.body;
    let user = await userService.getUserByUsername(username);
    if (user) return res.status(409).json({ message: 'User already exists.'});

    try {
        const newUser = await userService.createUser({ username, password, fullname });
        res.status(200).json({ message: 'Create user successfully.', data: newUser });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

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

const updateLastActiveContact= async (req, res) => {
    const { username } = req;
    const { roomId } = req.params;

    try {
        const updatedUser = await userService.updateUser(username, { lastActiveContact: roomId });
        res.status(200).json({ data: updatedUser });
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: 'User not found.' });
    }
}

module.exports = {
    getMe,
    loginUser,
    createUser,
    logoutUser,
    getAllUsers,
    getSpecificUser,
    updateLastActiveContact
};