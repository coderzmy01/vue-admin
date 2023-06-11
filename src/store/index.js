import { createStore } from "vuex";

export default createStore({
  state: {
    isCollapse: true,
  },
  mutations: {
    updateCollapse(state, payload) {
      state.isCollapse = !state.isCollapse;
    },
  },
});
