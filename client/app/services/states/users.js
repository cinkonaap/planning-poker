import Ember from 'ember';

const { Service, isNone } = Ember;

export default Service.extend({
  users: [],
  currentUser: null,

  addUser(user) {
    if (this._hasUserWithName(name)) {
      return null;
    } else {
      this.get('users').addObject(user);
      return user;
    }
  },

  removeUser(user) {
    this.get('users').removeObject(user);
  },

  setCurrentUser(user) {
    if (isNone(user)) {
      this.set('currentUser', null);
      localStorage.removeItem('userName');
    } else {
      this.set('currentUser', user);
    }
  },

  _hasUserWithName(name) {
    return this.get('users').any(user => user.name === name);
  },
});
