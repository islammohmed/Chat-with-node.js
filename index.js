const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('send_to_all' ,msg);
    });
    socket.on('typing', () => {
        socket.broadcast.emit('show_typing_status')
    })
    socket.on('stop_typing', () => {
        socket.broadcast.emit('clear_typing_status')
    })
  });
 

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});