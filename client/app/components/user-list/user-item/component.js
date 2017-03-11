import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const { Component, computed } = Ember;

export default Component.extend({
  classNameBindings: ['justVoted'],
  voteStateComponent: computed('userRound.voted', function() {
    const voted = this.get('userRound.voted');

    return voted ? 'user-list/vote-state/state-voted' : null;
  }),

  shakeOnVote: function() {
    console.log('observing betsCount');
    this.get('_shake').perform();
  }.observes('betsCount').on('init'),

  _shake: task(function * () {
    this.set('justVoted', true);
    console.log('just voted true');
    yield timeout(1000);
    this.set('justVoted', false);
    console.log('just voted falsee');
  }).drop(),
});
