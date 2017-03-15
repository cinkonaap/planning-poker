import Ember from 'ember';

const { computed, set, Service } = Ember;

export default Service.extend({
  users: [],
  currentUser: null,

  hasBets: computed.bool('round.bets.length'),

  init() {
    this.set('round', Ember.Object.create({
      bets: [
        // {name: 'xx', bet: true}
      ],
    }));
  },

  // changes a format of bets from {} to []
  setRound(round) {
    const bets = round.bets;
    round.bets = []; // set empty for now
    this.set('round', round);
    this._setRoundBets(bets);
  },

  // changes a format of bets from {} to []
  _setRoundBets(bets) {
    const usernames = Object.keys(bets);
    usernames.forEach(username => {
      this._addBet(username, bets[username].bet);
    });
  },

  _addBet(name, bet) {
    const bets = this.get('round.bets');
    let user = this._findUser(name);
    if (user) {
      set(user, 'bet', bet);
    } else {
      user = bets.pushObject({ name, bet });
    }
    Ember.Object.prototype.incrementProperty.call(user, 'betCount');
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
    localStorage.removeItem('userName');
  },

  removeUser(name) {
    const users = this.get('users');

    for (let i = 0; i < users.length; i++) {
      if (users[i].name === name) {
        users.removeAt(i);
        break;
      }
    }
  },

  setCurrentUser(user) {
    this.set('currentUser', user);
  },

  _findUser(name) {
    const bets = this.get('round.bets');
    return bets && bets.findBy('name', name);
  },

  cardSelected(name) {
    const bets = this.get('round.bets');
    this._addBet(name, true);
    console.log('cardSelected', name);
    console.log('bets', bets);
  },

  roundRevealed(round) {
    this._setRoundBets(round.bets);
  },

  resetRound() {
    console.log('hhh');
    this.set('round.bets', []);
  },

  _hasUserWithName(name) {
    return this.get('users').any(user => user.name === name);
  },
});
