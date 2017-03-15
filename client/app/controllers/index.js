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
    socket.on('round-reveal', this._onRoundReveal.bind(this));
  },

  actions: {
    sendCardChosen(points) {
      console.log('sendndndnd', points);
      this.get('socket').emit('users-card-select', points);
    },

    logout() {
      this.get('socket').emit('manual-disconnect');
    },

    reset() {
      this.get('socket').emit('round-new');
    },

    kick(name) {
      this.get('socket').emit('kick', name);
    },

    reveal() {
      this.get('socket').emit('round-reveal');
    },
  },
  _onUsersCardSelect(name) {
    this.get('state').cardSelected(name);
  },
  _onRoundReveal(round) {
    this.get('state').roundRevealed(round);
  },
});
