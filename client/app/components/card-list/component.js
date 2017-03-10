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

  roundBets: computed.reads('state.roundbets'),

  onReset: observer('roundBets.length', function() {
    if (this.get('roundBets.length') === 0) {
      this.set('cardSelected', null);
    }
  }),

  actions: {
    cardSelect(value) {
      this.set('cardSelected', value);
      this.get('onCardSelected')(value);
    },
  },
});
