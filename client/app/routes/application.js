import Ember from 'ember';

const { Route, inject: { service }, isNone } = Ember;

export default Route.extend({
  usersState: service('states.users'),

  beforeModel() {
    const currentUser = this.get('usersState.currentUser');

    if (isNone(currentUser)) {
      const userName = localStorage.getItem('userName');

      if (userName) {
        // TODO it would make sense if we prevented multiple tabs logins ? right now if you open a new tab a new socket with same name will be opened.
        // We could prevent that by sending the id to the server and checking if a socket with that id is already logged in
        // We could also disallow duplicate names
        this.controllerFor('login').send('submit', userName);
      } else {
        this.transitionTo('login');
      }
    }
  },
});
