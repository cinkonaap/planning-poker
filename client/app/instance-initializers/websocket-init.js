import Ember from 'ember';
import config from 'hackaton-pp/config/environment';

const { Logger } = Ember;
const { APP: { socketioServer } } = config;

export function initialize(appInstance) {
  const websocketService = appInstance.lookup('service:socket-io');
  const socket = websocketService.socketFor(socketioServer);
  socket.on('connect', function() {
    Logger.log('connected socket');
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
