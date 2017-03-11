import Ember from 'ember';


const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'span',
  classNames: ['vote-state'],

  votedOutput: computed('voted', function() {
    const voted = this.get('voted');
    console.log('voted output...', voted);
    if (voted === true) {
      return '+';
    } else if (voted) { // is number revealed
      return voted;
    }
  }),
});
