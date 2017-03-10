const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];
const round = {
  name: '',
  bets: {},
};

const port = process.env.PORT || 7011;
server.listen(port, () => {
  console.log('server listentig on port' , port)
});
app.get('/hello', function (req, res) {
  res.send('hello');
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
    console.log('users new');
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
      betSelected: round.bets[socketUser.name],
    });
  });

  socket.on('disconnect', disconnect);
  socket.on('manual-disconnect', disconnect);

  socket.on('users-card-select', function(value) {
    round.bets[socketUser.name] = round.bets[socketUser.name] || {};
    round.bets[socketUser.name].bet = value;

    io.emit('users-card-select', socketUser.name);
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

  function disconnect() {
    if (socketUser) {
      users.splice(users.indexOf(socketUser), 1);
      io.emit('users-disconnect', socketUser);
      socketUser = null;
    }
  }
});
