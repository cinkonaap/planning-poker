import Ember from 'ember';

const { Controller, inject: { service} } = Ember;

export default Controller.extend({
  state: service(),
  init() {
    const socket = this.get('socket');
    socket.on('users-disconnect', this.onUserDisconnect.bind(this));

    socket.on('usersnew', user => {
      this.get('state').createUser(user.name);
    });
  },

  onUserDisconnect() {

  },
});
