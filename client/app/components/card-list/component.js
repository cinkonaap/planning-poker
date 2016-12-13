import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  cards: [
    {
      points: 0,
    },
    {
      points: 1,
    },
    {
      points: 3,
    },
    {
      points: 5,
    },
    {
      points: 8,
    },
    {
      points: 13,
    },
    {
      points: 'coffee',
    },
    {
      points: '?',
    },
  ],
});
