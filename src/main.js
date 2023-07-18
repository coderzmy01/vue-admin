import { createApp } from "vue";
import "./style.css";
import "./assets/less/index.less";
import App from "./App.vue";
import router from "./router";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from "./store";
import "./api/index";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
store.commit("addMenu", router);
router.beforeEach((to, form, next) => {
  store.commit("getToken");
  function hasRoute(path) {
    return !!router.getRoutes().filter((item) => item.path === path).length;
  }
  const token = store.state.token;
  if (!token && to.path !== "/login") {
    next("/login");
  } else if (!hasRoute(to.path)) {
    next("/login");
  } else {
    next();
  }
});
app.use(router).use(store);
app.mount("#app");
