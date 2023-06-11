import { createRouter, createWebHashHistory } from "vue-router";

const routes = [{
  path: '/',
  component: () => import('../views/main.vue'),
  children: [
    {
      path: '/home',
      name: 'home',
      component:() => import('../views/home.vue')
    }
  ]
}]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router