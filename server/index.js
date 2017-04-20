const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = process.env.PORT || 7011;
server.listen(port, () => {
  console.log('server listentig on port' , port)
});

function socketUser(socket) {
  return { id: socket.id, name: socket.name };
}

io.on('connection', function (socket) {
  socket.on('users:login', function(name, callback) {
    socket.name = name;

    const connected = Object.values(io.sockets.connected);
    const users = connected.map(socketUser);

    callback({
      socketId: socket.id,
      users,
    });

    socket.broadcast.emit('users:connect', socketUser(socket));
  });

  socket.on('disconnect', disconnect);
  socket.on('users:disconnect', disconnect);

  function disconnect() {
    if (socket.name) {
      io.emit('users:disconnect', socketUser(socket));
    }
  }
});
