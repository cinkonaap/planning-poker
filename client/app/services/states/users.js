import Ember from 'ember';

const { Service, computed, isNone } = Ember;

export default Service.extend({
  users: [],
  currentUserId: null,

  currentUser: computed('currentUserId', function() {
    return this.findById(this.get('currentUserId'));
  }),

  findById(id) {
    return this.get('users').findBy('id', id);
  },

  addUser(user) {
    if (!this.findById(user.id)) {
      this.get('users').addObject(user);
    }
  },

  removeById(id) {
    const user = this.findById(id);
    this.get('users').removeObject(user);
  },

  setCurrentUserId(socketId) {
    if (isNone(socketId)) {
      this.set('currentUserId', null);
      localStorage.removeItem('userName');
    } else {
      this.set('currentUserId', socketId);
      localStorage.setItem('userName', this.get('currentUser.name'));
    }
  },
});
