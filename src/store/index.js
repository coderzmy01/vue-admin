import Cookies from "js-cookie";
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
    menu: JSON.parse(localStorage.getItem("menu")) || [],
    token: "",
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
    setMenu(state, val) {
      console.log(val);
      state.menu = val;
      localStorage.setItem("menu", JSON.stringify(val));
    },
    addMenu(state, val) {
      let menu = state.menu;
      // 存储路由信息的数组
      const menuArr = [];
      // 处理menu中的路由信息
      menu.forEach((item) => {
        // 判断有没有children,有继续处理
        if (item.children) {
          item.children = item.children.map((item) => {
            let url = `../views/${item.url}.vue`;
            item.component = () => import(url);
            return item;
          });
          menuArr.push(...item.children);
        } else {
          // 没有就直接添加
          let url = `../views/${item.url}.vue`;
          item.component = () => import(url);
          menuArr.push(item);
        }
      });
      console.log(menuArr);
      console.log(val.getRoutes());

      menuArr.forEach((item) => {
        val.addRoute("home1", item);
      });
    },
    clearMenu(state) {
      let menu = state.menu;
      menu = [];
      localStorage.removeItem("menu");
    },
    setToken(state, val) {
      state.token = val;
      Cookies.set("token", val);
    },
    clearToken(state) {
      state.token = "";
      Cookies.remove("token");
    },
    getToken(state) {
      state.token = state.token || Cookies.get("token");
    },
  },
});
