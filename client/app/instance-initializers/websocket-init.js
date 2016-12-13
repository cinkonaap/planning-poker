export function initialize(appInstance) {
  const websocketService = appInstance.lookup('service:socket-io');
  const socket = websocketService.socketFor('http://localhost:3000/');
  socket.on('connect', function() {
    console.log('connected socket');
  });

  socket.on('news', function() {
    console.log('got news', ...arguments);
  });

  appInstance.register('sockets:instance', socket, { instantiate: false });
  appInstance.inject('controller', 'socket', 'sockets:instance');
  appInstance.inject('route', 'socket', 'sockets:instance');
}

export default {
  name: 'websocket-init',
  initialize,
};
  // application.inject('route', 'foo', 'service:foo');
