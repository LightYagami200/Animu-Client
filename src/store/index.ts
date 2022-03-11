import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: false,
    snackbarMessage: '',
    discordUser: {
      avatar: '',
      banner: '',
      discriminator: '',
      flags: 0,
      id: '',
      locale: '',
      mfa_enabled: false,
      premium_type: 0,
      public_flags: 0,
      username: '',
    },
  },
  mutations: {
    displaySnackbar(state, payload) {
      if (typeof payload === 'string') {
        state.snackbarMessage = payload;
        state.snackbar = true;
      } else {
        state.snackbarMessage = payload.message;
        state.snackbar = payload.display;
      }
    },
    setDiscordUser(state, payload) {
      state.discordUser = payload;
    },
  },
  actions: {},
  modules: {},
});
