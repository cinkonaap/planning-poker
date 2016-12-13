import Ember from 'ember';

const { computed, Component } = Ember;

export default Component.extend({
  usersRound: computed('users.@each', 'round', 'roundbets.@each', function() {
    console.log('round', this.get('round'));
    return this.get('users').map(user => {
      return {
        name: user.name,
        voted: this.get(`round.bets.${user.name}.bet`),
      }
    });
  })
});
