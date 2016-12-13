import Ember from 'ember';

const { Controller, inject: { service }} = Ember;

export default Controller.extend({
  state: service(),
  actions: {
    sendCardChosen(points) {
      this.get('socket').emit('TODO');
    }
  }
});
