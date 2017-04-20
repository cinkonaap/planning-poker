const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const connectingEvents = require('./socket/connecting-events')(io);
const betsEvents = require('./socket/bets-events')(io);

const port = process.env.PORT || 7011;
server.listen(port, () => {
  console.log('server listentig on port' , port)
});

io.on('connection', function (socket) {
  connectingEvents(socket);
  betsEvents(socket);
});
