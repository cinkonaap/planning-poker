const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];
const round = {
  name: '',
  bets: {},
};

server.listen(3000);
app.get('/', function (req, res) {
  res.send('');
});

io.on('connection', function (socket) {
  let socketUser = null;

  socket.on('users-new', function (data) {
    socketUser = { name: data, id: socket.id };
    users.push(socketUser);

    socket.broadcast.emit('users-new', socketUser);
  });

  socket.on('users-get', function(callback) {
    callback(users);
  });

  function disconnect() {
    if (socketUser) {
      users.splice(users.indexOf(socketUser), 1);
      io.emit('users-disconnect', socketUser);
      socketUser = null;
    }
  }

  socket.on('disconnect', disconnect);
  socket.on('manual-disconnect', disconnect);

  socket.on('users-card-select', function(value) {
    if (!round.bets.hasOwnProperty(socketUser.id)) {
      round.bets[socketUser.id] = {
        bet: value,
      };
    } else {
      round.bets[socketUser.id].bet = value;
    }

    socket.broadcast.emit('users-card-select', {
      user: socketUser.name,
      value: value,
    });
  });

  socket.on('round-name-change', function(name) {
    round.name = name;

    io.emit('round-name-change', name);
  });

  socket.on('round-new', function() {
    round.name = '';
    round.bets = {};

    io.emit('round-new', round);
  });

  socket.on('round-reveal', function() {
    io.emit('round-reveal', round);
  });
});
