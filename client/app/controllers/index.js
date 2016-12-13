import Ember from 'ember';

const { Controller, inject: { service } } = Ember;

export default Controller.extend({
  state: service(),
  actions: {
    sendCardChosen(points) {
      this.get('socket').emit('users-card-select', points);
    },

    logout() {
      localStorage.removeItem('userName');
      this.get('socket').emit('manual-disconnect');
      this.transitionToRoute('login');
    },
  },
});
