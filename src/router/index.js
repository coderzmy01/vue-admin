import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../views/main.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("../views/home.vue"),
      },
      {
        path: "/user",
        name: "user",
        component: () => import("../views/user.vue"),
      },
      {
        path: "/page1",
        name: "page1",
        component: () => import("../views/page1.vue"),
      },
      {
        path: "/page2",
        name: "page2",
        component: () => import("../views/page2.vue"),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
