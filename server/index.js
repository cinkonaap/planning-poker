const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];

server.listen(3000);
app.get('/', function (req, res) {
  res.send('');
});

io.on('connection', function (socket) {
  console.log('user connected', socket.id);
  let socketUser = null;

  socket.on('usersnew', function (data) {
    //console.log('newuser', data);
    socketUser = { name: data, id: socket.id };
    users.push(socketUser);
    console.log('new user', users.length);
    socket.broadcast.emit('usersnew', socketUser);
  });

  socket.on('users-get', function(callback) {
    callback(users);
  });

  socket.on('disconnect', function() {
    if (socketUser) {
      users.splice(users.indexOf(socketUser), 1);
      socket.broadcast.emit('users-disconnect', socketUser);
      socketUser = null;
    }
  });
});
