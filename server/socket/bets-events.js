module.exports = function(io) {
  return function(socket) {
    socket.on('bet', function(bet) {
      console.log('place my bet you damn server', bet)
    });
  }
}
