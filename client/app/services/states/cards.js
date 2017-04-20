import Ember from 'ember';

const { Service } = Ember;

export default Service.extend({
  cards: [
    {
      bet: 0.5,
    },
    {
      bet: 1,
    },
    {
      bet: 3,
    },
    {
      bet: 5,
    },
    {
      bet: 8,
    },
    {
      bet: 13,
    },
    {
      bet: 'coffee',
    },
    {
      bet: '?',
    },
  ],
});
