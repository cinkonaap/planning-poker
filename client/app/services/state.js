import Ember from 'ember';

export default Ember.Service.extend({
  users: [],
  currentUser: null,

  _hasUserWithName(name) {
    return this.get('users').any(user => user.name === name);
  },

  createUser(name) {
    if (this._hasUserWithName(name)) {
      return false;
    } else {
      const user = { name };
      this.get('users').pushObject(user);
      return user;
    }
  },

  setCurrentUser(user) {
    // TODO maybe we will need a set here
    this.set('currentUser', user);
  },
});
