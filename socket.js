const socket = require('socket.io');
const { User } = require('./models/User');

module.exports = (server) => {
    const io = socket(server);

    io.on('connection', socket => {
        console.log('A new client connected to server', socket.id);


        socket.on('thisUserGoesOnline', data => {
            setTimeout(() => {
                const { username } = data;
                const now = new Date();

                console.log(username, 'goes online');
                socket.broadcast.emit('aUserGoesOnline', { ...data, lastLogin: now.toISOString() });

                User.findOne({ username }).then(user => {
                    const { rooms } = user;
                    rooms.forEach(room => socket.join(room));
                });
            }, 3000);
        });

        socket.on('thisUserGoesOffline', data => {
            const { username } = data;
            const now = new Date();

            console.log(data.username, 'goes offline');
            socket.broadcast.emit('aUserGoesOffline', { ...data, lastLogout: now.toISOString() });

            User.findOne({ username }).then(user => {
                const { rooms } = user;
                rooms.forEach(room => socket.leave(room._id));
            });
        });

        socket.on('thisUserSendsMessage', data => {
            console.log('send');
            socket.broadcast.to(data.roomId).emit('aUserSendsMessage', data);   
        });

        socket.on('thisUserIsTyping', data => {
            socket.broadcast.to(data.roomId).emit('aUserIsTyping', data);
        });

        socket.on('thisUserStopsTyping', data => {
            socket.broadcast.to(data.roomId).emit('aUserStopsTyping', data);
        });
    });
}