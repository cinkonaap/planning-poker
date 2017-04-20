import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  usersState: service('states.users'),

  users: computed.readOnly('usersState.users'),
});
