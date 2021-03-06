import Ember from 'ember';

const { Controller, inject: { service} } = Ember;

export default Controller.extend({
  state: service(),

  init() {
    const socket = this.get('socket');
    socket.on('users-new', this.onUserCreated.bind(this));
    socket.on('users-disconnect', this.onUserDisconnect.bind(this));
    socket.on('round-new', this.onRoundReset.bind(this));
  },

  onUserCreated(user) {
    this.get('state').createUser(user.name);
  },

  onUserDisconnect(user) {
    console.log('user wants to disconnect', user);
    const state = this.get('state');
    const currentUserName = state.get('currentUser.name');
    debugger;
    if (user.name === currentUserName) {
      state.logoutUser();
      this.transitionToRoute('login');
    } else {
      state.removeUser(user.name);
    }
  },

  onRoundReset() {
    this.get('state').resetRound();
  },
});
