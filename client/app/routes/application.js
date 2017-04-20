import Ember from 'ember';

const { Route, inject: { service }, isNone } = Ember;

export default Route.extend({
  usersState: service('states.users'),

  beforeModel() {
    const currentUser = this.get('usersState.currentUser');

    if (isNone(currentUser)) {
      const userName = localStorage.getItem('userName');

      if (userName) {
        this.controllerFor('login').send('submit', userName);
      } else {
        this.transitionTo('login');
      }
    }
  },
});
