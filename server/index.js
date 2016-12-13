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

function getUnrevealedBets(bets) {
  return Object.keys(bets).reduce((previous, current) => {
    previous[current] = {
      bet: !!bets[current].bet,
    };
    return previous;
  }, {});
}

io.on('connection', function (socket) {
  let socketUser = null;

  socket.on('users-new', function (data) {
    console.log('users new')
    socketUser = { name: data, id: socket.id };
    users.push(socketUser);

    socket.broadcast.emit('users-new', socketUser);
  });

  socket.on('users-get', function(callback) {
    callback({
      users,
      round: {
        name: round.name,
        bets: getUnrevealedBets(round.bets),
      },
    });
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
    round.bets[socketUser.name] = round.bets[socketUser.name] || {};
    round.bets[socketUser.name].bet = value;

    socket.broadcast.emit('users-card-select', socketUser.name);
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
