import Ember from 'ember';

const { Component } = Ember;

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
  cards: cards,

  cardSelected: null,

  actions: {
    cardSelect(value) {
      this.set('cardSelected', value);

      this.get('onCardSelected')(value);
    },
  },
});
