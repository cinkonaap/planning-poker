const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];

const port = process.env.PORT || 7011;
server.listen(port, () => {
  console.log('server listentig on port' , port)
});

io.on('connection', function (socket) {
  let socketUser = null;

  socket.on('users:login', function(name, callback) {
    const otherUsers = users.slice();

    const socketUser = { name, id: socket.id };
    users.push(socketUser);

    callback({
      me: socketUser,
      users: otherUsers,
    });

    socket.broadcast.emit('users:connect', socketUser);
  });

  socket.on('disconnect', disconnect);
  socket.on('users:disconnect', disconnect);

  function disconnect() {
    if (socketUser) {
      users.splice(users.indexOf(socketUser), 1);
      io.emit('users:disconnect', socketUser);
      socketUser = null;
    }
  }
});
