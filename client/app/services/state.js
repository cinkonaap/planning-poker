import Ember from 'ember';

const { set, Service } = Ember;

export default Service.extend({
  users: [],
  currentUser: null,

  init() {
    this.set('round', Ember.Object.create({
      bets: {},
    }));
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

  logoutUser() {
    const userName = this.get('currentUser').name;
    this.removeUser(userName);
    this.set('currentUser', null);
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

  cardSelected(name) {
    const bets = this.get('round.bets');
    // if(!bets[name]) {
    set(bets, name, { voted: true });
    // }
  },

  resetRound() {
    Ember.set(this.get('round'), 'bets', {});
  },

  _hasUserWithName(name) {
    return this.get('users').any(user => user.name === name);
  },
});
