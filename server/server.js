const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require("./utils/message.js");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// express.static() is a built-in middleware function
// we add it to the application-level middleware layer
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage("Admin", "Welcome to the chat app!"));

    socket.broadcast.emit('newMessage', generateMessage("Admin", "New User joined."));

    socket.on('createMessage', (message) => {
        console.log("client created new message:", message);
        io.emit("newMessage", generateMessage(message.from, message.text));

        // socket.broadcast.emit("newMessage", {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
});

server.listen(port, () => {
    console.log('Server on and listening on PORT 3000...');
});