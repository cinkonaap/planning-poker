import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  state: service(),
  routing: service('-routing'),

  classNames: ['actions-panel'],

  actions: {
    logout() {
      this.get('onLogout')();
    },

    reset() {
      this.get('onReset')();
    },

    reveal() {
      this.get('onReveal')();
    },
  }
});
