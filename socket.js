const socket = require('socket.io');
const { User } = require('./models/User');
const { Room } = require('./models/Room');

const socketMap = {};
let inVideoCallUser = [];

module.exports = (server) => {
    const io = socket(server);

    io.on('connection', socket => {
        console.log('A new client connected to server', socket.id);


        socket.on('thisUserCreatesRoom', data => {
            const { users, roomInfo } = data;
            users.forEach(user => socketMap[user] && socketMap[user].join(roomInfo.roomId));
            socket.broadcast.to(roomInfo.roomId).emit('aUserCreatesRoom', data);
        });


        socket.on('thisUserGoesOnline', data => {
            const { username } = data;
            const now = new Date();

            console.log(username, 'goes online');
            socket.broadcast.emit('aUserGoesOnline', { ...data, lastLogin: now.toISOString() });

            socketMap[username] = socket;

            User.findOneAndUpdate({ username }, { $set: { lastLogin: now.toISOString() } }, function () { });

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

            User.findOneAndUpdate({ username }, { $set: { lastLogout: now.toISOString() } }, function () { });

            User.findOne({ username }).then(user => {
                const { rooms } = user;
                rooms.forEach(room => socket.leave(room._id));
            });

            inVideoCallUser = inVideoCallUser.filter(user => user !== username);
        });


        socket.on('thisUserMakesVideoCall', (data, cb) => {
            console.log('A user makes video call.', data.roomId, data.from);

            if (inVideoCallUser.indexOf(data.from) !== -1) return cb('YOU_ARE_CALLING');
            if (inVideoCallUser.indexOf(data.counterpart) !== -1) return cb('USER_IS_CALLING');

            
            data.users.forEach(user => {
                console.log('>', user, socketMap[user].id, inVideoCallUser);
                if (socketMap[user] && inVideoCallUser.indexOf(user) === -1) {
                    console.log('>>', user, socketMap[user].id, inVideoCallUser);
                    inVideoCallUser = inVideoCallUser.concat(user);
                        socket.broadcast.to(data.roomId).emit('aUserMakesVideoCall', data);
                }
            });

            cb('OK');
        });


        socket.on('thisUserQuitsVideoCall', data => {
            inVideoCallUser = inVideoCallUser.filter(user => user !== data.from);
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