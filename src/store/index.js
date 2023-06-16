import { createStore } from "vuex";

export default createStore({
  state: {
    isCollapse: true,
    currentBread: null,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home",
      },
    ],
  },
  mutations: {
    updateCollapse(state, payload) {
      state.isCollapse = !state.isCollapse;
    },
    selectMenu(state, payload) {
      if (payload.name === "home") {
        state.currentBread = null;
      } else {
        state.currentBread = payload;
        let res = state.tabsList.findIndex(
          (item) => item.name === payload.name
        );
        res == -1 ? state.tabsList.push(payload) : "";
      }
    },
    closeTag({ tabsList }, val) {
      let res = tabsList.findIndex((item) => item.name === val.name);
      tabsList.splice(res, 1);
    },
  },
});
