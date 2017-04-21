// TODO in the future we will have multiple channels/rooms
const channel = {
  id: 1,
  currentRound: {
    bets: [],
  },
};

const channels = [channel];

function findChannelById(id) {
  return channels.find(item => item.id === id)
}

function findUserBet(bets, userId) {
  return bets.find(bet => bet.id === userId);
}

const rounds = [];

module.exports = function(io) {
  return function(socket) {
    socket.on('round:bet', function({ roundId, bet }, ack) {
      // TODO get current channel/room to which the socket is assigned
      const currentRound = channel.currentRound;
      if(roundId !== currentRound.id) {
        ack('you tried to place a bet for a round that does not match currentRound')
      } else {
        const bets = currentRound.bets;
        let userBet = findUserBet(bets);
        if (userBet) {
          userBet.value = bet;
        } else {
          userBet = {id: socket.id, value: bet };
          bets.push(userBet);
          io.emit('round:bet', id);
        }
        ack(true);
      }
    });

    socket.on('channel:state', function(channelId, ack) {
      const foundChannel = findChannelById(id);
      if (foundChannel.currentRound.id) {
        ack(foundChannel.currentRound); // TODO do not reveal!
      } else {
        ack(null);
      }
    })
  }
}
