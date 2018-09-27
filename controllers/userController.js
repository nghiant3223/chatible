const { User } = require('../models/User');
const { Message } = require('../models/Message');
const { Room } = require('../models/Room');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    let user = User.find({ username });

    if (!user) return res.status(404).send('User not found.');

    if (user.password !== password) return res.status(409).send('Incorrect password.');

    jwt.sign({
        username,
        password
    }, 'secret', { expiresIn: '10' });

    res.status(200).send('Login user successfully');
}

const createUser = async (req, res) => {
    const { username, password, fullname } = req.body;
    let user = await User.findOne({ username });
    console.log(username, password, user);
    if (user) return res.status(409).send('User already exists.');

    let newUser = new User({ username, password, fullname });
    await newUser.save();
    res.status(200).send('Create user successfully.');
}

const getAllUsers = async (req, res) => {
    const users = await User.find({}, { _id: 0, password: 0, __v: 0});
    console.log('a',req.query.username);
    res.status(200).send(users);
}
const getUserByUsername = async (req, res) => {
    const { username } = req.params; 
    const user = await User.find({ username }, { _id: 0, password: 0, __v: 0});
    if (user) return res.status(200).send(user);
    else return res.status(404).send('User not found.');
}

module.exports = { loginUser, createUser, getAllUsers, getUserByUsername };