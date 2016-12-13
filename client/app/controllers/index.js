import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  state: service(),
  hash: computed.alias('model'),
  users: computed.alias('hash.users'),
  round: computed.alias('hash.round'),
  init() {
    this._super(...arguments);
    const socket = this.get('socket');
    socket.on('users-card-select', this._onUsersCardSelect.bind(this));
  },
  actions: {
    sendCardChosen(points) {
      console.log('sendndndnd', points);
      this.get('socket').emit('users-card-select', points);
    },

    logout() {
      localStorage.removeItem('userName');
      this.get('socket').emit('manual-disconnect');
      this.transitionToRoute('login');
    },
  },
  _onUsersCardSelect(name) {
    this.get('state').cardSelected(name);
  },
});
