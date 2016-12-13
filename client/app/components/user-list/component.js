import Ember from 'ember';

const { computed, Component } = Ember;

export default Component.extend({
  usersRound: computed('users.@each', 'round.bets', function() {
    console.log('round.bets', this.get('round.bets'));
    return this.get('users').map(user => {
      return {
        name: user.name,
        voted: this.get(`round.bets.${user.name}`),
      }
    });
  })
});
