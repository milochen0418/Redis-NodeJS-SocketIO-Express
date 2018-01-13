const express = require('express'),
  socketio = require('socket.io'),
  process = require('process'),
  socketioRedis = require('socket.io-redis');

var app = express();
var server = app.listen(process.argv[2]);
var io = socketio(server);

app.use(express.static('static'));

var host = '127.0.0.1';
var port = 1234 ;

io.adapter(socketioRedis({host: host, port: port}));
io.on('connection', (socket) => {
  socket.on('room.join', (room) => {
    console.log(socket.rooms);
    Object.keys(socket.rooms).filter((r) => r != socket.id)
    .forEach((r) => socket.leave(r));

    setTimeout(() => {
      socket.join(room);
      socket.emit('event', 'Joined room ' + room);
      socket.broadcast.to(room).emit('event', 'Someone joined room ' + room);
    }, 0);
  })

  socket.on('event', (e) => {
    socket.broadcast.to(e.room).emit('event', e.name + ' says hi!');
  });

});
