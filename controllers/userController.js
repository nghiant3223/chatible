const jwt = require('jsonwebtoken');

const { User } = require('../models/User');
const { Message } = require('../models/Message');
const { Room } = require('../models/Room');

const { jwtSecret } = require('../configs/keys');

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    let user = await User.findOne({ username });

    if (!user) return res.status(404).send('User not found.');

    if (user.password !== password) return res.status(409).send('Incorrect password.');
    
    User.findOneAndUpdate({ username }, { $set: { lastLogin: Date.now() } }, function () { });

    const token = jwt.sign({
        data: username
    }, jwtSecret, { expiresIn: '240000h' });

    res.status(200).send(token);
}

const logoutUser = async (req, res) => {
    const { username } = req;
    User.findOneAndUpdate({ username }, { $set: { lastLogout: Date.now() } }, function () { });
    res.status(200).send('Logout user successfully.');
}

const createUser = async (req, res) => {
    const { username, password, fullname } = req.body;
    let user = await User.findOne({ username });
    if (user) return res.status(409).send('User already exists.');

    let newUser = new User({ username, password, fullname });
    await newUser.save();
    res.status(200).send('Create user successfully.');
}

const getAllUsers = async (req, res) => {
    const users = await User.find({}, { _id: 0, password: 0, __v: 0});
    res.status(200).send(users);
}

const getMe = async (req, res) => {
    const { username } = req; 
    const user = await User.findOne({ username }, { _id: 0, password: 0, __v: 0});
    if (user) return res.status(200).send(user);
    else return res.status(404).send('User not found.');
}

const getUserByUsername = async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username }, { _id: 0, password: 0, __v: 0});
    if (user) return res.status(200).send(user);
    else return res.status(404).send('User not found.');
}

const updateLastActiveContact= async (req, res) => {
    const { username } = req;

    const { roomId } = req.params;
    User.findOneAndUpdate({ username }, { $set: { lastActiveContact: roomId } }, { new: true }, function (err, doc) {
        if (err) res.status(500).send(err);
        else res.status(200).send(doc);
    });
}

module.exports = { loginUser, createUser, getAllUsers, getMe, getUserByUsername, logoutUser, updateLastActiveContact};