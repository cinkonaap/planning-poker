import Ember from 'ember';

export default Ember.Service.extend({
  users: [],
  currentUser: null,

  createUser(name) {
    if (this._hasUserWithName(name)) {
      return false;
    } else {
      const user = { name };
      this.get('users').pushObject(user);
      return user;
    }
  },

  removeUser(name) {
    const users = this.get('users');

    for (let i = 0 ; i < users.length ; i++) {
      if (users[i].name === name) {
        users.removeAt(i);
        break;
      }
    }
  },

  setCurrentUser(user) {
    this.set('currentUser', user);
  },

  _hasUserWithName(name) {
    return this.get('users').any(user => user.name === name);
  },
});
