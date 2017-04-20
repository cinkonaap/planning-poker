import Ember from 'ember';
import config from 'hackaton-pp/config/environment';

const { Service, inject: { service } } = Ember;
const { APP: { socketioServer } } = config;

export default Service.extend({
  websockets: service('socket-io'),

  instance: null,

  init() {
    this._super(...arguments);

    this._connect();
  },

  // TODO: abstact it!
  _connect() {
    const instance = this.get('websockets').socketFor(socketioServer);

    this.set('instance', instance);
  },
});
