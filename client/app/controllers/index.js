import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  usersState: service('states.users'),
  websocket: service('gateways.websocket'),

  users: computed.readOnly('usersState.users'),

  actions: {
    kick(id) {
      this.get('websocket.instance').emit('kick', id);
    },
  },
});
