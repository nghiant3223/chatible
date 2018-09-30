const socket = require('socket.io');

module.exports = (server) => {
    const io = socket(server);

    io.on('connection', socket => {
        console.log('A new client connected to server', socket.id);

        socket.on('thisUserGoesOnline', data => {
            const now = new Date();
            console.log(data.username, 'goes online');
            socket.broadcast.emit('aUserGoesOnline', { ...data, lastLogin: now.toISOString() });
        });

        socket.on('thisUserGoesOffline', data => {
            const now = new Date();
            console.log(data.username, 'goes offline');
            socket.broadcast.emit('aUserGoesOffline', { ...data, lastLogout: now.toISOString() });
        })
    });
}