import Ember from 'ember';

const { inject: { service }, Route, RSVP } = Ember;

export default Route.extend({
  state: service(),
  model() {
    // TODO add reject when sth goes wrong
    return new RSVP.Promise((resolve) => {
      this.get('socket').emit('users-get', (hash) => {
        const { users, round } = hash;
        const state = this.get('state');
        users.forEach(user => state.createUser(user.name));
        state.set('round', round);
        state.get('roundbets').pushObject('hack');
        resolve({
          users: state.users,
          round: state.round,
          roundbets: state.roundbets,
        });
      });
    });
  },
});
