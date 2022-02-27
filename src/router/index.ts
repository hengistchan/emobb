import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; //

NProgress.configure({ showSpinner: false });
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    children: [
      { path: "mine", component: () => import("@/views/index/mine/index.vue") },
      {
        path: "recycler",
        component: () => import("@/views/index/recycler/index.vue"),
      },
      {
        path: "work",
        component: () => import("@/views/index/work/index.vue"),
      },
      {
        path: "template",
        component: () => import("@/views/index/template/index.vue"),
      },
    ],
  },
  {
    path: "/editor",
    component: () => import("@/views/editor/index.vue"),
  },
  {
    path: "/user",
    component: () => import("@/views/user/index.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/user/login.vue"),
      },
      {
        path: "register",
        component: () => import("@/views/user/register.vue"),
      },
      {
        path: "find",
        component: () => import("@/views/user/find.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(() => {
  NProgress.start(); // start progress bar
  return true;
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default router;
