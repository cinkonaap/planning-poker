import Ember from 'ember';
import { createUser } from 'hackaton-pp/models/user';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  usersState: service('states.users'),
  websocket: service('gateways.websocket'),

  init() {
    this._super(...arguments);

    const websocketInstance = this.get('websocket.instance');

    websocketInstance.on('users:connect', this.onUserCreated.bind(this));
    websocketInstance.on('users:disconnect', this.onUserDisconnect.bind(this));
  },


  // TODO: move this to single responsibility objects
  onUserCreated(userData) {
    const user = createUser(userData);
    this.get('usersState').addUser(user);
  },

  // TODO: move this to single responsibility objects
  onUserDisconnect(userData) {
    const currentUserName = this.get('usersState.currentUser.name');

    if (userData.name === currentUserName) {
      this.get('usersState').setCurrentUser(null);
      this.transitionToRoute('login');
    }

    //this.get('usersState').removeUser(user.name);
  },
});
