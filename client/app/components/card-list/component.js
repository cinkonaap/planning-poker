import Ember from 'ember';

const { Component, computed, observer, inject: { service } } = Ember;

const cards = [
  {
    action: 0.5,
  },
  {
    action: 1,
  },
  {
    action: 3,
  },
  {
    action: 5,
  },
  {
    action: 8,
  },
  {
    action: 13,
  },
  {
    action: 'coffee',
  },
  {
    action: '?',
  },
];

export default Component.extend({
  state: service(),

  cards,

  cardSelected: null,

  onReset: observer('hasBets', function() {
    if (!this.get('hasBets')) {
      this.set('cardSelected', null);
    }
  }),

  init() {
    this._super(...arguments);
    const name = this.get('state.currentUser.name');
    const currentUserFromBets = this.get('state')._findUser(name);
    if(currentUserFromBets) {
      this.set('cardSelected', currentUserFromBets.bet);
    }
  },

  actions: {
    cardSelect(value) {
      this.set('cardSelected', value);
      this.get('onCardSelected')(value);
    },
  },
});
