import Ember from 'ember';

const { inject: { service }, Route } = Ember;

export default Route.extend({
  state: service(),

  beforeModel() {
    if (!this.get('state').currentUser) {
      const userName = localStorage.getItem('userName');
      if (userName) {
        this.controllerFor('login').send('submitForm', userName);
      } else {
        this.transitionTo('login');
      }
    }
  },
});
