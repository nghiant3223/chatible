const jwt = require('jsonwebtoken');

const { userService } = require('../services/index');
const { jwtSecret } = require('./../configs/keys');


const loginUser = async (req, res) => {
    const { username, password } = req.body;

    let user = await userService.getUserByUsername(username);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    if (user.password !== password) return res.status(409).json({ message: 'Incorrect password.' });
    
    await userService.updateUser(username, { lastLogin: new Date().toISOString() });
    const token = jwt.sign({
        data: username
    }, jwtSecret, { expiresIn: '240000h' });

    res.status(200).json({ message: 'Login successfully.', data: token });
}

const logoutUser = async (req, res) => {
    const { username } = req;

    await userService.updateUser(username, { lastLogout: new Date().toISOString() });
    res.status(200).json({ message: 'Logout user successfully.' });
}

const createUser = async (req, res) => {
    const { username, password, fullname } = req.body;
    let user = await userService.getUserByUsername(username);
    console.log('--', user, username);
    if (user) return res.status(409).json({ message: 'User already exists.'});

    try {
        const newUser = await userService.createUser({ username, password, fullname });
        res.status(200).json({ message: 'Create user successfully.', data: newUser });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Internal server error.' });
    }
}


module.exports = {
    loginUser,
    logoutUser,
    createUser
};