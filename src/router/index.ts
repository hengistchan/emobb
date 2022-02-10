import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  // {
  //   path: "/",
  //   component: BasicLayout,
  //   name: "layout",
  //   redirect: "home",
  //   children: [
  //     { path: "/home", component: Home },
  //     { path: "/template/:id", component: TemplateDetail },
  //     { path: "/editor", component: Editor }
  //   ]
  // }
  {
    path: "/",
    component: () => import("@/App.vue"),
  },
];

export default createRouter({
  history: createWebHashHistory(),
  routes,
});
