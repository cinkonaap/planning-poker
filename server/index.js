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

// TODO probably would be better if was immutable
function revealCurrent(bets, currentUserName) {
  const currentUserBetInfo = round.bets[currentUserName];
  if(currentUserBetInfo) {
    bets[currentUserName].bet = currentUserBetInfo.bet;
  }
  return bets;
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
    const unrevealed = getUnrevealedBets(round.bets);
    const revealedCurrentOnly = revealCurrent(unrevealed, socketUser.name);
    callback({
      users,
      round: {
        name: round.name,
        bets: revealedCurrentOnly,
      },
    });
  });

  socket.on('disconnect', disconnect);
  socket.on('manual-disconnect', disconnect);
  socket.on('kick', kick);

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

  function kick(name) {
    const user = users.find(user => user.name === name);
    console.log('kkcick user', name, user);
    // TODO maybe combine _spliceUser and emit users-disconnect to one method ?
    _spliceUser(user);
    io.emit('users-disconnect', user);
  }

  function disconnect() {
    if (socketUser) {
      _spliceUser(socketUser);
      io.emit('users-disconnect', socketUser);
      socketUser = null;
    }
  }

  function _spliceUser(user) {
    console.log('users before splice', users);
    users.splice(users.indexOf(socketUser), 1);
    console.log('users after splice', users);
  }
});
