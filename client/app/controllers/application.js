import Ember from 'ember';

const { Controller, inject: { service} } = Ember;

export default Controller.extend({
  state: service(),
  init() {
    const socket = this.get('socket');
    socket.on('users-new', this.onUserCreated.bind(this));
    socket.on('users-disconnect', this.onUserDisconnect.bind(this));
  },

  onUserCreated(user) {
    this.get('state').createUser(user.name);
  },

  onUserDisconnect(user) {
    console.log('user wants to disconnect', user);
    this.get('state').removeUser(user.name);
  },
});
