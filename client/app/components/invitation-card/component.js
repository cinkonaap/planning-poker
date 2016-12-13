import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  actions: {
    submit() {
      // debugger;
      this.get('submitForm')(this.get('name'));
    }
  }
});
