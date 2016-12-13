import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  voteStateComponent: computed('userRound.voted', function() {
    const voted = this.get('userRound.voted');

    return voted ? 'user-list/vote-state/state-voted' : null;
  }),
});
