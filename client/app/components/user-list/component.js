import Ember from 'ember';

const { computed, Component, inject: { service } } = Ember;

export default Component.extend({
  state: service(),
  tagName: 'ul',

  usersRound: computed('users.@each', 'round', 'round.bets', 'round.bets.@each', 'round.bets.@each.bet', function() {
    // TODO this could probably be simplified - we could just return the user from bets - just make sure we have got all users there
    return this.get('users').map(user => {
      const userFromBets = this.get('state')._findUser(user.name) || {};
      return {
        name: user.name,
        voted: userFromBets.bet,
        betsCount: userFromBets.betsCount,
      };
    });
  }),
});
