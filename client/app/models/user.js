import Ember from 'ember';

// TODO: use ember-buffered-proxy
const User = Ember.Object.extend({
  name: null,
});

export default User;

export function createUser(data) {
  return User.create(data);
};
