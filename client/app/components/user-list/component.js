import Ember from 'ember';

const { computed, Component } = Ember;

export default Component.extend({
  tagName: 'ul',

  usersRound: computed('users.@each', 'round', function() {
    return this.get('users').map(user => {
      return {
        name: user.name,
        voted: this.get(`round.bets.${user.name}`),
      }
    });
  }),
});
