import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    date: 'server date',
  },
  mutations: {
    setDate(state, date) {
      state.date = date;
    },
  },
  actions: {

  },
});
