const process = require('process'),
socketioEmiiter = require('socket.io-emitter');
var host = '127.0.0.1';
var port = 1234 ;
var io = socketioEmiiter({host: host, port: port});

io.to(process.argv[2]).emit('event', process.argv[3]);
setTimeout(() => {process.exit(0)}, 1000);
