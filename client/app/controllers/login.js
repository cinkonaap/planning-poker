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

      socket.emit('users:login', name, (payload) => {
        console.log("SUCC", payload);
        payload.users.forEach(userData => {
          this.get('usersState').addUser(createUser(userData));
        });

        const me = createUser(payload.me);
        this.get('usersState').addUser(me);
        this.get('usersState').setCurrentUser(me);

        this.transitionToRoute('index');
      });
    },
  },
});
