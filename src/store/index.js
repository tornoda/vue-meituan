import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import actions from "./actions";
import mutations from "./mutations"
import getters from "./getters"
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createLogger()]
})