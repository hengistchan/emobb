import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
  },
  {
    path: "/editor",
    component: () => import("@/views/editor/index.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
