import Ember from 'ember';

const { set, Service } = Ember;

export default Service.extend({
  users: [],
  currentUser: null,
  round: {
    bets: {},
  },

  roundbets: [],

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

  cardSelected(name) {
    const round = this.get('round');
    set(round, `bets.${name}`, { bet: true });
    this.get('roundbets').pushObject(name);
    console.log('cardSelected in state', round);
    this.set('round', round);
  },

  _hasUserWithName(name) {
    return this.get('users').any(user => user.name === name);
  },
});
