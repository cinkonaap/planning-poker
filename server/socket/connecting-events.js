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

function disconnect(io, disconnectedSocket) {
  if (isLoggedIn(disconnectedSocket)) {
    io.emit('users:disconnect', socketUser(disconnectedSocket));
    logOut(disconnectedSocket);
  }
}

function kick(io, id) {
  const kickedSocket = io.sockets.connected[id];
  if (kickedSocket) {
    disconnect(io, kickedSocket);
  } else {
    console.warn('trying to kick a socket that does not exist');
  }
}

module.exports = function(io) {
  return function(socket) {
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

    socket.on('disconnect', disconnect.bind(null, io, socket));
    socket.on('kick', kick.bind(null, io));
  }
}
