const socket = require('socket.io');
const { User } = require('./models/User');
const { Room } = require('./models/Room');

const socketMap = {};

module.exports = (server) => {
    const io = socket(server);

    io.on('connection', socket => {
        console.log('A new client connected to server', socket.id);

        socket.on('thisUserCreatesRoom', data => {
            const { users, roomInfo } = data;
            console.log('--------->', roomInfo);
            users.forEach(user => socketMap[user].join(roomInfo.roomId));
            socket.broadcast.to(roomInfo.roomId).emit('aUserCreatesRoom', data);
        });

        socket.on('thisUserGoesOnline', data => {
            const { username } = data;
            const now = new Date();

            console.log(username, 'goes online');
            socket.broadcast.emit('aUserGoesOnline', { ...data, lastLogin: now.toISOString() });

            socketMap[username] = socket;

            User.findOne({ username }).then(user => {
                const { rooms } = user;
                rooms.forEach(room => socket.join(room));
            });

            // console.log(socketMap);
        });


        socket.on('thisUserGoesOffline', data => {
            const { username } = data;
            const now = new Date();

            console.log(data.username, 'goes offline');
            socket.broadcast.emit('aUserGoesOffline', { ...data, lastLogout: now.toISOString() });

            delete socketMap[username];

            User.findOne({ username }).then(user => {
                const { rooms } = user;
                rooms.forEach(room => socket.leave(room._id));
            });

            console.log(socketMap);
        });


        socket.on('thisUserSendsMessage', data => {
            const now = new Date();
            socket.broadcast.to(data.roomId).emit('aUserSendsMessage', { ...data, time: now.toISOString() });
        });


        socket.on('thisUserIsTyping', data => {
            socket.broadcast.to(data.roomId).emit('aUserIsTyping', data);
        });


        socket.on('thisUserStopsTyping', data => {
            socket.broadcast.to(data.roomId).emit('aUserStopsTyping', data);
        });


        socket.on('thisUserChangesColorTheme', data => {
            const { roomId, content, type } = data;
            const now = new Date();

            socket.broadcast.to(data.roomId).emit('aUserChangesColorTheme', { ...data, time: now.toISOString() });
            socket.emit('aUserChangesColorTheme', { ...data, time: now.toISOString() });
            
            Room.findByIdAndUpdate(roomId, { $push: { messages: { $each: [{ from: 'system', content, type }] } } }, function () { });
        });

        
        socket.on('thisUserSeesMessage', async data => {
            const now = new Date();
            socket.broadcast.to(data.roomId).emit('aUserSeesMessage', { ...data, time: now.toISOString() });
            const { roomId, from } = data;
            let room = await Room.findById(roomId);
            let messages = [...room.messages];
            for (let i = messages.length - 1; i >= 0; i--) {
                if (messages[i].peopleSeen.map(user => user.username).indexOf(from) === -1 && messages[i].from !== from && messages[i].from !== 'system') {
                    messages[i].peopleSeen.push({ username: from });
                }
            }
            room.set({ messages });
            room.save();
        });
    });
}