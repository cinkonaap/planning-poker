import Ember from 'ember';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend({
  usersState: service('states.users'),
  cardsState: service('states.cards'),
  websocket: service('gateways.websocket'),

  users: computed.readOnly('usersState.users'),

  cards: computed.readOnly('cardsState.cards'),

  actions: {
    kick(id) {
      this.get('websocket.instance').emit('kick', id);
    },
    sendBet(bet) {
      this.get('websocket.instance').emit('bet', bet);
    },
  },
});


// // round structure proposal, TODO remove comment and do something meaningful with that idea
// {
//   title: 'string'
//   id: 'unqique-staff',
//   bets: [{id, bet}...],
// }
