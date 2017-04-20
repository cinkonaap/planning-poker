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

function isLoggedIn(socket) {
  return !!socket.name;
}

function logIn(socket, name) {
  socket.name = name;
}

function logOut(socket) {
  delete socket.name;
}

io.on('connection', function (socket) {
  socket.on('users:login', function(name, callback) {
    logIn(socket, name);

    const connected = Object.values(io.sockets.connected);

    const users = connected.filter(isLoggedIn).map(socketUser);

    callback({
      socketId: socket.id,
      users,
    });

    socket.broadcast.emit('users:connect', socketUser(socket));
  });

  socket.on('disconnect', disconnect.bind(null, socket));
  socket.on('users:disconnect', disconnect);
  socket.on('kick', kick);

  function disconnect(disconnectedSocket) {
    debugger;
    if (isLoggedIn(disconnectedSocket)) {
      io.emit('users:disconnect', socketUser(disconnectedSocket));
      logOut(disconnectedSocket);
    }
  }

  function kick(id) {
    const kickedSocket = io.sockets.connected[id];
    if (kickedSocket) {
      disconnect(kickedSocket);
    } else {
      console.warn('trying to kick a socket that does not exist');
    }
  }
});
