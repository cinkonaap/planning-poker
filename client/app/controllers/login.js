import Ember from 'ember';
import { createUser } from 'hackaton-pp/models/user';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  usersState: service('states.users'),
  websocket: service('gateways.websocket'),

  actions: {
    // TODO: move this logic to single responsibility object
    submit(name) {
      const socket = this.get('websocket.instance');

      socket.emit('users:login', name, ({ socketId, users }) => {
        console.log("SUCC", socketId, users);
        users.forEach(userData => {
          this.get('usersState').addUser(createUser(userData));
        });

        this.get('usersState').setCurrentUserId(socketId);

        this.transitionToRoute('index');
      });
    },
  },
});
