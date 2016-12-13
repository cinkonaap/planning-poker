import Ember from 'ember';

const { inject: { service } } = Ember;

export default Ember.Route.extend({
  state: service(),

  beforeModel() {
    if (!this.get('state').currentUser) {
      this.transitionTo('login');
    }
  }
});
