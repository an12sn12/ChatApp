const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket => {
    //if any new user joined ,let other users connected to the server know//

    socket.on('new-user-joined', name => {
        // console.log('new user', name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name)
    });
    //if someone send the message broadcast it to the others people//
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
    // if someone left the chat then let the know the others people connected to the server//
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });
})