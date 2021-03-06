import Ember from 'ember';

const { Controller, getOwner, inject: { service } } = Ember;

export default Controller.extend({
  state: service(),
  actions: {
    submitForm(name) {
      const socket = this.get('socket');
      console.log('emiting', name);
      socket.emit('users-new', name);
      const user = this.get('state').createUser(name);
      this.get('state').setCurrentUser(user);
      this.transitionToRoute('index');
      localStorage.setItem('userName', name);
    },
  },
});
