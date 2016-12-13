import Ember from 'ember';

const { inject: { service }, Route, RSVP } = Ember;

export default Route.extend({
  state: service(),
  model() {
    // TODO add reject when sth goes wrong
    return new RSVP.Promise((resolve) => {
      this.get('socket').emit('users-get', (users) => {
        const state = this.get('state');
        users.forEach(user => state.createUser(user.name));
        resolve(state.users);
      });
    });
  },
});
