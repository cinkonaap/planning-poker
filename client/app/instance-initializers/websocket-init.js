export function initialize(appInstance) {
  const websocketService = appInstance.lookup('service:socket-io');
  // TODO move to conifg
  const websocketServer = 'http://localhost:7011/';
  const socket = websocketService.socketFor(websocketServer);
  socket.on('connect', function() {
    console.log('connected socket');
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
